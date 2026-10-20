import React, { useState, useEffect } from 'react';

export default function Header({ activeTab, setActiveTab }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

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

  const navItems = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'about', label: 'Về tôi' },
    { id: 'projects', label: 'Dự án' },
    { id: 'tools', label: 'Công cụ' },
    { id: 'moments', label: 'Khoảnh khắc' }
  ];

  return (
    <header className="header-container">
      <div className="box header-box" style={{ '--w': '100%', '--h': '58px', '--r': '29px', '--tr': '15%' }}>
        <div className="circle-overlay"></div>
        <div className="header-glow-left"></div>

        <div className="header-inner">
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('home'); }} className="brand-wrapper">
            <img 
              src="/teo.jpeg" 
              alt="Avatar" 
              onError={(e) => { e.target.src = 'https://via.placeholder.com/32'; }} 
            />
            <span>Teo Building Code</span>
          </a>

          <nav className="nav-links-box">
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-tab ${activeTab === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.id);
                }}
              >
                {item.label}
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
              style={{ '--w': '36px', '--h': '36px', '--r': '9999px', '--tr': '20%', cursor: 'pointer' }} 
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