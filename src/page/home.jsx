import React, { useState, useEffect, useRef } from 'react';

const sourceCodes = [
  { title: "Cây Thông Noel", lang: "HTML", date: "24/12/2025", img: "https://images.unsplash.com/photo-1543258103-a62bdc069871?w=400&q=80" },
  { title: "Cây Thông Noel 2", lang: "HTML", date: "24/12/2025", img: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&q=80" },
  { title: "Thầy trò rủ nhau đi thỉnh kinh", lang: "HTML", date: "20/12/2025", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80" },
  { title: "Vẽ Tom and Jerry bằng...", lang: "PYTHON", date: "15/12/2025", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80" },
  { title: "Loopy đáng yêu", lang: "PYTHON", date: "10/12/2025", img: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&q=80" },
  { title: "I Love You 2d", lang: "HTML", date: "05/12/2025", img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&q=80" },
  { title: "Change Photo", lang: "HTML", date: "01/12/2025", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" },
  { title: "Baw chịu một chút màu mè...", lang: "HTML", date: "28/11/2025", img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80" },
  { title: "Web tỏ tình", lang: "HTML", date: "20/11/2025", img: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&q=80" }
];

// Danh sách logo ảnh thật các công nghệ / ngôn ngữ chuẩn Devicon SVG
const techLogoSources = [
  { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'NodeJS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Docker', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'CSharp', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { name: 'Go', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' }
];

export default function Home() {
  const [time, setTime] = useState('');
  const canvasRef = useRef(null);

  // Đồng hồ kỹ thuật số
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mô phỏng bể nước vật lý thực thể thời gian thực
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      initSprings();
    };
    window.addEventListener('resize', handleResize);

    // 1. CÁC ĐIỂM LÒ XO MẶT NƯỚC (SPRING MESH WATER)
    const springCount = 70;
    let springs = [];
    const tension = 0.025;
    const dampening = 0.025;
    const spread = 0.25;

    function initSprings() {
      springs = [];
      const baseHeight = height * 0.35; // Mực nước ở 35% chiều cao bể
      for (let i = 0; i < springCount; i++) {
        springs.push({
          x: (i / (springCount - 1)) * width,
          y: baseHeight,
          targetY: baseHeight,
          speed: 0
        });
      }
    }
    initSprings();

    function splash(index, speed) {
      if (index >= 0 && index < springs.length) {
        springs[index].speed = speed;
      }
    }

    // 2. TẢI ẢNH LOGO THẬT VÀ KHỞI TẠO CÁC THỰC THỂ LOGO BƠI LỘI TRONG BỂ
    const loadedLogos = techLogoSources.map(item => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = item.url;
      return { ...item, img, loaded: false };
    });

    loadedLogos.forEach(item => {
      item.img.onload = () => { item.loaded = true; };
    });

    // Thay thế đàn cá: Các logo ngôn ngữ bơi lội uốn lượn
    const techEntities = [
      { logoIndex: 0, x: 50, y: height * 0.55, vx: 1.2, size: 30, rot: 0, rotSpeed: 0.015 },
      { logoIndex: 1, x: 180, y: height * 0.72, vx: -1.0, size: 34, rot: 0, rotSpeed: -0.012 },
      { logoIndex: 2, x: 300, y: height * 0.45, vx: 0.9, size: 32, rot: 0, rotSpeed: 0.01 },
      { logoIndex: 3, x: 120, y: height * 0.85, vx: -0.8, size: 28, rot: 0, rotSpeed: -0.014 },
      { logoIndex: 4, x: 240, y: height * 0.65, vx: 1.1, size: 32, rot: 0, rotSpeed: 0.012 },
      { logoIndex: 5, x: 360, y: height * 0.78, vx: -0.85, size: 30, rot: 0, rotSpeed: -0.01 },
      { logoIndex: 6, x: 420, y: height * 0.50, vx: 0.95, size: 32, rot: 0, rotSpeed: 0.015 }
    ];

    // 3. KHỞI TẠO BỌT NƯỚC (BUBBLES)
    const bubbles = Array.from({ length: 22 }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 80,
      r: Math.random() * 3.5 + 1.5,
      speedY: Math.random() * 0.9 + 0.6,
      wobbleSpeed: Math.random() * 0.04 + 0.02,
      wobbleAmp: Math.random() * 1.4 + 0.6,
      seed: Math.random() * 100
    }));

    // 4. KHỞI TẠO RONG BIỂN ĐÁY BỂ (SEAWEEDS)
    const seaweeds = Array.from({ length: 8 }, (_, i) => ({
      baseX: 25 + i * (width / 9) + (Math.random() * 15 - 7),
      height: 60 + Math.random() * 35,
      swayOffset: Math.random() * Math.PI * 2,
      segments: 5
    }));

    let timeStep = 0;

    // VÒNG LẶP RENDER VẬT LÝ NƯỚC
    const render = () => {
      timeStep += 0.03;
      ctx.clearRect(0, 0, width, height);

      // A. Cập nhật lò xo mặt nước
      for (let i = 0; i < springs.length; i++) {
        const sp = springs[i];
        const delta = sp.targetY - sp.y;
        sp.speed += tension * delta - sp.speed * dampening;
        sp.y += sp.speed;
      }

      // Sóng tự tạo nhịp nhàng ngẫu nhiên
      if (Math.random() < 0.05) {
        const randIndex = Math.floor(Math.random() * springs.length);
        splash(randIndex, (Math.random() * 2.5 - 1.25));
      }

      // Lan truyền lực sóng sang hai bên
      const leftDeltas = new Array(springs.length).fill(0);
      const rightDeltas = new Array(springs.length).fill(0);
      for (let j = 0; j < 3; j++) {
        for (let i = 0; i < springs.length; i++) {
          if (i > 0) {
            leftDeltas[i] = spread * (springs[i].y - springs[i - 1].y);
            springs[i - 1].speed += leftDeltas[i];
          }
          if (i < springs.length - 1) {
            rightDeltas[i] = spread * (springs[i].y - springs[i + 1].y);
            springs[i + 1].speed += rightDeltas[i];
          }
        }
      }

      // B. Vẽ Khối nước chính & Độ dốc nước sâu (Deep Ocean Gradient)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(springs[0].x, springs[0].y);
      for (let i = 1; i < springs.length; i++) {
        const prev = springs[i - 1];
        const curr = springs[i];
        const midX = (prev.x + curr.x) / 2;
        const midY = (prev.y + curr.y) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
      }
      ctx.lineTo(springs[springs.length - 1].x, springs[springs.length - 1].y);
      ctx.lineTo(width, height);
      ctx.closePath();

      const waterGrad = ctx.createLinearGradient(0, height * 0.3, 0, height);
      waterGrad.addColorStop(0, 'rgba(14, 165, 233, 0.45)');
      waterGrad.addColorStop(0.3, 'rgba(2, 132, 199, 0.65)');
      waterGrad.addColorStop(1, 'rgba(3, 30, 60, 0.88)');
      ctx.fillStyle = waterGrad;
      ctx.fill();

      // C. Tia sáng mặt trời tán xạ qua nước (Sun Rays / Caustic Shafts)
      for (let r = 0; r < 4; r++) {
        const rayX = width * (0.2 + r * 0.22) + Math.sin(timeStep + r) * 25;
        const rayGrad = ctx.createLinearGradient(rayX, 0, rayX + 40, height);
        rayGrad.addColorStop(0, 'rgba(255, 255, 255, 0.16)');
        rayGrad.addColorStop(0.6, 'rgba(56, 189, 248, 0.04)');
        rayGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        ctx.moveTo(rayX - 10, springs[0].targetY);
        ctx.lineTo(rayX + 35, springs[0].targetY);
        ctx.lineTo(rayX + 85, height);
        ctx.lineTo(rayX - 55, height);
        ctx.closePath();
        ctx.fill();
      }

      // D. Vẽ Rong biển đung đưa đáy bể
      seaweeds.forEach(sw => {
        ctx.save();
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 4.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(sw.baseX, height);

        let currX = sw.baseX;
        let currY = height;
        const segLen = sw.height / sw.segments;

        for (let s = 1; s <= sw.segments; s++) {
          const sway = Math.sin(timeStep * 1.5 + sw.swayOffset + s * 0.4) * (s * 4);
          const nextX = sw.baseX + sway;
          const nextY = height - s * segLen;
          ctx.quadraticCurveTo(currX, currY, nextX, nextY);
          currX = nextX;
          currY = nextY;
        }
        ctx.stroke();
        ctx.restore();
      });

      // E. CẬP NHẬT VÀ VẼ LOGO NGÔN NGỮ THẬT BƠI LỘI DƯỚI NƯỚC
      techEntities.forEach(tech => {
        tech.x += tech.vx;
        tech.rot += tech.rotSpeed;
        const waveY = Math.sin(timeStep * 2.5 + tech.x * 0.03) * 6;
        const curY = tech.y + waveY;

        // Tự đổi hướng bơi khi ra khỏi mép bể
        if (tech.vx > 0 && tech.x > width + 40) {
          tech.x = -40;
          tech.y = height * (0.42 + Math.random() * 0.43);
        } else if (tech.vx < 0 && tech.x < -40) {
          tech.x = width + 40;
          tech.y = height * (0.42 + Math.random() * 0.43);
        }

        const logoData = loadedLogos[tech.logoIndex];
        if (logoData && logoData.loaded) {
          ctx.save();
          ctx.translate(tech.x, curY);
          ctx.rotate(tech.rot);

          // Vòng cầu bóng nước trong suốt bao quanh logo
          ctx.beginPath();
          ctx.arc(0, 0, tech.size * 0.68, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Bóng mờ phản xạ chiều sâu nước
          ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
          ctx.shadowBlur = 10;
          ctx.shadowOffsetY = 4;

          // Vẽ logo ảnh thật
          ctx.drawImage(
            logoData.img,
            -tech.size / 2,
            -tech.size / 2,
            tech.size,
            tech.size
          );

          ctx.restore();
        }
      });

      // F. Cập nhật và vẽ bọt nước sủi tăm
      bubbles.forEach(b => {
        b.y -= b.speedY;
        b.x += Math.sin(timeStep * 2 + b.seed) * b.wobbleAmp * 0.35;

        // Vẽ bong bóng phản quang
        ctx.save();
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Đốm sáng trên bong bóng
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
        ctx.restore();

        // Nổi lên tới mặt nước thì vỡ và tái sinh ở đáy
        const waterSurfaceY = springs[Math.floor((b.x / width) * (springs.length - 1))]?.y || height * 0.35;
        if (b.y <= waterSurfaceY) {
          b.y = height + Math.random() * 40;
          b.x = Math.random() * width;
        }
      });

      // G. Vẽ đường viền sáng óng ánh trên đỉnh mặt nước (Water Surface Foam)
      ctx.beginPath();
      ctx.moveTo(springs[0].x, springs[0].y);
      for (let i = 1; i < springs.length; i++) {
        const prev = springs[i - 1];
        const curr = springs[i];
        const midX = (prev.x + curr.x) / 2;
        const midY = (prev.y + curr.y) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
      }
      ctx.strokeStyle = 'rgba(224, 242, 254, 0.85)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Tương tác chạm hoặc rê chuột tạo sóng nước cuộn trào
    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const pointerX = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      const index = Math.floor((pointerX / width) * springs.length);
      splash(index, 7);
      if (index > 0) splash(index - 1, 4);
      if (index < springs.length - 1) splash(index + 1, 4);
    };

    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('touchmove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="layout-2col">
        {/* CỘT TRÁI */}
        <div className="col-main">
          <div className="hero-grid">
            {/* PROFILE CARD */}
            <div className="box profile-card" style={{ '--w': '100%', '--h': 'auto', '--r': '24px', '--tr': '20%' }}>
              <div className="circle-overlay"></div>
              <div className="profile-content">
                <div className="box avatar-box" style={{ '--w': '80px', '--h': '80px', '--r': '9999px', '--tr': '35%' }}>
                  <div className="circle-overlay"></div>
                  <img 
                    src="/teo.jpeg" 
                    alt="Avatar" 
                    className="avatar-img" 
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/80'; }} 
                  />
                </div>
                <div>
                  <h2 className="name">Teo Building Code</h2>
                  <p className="role">Software Engineer</p>
                </div>
                <div className="tag-row">
                  <span className="tag-badge">Designer</span>
                  <span className="tag-badge">Writer</span>
                  <span className="tag-badge">Developer</span>
                  <span className="tag-badge">Backend</span>
                </div>
                <div className="social-row">
                  <a href="https://github.com/Joinney" target="_blank" rel="noreferrer" className="box icon-btn" style={{ '--w': '36px', '--h': '36px', '--r': '9999px' }}>
                    <div className="circle-overlay"></div>
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/zvoduytoanz/" target="_blank" rel="noreferrer" className="box icon-btn" style={{ '--w': '36px', '--h': '36px', '--r': '9999px' }}>
                    <div className="circle-overlay"></div>
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="https://www.tiktok.com/@teohoclaptrinh" target="_blank" rel="noreferrer" className="box icon-btn" style={{ '--w': '36px', '--h': '36px', '--r': '9999px' }}>
                    <div className="circle-overlay"></div>
                    <i className="fab fa-tiktok"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* BỂ THỦY CUNG VẬT LÝ NƯỚC: LOGO CÔNG NGHỆ THẬT BƠI LỘI */}
            <div className="box live-aquarium-box" style={{ '--w': '100%', '--h': '100%', '--r': '24px', '--tr': '18%' }}>
              <div className="circle-overlay"></div>

              {/* Canvas hiển thị dòng nước lò xo, logo bơi và ánh sáng mặt trời */}
              <canvas ref={canvasRef} className="water-canvas"></canvas>

              {/* Lớp kính phản chiếu ánh sáng vát chéo */}
              <div className="glass-reflection-glare"></div>

              {/* Huy hiệu thông tin tương tác */}
              <div className="aquarium-badge">
                <i className="fas fa-water"></i>
                <span>Chạm / Rê chuột tạo sóng nước</span>
              </div>
            </div>
          </div>

          <div className="controls-row">
            <div className="pills-group">
              <div className="box pill-btn active" style={{ '--w': 'auto', '--h': '36px', '--r': '9999px' }}>
                <div className="circle-overlay"></div>
                <i className="fas fa-star" style={{ color: '#f59e0b' }}></i>
                <span>Nổi bật</span>
              </div>
              <div className="box pill-btn" style={{ '--w': 'auto', '--h': '36px', '--r': '9999px' }}>
                <div className="circle-overlay"></div>
                <span>Mới nhất</span>
              </div>
              <div className="box pill-btn" style={{ '--w': 'auto', '--h': '36px', '--r': '9999px' }}>
                <div className="circle-overlay"></div>
                <i className="fas fa-layer-group"></i>
                <span>Danh mục</span>
              </div>
              <div className="box pill-btn" style={{ '--w': 'auto', '--h': '36px', '--r': '9999px' }}>
                <div className="circle-overlay"></div>
                <span>&lt;/&gt; Ngôn ngữ</span>
              </div>
            </div>

            <div className="box clock-box" style={{ '--w': '160px', '--h': '38px', '--r': '9999px' }}>
              <div className="circle-overlay"></div>
              <span className="clock-text">{time}</span>
            </div>
          </div>

          <div className="box source-section" style={{ '--w': '100%', '--h': 'auto', '--r': '24px', '--tr': '20%' }}>
            <div className="circle-overlay"></div>
            
            <div className="source-header">
              <div className="source-title">MÃ NGUỒN</div>
              <div className="box search-mini-box" style={{ '--w': '200px', '--h': '32px', '--r': '9999px' }}>
                <div className="circle-overlay"></div>
                <input type="text" placeholder="Tìm kiếm source code..." />
                <i className="fas fa-search" style={{ zIndex: 10, color: '#64748b', fontSize: '11px' }}></i>
              </div>
            </div>

            <div className="grid-3x3">
              {sourceCodes.map((item, index) => (
                <div key={index} className="box code-card-glass" style={{ '--w': '100%', '--h': 'auto', '--r': '16px', '--tr': '15%' }}>
                  <div className="circle-overlay"></div>
                  <div className="card-thumb" style={{ zIndex: 10 }}>
                    <img src={item.img} alt={item.title} />
                    <span className="thumb-badge"><i className="fas fa-play" style={{ fontSize: '6px' }}></i> Video</span>
                    <span className="thumb-tech-icon">5</span>
                  </div>
                  <div className="card-title-text" style={{ zIndex: 10 }}>{item.title}</div>
                  <div className="card-meta" style={{ zIndex: 10 }}>
                    <span>{item.lang} • {item.date}</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <i className="fas fa-eye"></i>
                      <i className="fas fa-download"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pagination-row">
              <div className="box page-btn active" style={{ '--w': '26px', '--h': '26px', '--r': '9999px' }}><span style={{ zIndex: 10 }}>1</span></div>
              <div className="box page-btn" style={{ '--w': '26px', '--h': '26px', '--r': '9999px' }}><span style={{ zIndex: 10 }}>2</span></div>
              <div className="box page-btn" style={{ '--w': '26px', '--h': '26px', '--r': '9999px' }}><span style={{ zIndex: 10 }}>3</span></div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI */}
        <div className="col-side">
          <div className="box shorts-glass" style={{ '--w': '100%', '--h': 'auto', '--r': '24px', '--tr': '20%' }}>
            <div className="circle-overlay"></div>
            <div className="shorts-header">
              <i className="fab fa-tiktok" style={{ color: '#f43f5e' }}></i> Video ngắn
            </div>
            <div className="shorts-preview" style={{ zIndex: 10 }}>
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop" alt="Short preview" />
              <div className="shorts-caption">Cây Thông 🎄</div>
            </div>
          </div>

          <div className="box uptime-glass" style={{ '--w': '100%', '--h': 'auto', '--r': '20px', '--tr': '15%' }}>
            <div className="circle-overlay"></div>
            <div className="uptime-title">THỜI GIAN VẬN HÀNH</div>
            <div className="uptime-value">365 <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#64748b' }}>Ngày</span></div>
          </div>
        </div>
      </div>

      <style>{`
        /* ========================================================= */
        /* HỆ THỐNG KÍNH THỰC THỂ (GLASS SURFACE PRIMITIVE)          */
        /* ========================================================= */
        .box {
          --w: 100%;
          --h: auto;
          --r: 28px;
          --tr: 25%;
          z-index: 10;
          position: relative;
          width: var(--w);
          height: var(--h);
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: var(--r);
          border: 1px double rgba(255, 255, 255, 0.16);

          box-shadow:
              inset 2px -2px 1px -1px rgba(255, 255, 255, 0.5),
              inset -2px 2px 1px -1px rgba(255, 255, 255, 0.5),
              inset 6px -6px 2px -6px rgba(255, 255, 255, 0.3),
              inset -6px 6px 2px -6px rgba(255, 255, 255, 0.3),
              inset 0 0 3px rgba(0, 0, 0, 0.95),
              0 12px 35px rgba(0, 0, 0, 0.7);

          background: rgba(10, 16, 30, 0.82);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          overflow: hidden;
          transition: transform 0.2s ease, filter 0.2s ease, background-color 0.2s ease;
        }

        .box svg {
          filter: drop-shadow(0 20px 3px rgba(0, 0, 0, 0.3));
        }

        .box:before {
          content: '';
          position: absolute;
          z-index: 1;
          top: 35%;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 16px);
          height: calc(100% - 16px);
          border-radius: var(--r);
          border: 1px solid rgba(255, 255, 255, 0.18);
          filter: blur(8px);
          pointer-events: none;
        }

        .box:after {
          z-index: 1;
          content: '';
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border-radius: var(--r);
          filter: blur(2px);
          background: linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.22) 0%,
              transparent var(--tr),
              transparent calc(100% - var(--tr)),
              rgba(255, 255, 255, 0.15) 100%
          );
          pointer-events: none;
        }

        .box .circle-overlay {
          position: absolute;
          z-index: 1;
          inset: 4px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: var(--r);
          filter: blur(1px);
          pointer-events: none;
        }

        .pill-btn:hover,
        .code-card-glass:hover,
        .icon-btn:hover,
        .page-btn:hover {
          filter: brightness(1.08);
          transform: translateY(-2px);
          cursor: pointer;
        }

        /* BỐ CỤC 2 CỘT RỘNG RÃI */
        .layout-2col {
          display: grid;
          grid-template-columns: 2.3fr 1fr;
          gap: 1.5rem;
          width: 100%;
        }

        .col-main, .col-side {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
        }

        /* Hero Grid */
        .hero-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 1.5rem;
          width: 100%;
        }

        .profile-card {
          width: 100% !important;
          cursor: default;
          padding: 1.8rem 1.4rem;
          display: block;
        }

        .profile-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.9rem;
          text-align: center;
        }

        .avatar-box {
          cursor: default;
          overflow: hidden;
        }

        .avatar-img {
          width: calc(100% - 10px);
          height: calc(100% - 10px);
          border-radius: 50%;
          object-fit: cover;
          z-index: 2;
          background-color: #1e293b;
        }

        .name {
          font-size: 1.35rem;
          font-weight: 800;
          color: #fff;
        }

        .role {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 700;
          color: #38bdf8;
        }

        .tag-row {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .tag-badge {
          font-size: 0.68rem;
          padding: 3px 10px;
          border-radius: 9999px;
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #38bdf8;
        }

        .social-row {
          display: flex;
          justify-content: center;
          gap: 0.9rem;
          margin-top: 0.2rem;
        }

        .icon-btn i {
          z-index: 10;
          color: #94a3b8;
          font-size: 15px;
        }

        /* BỂ NƯỚC THỦY CUNG VẬT LÝ THỰC */
        .live-aquarium-box {
          width: 100% !important;
          min-height: 250px;
          position: relative;
          overflow: hidden;
          cursor: crosshair;
          background: #021226 !important;
        }

        .water-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 3;
        }

        .glass-reflection-glare {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.14) 0%,
            transparent 35%,
            transparent 70%,
            rgba(255, 255, 255, 0.05) 100%
          );
          pointer-events: none;
          z-index: 8;
        }

        .aquarium-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          background: rgba(3, 7, 18, 0.55);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #38bdf8;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
          pointer-events: none;
        }

        body.light-mode .aquarium-badge {
          background: rgba(255, 255, 255, 0.85);
          color: #ea580c;
          border-color: rgba(234, 88, 12, 0.35);
        }

        /* Controls & Clock */
        .controls-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          width: 100%;
        }

        .pills-group {
          display: flex;
          gap: 0.6rem;
        }

        .pill-btn {
          padding: 0 1.2rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: #cbd5e1;
          gap: 0.45rem;
        }
        .pill-btn span, .pill-btn i { z-index: 10; }
        .pill-btn.active {
          color: #fff;
          border-color: rgba(56, 189, 248, 0.5);
          background: rgba(255, 255, 255, 0.08);
        }

        .clock-box {
          cursor: default;
        }

        .clock-text {
          z-index: 10;
          font-family: 'DSEG7_Classic', monospace, sans-serif;
          font-size: 1.25rem;
          font-style: italic;
          font-weight: 700;
          color: #fff;
          letter-spacing: 2px;
        }

        /* Khối Mã Nguồn */
        .source-section {
          width: 100% !important;
          padding: 2rem !important;
          display: flex;
          flex-direction: column;
          gap: 1.5rem !important;
          cursor: default;
        }

        .source-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 10;
          width: 100%;
        }

        .source-title {
          font-size: 1.25rem;
          font-weight: 900;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          letter-spacing: 0.5px;
        }

        .source-title:before {
          content: '';
          width: 4px;
          height: 22px;
          background: #38bdf8;
          border-radius: 2px;
        }

        .search-mini-box {
          width: 250px !important;
          height: 38px !important;
          padding: 0 1rem;
          display: flex;
          align-items: center;
        }

        .search-mini-box input {
          background: transparent;
          border: none;
          outline: none;
          font-size: 0.85rem;
          width: 100%;
          color: #fff;
          z-index: 10;
        }

        /* Lưới 3x3 Cards */
        .grid-3x3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.2rem;
          z-index: 10;
          width: 100%;
        }

        .code-card-glass {
          width: 100% !important;
          padding: 0.85rem !important;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          border-radius: 20px !important;
        }

        .card-thumb {
          width: 100%;
          height: 140px;
          border-radius: 14px;
          overflow: hidden;
          position: relative;
          background: #0f172a;
        }

        .card-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .thumb-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(0, 0, 0, 0.7);
          font-size: 0.65rem;
          color: #fff;
          padding: 2px 8px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
          backdrop-filter: blur(4px);
        }

        .thumb-tech-icon {
          position: absolute;
          bottom: 8px;
          right: 8px;
          width: 22px;
          height: 22px;
          background: #e34f26;
          color: #fff;
          font-weight: 900;
          font-size: 10px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-title-text {
          font-size: 0.95rem;
          font-weight: 700;
          color: #f1f5f9;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0 2px;
        }

        .card-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 600;
          padding: 0 2px;
        }

        .card-meta i {
          cursor: pointer;
          font-size: 0.85rem;
          transition: color 0.2s ease;
        }

        .card-meta i:hover { color: #38bdf8; }

        /* Phân trang */
        .pagination-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          z-index: 10;
          margin-top: 0.8rem;
        }

        .page-btn {
          font-size: 0.8rem;
          font-weight: 800;
          color: #94a3b8;
        }

        .page-btn.active {
          background: #0284c7 !important;
          color: #fff !important;
        }

        /* Cột Phải */
        .shorts-glass {
          width: 100% !important;
          padding: 1.5rem !important;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          cursor: default;
        }

        .shorts-header {
          font-size: 0.95rem;
          font-weight: 800;
          color: #fff;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .shorts-preview {
          width: 100%;
          height: 480px;
          border-radius: 18px;
          overflow: hidden;
          position: relative;
          background: #020617;
        }

        .shorts-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.5;
        }

        .shorts-caption {
          position: absolute;
          bottom: 14px;
          left: 14px;
          font-size: 0.85rem;
          color: #fff;
          font-weight: 700;
        }

        .uptime-glass {
          width: 100% !important;
          padding: 1.2rem !important;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
          cursor: default;
        }

        .uptime-title {
          font-size: 0.7rem;
          letter-spacing: 1px;
          font-weight: 800;
          text-transform: uppercase;
          color: #64748b;
          z-index: 10;
        }

        .uptime-value {
          font-size: 1.6rem;
          font-weight: 900;
          color: #fff;
          z-index: 10;
        }

        /* LIGHT MODE */
        body.light-mode .box {
          border: 1px double rgba(51, 51, 51, 0.08) !important;
          box-shadow:
              inset 2px -2px 1px -1px rgba(255, 255, 255, 0.9),
              inset -2px 2px 1px -1px rgba(255, 255, 255, 0.9),
              inset 6px -6px 1px -6px rgba(255, 255, 255, 0.55),
              inset -6px 6px 1px -6px rgba(255, 255, 255, 0.55),
              inset 0 0 2px rgba(0, 0, 0, 0.8),
              0 4px 8px rgba(0, 0, 0, 0.2) !important;
          background: rgba(255, 255, 255, 0.04) !important;
          backdrop-filter: blur(2px) !important;
          -webkit-backdrop-filter: blur(2px) !important;
        }

        body.light-mode .box:before {
          border: 1px solid rgba(0, 0, 0, 0.9) !important;
          filter: blur(8px) !important;
        }

        body.light-mode .box:after {
          filter: blur(3px) !important;
          background: linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.8) 0%,
              transparent var(--tr),
              transparent calc(100% - var(--tr)),
              rgba(255, 255, 255, 0.8) 100%
          ) !important;
        }

        body.light-mode .box .circle-overlay {
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
        }

        body.light-mode .name,
        body.light-mode .source-title,
        body.light-mode .uptime-value,
        body.light-mode .card-title-text,
        body.light-mode .shorts-header,
        body.light-mode .clock-text,
        body.light-mode .search-mini-box input {
          color: #0f172a !important;
          filter: drop-shadow(0 20px 3px rgba(102, 102, 102, 0.15));
        }

        body.light-mode .source-title:before {
          background: #ea580c !important;
          box-shadow: 0 0 8px #ea580c !important;
        }

        body.light-mode .role {
          color: #ea580c !important;
        }

        body.light-mode .uptime-title,
        body.light-mode .card-meta,
        body.light-mode .pill-btn,
        body.light-mode .page-btn {
          color: #64748b !important;
        }

        body.light-mode .card-title-text:hover {
          color: #ea580c !important;
        }

        body.light-mode .card-meta i,
        body.light-mode .shorts-header i,
        body.light-mode .uptime-title i {
          color: #ea580c !important;
        }

        body.light-mode .avatar-img {
          filter: grayscale(20%);
        }

        body.light-mode .tag-badge {
          background: rgba(234, 88, 12, 0.12) !important;
          border-color: rgba(234, 88, 12, 0.35) !important;
          color: #ea580c !important;
        }

        body.light-mode .social-row .icon-btn i {
          color: #475569 !important;
        }
        body.light-mode .social-row .icon-btn:hover i {
          color: #ea580c !important;
        }

        body.light-mode .pill-btn:hover {
          color: #0f172a !important;
        }

        body.light-mode .pill-btn.active {
          color: #ea580c !important;
          border-color: rgba(234, 88, 12, 0.5) !important;
          background: rgba(234, 88, 12, 0.12) !important;
        }

        body.light-mode .pill-btn.active span,
        body.light-mode .pill-btn.active i {
          color: #ea580c !important;
        }

        body.light-mode .page-btn:hover {
          color: #0f172a !important;
        }

        body.light-mode .page-btn.active {
          background: #ea580c !important;
          border-color: #ea580c !important;
          color: #ffffff !important;
          box-shadow: 0 0 12px rgba(234, 88, 12, 0.35) !important;
        }

        body.light-mode .search-mini-box input::placeholder {
          color: #94a3b8 !important;
        }

        /* Responsive Tablet */
        @media (max-width: 1150px) {
          .layout-2col { grid-template-columns: 1fr; }
          .hero-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
          .grid-3x3 { grid-template-columns: 1fr; }
        }

        /* Responsive Mobile */
        @media (max-width: 640px) {
          .box {
            --r: 18px;
          }

          .hero-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .live-aquarium-box {
            min-height: 200px;
            max-height: 240px;
          }

          .profile-card {
            padding: 1.25rem 1rem !important;
          }

          .name {
            font-size: 1.15rem;
          }

          .controls-row {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
          }

          .pills-group {
            overflow-x: auto;
            padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .pills-group::-webkit-scrollbar {
            display: none;
          }

          .pill-btn {
            flex-shrink: 0;
            height: 36px !important;
            padding: 0 0.9rem;
          }

          .clock-box {
            width: 100% !important;
            height: 40px !important;
          }

          .clock-text {
            font-size: 1.05rem;
          }

          .source-section {
            padding: 1.1rem !important;
            gap: 1rem !important;
          }

          .source-header {
            flex-direction: column;
            align-items: stretch;
            gap: 0.8rem;
          }

          .source-title {
            font-size: 1.1rem;
          }

          .search-mini-box {
            width: 100% !important;
          }

          .grid-3x3 {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .card-thumb {
            height: 160px;
          }

          .shorts-glass {
            padding: 1rem !important;
          }

          .shorts-preview {
            height: 340px;
          }

          .uptime-value {
            font-size: 1.35rem;
          }
        }

        @media (max-width: 380px) {
          .box {
            --r: 14px;
          }

          .pagination-row {
            gap: 0.3rem;
            flex-wrap: wrap;
          }
          .page-btn {
            width: 30px !important;
            height: 30px !important;
            font-size: 0.75rem;
          }
        }
      `}</style>
    </>
  );
}