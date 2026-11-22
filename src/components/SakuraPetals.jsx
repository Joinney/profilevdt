import React, { useEffect, useRef, useState } from 'react';

export default function SakuraPetals({ isEnabled = true }) {
  const canvasRef = useRef(null);
  const animFrameIdRef = useRef(null);

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

    const FLOWER_COUNT = 20; // 20 cánh hoa rơi nhẹ nhàng, tối ưu tải GPU mượt mà 60fps
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
      if (!isRunning || document.hidden) {
        animFrameIdRef.current = null;
        return;
      }
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < sakuraList.length; i++) {
        sakuraList[i].update();
        sakuraList[i].draw(ctx);
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    const handleVisibility = () => {
      if (!document.hidden && isRunning && !animFrameIdRef.current) {
        animFrameIdRef.current = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

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
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      ctx.clearRect(0, 0, width, height);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
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
  );
}
