import React from 'react';

export default function Footer() {
  return (
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
  );
}