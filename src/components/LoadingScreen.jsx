import React, { useState, useEffect } from 'react';

export default function LoadingScreen({ onFinish, theme }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Đang khởi tạo hệ thống...');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const statuses = [
      { at: 20, text: 'Đang tải tài nguyên giao diện 3D...' },
      { at: 50, text: 'Khởi chạy môi trường kính Glassmorphism...' },
      { at: 75, text: 'Đồng bộ hóa dữ liệu và công cụ...' },
      { at: 95, text: 'Hệ thống sẵn sàng chào đón bạn!' },
    ];

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              if (onFinish) onFinish();
            }, 550);
          }, 350);
          return 100;
        }

        const step = Math.floor(Math.random() * 7) + 5;
        const next = Math.min(100, prev + step);

        const found = statuses.find(s => next >= s.at && prev < s.at);
        if (found) {
          setStatusText(found.text);
        }

        return next;
      });
    }, 65);

    return () => clearInterval(interval);
  }, [onFinish]);

  const handleSkip = () => {
    setProgress(100);
    setIsFadingOut(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 250);
  };

  const isLight = theme === 'light';

  return (
    <div className={`loading-screen-overlay ${isFadingOut ? 'fade-out' : ''} ${isLight ? 'light' : ''}`}>
      {/* Vòng nền gradient phản quang */}
      <div className="loading-bg-glow"></div>

      {/* Khung kính trung tâm */}
      <div className="box loading-card-glass" style={{ '--w': '420px', '--h': 'auto', '--r': '30px', '--tr': '20%' }}>
        <div className="circle-overlay"></div>

        {/* Tia quét laser Hologram */}
        <div className="loading-laser-beam"></div>

        <div className="loading-card-content">
          {/* Avatar với vòng quỹ đạo xoay công nghệ */}
          <div className="loading-avatar-portal">
            <div className="portal-ring portal-ring-outer"></div>
            <div className="portal-ring portal-ring-inner"></div>
            <div className="portal-glow-core"></div>
            
            <div className="avatar-img-circle">
              <img 
                src="/teo.jpeg" 
                alt="Võ Duy Toàn" 
                onError={(e) => { e.target.src = '/teoproject.png'; }}
              />
            </div>
          </div>

          {/* Tên & chức danh */}
          <div className="loading-brand">
            <h1 className="loading-name">VÕ DUY TOÀN</h1>
            <p className="loading-role">SOFTWARE ENGINEER & DEVELOPER</p>
          </div>

          {/* Thanh phần trăm và tiến trình */}
          <div className="loading-progress-block">
            <div className="progress-info-row">
              <span className="status-label">
                <span className="pulsing-radar-dot"></span>
                {statusText}
              </span>
              <span className="percent-text">{progress}%</span>
            </div>

            <div className="progress-bar-track">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progress}%` }}
              >
                <div className="progress-bar-sheen"></div>
              </div>
            </div>
          </div>

          {/* Nút bỏ qua vào thẳng */}
          <button 
            className="loading-skip-btn"
            onClick={handleSkip}
            title="Nhấn để vào trang ngay"
          >
            <span>Bỏ qua</span>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <style>{`
        .loading-screen-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #030712;
          padding: 1.5rem;
          opacity: 1;
          visibility: visible;
          transition: opacity 0.55s ease, transform 0.55s ease, visibility 0.55s ease;
          overflow: hidden;
        }

        .loading-screen-overlay.fade-out {
          opacity: 0;
          transform: scale(1.04);
          visibility: hidden;
          pointer-events: none;
        }

        /* Nền phát sáng */
        .loading-bg-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, transparent 65%);
          filter: blur(40px);
          pointer-events: none;
          animation: pulseGlow 4s ease-in-out infinite alternate;
        }

        @keyframes pulseGlow {
          0% { transform: scale(0.9); opacity: 0.6; }
          100% { transform: scale(1.15); opacity: 0.95; }
        }

        /* Thẻ kính trung tâm */
        .loading-card-glass {
          max-width: 440px;
          padding: 2.2rem 2rem !important;
          cursor: default;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7) !important;
        }

        .loading-card-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          gap: 1.4rem;
          text-align: center;
        }

        /* Avatar Portal */
        .loading-avatar-portal {
          position: relative;
          width: 120px;
          height: 120px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .portal-ring {
          position: absolute;
          border-radius: 50%;
        }

        .portal-ring-outer {
          width: 120px;
          height: 120px;
          border: 2px dashed rgba(56, 189, 248, 0.5);
          animation: spinOuter 10s linear infinite;
        }

        .portal-ring-inner {
          width: 104px;
          height: 104px;
          border: 1px solid rgba(56, 189, 248, 0.35);
          animation: spinInner 6s linear infinite;
        }

        .portal-glow-core {
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, transparent 70%);
          filter: blur(10px);
        }

        @keyframes spinOuter {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spinInner {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        .avatar-img-circle {
          position: relative;
          z-index: 10;
          width: 84px;
          height: 84px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 0 16px rgba(56, 189, 248, 0.4);
        }

        .avatar-img-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Tên & chức danh */
        .loading-brand {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .loading-name {
          font-size: 1.35rem;
          font-weight: 900;
          letter-spacing: 1.5px;
          color: #ffffff;
          margin: 0;
          text-shadow: 0 0 12px rgba(56, 189, 248, 0.5);
        }

        .loading-role {
          font-size: 0.74rem;
          font-weight: 700;
          color: #38bdf8;
          letter-spacing: 1px;
          margin: 0;
        }

        /* Thanh tiến trình */
        .loading-progress-block {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .progress-info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.76rem;
          width: 100%;
        }

        .status-label {
          color: #94a3b8;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .pulsing-radar-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 8px #38bdf8;
          animation: radarPulse 1.4s infinite;
        }

        @keyframes radarPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.7); }
        }

        .percent-text {
          font-family: monospace;
          font-size: 0.85rem;
          font-weight: 800;
          color: #38bdf8;
        }

        .progress-bar-track {
          width: 100%;
          height: 7px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 9999px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #0284c7, #38bdf8);
          border-radius: 9999px;
          box-shadow: 0 0 14px rgba(56, 189, 248, 0.6);
          transition: width 0.15s ease-out;
          position: relative;
          overflow: hidden;
        }

        .progress-bar-sheen {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
          animation: sheenSlide 1.5s infinite;
        }

        @keyframes sheenSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* Laser beam */
        .loading-laser-beam {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.7), transparent);
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
          animation: laserScan 3s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes laserScan {
          0%, 100% { top: 5%; opacity: 0.2; }
          50% { top: 95%; opacity: 0.7; }
        }

        /* Nút bỏ qua */
        .loading-skip-btn {
          background: transparent;
          border: none;
          color: #64748b;
          font-size: 0.74rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 9999px;
          transition: color 0.2s, background 0.2s;
        }

        .loading-skip-btn:hover {
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.1);
        }

        /* ========================================================= */
        /* LIGHT MODE CỦA LOADING SCREEN                             */
        /* ========================================================= */
        .loading-screen-overlay.light {
          background: #f1f5f9;
        }

        .loading-screen-overlay.light .loading-bg-glow {
          background: radial-gradient(circle, rgba(234, 88, 12, 0.18) 0%, transparent 65%);
        }

        .loading-screen-overlay.light .loading-card-glass {
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.08) !important;
        }

        .loading-screen-overlay.light .loading-name {
          color: #0f172a;
          text-shadow: none;
        }

        .loading-screen-overlay.light .loading-role,
        .loading-screen-overlay.light .percent-text {
          color: #ea580c;
        }

        .loading-screen-overlay.light .portal-ring-outer {
          border-color: rgba(234, 88, 12, 0.45);
        }

        .loading-screen-overlay.light .portal-ring-inner {
          border-color: rgba(234, 88, 12, 0.3);
        }

        .loading-screen-overlay.light .portal-glow-core {
          background: radial-gradient(circle, rgba(234, 88, 12, 0.35) 0%, transparent 70%);
        }

        .loading-screen-overlay.light .avatar-img-circle {
          box-shadow: 0 0 16px rgba(234, 88, 12, 0.35);
        }

        .loading-screen-overlay.light .pulsing-radar-dot {
          background: #ea580c;
          box-shadow: 0 0 8px #ea580c;
        }

        .loading-screen-overlay.light .progress-bar-track {
          background: rgba(0, 0, 0, 0.06);
          border-color: rgba(0, 0, 0, 0.1);
        }

        .loading-screen-overlay.light .progress-bar-fill {
          background: linear-gradient(90deg, #f97316, #ea580c);
          box-shadow: 0 0 14px rgba(234, 88, 12, 0.5);
        }

        .loading-screen-overlay.light .loading-laser-beam {
          background: linear-gradient(90deg, transparent, rgba(234, 88, 12, 0.7), transparent);
          box-shadow: 0 0 10px rgba(234, 88, 12, 0.5);
        }

        .loading-screen-overlay.light .loading-skip-btn:hover {
          color: #ea580c;
          background: rgba(234, 88, 12, 0.1);
        }
      `}</style>
    </div>
  );
}
