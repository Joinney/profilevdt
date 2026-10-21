import React, { useEffect, useRef } from 'react';

export default function WaterSim() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    gl.getExtension('OES_texture_float');
    gl.getExtension('OES_texture_float_linear');

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      gl.viewport(0, 0, width, height);
    };
    window.addEventListener('resize', handleResize);

    // Vertex Shader dùng chung cho Render Quad
    const baseVertexShader = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_pos + 1.0) * 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    // 1. Drop Shader: Tạo gợn sóng khi chạm chuột
    const dropFragmentShader = `
      precision highp float;
      uniform sampler2D u_texture;
      uniform vec2 u_center;
      uniform float u_radius;
      uniform float u_strength;
      varying vec2 v_uv;

      void main() {
        vec4 info = texture2D(u_texture, v_uv);
        float drop = max(0.0, 1.0 - length(u_center - v_uv) / u_radius);
        drop = 0.5 - cos(drop * 3.14159265) * 0.5;
        info.r += drop * u_strength;
        gl_FragColor = info;
      }
    `;

    // 2. Wave Update Shader: Phương trình truyền sóng nước vi phân
    const updateFragmentShader = `
      precision highp float;
      uniform sampler2D u_texture;
      uniform vec2 u_delta;
      varying vec2 v_uv;

      void main() {
        vec4 info = texture2D(u_texture, v_uv);
        vec2 dx = vec2(u_delta.x, 0.0);
        vec2 dy = vec2(0.0, u_delta.y);
        
        float average = (
          texture2D(u_texture, v_uv - dx).r +
          texture2D(u_texture, v_uv + dx).r +
          texture2D(u_texture, v_uv - dy).r +
          texture2D(u_texture, v_uv + dy).r
        ) * 0.25;
        
        info.g += (average - info.r) * 2.0;
        info.g *= 0.985; // Giảm chấn (damping)
        info.r += info.g;
        
        gl_FragColor = info;
      }
    `;

    // 3. Render Shader: Khúc xạ ánh sáng, đáy gạch & Caustics
    const renderFragmentShader = `
      precision highp float;
      uniform sampler2D u_water;
      uniform vec2 u_delta;
      varying vec2 v_uv;

      void main() {
        vec2 dx = vec2(u_delta.x, 0.0);
        vec2 dy = vec2(0.0, u_delta.y);
        
        // Tính vector pháp tuyến mặt nước
        float left = texture2D(u_water, v_uv - dx).r;
        float right = texture2D(u_water, v_uv + dx).r;
        float top = texture2D(u_water, v_uv - dy).r;
        float bottom = texture2D(u_water, v_uv + dy).r;
        vec3 normal = normalize(vec3(left - right, top - bottom, 0.15));

        // Khúc xạ đáy hồ nước (Refraction)
        vec2 refractedUV = v_uv + normal.xy * 0.08;

        // Mô phỏng hoa văn gạch đáy hồ
        vec2 grid = fract(refractedUV * 16.0);
        float line = step(0.06, grid.x) * step(0.06, grid.y);
        vec3 tileColor = mix(vec3(0.02, 0.28, 0.55), vec3(0.06, 0.45, 0.78), line);

        // Ánh nắng lấp lánh (Specular & Caustics)
        vec3 lightDir = normalize(vec3(0.3, 0.5, 0.8));
        float specular = pow(max(0.0, dot(reflect(-lightDir, normal), vec3(0.0, 0.0, 1.0))), 35.0);

        vec3 waterColor = mix(tileColor, vec3(0.8, 0.95, 1.0), specular * 0.8);
        gl_FragColor = vec4(waterColor, 0.95);
      }
    `;

    function compileShader(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    function createProgram(vsSrc, fsSrc) {
      const p = gl.createProgram();
      gl.attachShader(p, compileShader(gl.VERTEX_SHADER, vsSrc));
      gl.attachShader(p, compileShader(gl.FRAGMENT_SHADER, fsSrc));
      gl.linkProgram(p);
      return p;
    }

    const dropProg = createProgram(baseVertexShader, dropFragmentShader);
    const updateProg = createProgram(baseVertexShader, updateFragmentShader);
    const renderProg = createProgram(baseVertexShader, renderFragmentShader);

    // Fullscreen Quad Buffer
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    // Khởi tạo Texture Float Ping-Pong cho mô phỏng vi phân
    const simRes = 256;
    function createTexture() {
      const t = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, simRes, simRes, 0, gl.RGBA, gl.FLOAT, null);
      return t;
    }

    let texA = createTexture();
    let texB = createTexture();

    const fboA = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fboA);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texA, 0);

    const fboB = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fboB);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texB, 0);

    function addDrop(x, y, radius, strength) {
      gl.useProgram(dropProg);
      gl.bindFramebuffer(gl.FRAMEBUFFER, fboB);
      gl.viewport(0, 0, simRes, simRes);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texA);
      gl.uniform1i(gl.getUniformLocation(dropProg, 'u_texture'), 0);
      gl.uniform2f(gl.getUniformLocation(dropProg, 'u_center'), x, y);
      gl.uniform1f(gl.getUniformLocation(dropProg, 'u_radius'), radius);
      gl.uniform1f(gl.getUniformLocation(dropProg, 'u_strength'), strength);

      renderQuad(dropProg);

      // Hoán đổi Texture (Swap)
      let tempTex = texA; texA = texB; texB = tempTex;
      let tempFbo = fboA; fboA = fboB; fboB = tempFbo;
    }

    function renderQuad(prog) {
      const posLoc = gl.getAttribLocation(prog, 'a_pos');
      gl.enableVertexAttribArray(posLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    let isInteracting = false;
    const triggerDropFromEvent = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      if (clientX === undefined) return;

      const x = (clientX - rect.left) / rect.width;
      const y = 1.0 - (clientY - rect.top) / rect.height;
      addDrop(x, y, 0.04, 0.15);
    };

    canvas.addEventListener('mousedown', (e) => { isInteracting = true; triggerDropFromEvent(e); });
    window.addEventListener('mouseup', () => { isInteracting = false; });
    canvas.addEventListener('mousemove', (e) => { if (isInteracting) triggerDropFromEvent(e); });
    canvas.addEventListener('touchstart', (e) => { isInteracting = true; triggerDropFromEvent(e); }, { passive: true });
    canvas.addEventListener('touchmove', (e) => { triggerDropFromEvent(e); }, { passive: true });

    // Tạo giọt nước tự động ngẫu nhiên khi người dùng không tương tác
    let autoDropTimer = setInterval(() => {
      if (!isInteracting && Math.random() < 0.6) {
        addDrop(Math.random(), Math.random(), 0.035, 0.08);
      }
    }, 1800);

    let animId;
    function render() {
      // 1. Cập nhật vi phân sóng
      gl.useProgram(updateProg);
      gl.bindFramebuffer(gl.FRAMEBUFFER, fboB);
      gl.viewport(0, 0, simRes, simRes);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texA);
      gl.uniform1i(gl.getUniformLocation(updateProg, 'u_texture'), 0);
      gl.uniform2f(gl.getUniformLocation(updateProg, 'u_delta'), 1.0 / simRes, 1.0 / simRes);
      renderQuad(updateProg);

      // Swap
      let tempTex = texA; texA = texB; texB = tempTex;
      let tempFbo = fboA; fboA = fboB; fboB = tempFbo;

      // 2. Render mặt nước lên Canvas màn hình
      gl.useProgram(renderProg);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, width, height);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texA);
      gl.uniform1i(gl.getUniformLocation(renderProg, 'u_water'), 0);
      gl.uniform2f(gl.getUniformLocation(renderProg, 'u_delta'), 1.0 / width, 1.0 / height);
      renderQuad(renderProg);

      animId = requestAnimationFrame(render);
    }
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(autoDropTimer);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 3,
        cursor: 'pointer'
      }} 
    />
  );
}