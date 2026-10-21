import React from 'react';

export default function Footer() {
  return (
    <>
      <footer className="footer-container">
        <div className="box footer-box" style={{ '--w': '100%', '--h': '46px', '--r': '23px', '--tr': '10%' }}>
          <div className="circle-overlay"></div>
          <div className="footer-text-left">
            <strong>TEO BUILDING CODE</strong> | © 2026 Designed by Võ Duy Toàn
          </div>
          <div className="footer-icons">
            <a href="https://www.tiktok.com/@teohoclaptrinh" target="_blank" rel="noreferrer"><i className="fab fa-tiktok"></i></a>
            <a href="https://www.linkedin.com/in/zvoduytoanz/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
            <a href="https://github.com/Joinney" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
          </div>
        </div>
      </footer>

      <style>{`
        .footer-container {
          width: 100%;
          margin-top: 1rem;
        }

        .footer-box {
          width: 100% !important;
          height: 50px !important;
          padding: 0 1.8rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: default;
        }

        .footer-text-left {
          z-index: 10;
          font-size: 0.8rem;
          color: #64748b;
        }

        .footer-text-left strong {
          color: #fff;
        }

        .footer-icons {
          display: flex;
          gap: 1.4rem;
          z-index: 10;
        }

        .footer-icons a { 
          color: #64748b; 
          transition: color 0.2s ease;
        }

        .footer-icons a:hover {
          color: #fff;
        }

        /* Light Mode */
        body.light-mode .footer-text-left {
          color: #6a6a6a !important;
        }

        body.light-mode .footer-text-left strong {
          color: #2b2b2b !important;
        }

        body.light-mode .footer-icons a {
          color: #444444 !important;
        }

        body.light-mode .footer-icons a:hover {
          color: #000000 !important;
        }

        /* Responsive Điện thoại */
        @media (max-width: 640px) {
          .footer-box {
            height: auto !important;
            min-height: 48px;
            padding: 0.85rem 1rem !important;
            flex-direction: column-reverse;
            gap: 0.6rem;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}