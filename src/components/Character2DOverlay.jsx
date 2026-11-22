import React, { useEffect, useRef, useState, useCallback } from 'react';

const ACTION_CONFIG = {
  dung: { path: '/2dteovdt/dung/dung.png', loop: true, name: 'Đứng yên', scale: 1.0, feetY: 474 },
  di: { path: '/2dteovdt/di/di.png', loop: true, name: 'Đi bộ', scale: 0.83, feetY: 504 },
  chay: { path: '/2dteovdt/chay/chay.png', loop: true, name: 'Chạy nhanh', scale: 0.70, feetY: 482 },
  nhay: { path: '/2dteovdt/nhay/nhay.png', loop: false, name: 'Nhảy cao', scale: 1.0, feetY: 474 },
  danh: { path: '/2dteovdt/danh/danh.png', loop: false, name: 'Tấn công', scale: 0.71, feetY: 477 },
  ngoixuong: { path: '/2dteovdt/ngoixuong/ngoi_xuong.png', loop: true, name: 'Ngồi xuống', scale: 0.92, feetY: 476 },
  xinchao: { path: '/2dteovdt/xinchao/xinchao.png', loop: false, name: 'Xin chào', scale: 1.0, feetY: 473 },
  noichuyen: { path: '/2dteovdt/noichuyen/noichuyen.png', loop: false, name: 'Trò chuyện', scale: 1.0, feetY: 473 },
};

const QUOTES = [
  'Chào bạn! Mình là Tèo 2D, rất vui được đồng hành cùng bạn! 👋',
  'Bạn có thể dùng các phím A, D, W, S, J, H, T để điều khiển mình nhé! 🎮',
  'Full-Stack & Software Engineer - Yêu thích thiết kế Glassmorphism & AI! ✨',
  'Giữ phím Shift + A/D để chạy nhanh hết tốc lực nào! ⚡',
  'Bấm phím Space hoặc W để cùng mình nhảy lên nhé! 🚀',
  'Hãy khám phá các dự án công nghệ tuyệt vời trên website nhé! 💡',
  'Chúc bạn một ngày học tập và làm việc ngập tràn niềm vui! 🌟'
];

export default function Character2DOverlay({ theme = 'dark' }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef({});
  const loadedCountRef = useRef(0);

  // Trạng thái nhân vật
  const [isVisible, setIsVisible] = useState(true);
  const [showKeyGuide, setShowKeyGuide] = useState(false);
  const [showTouchPad, setShowTouchPad] = useState(false);
  const [speechText, setSpeechText] = useState('Chào bạn! Dùng phím A, D, W, S, J, H, T để điều khiển mình nhé! 🎮');
  const [showSpeech, setShowSpeech] = useState(true);

  // Vị trí và vận tốc (dùng ref để animation loop 60fps mượt mà)
  const stateRef = useRef({
    x: 80,
    y: 0, // Độ cao nhảy (0 là mặt đất, âm là bay lên)
    vy: 0, // Vận tốc nhảy
    isJumping: false,
    facingLeft: false,
    currentAction: 'dung',
    frameIndex: 0,
    lastFrameTime: 0,
    keys: {
      left: false,
      right: false,
      shift: false,
      crouch: false
    },
    lockedAction: null, // Hành động khóa (danh, xinchao, noichuyen...)
    quoteTimer: null
  });

  // Tự ẩn bong bóng thoại sau vài giây
  const triggerSpeech = useCallback((text) => {
    setSpeechText(text);
    setShowSpeech(true);
    if (stateRef.current.quoteTimer) clearTimeout(stateRef.current.quoteTimer);
    stateRef.current.quoteTimer = setTimeout(() => {
      setShowSpeech(false);
    }, 4500);
  }, []);

  // 1. Tải trước các sprite sheet PNG
  useEffect(() => {
    Object.entries(ACTION_CONFIG).forEach(([action, config]) => {
      const img = new Image();
      img.src = config.path;
      img.onload = () => {
        imagesRef.current[action] = img;
        loadedCountRef.current += 1;
      };
    });

    const initTimer = setTimeout(() => {
      triggerSpeech('Chào mừng bạn đến với Website Võ Duy Toàn! Bấm A, D, W, S, J, H, T nhé! ✨');
    }, 1500);

    return () => clearTimeout(initTimer);
  }, [triggerSpeech]);

  // 2. Kích hoạt hành động có thời hạn (danh, xinchao, noichuyen, nhay)
  const triggerAction = useCallback((actionName, quote) => {
    const s = stateRef.current;
    if (s.lockedAction === actionName) return;

    s.lockedAction = actionName;
    s.currentAction = actionName;
    s.frameIndex = 0;

    if (quote) {
      triggerSpeech(quote);
    }
  }, [triggerSpeech]);

  // Kích hoạt nhảy
  const triggerJump = useCallback(() => {
    const s = stateRef.current;
    if (s.isJumping) return;
    s.isJumping = true;
    s.vy = -13.5; // Lực nhảy
    if (!s.lockedAction) {
      s.currentAction = 'nhay';
      s.frameIndex = 0;
    }
  }, []);

  // 3. Xử lý bàn phím máy tính
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Bỏ qua nếu đang gõ trong input, textarea
      const target = e.target;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      const s = stateRef.current;
      const key = e.code;

      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
        e.preventDefault();
      }

      if (key === 'ArrowLeft' || key === 'KeyA') {
        s.keys.left = true;
        s.facingLeft = true;
      } else if (key === 'ArrowRight' || key === 'KeyD') {
        s.keys.right = true;
        s.facingLeft = false;
      } else if (key === 'ShiftLeft' || key === 'ShiftRight') {
        s.keys.shift = true;
      } else if (key === 'ArrowDown' || key === 'KeyS') {
        s.keys.crouch = true;
        if (!s.isJumping && !s.lockedAction) {
          s.currentAction = 'ngoixuong';
        }
      } else if (key === 'Space' || key === 'ArrowUp' || key === 'KeyW') {
        e.preventDefault();
        triggerJump();
      } else if (key === 'KeyJ' || key === 'KeyF' || key === 'KeyZ') {
        e.preventDefault();
        triggerAction('danh', 'Hi-ya! Đấm một cú tràn đầy năng lượng! 🥊💥');
      } else if (key === 'KeyH' || key === 'KeyE') {
        e.preventDefault();
        triggerAction('xinchao', 'Xin chào mọi người! Chúc bạn ngày mới tốt lành! 👋✨');
      } else if (key === 'KeyT' || key === 'KeyC') {
        e.preventDefault();
        const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        triggerAction('noichuyen', randomQuote);
      }
    };

    const handleKeyUp = (e) => {
      const s = stateRef.current;
      const key = e.code;

      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
        e.preventDefault();
      }

      if (key === 'ArrowLeft' || key === 'KeyA') {
        s.keys.left = false;
      } else if (key === 'ArrowRight' || key === 'KeyD') {
        s.keys.right = false;
      } else if (key === 'ShiftLeft' || key === 'ShiftRight') {
        s.keys.shift = false;
      } else if (key === 'ArrowDown' || key === 'KeyS') {
        s.keys.crouch = false;
        if (s.currentAction === 'ngoixuong') {
          s.currentAction = 'dung';
          s.frameIndex = 0;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [triggerAction, triggerJump]);

  // 4. Vòng lặp vật lý & Animation 60FPS
  useEffect(() => {
    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const updateLoop = (now) => {
      animId = requestAnimationFrame(updateLoop);

      const s = stateRef.current;
      const containerWidth = window.innerWidth;
      const charWidth = 120;

      // 4.1. Cập nhật vị trí di chuyển ngang
      if (!s.keys.crouch && s.lockedAction !== 'ngoixuong') {
        const speed = s.keys.shift ? 6.5 : 3.5;
        if (s.keys.left && !s.keys.right) {
          s.x = Math.max(10, s.x - speed);
          s.facingLeft = true;
          if (!s.isJumping && !s.lockedAction) {
            s.currentAction = s.keys.shift ? 'chay' : 'di';
          }
        } else if (s.keys.right && !s.keys.left) {
          s.x = Math.min(containerWidth - charWidth - 10, s.x + speed);
          s.facingLeft = false;
          if (!s.isJumping && !s.lockedAction) {
            s.currentAction = s.keys.shift ? 'chay' : 'di';
          }
        } else if (!s.isJumping && !s.lockedAction && !s.keys.crouch) {
          s.currentAction = 'dung';
        }
      }

      // 4.2. Cập nhật vật lý nhảy
      if (s.isJumping) {
        s.y += s.vy;
        s.vy += 0.65; // Trọng lực
        if (s.y >= 0) {
          s.y = 0;
          s.vy = 0;
          s.isJumping = false;
          if (!s.lockedAction) {
            s.currentAction = s.keys.left || s.keys.right ? (s.keys.shift ? 'chay' : 'di') : 'dung';
            s.frameIndex = 0;
          }
        }
      }

      // 4.3. Cập nhật frame hoạt họa (80ms/frame, 25 frame)
      const frameDuration = s.currentAction === 'chay' ? 55 : 80;
      if (!s.lastFrameTime || now - s.lastFrameTime >= frameDuration) {
        s.lastFrameTime = now;
        s.frameIndex += 1;

        if (s.frameIndex >= 25) {
          if (s.lockedAction) {
            s.lockedAction = null;
            s.frameIndex = 0;
            if (s.keys.crouch) {
              s.currentAction = 'ngoixuong';
            } else if (s.keys.left || s.keys.right) {
              s.currentAction = s.keys.shift ? 'chay' : 'di';
            } else {
              s.currentAction = 'dung';
            }
          } else {
            s.frameIndex = 0;
          }
        }
      }

      // 4.4. Vẽ sprite lên canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const action = s.currentAction || 'dung';
      const config = ACTION_CONFIG[action] || ACTION_CONFIG['dung'];
      const img = imagesRef.current[action] || imagesRef.current['dung'];

      if (img && img.complete) {
        const col = s.frameIndex % 5;
        const row = Math.floor(s.frameIndex / 5);
        const sx = col * 512;
        const sy = row * 512;

        // Chuẩn hóa tỷ lệ và căn chuẩn mặt đất (ground anchor) để các động tác bằng kích thước nhau
        const groundY = canvas.height * (474 / 512);
        const scale = config.scale || 1.0;
        const feetY = config.feetY || 474;

        const drawW = canvas.width * scale;
        const drawH = canvas.height * scale;
        const drawX = (canvas.width - drawW) / 2;
        const drawY = groundY - drawH * (feetY / 512);

        ctx.save();
        // Sprite gốc quay mặt sang trái, nên khi hướng sang phải (!s.facingLeft) cần lật ảnh sang phải
        if (!s.facingLeft) {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        }

        ctx.drawImage(img, sx, sy, 512, 512, drawX, drawY, drawW, drawH);
        ctx.restore();
      }

      // 4.5. Di chuyển phần tử wrapper theo s.x và s.y
      const wrap = document.getElementById('teo-2d-sprite-wrap');
      if (wrap) {
        wrap.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
      }
    };

    animId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <>
      {/* VÙNG NHÂN VẬT 2D DI CHUYỂN TRÊN MÀN HÌNH */}
      {isVisible && (
        <div id="teo-2d-sprite-wrap" className="teo-2d-companion">
          {/* Bong bóng hội thoại */}
          {showSpeech && (
            <div className="box teo-speech-bubble" style={{ '--w': 'auto', '--h': 'auto', '--r': '16px' }}>
              <div className="circle-overlay"></div>
              <span className="speech-text">{speechText}</span>
              <button
                className="speech-close-btn"
                onClick={() => setShowSpeech(false)}
                title="Đóng thoại"
              >
                &times;
              </button>
              <div className="speech-arrow"></div>
            </div>
          )}

          {/* Vùng đổ bóng dưới chân nhân vật */}
          <div className="teo-character-shadow"></div>

          {/* Canvas vẽ Sprite 25 frames */}
          <canvas
            ref={canvasRef}
            width={130}
            height={130}
            className="teo-sprite-canvas"
            onClick={() => {
              const quotes = [
                'Chào bạn! Mình có thể đi, chạy, nhảy, đấm, chào và trò chuyện đấy! 🎮',
                'Bấm phím J hoặc F để xem mình ra đòn nhé! 🥊',
                'Bấm phím H để mình vẫy tay chào bạn nè! 👋',
                'Bấm phím Space để xem mình nhảy cao nhé! 🚀'
              ];
              triggerAction('xinchao', quotes[Math.floor(Math.random() * quotes.length)]);
            }}
            title="Nhấp vào để Tèo vẫy tay chào bạn!"
          ></canvas>
        </div>
      )}

      {/* THANH ĐIỀU KHIỂN & HƯỚNG DẪN NỔI (BOTTOM DOCK) */}
      <div className="teo-dock-panel">
        <div className="box teo-control-pill" style={{ '--w': 'auto', '--h': '38px', '--r': '9999px' }}>
          <div className="circle-overlay"></div>
          
          <button
            className="teo-pill-btn teo-avatar-badge"
            onClick={() => setIsVisible(prev => !prev)}
            title={isVisible ? 'Ẩn nhân vật 2D' : 'Hiện nhân vật 2D'}
          >
            <span className="teo-badge-dot"></span>
            <span>{isVisible ? 'Tèo 2D: Bật' : 'Tèo 2D: Tắt'}</span>
          </button>

          <button
            className={`teo-pill-btn ${showKeyGuide ? 'active' : ''}`}
            onClick={() => setShowKeyGuide(prev => !prev)}
            title="Xem phím điều khiển nhân vật"
          >
            <i className="fas fa-keyboard"></i>
            <span className="hide-on-xs">Phím điều khiển</span>
          </button>

          <button
            className={`teo-pill-btn ${showTouchPad ? 'active' : ''}`}
            onClick={() => setShowTouchPad(prev => !prev)}
            title="Bật/Tắt tay cầm ảo trên màn hình"
          >
            <i className="fas fa-gamepad"></i>
            <span className="hide-on-xs">Tay cầm ảo</span>
          </button>
        </div>

        {/* BẢNG HƯỚNG DẪN PHÍM BẤM */}
        {showKeyGuide && (
          <div className="box teo-keyguide-popup" style={{ '--w': '310px', '--h': 'auto', '--r': '20px' }}>
            <div className="circle-overlay"></div>
            <div className="keyguide-header">
              <span className="keyguide-title">
                <i className="fas fa-gamepad"></i> PHÍM ĐIỀU KHIỂN TÈO 2D
              </span>
              <button className="keyguide-close" onClick={() => setShowKeyGuide(false)}>&times;</button>
            </div>

            <div className="keyguide-list">
              <div className="keyguide-row">
                <span className="key-badge">A / ◄</span>
                <span className="key-badge">D / ►</span>
                <span className="key-desc">Đi bộ trái / phải</span>
              </div>
              <div className="keyguide-row">
                <span className="key-badge">Shift + A / D</span>
                <span className="key-desc">Chạy nhanh tốc lực</span>
              </div>
              <div className="keyguide-row">
                <span className="key-badge">Space / W / ▲</span>
                <span className="key-desc">Nhảy cao</span>
              </div>
              <div className="keyguide-row">
                <span className="key-badge">S / ▼</span>
                <span className="key-desc">Ngồi xuống</span>
              </div>
              <div className="keyguide-row">
                <span className="key-badge">J / F</span>
                <span className="key-desc">Đấm / Tấn công</span>
              </div>
              <div className="keyguide-row">
                <span className="key-badge">H</span>
                <span className="key-desc">Vẫy tay xin chào</span>
              </div>
              <div className="keyguide-row">
                <span className="key-badge">T</span>
                <span className="key-desc">Trò chuyện phát biểu</span>
              </div>
            </div>
          </div>
        )}

        {/* BÀN PHÍM ẢO / TOUCH PAD CHO ĐIỆN THOẠI & CHUỘT */}
        {showTouchPad && isVisible && (
          <div className="box teo-touchpad-dock" style={{ '--w': 'auto', '--h': 'auto', '--r': '22px' }}>
            <div className="circle-overlay"></div>
            
            {/* Phím di chuyển Trái / Phải */}
            <div className="touch-group">
              <button
                className="touch-btn"
                onPointerDown={() => { stateRef.current.keys.left = true; stateRef.current.facingLeft = true; }}
                onPointerUp={() => { stateRef.current.keys.left = false; }}
                onPointerLeave={() => { stateRef.current.keys.left = false; }}
                title="Đi trái"
              >
                ◀
              </button>
              <button
                className="touch-btn"
                onPointerDown={() => { stateRef.current.keys.right = true; stateRef.current.facingLeft = false; }}
                onPointerUp={() => { stateRef.current.keys.right = false; }}
                onPointerLeave={() => { stateRef.current.keys.right = false; }}
                title="Đi phải"
              >
                ▶
              </button>
            </div>

            {/* Phím hành động */}
            <div className="touch-group">
              <button
                className={`touch-btn ${stateRef.current.keys.shift ? 'active' : ''}`}
                onClick={() => {
                  stateRef.current.keys.shift = !stateRef.current.keys.shift;
                }}
                title="Chạy nhanh"
              >
                🏃
              </button>
              <button
                className="touch-btn"
                onClick={triggerJump}
                title="Nhảy lên"
              >
                ▲
              </button>
              <button
                className="touch-btn"
                onPointerDown={() => {
                  stateRef.current.keys.crouch = true;
                  stateRef.current.currentAction = 'ngoixuong';
                }}
                onPointerUp={() => {
                  stateRef.current.keys.crouch = false;
                  stateRef.current.currentAction = 'dung';
                }}
                onPointerLeave={() => {
                  stateRef.current.keys.crouch = false;
                  stateRef.current.currentAction = 'dung';
                }}
                title="Ngồi xuống"
              >
                ▼
              </button>
              <button
                className="touch-btn touch-btn-action"
                onClick={() => triggerAction('danh', 'Hi-ya! Một cú đấm sấm sét! 🥊💥')}
                title="Đấm"
              >
                🥊
              </button>
              <button
                className="touch-btn touch-btn-action"
                onClick={() => triggerAction('xinchao', 'Xin chào bạn nhé! Chúc ngày mới vui vẻ! 👋✨')}
                title="Vẫy tay chào"
              >
                👋
              </button>
              <button
                className="touch-btn touch-btn-action"
                onClick={() => {
                  const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
                  triggerAction('noichuyen', q);
                }}
                title="Trò chuyện"
              >
                💬
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        /* KHỐI NHÂN VẬT 2D DI CHUYỂN */
        .teo-2d-companion {
          position: fixed;
          bottom: 24px;
          left: 0;
          z-index: 999;
          pointer-events: auto;
          will-change: transform;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .teo-sprite-canvas {
          display: block;
          width: 130px;
          height: 130px;
          cursor: pointer;
          filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.45));
          transition: filter 0.2s ease;
        }

        .teo-sprite-canvas:hover {
          filter: drop-shadow(0 8px 20px rgba(56, 189, 248, 0.6));
        }

        /* Bóng tiếp đất */
        .teo-character-shadow {
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 70px;
          height: 14px;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.55) 0%, transparent 75%);
          border-radius: 50%;
          pointer-events: none;
          z-index: -1;
        }

        /* BONG BÓNG HỘI THOẠI */
        .teo-speech-bubble {
          position: absolute;
          bottom: 125px;
          left: 50%;
          transform: translateX(-50%);
          max-width: 260px;
          min-width: 180px;
          padding: 8px 14px;
          font-size: 0.8rem;
          line-height: 1.35;
          color: #f8fafc;
          text-align: center;
          white-space: normal;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.45), 0 0 16px rgba(56, 189, 248, 0.35) !important;
          animation: popBubble 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          pointer-events: auto;
          z-index: 1000;
        }

        body.light-mode .teo-speech-bubble {
          color: #0f172a !important;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15), 0 0 12px rgba(2, 132, 199, 0.25) !important;
        }

        .speech-close-btn {
          position: absolute;
          top: 2px;
          right: 6px;
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.9rem;
          cursor: pointer;
          line-height: 1;
        }

        .speech-close-btn:hover {
          color: #ef4444;
        }

        .speech-arrow {
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 12px;
          height: 12px;
          background: var(--glass-bg);
          border-right: 1px solid var(--glass-border);
          border-bottom: 1px solid var(--glass-border);
        }

        @keyframes popBubble {
          0% { transform: translateX(-50%) scale(0.7); opacity: 0; }
          100% { transform: translateX(-50%) scale(1); opacity: 1; }
        }

        /* THANH ĐIỀU KHIỂN & HƯỚNG DẪN NỔI */
        .teo-dock-panel {
          position: fixed;
          bottom: 20px;
          right: 24px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          pointer-events: auto;
        }

        .teo-control-pill {
          padding: 4px 8px;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4) !important;
        }

        .teo-pill-btn {
          background: transparent;
          border: none;
          color: var(--text-heading);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          padding: 4px 10px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          position: relative;
          z-index: 2;
        }

        .teo-pill-btn:hover {
          background: rgba(56, 189, 248, 0.18);
          color: #38bdf8;
        }

        .teo-pill-btn.active {
          background: rgba(56, 189, 248, 0.25);
          color: #38bdf8;
        }

        .teo-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
          animation: dotBlink 1.5s infinite;
        }

        @keyframes dotBlink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        /* POPUP HƯỚNG DẪN PHÍM BẤM */
        .teo-keyguide-popup {
          padding: 14px 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5) !important;
          animation: popBubble 0.25s ease;
        }

        .keyguide-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 6px;
          position: relative;
          z-index: 2;
        }

        .keyguide-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: #38bdf8;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .keyguide-close {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 1.1rem;
          cursor: pointer;
        }

        .keyguide-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          position: relative;
          z-index: 2;
        }

        .keyguide-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
        }

        .key-badge {
          background: rgba(56, 189, 248, 0.16);
          border: 1px solid rgba(56, 189, 248, 0.35);
          color: #38bdf8;
          padding: 2px 6px;
          border-radius: 5px;
          font-family: monospace, sans-serif;
          font-weight: bold;
          font-size: 0.72rem;
        }

        .key-desc {
          color: var(--text-body);
        }

        /* TAY CẦM ẢO CHO CẢM ỨNG & MOBILE */
        .teo-touchpad-dock {
          padding: 8px 12px;
          display: flex;
          gap: 12px;
          align-items: center;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5) !important;
          animation: popBubble 0.25s ease;
        }

        .touch-group {
          display: flex;
          gap: 6px;
          position: relative;
          z-index: 2;
        }

        .touch-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          font-size: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          user-select: none;
          touch-action: manipulation;
          transition: all 0.15s ease;
        }

        .touch-btn:active, .touch-btn.active {
          background: rgba(56, 189, 248, 0.35);
          border-color: #38bdf8;
          transform: scale(0.92);
        }

        .touch-btn-action {
          font-size: 1.1rem;
        }

        @media (max-width: 640px) {
          .hide-on-xs {
            display: none;
          }
          .teo-dock-panel {
            right: 12px;
            bottom: 12px;
          }
          .teo-sprite-canvas {
            width: 100px;
            height: 100px;
          }
          .teo-speech-bubble {
            bottom: 95px;
            max-width: 220px;
            font-size: 0.72rem;
          }
          .touch-btn {
            width: 32px;
            height: 32px;
            font-size: 0.88rem;
          }
        }
      `}</style>
    </>
  );
}
