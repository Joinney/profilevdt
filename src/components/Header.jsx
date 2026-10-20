import React, { useState, useEffect } from 'react';

export default function Header() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [activeTab, setActiveTab] = useState('Trang chủ');

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const navItems = ['Trang chủ', 'Về tôi', 'Dự án', 'Công cụ', 'Khoảnh khắc'];

  return (
    <header className="header-container">
      <div className="box header-box" style={{ '--w': '100%', '--h': '58px', '--r': '29px', '--tr': '15%' }}>
        <div className="circle-overlay"></div>
        <div className="header-glow-left"></div>

        <div className="header-inner">
          <a href="index.html" className="brand-wrapper">
            <img 
              src="/img/teoicon.png" 
              alt="Avatar" 
              onError={(e) => { e.target.src = 'https://via.placeholder.com/32'; }} 
            />
            <span>Teo Building Code</span>
          </a>

          <nav className="nav-links-box">
            {navItems.map(tab => (
              <a
                key={tab}
                href={`#${tab}`}
                className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <button className="header-action-btn" title="Tìm kiếm">
              <i className="fas fa-search"></i>
            </button>
            
            <div 
              className="box theme-toggle-box" 
              onClick={toggleTheme}
              style={{ '--w': '36px', '--h': '36px', '--r': '9999px', '--tr': '20%' }} 
              title="Đổi giao diện Sáng / Tối"
            >
              <div className="circle-overlay"></div>
              <i className={`fas ${theme === 'light' ? 'fa-sun' : 'fa-moon'} theme-icon`}></i>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}