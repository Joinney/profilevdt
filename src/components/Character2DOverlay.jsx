import React, { useEffect, useRef, useState, useCallback } from 'react';

const ACTION_CONFIG = {
  dung: { path: '/2dteovdt/dung/dung.png', loop: true, name: 'Đứng yên', scale: 1.0, feetY: 473 },
  di: { path: '/2dteovdt/di/di.png', loop: true, name: 'Đi bộ', scale: 0.86, feetY: 502 },
  chay: { path: '/2dteovdt/chay/chay.png', loop: true, name: 'Chạy nhanh', scale: 0.97, feetY: 477 },
  nhay: { path: '/2dteovdt/nhay/nhay.png', loop: false, name: 'Nhảy cao', scale: 1.04, feetY: 466 },
  danh: { path: '/2dteovdt/danh/danh.png', loop: false, name: 'Tấn công', scale: 1.00, feetY: 475 },
  ngoixuong: { path: '/2dteovdt/ngoixuong/ngoi_xuong.png', loop: true, name: 'Ngồi xuống', scale: 1.00, feetY: 476 },
  xinchao: { path: '/2dteovdt/xinchao/xinchao.png', loop: false, name: 'Xin chào', scale: 1.00, feetY: 472 },
  noichuyen: { path: '/2dteovdt/noichuyen/noichuyen.png', loop: false, name: 'Trò chuyện', scale: 1.00, feetY: 472 },
};

const QUOTES = [
  'Chào bạn! Mình là Tèo 2D, rất vui được đồng hành cùng bạn! 👋',
  'Nhấn nhẹ phím A/D để đi bộ, nhấn giữ hoặc Shift để chạy nhanh nhé! 🏃💨',
  'Full-Stack & Software Engineer - Yêu thích thiết kế Glassmorphism & AI! ✨',
  'Bấm phím Space hoặc W để cùng mình nhảy lên bồng bềnh nhé! 🚀',
  'Phím S để ngồi thư giãn, phím J để tung cú đấm tràn đầy năng lượng! 🥊',
  'Hãy khám phá các dự án công nghệ tuyệt vời trên website nhé! 💡',
  'Chúc bạn một ngày học tập và làm việc ngập tràn niềm vui! 🌟'
];

export default function Character2DOverlay({ 
  theme = 'dark',
  isVisible = true,
  setIsVisible,
  showKeyGuide = false,
  setShowKeyGuide,
  showTouchPad = false,
  setShowTouchPad
}) {
  const canvasRef = useRef(null);
  const imagesRef = useRef({});
  const loadedCountRef = useRef(0);

  const [internalVisible, setInternalVisible] = useState(true);
  const visible = typeof setIsVisible === 'function' ? isVisible : internalVisible;

  const [internalKeyGuide, setInternalKeyGuide] = useState(false);
  const isKeyGuide = typeof setShowKeyGuide === 'function' ? showKeyGuide : internalKeyGuide;
  const setKeyGuide = typeof setShowKeyGuide === 'function' ? setShowKeyGuide : setInternalKeyGuide;

  const [internalTouchPad, setInternalTouchPad] = useState(false);
  const isTouchPad = typeof setShowTouchPad === 'function' ? showTouchPad : internalTouchPad;

  const [touchSprint, setTouchSprint] = useState(false);
  const [speechText, setSpeechText] = useState('Chào bạn! Dùng phím A, D, W, S, J, H, T để điều khiển mình nhé! 🎮');
  const [showSpeech, setShowSpeech] = useState(true);

  // Vị trí và vận tốc (dùng ref để animation loop 60fps mượt mà)
  const stateRef = useRef({
    x: 80,
    y: 0, // Độ cao nhảy (0 là mặt đất, âm là bay lên)
    vy: 0, // Vận tốc nhảy
    isJumping: false,
    isSitting: false,
    facingLeft: false,
    currentAction: 'dung',
    frameIndex: 0,
    lastFrameTime: 0,
    moveStartTime: 0,
    touchSprint: false,
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

  // Kích hoạt nhảy (êm ái, bồng bềnh ~1 giây trên không)
  const triggerJump = useCallback(() => {
    const s = stateRef.current;
    if (s.isJumping) return;
    s.isJumping = true;
    s.vy = -8.5; // Lực nhảy êm ái
    if (!s.lockedAction) {
      s.currentAction = 'nhay';
      s.frameIndex = 0;
      s.lastFrameTime = performance.now();
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

      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key) || e.key === ' ') {
        e.preventDefault();
      }

      // Nhận diện phím Shift (hoặc e.shiftKey)
      if (e.shiftKey || key === 'ShiftLeft' || key === 'ShiftRight') {
        s.keys.shift = true;
      }

      if (key === 'ArrowLeft' || key === 'KeyA') {
        s.isSitting = false;
        if (!s.keys.left) {
          s.keys.left = true;
          s.moveStartTime = performance.now();
        }
        s.facingLeft = true;
      } else if (key === 'ArrowRight' || key === 'KeyD') {
        s.isSitting = false;
        if (!s.keys.right) {
          s.keys.right = true;
          s.moveStartTime = performance.now();
        }
        s.facingLeft = false;
      } else if (key === 'ArrowDown' || key === 'KeyS') {
        if (!s.isJumping && !s.lockedAction) {
          if (s.isSitting || s.currentAction === 'ngoixuong') {
            // Đang ngồi mà bấm S -> đứng lên
            s.isSitting = false;
            s.currentAction = 'dung';
            s.frameIndex = 0;
          } else {
            // Ngồi xuống và dừng lại giữ nguyên tư thế ngồi
            s.isSitting = true;
            s.currentAction = 'ngoixuong';
            s.frameIndex = 0;
          }
        }
      } else if (key === 'Space' || e.key === ' ' || key === 'ArrowUp' || key === 'KeyW') {
        s.isSitting = false;
        e.preventDefault();
        triggerJump();
      } else if (key === 'KeyJ' || key === 'KeyF' || key === 'KeyZ') {
        s.isSitting = false;
        e.preventDefault();
        triggerAction('danh', 'Hi-ya! Đấm một cú tràn đầy năng lượng! 🥊💥');
      } else if (key === 'KeyH' || key === 'KeyE') {
        s.isSitting = false;
        e.preventDefault();
        triggerAction('xinchao', 'Xin chào mọi người! Chúc bạn ngày mới tốt lành! 👋✨');
      } else if (key === 'KeyT' || key === 'KeyC') {
        s.isSitting = false;
        e.preventDefault();
        const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        triggerAction('noichuyen', randomQuote);
      }
    };

    const handleKeyUp = (e) => {
      const s = stateRef.current;
      const key = e.code;

      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key) || e.key === ' ') {
        e.preventDefault();
      }

      if (!e.shiftKey) {
        s.keys.shift = false;
      }
      if (key === 'ShiftLeft' || key === 'ShiftRight') {
        s.keys.shift = false;
      }

      if (key === 'ArrowLeft' || key === 'KeyA') {
        s.keys.left = false;
        if (!s.keys.right) s.moveStartTime = 0;
      } else if (key === 'ArrowRight' || key === 'KeyD') {
        s.keys.right = false;
        if (!s.keys.left) s.moveStartTime = 0;
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
      if (!s.isSitting && s.lockedAction !== 'ngoixuong') {
        const isMoving = (s.keys.left && !s.keys.right) || (s.keys.right && !s.keys.left);
        const moveDuration = isMoving && s.moveStartTime ? (now - s.moveStartTime) : 0;
        
        // Chạy nhanh khi: giữ Shift, hoặc nút chạy cảm ứng bật, hoặc giữ phím di chuyển liên tục >= 350ms
        const isRunning = isMoving && (s.keys.shift || s.touchSprint || moveDuration >= 350);
        
        // Tốc độ: Đi bộ thong thả 1.8px/frame (~108px/s); Chạy nhanh 3.6px/frame (~216px/s)
        const speed = isRunning ? 3.6 : 1.8;

        if (s.keys.left && !s.keys.right) {
          s.x = Math.max(10, s.x - speed);
          s.facingLeft = true;
          if (!s.isJumping && !s.lockedAction) {
            s.currentAction = isRunning ? 'chay' : 'di';
          }
        } else if (s.keys.right && !s.keys.left) {
          s.x = Math.min(containerWidth - charWidth - 10, s.x + speed);
          s.facingLeft = false;
          if (!s.isJumping && !s.lockedAction) {
            s.currentAction = isRunning ? 'chay' : 'di';
          }
        } else if (!s.isJumping && !s.lockedAction && !s.isSitting) {
          s.currentAction = 'dung';
          s.moveStartTime = 0;
        }
      }

      // 4.2. Cập nhật vật lý nhảy
      if (s.isJumping) {
        s.y += s.vy;
        s.vy += 0.28; // Trọng lực nhẹ nhàng, thời gian trên không ~1.0 giây
        if (s.y >= 0) {
          s.y = 0;
          s.vy = 0;
          s.isJumping = false;
          if (!s.lockedAction) {
            const isMoving = (s.keys.left && !s.keys.right) || (s.keys.right && !s.keys.left);
            const moveDuration = isMoving && s.moveStartTime ? (now - s.moveStartTime) : 0;
            const isRunning = isMoving && (s.keys.shift || s.touchSprint || moveDuration >= 350);
            s.currentAction = isMoving ? (isRunning ? 'chay' : 'di') : 'dung';
            s.frameIndex = 0;
          }
        }
      }

      // 4.3. Cập nhật frame hoạt họa
      // Nhảy 25 frame trong ~1000ms => 40ms/frame
      // Chạy nhanh dứt khoát => 52ms/frame
      // Đi bộ thong thả nhịp nhàng => 80ms/frame
      const frameDuration = s.currentAction === 'nhay' ? 40 : (s.currentAction === 'chay' ? 52 : 80);
      if (!s.lastFrameTime || now - s.lastFrameTime >= frameDuration) {
        s.lastFrameTime = now;

        if (s.currentAction === 'ngoixuong') {
          // Khi ngồi xuống: chuyển từ đứng xuống ngồi và DỪNG LẠI GIỮ NGUYÊN tư thế ngồi ở frame 24
          if (s.frameIndex < 24) {
            s.frameIndex += 1;
          } else {
            s.frameIndex = 24;
          }
        } else {
          s.frameIndex += 1;
          if (s.frameIndex >= 25) {
            if (s.lockedAction) {
              s.lockedAction = null;
              s.frameIndex = 0;
              if (s.isSitting) {
                s.currentAction = 'ngoixuong';
                s.frameIndex = 24;
              } else if (s.keys.left || s.keys.right) {
                const moveDuration = s.moveStartTime ? (now - s.moveStartTime) : 0;
                const isRunning = s.keys.shift || s.touchSprint || moveDuration >= 350;
                s.currentAction = isRunning ? 'chay' : 'di';
              } else {
                s.currentAction = 'dung';
              }
            } else {
              s.frameIndex = 0;
            }
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
      {visible && (
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

      {/* BẢNG HƯỚNG DẪN PHÍM BẤM */}
      {isKeyGuide && (
        <div className="box teo-keyguide-popup" style={{ '--w': '310px', '--h': 'auto', '--r': '20px' }}>
          <div className="circle-overlay"></div>
          <div className="keyguide-header">
            <span className="keyguide-title">
              <i className="fas fa-gamepad"></i> PHÍM ĐIỀU KHIỂN TÈO 2D
            </span>
            <button className="keyguide-close" onClick={() => setKeyGuide(false)}>&times;</button>
          </div>

          <div className="keyguide-list">
            <div className="keyguide-row">
              <span className="key-badge">A / ◄</span>
              <span className="key-badge">D / ►</span>
              <span className="key-desc">Đi bộ (nhấn nhẹ) / Chạy (giữ phím)</span>
            </div>
            <div className="keyguide-row">
              <span className="key-badge">Shift + A / D</span>
              <span className="key-desc">Chạy nhanh tốc lực tức thì ⚡</span>
            </div>
            <div className="keyguide-row">
              <span className="key-badge">Space / W / ▲</span>
              <span className="key-desc">Nhảy cao bồng bềnh êm ái</span>
            </div>
            <div className="keyguide-row">
              <span className="key-badge">S / ▼</span>
              <span className="key-desc">Ngồi xuống (giữ tư thế / đứng dậy)</span>
            </div>
            <div className="keyguide-row">
              <span className="key-badge">J / F</span>
              <span className="key-desc">Đấm / Tấn công 🥊</span>
            </div>
            <div className="keyguide-row">
              <span className="key-badge">H</span>
              <span className="key-desc">Vẫy tay xin chào 👋</span>
            </div>
            <div className="keyguide-row">
              <span className="key-badge">T</span>
              <span className="key-desc">Trò chuyện phát biểu 💬</span>
            </div>
          </div>
        </div>
      )}

      {/* BÀN PHÍM ẢO / TOUCH PAD CHO ĐIỆN THOẠI & CHUỘT */}
      {isTouchPad && visible && (
          <div className="box teo-touchpad-dock" style={{ '--w': 'auto', '--h': 'auto', '--r': '22px' }}>
            <div className="circle-overlay"></div>
            
            {/* Phím di chuyển Trái / Phải */}
            <div className="touch-group">
              <button
                className="touch-btn"
                onPointerDown={() => {
                  const s = stateRef.current;
                  s.isSitting = false;
                  s.keys.left = true;
                  s.facingLeft = true;
                  if (!s.moveStartTime) s.moveStartTime = performance.now();
                }}
                onPointerUp={() => {
                  const s = stateRef.current;
                  s.keys.left = false;
                  if (!s.keys.right) s.moveStartTime = 0;
                }}
                onPointerLeave={() => {
                  const s = stateRef.current;
                  s.keys.left = false;
                  if (!s.keys.right) s.moveStartTime = 0;
                }}
                title="Đi trái (giữ để chạy)"
              >
                ◀
              </button>
              <button
                className="touch-btn"
                onPointerDown={() => {
                  const s = stateRef.current;
                  s.isSitting = false;
                  s.keys.right = true;
                  s.facingLeft = false;
                  if (!s.moveStartTime) s.moveStartTime = performance.now();
                }}
                onPointerUp={() => {
                  const s = stateRef.current;
                  s.keys.right = false;
                  if (!s.keys.left) s.moveStartTime = 0;
                }}
                onPointerLeave={() => {
                  const s = stateRef.current;
                  s.keys.right = false;
                  if (!s.keys.left) s.moveStartTime = 0;
                }}
                title="Đi phải (giữ để chạy)"
              >
                ▶
              </button>
            </div>

            {/* Phím hành động */}
            <div className="touch-group">
              <button
                className={`touch-btn ${touchSprint ? 'active' : ''}`}
                onClick={() => {
                  setTouchSprint(prev => {
                    const next = !prev;
                    stateRef.current.touchSprint = next;
                    return next;
                  });
                }}
                title="Chạy nhanh (Bật/Tắt)"
              >
                🏃
              </button>
              <button
                className="touch-btn"
                onClick={() => {
                  stateRef.current.isSitting = false;
                  triggerJump();
                }}
                title="Nhảy lên"
              >
                ▲
              </button>
              <button
                className="touch-btn"
                onClick={() => {
                  const s = stateRef.current;
                  if (s.isSitting || s.currentAction === 'ngoixuong') {
                    s.isSitting = false;
                    s.currentAction = 'dung';
                    s.frameIndex = 0;
                  } else {
                    s.isSitting = true;
                    s.currentAction = 'ngoixuong';
                    s.frameIndex = 0;
                  }
                }}
                title="Ngồi xuống / Đứng lên"
              >
                ▼
              </button>
              <button
                className="touch-btn touch-btn-action"
                onClick={() => {
                  stateRef.current.isSitting = false;
                  triggerAction('danh', 'Hi-ya! Một cú đấm sấm sét! 🥊💥');
                }}
                title="Đấm"
              >
                🥊
              </button>
              <button
                className="touch-btn touch-btn-action"
                onClick={() => {
                  stateRef.current.isSitting = false;
                  triggerAction('xinchao', 'Xin chào bạn nhé! Chúc ngày mới vui vẻ! 👋✨');
                }}
                title="Vẫy tay chào"
              >
                👋
              </button>
              <button
                className="touch-btn touch-btn-action"
                onClick={() => {
                  stateRef.current.isSitting = false;
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

        /* POPUP HƯỚNG DẪN PHÍM BẤM */
        .teo-keyguide-popup {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 10003;
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
          .teo-keyguide-popup {
            right: 12px;
            left: 12px;
            bottom: 16px;
            --w: auto !important;
            width: auto !important;
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
