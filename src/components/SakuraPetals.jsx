import React, { useEffect, useRef, useState } from 'react';

export default function SakuraPetals() {
  const [isEnabled, setIsEnabled] = useState(() => {
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem('sakura_enabled');
    return saved !== null ? saved === 'true' : true;
  });

  const canvasRef = useRef(null);
  const animFrameIdRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('sakura_enabled', isEnabled);
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled) {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const img = new Image();
    img.src = '/sakura_petal.png';

    function getRandom(option) {
      let ret, random;
      switch (option) {
        case 'x':
          ret = Math.random() * width;
          break;
        case 'y':
          ret = Math.random() * height;
          break;
        case 's':
          ret = 0.4 + Math.random() * 0.7; // Tỉ lệ kích thước cánh hoa
          break;
        case 'r':
          ret = Math.random() * Math.PI * 2; // Góc xoay
          break;
        case 'fnx':
          random = -0.5 + Math.random() * 1;
          ret = function (x) {
            return x + 0.5 * random - 1.2; // Độ trôi gió ngang
          };
          break;
        case 'fny':
          random = 1.2 + Math.random() * 0.8;
          ret = function (y) {
            return y + random; // Tốc độ rơi xuống
          };
          break;
        case 'fnr':
          random = (Math.random() - 0.5) * 0.03;
          ret = function (r) {
            return r + random; // Tốc độ xoay
          };
          break;
        default:
          ret = 0;
      }
      return ret;
    }

    class Sakura {
      constructor(x, y, s, r, fn) {
        this.x = x;
        this.y = y;
        this.s = s;
        this.r = r;
        this.fn = fn;
      }

      draw(cxt) {
        cxt.save();
        const baseSize = 36 * this.s;
        cxt.translate(this.x, this.y);
        cxt.rotate(this.r);
        cxt.drawImage(img, -baseSize / 2, -baseSize / 2, baseSize, baseSize);
        cxt.restore();
      }

      update() {
        this.x = this.fn.x(this.x);
        this.y = this.fn.y(this.y);
        this.r = this.fn.r(this.r);

        // Khi cánh hoa bay ra ngoài màn hình, sinh lại ngẫu nhiên ở đỉnh hoặc cạnh phải
        if (this.x > width + 50 || this.x < -50 || this.y > height + 50) {
          this.r = getRandom('r');
          if (Math.random() > 0.35) {
            this.x = getRandom('x');
            this.y = -40;
            this.s = getRandom('s');
          } else {
            this.x = width + 40;
            this.y = getRandom('y') * 0.5;
            this.s = getRandom('s');
          }
        }
      }
    }

    const FLOWER_COUNT = 38; // Số lượng cánh hoa rơi tối ưu 60fps
    const sakuraList = [];

    const initSakuras = () => {
      sakuraList.length = 0;
      for (let i = 0; i < FLOWER_COUNT; i++) {
        const x = getRandom('x');
        const y = getRandom('y');
        const s = getRandom('s');
        const r = getRandom('r');
        const fnx = getRandom('fnx');
        const fny = getRandom('fny');
        const fnr = getRandom('fnr');

        const sakura = new Sakura(x, y, s, r, {
          x: fnx,
          y: fny,
          r: fnr,
        });
        sakuraList.push(sakura);
      }
    };

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < sakuraList.length; i++) {
        sakuraList[i].update();
        sakuraList[i].draw(ctx);
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    img.onload = () => {
      initSakuras();
      render();
    };

    if (img.complete) {
      initSakuras();
      render();
    }

    return () => {
      isRunning = false;
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      ctx.clearRect(0, 0, width, height);
    };
  }, [isEnabled]);

  return (
    <>
      {/* Canvas cánh hoa anh đào rơi toàn màn hình */}
      {isEnabled && (
        <canvas
          id="canvas_sakura"
          ref={canvasRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 9998,
          }}
        />
      )}

      {/* Nút bật/tắt hiệu ứng hoa rơi phong cách Glassmorphism */}
      <button
        type="button"
        className={`sakura-toggle-pill ${isEnabled ? 'active' : ''}`}
        onClick={() => setIsEnabled(!isEnabled)}
        title={isEnabled ? 'Tắt hiệu ứng hoa anh đào rơi' : 'Bật hiệu ứng hoa anh đào rơi'}
      >
        <span className="sakura-icon">🌸</span>
        <span className="sakura-label">{isEnabled ? 'Hoa rơi: Bật' : 'Hoa rơi: Tắt'}</span>
      </button>

      <style>{`
        .sakura-toggle-pill {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 9999px;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #f1f5f9;
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background 0.25s, border-color 0.25s;
        }

        body.light-mode .sakura-toggle-pill {
          background: rgba(255, 255, 255, 0.75);
          color: #0f172a;
          border-color: rgba(0, 0, 0, 0.15);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        }

        .sakura-toggle-pill:hover {
          transform: translateY(-3px) scale(1.05);
          border-color: #f472b6;
          box-shadow: 0 10px 28px rgba(244, 114, 182, 0.35);
        }

        .sakura-toggle-pill.active {
          border-color: rgba(244, 114, 182, 0.6);
        }

        .sakura-toggle-pill .sakura-icon {
          font-size: 0.95rem;
          display: inline-block;
          animation: sakuraWiggle 4s ease-in-out infinite;
        }

        @keyframes sakuraWiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(12deg); }
          75% { transform: rotate(-12deg); }
        }

        .sakura-label {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          letter-spacing: 0.3px;
        }

        @media (max-width: 768px) {
          .sakura-toggle-pill {
            bottom: 16px;
            left: 16px;
            padding: 6px 12px;
            font-size: 0.7rem;
          }
        }
      `}</style>
    </>
  );
}
