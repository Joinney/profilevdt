import React, { useState } from 'react';

export default function Footer({ theme }) {
  const [isOpen, setIsOpen] = useState(false);
  const isLight = theme === 'light';

  // Hệ màu theo Theme
  const headingColor = isLight ? '#0f172a' : '#ffffff';
  const textColor = isLight ? '#475569' : '#94a3b8';
  const accentColor = isLight ? '#ea580c' : '#38bdf8';

  return (
    <>
      <footer className="footer-wrapper">
        {/* NÚT MỞ RỘNG (CHEVRON BUTTON) */}
        <button
          className="box footer-toggle-btn"
          style={{ '--w': '44px', '--h': '26px', '--r': '14px 14px 0 0', '--tr': '10%' }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Thu gọn footer" : "Mở rộng thông tin footer"}
          title={isOpen ? "Đóng thông tin" : "Xem thêm thông tin liên hệ"}
        >
          <div className="circle-overlay"></div>
          <i
            className={`fas fa-chevron-${isOpen ? 'down' : 'up'}`}
            style={{ color: accentColor, zIndex: 10, fontSize: '11px', transition: 'transform 0.3s ease' }}
          ></i>
        </button>

        {/* KHỐI KÍNH FOOTER CHÍNH */}
        <div
          className={`box footer-main-card ${isOpen ? 'is-expanded' : ''}`}
          style={{
            '--w': '100%',
            '--h': 'auto',
            '--r': '26px',
            '--tr': '15%'
          }}
        >
          <div className="circle-overlay"></div>

          {/* 1. NỘI DUNG MỞ RỘNG (3 CỘT NHƯ ẢNH MẪU) */}
          <div className={`footer-expanded-content ${isOpen ? 'show' : ''}`}>
            {/* Cột 1: Thông tin liên hệ */}
            <div className="footer-col">
              <h4 className="col-title" style={{ color: headingColor }}>THÔNG TIN LIÊN HỆ</h4>
              <div className="contact-list">
                <a href="mailto:voduyduydlk@gmail.com" className="contact-item" style={{ color: textColor }}>
                  <i className="fas fa-envelope" style={{ color: accentColor }}></i>
                  <span>voduyduydlk@gmail.com</span>
                </a>
                <a href="tel:+84979758744" className="contact-item" style={{ color: textColor }}>
                  <i className="fas fa-phone" style={{ color: accentColor }}></i>
                  <span>+84 979 758 744</span>
                </a>
              </div>
            </div>

            {/* Cột 2: Công nghệ */}
            <div className="footer-col">
              <h4 className="col-title" style={{ color: headingColor }}>CÔNG NGHỆ</h4>
              <div className="tech-tags-flow">
                {['HTML5', 'Tailwind', 'React', 'Node.js', 'Docker'].map((tech, idx) => (
                  <span
                    key={idx}
                    className="box tech-badge-pill"
                    style={{ '--w': 'auto', '--h': '30px', '--r': '9999px', '--tr': '15%' }}
                  >
                    <div className="circle-overlay"></div>
                    <span style={{ color: headingColor, zIndex: 10, fontSize: '0.75rem', fontWeight: 600 }}>
                      {tech}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            {/* Cột 3: Newsletter */}
            <div className="footer-col">
              <h4 className="col-title" style={{ color: headingColor }}>NEWSLETTER</h4>
              <form className="newsletter-box" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Email của bạn..."
                  style={{
                    color: headingColor,
                    borderColor: isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)'
                  }}
                />
                <button
                  type="submit"
                  className="newsletter-send-btn"
                  style={{ background: accentColor }}
                  title="Gửi"
                >
                  <i className="fas fa-paper-plane" style={{ color: '#fff', fontSize: '11px' }}></i>
                </button>
              </form>
            </div>
          </div>

          {/* 2. THANH BẢN QUYỀN MẶC ĐỊNH (BOTTOM BAR) */}
          <div className="footer-bottom-bar" style={{ borderTopColor: isOpen ? (isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)') : 'transparent' }}>
            <div className="footer-copyright" style={{ color: textColor }}>
              <strong style={{ color: headingColor }}>TEO BUILDING CODE</strong> | © 2026 Designed by Võ Duy Toàn
            </div>

            <div className="footer-social-links">
              <a href="https://www.tiktok.com/@teohoclaptrinh" target="_blank" rel="noreferrer" aria-label="TikTok" style={{ color: textColor }}>
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="https://www.linkedin.com/in/zvoduytoanz/" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ color: textColor }}>
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/Joinney" target="_blank" rel="noreferrer" aria-label="GitHub" style={{ color: textColor }}>
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .footer-wrapper {
          position: relative;
          width: 100%;
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Nút vòm bật mở */
        .footer-toggle-btn {
          position: absolute;
          top: -25px;
          cursor: pointer;
          border-bottom: none !important;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-main-card {
          width: 100% !important;
          flex-direction: column !important;
          align-items: stretch !important;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Phần thông tin mở rộng 3 cột */
        .footer-expanded-content {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.35s ease, padding 0.35s ease;
          display: grid;
          grid-template-columns: 1.2fr 1fr 1.3fr;
          gap: 2rem;
          width: 100%;
          box-sizing: border-box;
          z-index: 10;
        }

        .footer-expanded-content.show {
          max-height: 220px;
          opacity: 1;
          padding: 2.2rem 2.2rem 1.4rem 2.2rem;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }

        .col-title {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          margin: 0;
        }

        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.84rem;
          font-weight: 500;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        .contact-item:hover {
          opacity: 0.8;
        }

        /* Tags công nghệ */
        .tech-tags-flow {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-badge-pill {
          padding: 0 0.9rem !important;
          cursor: default;
        }

        /* Input Newsletter */
        .newsletter-box {
          position: relative;
          width: 100%;
          max-width: 320px;
          display: flex;
          align-items: center;
        }

        .newsletter-box input {
          width: 100%;
          height: 38px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid;
          border-radius: 9999px;
          padding: 0 42px 0 1rem;
          font-size: 0.82rem;
          outline: none;
          box-sizing: border-box;
          backdrop-filter: blur(8px);
        }

        .newsletter-send-btn {
          position: absolute;
          right: 4px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .newsletter-send-btn:hover {
          transform: scale(1.06);
          opacity: 0.9;
        }

        /* Thanh Footer phía dưới */
        .footer-bottom-bar {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 52px;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid transparent;
          transition: border-color 0.3s ease;
          box-sizing: border-box;
        }

        .footer-copyright {
          font-size: 0.82rem;
          font-weight: 500;
        }

        .footer-copyright strong {
          letter-spacing: 0.5px;
          font-weight: 800;
        }

        .footer-social-links {
          display: flex;
          gap: 1.4rem;
          align-items: center;
        }

        .footer-social-links a {
          font-size: 1rem;
          text-decoration: none;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .footer-social-links a:hover {
          transform: translateY(-2px);
          opacity: 0.85;
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .footer-expanded-content {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .footer-expanded-content.show {
            max-height: 500px;
            padding: 1.8rem 1.4rem 1.2rem 1.4rem;
          }
        }

        @media (max-width: 640px) {
          .footer-bottom-bar {
            height: auto;
            min-height: 54px;
            padding: 0.9rem 1rem;
            flex-direction: column-reverse;
            gap: 0.65rem;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}