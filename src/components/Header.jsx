import React, { useState, useEffect } from 'react';

export default function Header({ activeTab, setActiveTab }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Khóa cuộn trang khi mở menu
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Tự đóng nếu đổi sang màn hình desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSelectTab = (id) => {
    setActiveTab(id);
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: 'fa-house' },
    { id: 'about', label: 'Về tôi', icon: 'fa-user' },
    { id: 'projects', label: 'Dự án', icon: 'fa-diagram-project' },
    { id: 'tools', label: 'Công cụ', icon: 'fa-screwdriver-wrench' },
    { id: 'moments', label: 'Khoảnh khắc', icon: 'fa-images' }
  ];

  return (
    <>
      <header className="header-container">
        <div className="box header-box" style={{ '--w': '100%', '--h': '58px', '--r': '29px', '--tr': '15%' }}>
          <div className="circle-overlay"></div>
          <div className="header-glow-left"></div>

          <div className="header-inner">
            <a href="#" onClick={(e) => { e.preventDefault(); handleSelectTab('home'); }} className="brand-wrapper">
              <img 
                src="/teo.jpeg" 
                alt="Avatar" 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/32'; }} 
              />
              <span>Teo Building Code</span>
            </a>

            {/* Menu Desktop */}
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

              {/* Nút Hamburger menu trên điện thoại */}
              <button 
                className="mobile-menu-btn"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Mở Menu"
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Backdrop che mờ nền */}
        <div 
          className={`mobile-backdrop ${isMenuOpen ? 'active' : ''}`} 
          onClick={() => setIsMenuOpen(false)}
        />

        {/* MODAL DRAWER DÙNG TRỰC TIẾP CLASS .box NGUYÊN BẢN */}
        <aside className={`mobile-sidebar-drawer ${isMenuOpen ? 'open' : ''}`}>
          <div 
            className="box drawer-glass-box" 
            style={{ 
              '--w': '100%', 
              '--h': '100%', 
              '--r': '26px', 
              '--tr': '20%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              padding: '1.4rem 1.1rem'
            }}
          >
            {/* Lớp kính phản chiếu đặc trưng */}
            <div className="circle-overlay"></div>

            <div className="drawer-inner-content">
              {/* Header của Modal */}
              <div className="drawer-header">
                <div className="drawer-brand">
                  <div className="box drawer-avatar-mini" style={{ '--w': '34px', '--h': '34px', '--r': '9999px', '--tr': '20%' }}>
                    <div className="circle-overlay"></div>
                    <img 
                      src="/teo.jpeg" 
                      alt="Avatar" 
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/30'; }} 
                    />
                  </div>
                  <span>MENU ĐIỀU HƯỚNG</span>
                </div>
                
                <button 
                  className="box drawer-close-box" 
                  style={{ '--w': '34px', '--h': '34px', '--r': '9999px', '--tr': '20%' }}
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Đóng Menu"
                >
                  <div className="circle-overlay"></div>
                  <i className="fas fa-xmark"></i>
                </button>
              </div>

              {/* Danh sách Tab điều hướng */}
              <nav className="drawer-nav-list">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    className={`box drawer-nav-item ${activeTab === item.id ? 'active' : ''}`}
                    style={{ 
                      '--w': '100%', 
                      '--h': '46px', 
                      '--r': '16px', 
                      '--tr': '15%'
                    }}
                    onClick={() => handleSelectTab(item.id)}
                  >
                    <div className="circle-overlay"></div>
                    <i className={`fas ${item.icon}`}></i>
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Footer Modal */}
              <div className="drawer-footer">
                <span>© 2026 Teo Building Code</span>
              </div>
            </div>
          </div>
        </aside>
      </header>

      <style>{`
        .header-container {
          position: relative;
          width: 100%;
          z-index: 1000;
        }

        .header-box {
          width: 100% !important;
          height: 60px !important;
          padding: 0 1.8rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: default;
        }

        .header-inner {
          position: relative;
          z-index: 10;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .brand-wrapper {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-weight: 800;
          font-size: 1.15rem;
          color: #fff;
          cursor: pointer;
        }

        .brand-wrapper img {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          object-fit: cover;
          background-color: #1e293b;
        }

        .nav-links-box {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.03);
          padding: 4px 8px;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .nav-links-box a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 34px;
          padding: 0 1.2rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #94a3b8;
          border: 1px solid transparent;
          transition: color 0.2s ease, background-color 0.2s ease;
        }

        .nav-links-box a:hover {
          color: #fff;
        }

        .nav-links-box a.active {
          background: rgba(255, 255, 255, 0.12) !important;
          border: 1px solid rgba(255, 255, 255, 0.25) !important;
          color: #fff !important;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5);
        }

        .header-glow-left {
          position: absolute;
          left: -18px;
          top: 50%;
          transform: translateY(-50%);
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.4) 50%, transparent 80%);
          filter: blur(3px);
          pointer-events: none;
          z-index: 1;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }

        .header-action-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: transparent;
          border: none;
          cursor: pointer;
          color: #94a3b8;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s ease;
        }
        .header-action-btn:hover {
          color: #38bdf8;
        }

        .theme-toggle-box {
          cursor: pointer;
          pointer-events: auto !important;
        }

        .theme-toggle-box .theme-icon {
          z-index: 15;
          position: relative;
          color: #38bdf8;
          font-size: 0.95rem;
          pointer-events: none;
        }

        /* Ẩn hoàn toàn modal trên Desktop */
        .mobile-menu-btn,
        .mobile-backdrop,
        .mobile-sidebar-drawer {
          display: none !important;
        }

        /* ========================================================= */
        /* GIAO DIỆN DI ĐỘNG & TABLET (<= 768px)                     */
        /* ========================================================= */
        @media (max-width: 768px) {
          .nav-links-box {
            display: none !important;
          }

          .mobile-menu-btn {
            display: flex !important;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: transparent;
            border: none;
            cursor: pointer;
            color: #94a3b8;
            font-size: 1.25rem;
            align-items: center;
            justify-content: center;
            transition: color 0.2s ease;
          }
          .mobile-menu-btn:hover {
            color: #38bdf8;
          }

          .mobile-backdrop {
            display: block !important;
            position: fixed;
            inset: 0;
            background: rgba(3, 7, 18, 0.5);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.35s ease;
            z-index: 1001;
          }

          .mobile-backdrop.active {
            opacity: 1;
            pointer-events: auto;
          }

          /* Drawer Wrapper */
          .mobile-sidebar-drawer {
            display: flex !important;
            position: fixed;
            top: 12px;
            right: 12px;
            bottom: 12px;
            width: 275px;
            max-width: calc(100vw - 24px);
            z-index: 1002;
            flex-direction: column;
            transform: translateX(calc(100% + 24px));
            visibility: hidden;
            transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.38s;
          }

          .mobile-sidebar-drawer.open {
            transform: translateX(0);
            visibility: visible;
          }

          .drawer-inner-content {
            position: relative;
            z-index: 10;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          .drawer-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 0.9rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 1rem;
            width: 100%;
          }

          .drawer-brand {
            display: flex;
            align-items: center;
            gap: 0.65rem;
            font-weight: 800;
            font-size: 0.85rem;
            color: #fff;
            letter-spacing: 0.5px;
          }

          .drawer-avatar-mini img {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            object-fit: cover;
            z-index: 10;
          }

          .drawer-close-box {
            cursor: pointer;
            border: none;
            background: transparent;
            color: #94a3b8;
            font-size: 0.95rem;
          }
          .drawer-close-box i {
            z-index: 10;
          }
          .drawer-close-box:hover {
            color: #fff;
          }

          .drawer-nav-list {
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
            flex: 1;
            width: 100%;
          }

          /* Từng nút tab menu làm bằng kính .box */
          .drawer-nav-item {
            justify-content: flex-start !important;
            padding: 0 1.1rem;
            gap: 0.85rem;
            font-size: 0.88rem;
            font-weight: 600;
            color: #cbd5e1;
            cursor: pointer;
            border: none;
            text-align: left;
          }

          .drawer-nav-item i {
            z-index: 10;
            width: 18px;
            text-align: center;
            font-size: 0.95rem;
            color: #38bdf8;
          }

          .drawer-nav-item span {
            z-index: 10;
          }

          .drawer-nav-item:hover {
            color: #fff;
          }

          .drawer-nav-item.active {
            color: #fff !important;
            border-color: rgba(56, 189, 248, 0.5) !important;
            background: rgba(56, 189, 248, 0.16) !important;
          }

          .drawer-footer {
            padding-top: 0.9rem;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            font-size: 0.72rem;
            color: #64748b;
            text-align: center;
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .header-box {
            padding: 0 1rem !important;
            height: 54px !important;
          }
          .brand-wrapper {
            font-size: 1rem;
            gap: 0.5rem;
          }
          .brand-wrapper img {
            width: 28px;
            height: 28px;
          }
          .header-glow-left {
            width: 40px;
            height: 40px;
            left: -10px;
          }
        }

        @media (max-width: 380px) {
          .header-actions {
            gap: 0.4rem;
          }
          .mobile-sidebar-drawer {
            width: 240px;
          }
        }

        /* LIGHT MODE */
        body.light-mode .brand-wrapper {
          color: #2b2b2b !important;
          filter: drop-shadow(0 20px 3px rgba(102, 102, 102, 0.15));
        }

        body.light-mode .nav-links-box {
          background: rgba(0, 0, 0, 0.04) !important;
          border-color: rgba(0, 0, 0, 0.08) !important;
        }

        body.light-mode .nav-links-box a {
          color: #555555 !important;
        }

        body.light-mode .nav-links-box a.active,
        body.light-mode .nav-links-box a:hover {
          color: #2b2b2b !important;
          background: rgba(255, 255, 255, 0.8) !important;
          border-color: rgba(0, 0, 0, 0.12) !important;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1) !important;
        }

        body.light-mode .header-action-btn,
        body.light-mode .mobile-menu-btn {
          color: #444444 !important;
        }

        body.light-mode .header-action-btn:hover,
        body.light-mode .mobile-menu-btn:hover {
          color: #000000 !important;
        }

        body.light-mode .theme-toggle-box .theme-icon {
          color: #d97706 !important;
        }

        body.light-mode .drawer-header {
          border-bottom-color: rgba(0, 0, 0, 0.08);
        }

        body.light-mode .drawer-brand {
          color: #1e293b;
        }

        body.light-mode .drawer-close-box {
          color: #475569;
        }

        body.light-mode .drawer-nav-item {
          color: #475569;
        }

        body.light-mode .drawer-nav-item i {
          color: #0284c7;
        }

        body.light-mode .drawer-nav-item.active {
          color: #0284c7 !important;
          background: rgba(2, 132, 199, 0.12) !important;
          border-color: rgba(2, 132, 199, 0.35) !important;
        }

        body.light-mode .drawer-footer {
          border-top-color: rgba(0, 0, 0, 0.08);
          color: #94a3b8;
        }
      `}</style>
    </>
  );
}