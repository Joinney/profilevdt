import React, { useState, useEffect } from 'react';

export default function Header({ activeTab, setActiveTab, theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const isLight = theme === 'light';

  return (
    <>
      <header className="header-container">
        <div className="box header-box" style={{ '--w': '100%', '--h': '60px', '--r': '9999px', '--tr': '15%' }}>
          <div className="circle-overlay"></div>
          <div className="header-glow-left"></div>

          <div className="header-inner">
            <a href="#" onClick={(e) => { e.preventDefault(); handleSelectTab('home'); }} className="brand-wrapper">
              <img 
                src="/teo.jpeg" 
                alt="Avatar" 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/34'; }} 
              />
              <span style={{ color: isLight ? '#0f172a' : '#ffffff' }}>Teo Building Code</span>
            </a>

            {/* Menu Desktop: Nút tab kính chỉ đổi màu chữ */}
            <nav className="nav-links-box">
              {navItems.map(item => {
                const isActive = activeTab === item.id;
                let tabTextColor = isLight ? '#64748b' : '#94a3b8';
                if (isActive) tabTextColor = isLight ? '#ea580c' : '#38bdf8';

                return (
                  <button
                    key={item.id}
                    className="box nav-tab-box"
                    style={{ '--w': 'auto', '--h': '36px', '--r': '9999px', '--tr': '15%' }}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <div className="circle-overlay"></div>
                    <span style={{ color: tabTextColor, fontWeight: isActive ? 800 : 600 }}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="header-actions">
              <button 
                className="header-action-btn" 
                title="Tìm kiếm"
                style={{ color: isLight ? '#64748b' : '#94a3b8' }}
              >
                <i className="fas fa-search"></i>
              </button>
              
              <div 
                className="box theme-toggle-box" 
                onClick={toggleTheme}
                style={{ '--w': '38px', '--h': '38px', '--r': '9999px', '--tr': '20%', cursor: 'pointer' }} 
                title="Đổi giao diện Sáng / Tối"
              >
                <div className="circle-overlay"></div>
                <i 
                  className={`fas ${isLight ? 'fa-sun' : 'fa-moon'}`} 
                  style={{ color: isLight ? '#ea580c' : '#38bdf8', zIndex: 10, position: 'relative' }}
                ></i>
              </div>

              <button 
                className="mobile-menu-btn"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Mở Menu"
                style={{ color: isLight ? '#64748b' : '#94a3b8' }}
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Backdrop Mobile */}
        <div 
          className={`mobile-backdrop ${isMenuOpen ? 'active' : ''}`} 
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Modal Drawer Mobile */}
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
            <div className="circle-overlay"></div>

            <div className="drawer-inner-content">
              <div className="drawer-header" style={{ borderBottomColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)' }}>
                <div className="drawer-brand" style={{ color: isLight ? '#0f172a' : '#ffffff' }}>
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
                  style={{ '--w': '34px', '--h': '34px', '--r': '9999px', '--tr': '20%', color: isLight ? '#64748b' : '#94a3b8' }}
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Đóng Menu"
                >
                  <div className="circle-overlay"></div>
                  <i className="fas fa-xmark"></i>
                </button>
              </div>

              <nav className="drawer-nav-list">
                {navItems.map(item => {
                  const isActive = activeTab === item.id;
                  let color = isLight ? '#475569' : '#cbd5e1';
                  if (isActive) color = isLight ? '#ea580c' : '#38bdf8';

                  return (
                    <button
                      key={item.id}
                      className="box drawer-nav-item"
                      style={{ 
                        '--w': '100%', 
                        '--h': '46px', 
                        '--r': '16px', 
                        '--tr': '15%'
                      }}
                      onClick={() => handleSelectTab(item.id)}
                    >
                      <div className="circle-overlay"></div>
                      <i className={`fas ${item.icon}`} style={{ color, zIndex: 10 }}></i>
                      <span style={{ color, zIndex: 10, fontWeight: isActive ? 800 : 600 }}>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="drawer-footer" style={{ borderTopColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)', color: '#94a3b8' }}>
                <span>© 2026 Teo Building Code</span>
              </div>
            </div>
          </div>
        </aside>
      </header>

      <style>{`
        .header-container { position: relative; width: 100%; z-index: 1000; }
        .header-box { width: 100% !important; height: 60px !important; padding: 0 1.8rem; display: flex; justify-content: space-between; align-items: center; cursor: default; }
        .header-inner { position: relative; z-index: 10; width: 100%; display: flex; justify-content: space-between; align-items: center; }
        .brand-wrapper { display: flex; align-items: center; gap: 0.8rem; font-weight: 800; font-size: 1.15rem; cursor: pointer; }
        .brand-wrapper img { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; background-color: #1e293b; }
        .nav-links-box { display: flex; align-items: center; gap: 0.5rem; }
        .nav-tab-box { padding: 0 1.25rem !important; font-size: 0.85rem; cursor: pointer; border: none; }
        .nav-tab-box span { position: relative; z-index: 10; transition: color 0.2s ease; }
        
        .header-glow-left {
          position: absolute; left: -18px; top: 50%; transform: translateY(-50%);
          width: 55px; height: 55px; border-radius: 50%;
          background: radial-gradient(circle, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.4) 50%, transparent 80%);
          filter: blur(3px); pointer-events: none; z-index: 1;
        }

        .header-actions { display: flex; align-items: center; gap: 0.9rem; }
        .header-action-btn { width: 36px; height: 36px; border-radius: 50%; background: transparent; border: none; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center; }
        .theme-toggle-box { cursor: pointer; }

        .mobile-menu-btn, .mobile-backdrop, .mobile-sidebar-drawer { display: none !important; }

        @media (max-width: 768px) {
          .nav-links-box { display: none !important; }
          .mobile-menu-btn { display: flex !important; width: 36px; height: 36px; border-radius: 50%; background: transparent; border: none; cursor: pointer; font-size: 1.25rem; align-items: center; justify-content: center; }
          .mobile-backdrop { display: block !important; position: fixed; inset: 0; background: rgba(3, 7, 18, 0.5); backdrop-filter: blur(6px); opacity: 0; pointer-events: none; transition: opacity 0.35s ease; z-index: 1001; }
          .mobile-backdrop.active { opacity: 1; pointer-events: auto; }
          .mobile-sidebar-drawer { display: flex !important; position: fixed; top: 12px; right: 12px; bottom: 12px; width: 275px; max-width: calc(100vw - 24px); z-index: 1002; flex-direction: column; transform: translateX(calc(100% + 24px)); visibility: hidden; transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.38s; }
          .mobile-sidebar-drawer.open { transform: translateX(0); visibility: visible; }
          .drawer-inner-content { position: relative; z-index: 10; width: 100%; height: 100%; display: flex; flex-direction: column; }
          .drawer-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.9rem; border-bottom: 1px solid; margin-bottom: 1rem; width: 100%; }
          .drawer-brand { display: flex; align-items: center; gap: 0.65rem; font-weight: 800; font-size: 0.85rem; letter-spacing: 0.5px; }
          .drawer-avatar-mini img { width: 26px; height: 26px; border-radius: 50%; object-fit: cover; z-index: 10; }
          .drawer-close-box { cursor: pointer; border: none; background: transparent; font-size: 0.95rem; }
          .drawer-close-box i { z-index: 10; }
          .drawer-nav-list { display: flex; flex-direction: column; gap: 0.6rem; flex: 1; width: 100%; }
          .drawer-nav-item { justify-content: flex-start !important; padding: 0 1.1rem; gap: 0.85rem; font-size: 0.88rem; cursor: pointer; text-align: left; border: none; }
          .drawer-nav-item i { width: 18px; text-align: center; font-size: 0.95rem; }
          .drawer-footer { padding-top: 0.9rem; border-top: 1px solid; font-size: 0.72rem; text-align: center; width: 100%; }
        }

        @media (max-width: 640px) {
          .header-box { padding: 0 1rem !important; height: 54px !important; }
          .brand-wrapper { font-size: 1rem; gap: 0.5rem; }
          .brand-wrapper img { width: 28px; height: 28px; }
        }
      `}</style>
    </>
  );
}