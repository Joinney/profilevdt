import React, { useEffect, useRef } from 'react';

/**
 * Hiệu ứng nhấp chuột sóng nước (Water Click Ripple & Droplets Splash)
 * - Tự động phát hiện vị trí nhấp chuột / chạm cảm ứng toàn màn hình
 * - Lan tỏa sóng nước đồng tâm (Concentric Ripples) & bắn các giọt nước phát sáng (Water Droplets)
 * - Tối ưu 60fps: Vòng lặp rAF tự ngủ khi không có sóng nước (Zero Idle CPU/GPU)
 */
export default function WaterClickEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const ripples = [];
    const droplets = [];
    let animationFrameId = null;

    class Ripple {
      constructor(x, y, maxRadius = 75, isSecondary = false) {
        this.x = x;
        this.y = y;
        this.radius = 4;
        this.maxRadius = maxRadius;
        this.alpha = isSecondary ? 0.7 : 0.95;
        this.speed = isSecondary ? 2.4 : 2.9;
        this.lineWidth = isSecondary ? 1.6 : 2.6;
        this.isSecondary = isSecondary;
      }

      update() {
        this.radius += this.speed;
        this.speed *= 0.96;
        const progress = this.radius / this.maxRadius;
        this.alpha = Math.max(0, (1 - progress) * (this.isSecondary ? 0.7 : 0.95));
        this.lineWidth = Math.max(0.5, (1 - progress) * (this.isSecondary ? 1.6 : 2.6));
      }

      draw(cxt, isLight) {
        if (this.alpha <= 0.01) return;
        cxt.save();
        cxt.beginPath();
        cxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        // Vành sóng khúc xạ nước xanh ngọc trong suốt
        cxt.strokeStyle = isLight
          ? `rgba(2, 132, 199, ${this.alpha})`
          : `rgba(56, 189, 248, ${this.alpha})`;
        cxt.lineWidth = this.lineWidth;
        cxt.stroke();

        // Vành sáng phản xạ viền ngoài của sóng nước
        cxt.beginPath();
        cxt.arc(this.x, this.y, Math.max(1, this.radius - 1.5), 0, Math.PI * 2);
        cxt.strokeStyle = isLight
          ? `rgba(14, 165, 233, ${this.alpha * 0.5})`
          : `rgba(255, 255, 255, ${this.alpha * 0.6})`;
        cxt.lineWidth = 0.9;
        cxt.stroke();

        cxt.restore();
      }
    }

    class Droplet {
      constructor(x, y, angle, speed) {
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - (1.2 + Math.random() * 1.5); // Bắn hơi vổng lên tạo cảm giác giọt nước nảy
        this.radius = 1.8 + Math.random() * 2.2;
        this.gravity = 0.16;
        this.friction = 0.95;
        this.alpha = 1.0;
        this.decay = 0.022 + Math.random() * 0.012;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.alpha -= this.decay;
      }

      draw(cxt, isLight) {
        if (this.alpha <= 0.01) return;
        cxt.save();
        cxt.globalAlpha = Math.max(0, this.alpha);

        // Thân giọt nước thủy tinh
        cxt.beginPath();
        cxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        cxt.fillStyle = isLight
          ? 'rgba(2, 132, 199, 0.75)'
          : 'rgba(56, 189, 248, 0.85)';
        cxt.fill();

        // Viền khúc xạ lấp lánh của giọt nước
        cxt.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        cxt.lineWidth = 0.8;
        cxt.stroke();

        // Đốm sáng phản chiếu giọt nước
        cxt.beginPath();
        cxt.arc(this.x - this.radius * 0.35, this.y - this.radius * 0.35, this.radius * 0.3, 0, Math.PI * 2);
        cxt.fillStyle = '#ffffff';
        cxt.fill();

        cxt.restore();
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.body.classList.contains('light-mode');

      // Cập nhật và vẽ các vòng sóng nước
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.update();
        rp.draw(ctx, isLight);
        if (rp.alpha <= 0.01 || rp.radius >= rp.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // Cập nhật và vẽ các giọt nước bắn tung tóe
      for (let i = droplets.length - 1; i >= 0; i--) {
        const dp = droplets[i];
        dp.update();
        dp.draw(ctx, isLight);
        if (dp.alpha <= 0.01) {
          droplets.splice(i, 1);
        }
      }

      // Nếu còn hiệu ứng thì tiếp tục vòng lặp; nếu hết thì tự ngắt để tiết kiệm 100% tài nguyên CPU/GPU
      if (ripples.length > 0 || droplets.length > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        animationFrameId = null;
        ctx.clearRect(0, 0, width, height);
      }
    };

    const triggerWaterSplash = (x, y) => {
      // 1. Tạo 2 vòng sóng nước gợn lan toả
      ripples.push(new Ripple(x, y, 78, false));
      setTimeout(() => {
        ripples.push(new Ripple(x, y, 52, true));
      }, 70);

      // 2. Tạo 8-10 giọt nước văng bắn tự nhiên
      const dropletCount = 8 + Math.floor(Math.random() * 4);
      for (let i = 0; i < dropletCount; i++) {
        const angle = (i / dropletCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.45;
        const speed = 2.4 + Math.random() * 3.8;
        droplets.push(new Droplet(x, y, angle, speed));
      }

      // Bắt đầu vòng lặp render nếu đang ngủ
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handlePointerDown = (e) => {
      // Lấy tọa độ con trỏ (hỗ trợ chuột, touch cảm ứng)
      const x = e.clientX;
      const y = e.clientY;
      if (typeof x === 'number' && typeof y === 'number') {
        triggerWaterSplash(x, y);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handlePointerDown);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      ctx.clearRect(0, 0, width, height);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 999998,
        display: 'block'
      }}
    />
  );
}
