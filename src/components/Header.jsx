import React, { useState, useEffect } from 'react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  theme, 
  toggleTheme,
  sakuraEnabled = true,
  setSakuraEnabled,
  teo2dEnabled = true,
  setTeo2dEnabled,
  showKeyGuide = false,
  setShowKeyGuide,
  showTouchPad = false,
  setShowTouchPad,
  autoRoamEnabled = true,
  setAutoRoamEnabled
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
              <div className="avatar-with-frame header-avatar-wrap">
                <img 
                  src="/teo.jpeg" 
                  alt="Avatar" 
                  className="header-avatar-img"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/34'; }} 
                />
                <img 
                  src="/avatar-frame.webp" 
                  alt="Khung Avatar Dark" 
                  className="avatar-animated-frame avatar-frame-dark" 
                />
                <img 
                  src="/avatar-frame-light.webp" 
                  alt="Khung Avatar Light" 
                  className="avatar-animated-frame avatar-frame-light" 
                />
              </div>
              <span style={{ color: isLight ? '#0f172a' : '#ffffff' }}>Võ Duy Toàn</span>
            </a>

            {/* Menu Desktop: Nút tab kính chỉ đổi màu chữ */}
            <nav className="nav-links-box">
              {navItems.map(item => {
                const isActive = activeTab === item.id;
                let tabTextColor = isLight ? '#64748b' : '#94a3b8';
                if (isActive) tabTextColor = isLight ? '#ea580c' : '#38bdf8';

                return (
                  <a
                    key={item.id}
                    href={item.id === 'home' ? '#' : `#${item.id}`}
                    className="box nav-tab-box"
                    style={{ 
                      '--w': 'auto', 
                      '--h': '36px', 
                      '--r': '9999px', 
                      '--tr': '15%',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(item.id);
                    }}
                  >
                    <div className="circle-overlay"></div>
                    <span style={{ color: tabTextColor, fontWeight: isActive ? 800 : 600 }}>
                      {item.label}
                    </span>
                  </a>
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

              {/* Nút bánh răng cài đặt */}
              <div 
                className={`box settings-toggle-box ${isSettingsOpen ? 'active' : ''}`} 
                onClick={() => setIsSettingsOpen(prev => !prev)}
                style={{ '--w': '38px', '--h': '38px', '--r': '9999px', '--tr': '20%', cursor: 'pointer' }} 
                title="Cài đặt trải nghiệm"
              >
                <div className="circle-overlay"></div>
                <i 
                  className="fas fa-gear" 
                  style={{ 
                    color: isSettingsOpen ? (isLight ? '#ea580c' : '#38bdf8') : (isLight ? '#64748b' : '#94a3b8'), 
                    zIndex: 10, 
                    position: 'relative',
                    transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s',
                    transform: isSettingsOpen ? 'rotate(90deg)' : 'rotate(0deg)'
                  }}
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

        {/* MODAL / DROPDOWN CÀI ĐẶT TRẢI NGHIỆM */}
        {isSettingsOpen && (
          <>
            <div 
              className="settings-backdrop"
              onClick={() => setIsSettingsOpen(false)}
            />
            <div className="settings-popup-wrapper">
              <div 
                className="box settings-glass-card" 
                style={{ 
                  '--w': '330px', 
                  '--h': 'auto', 
                  '--r': '22px', 
                  '--tr': '20%' 
                }}
              >
                <div className="circle-overlay"></div>
                
                <div className="settings-inner">
                  {/* Tiêu đề */}
                  <div className="settings-header">
                    <div className="settings-title-group">
                      <i className="fas fa-gear" style={{ color: isLight ? '#ea580c' : '#38bdf8' }}></i>
                      <span>CÀI ĐẶT TRẢI NGHIỆM</span>
                    </div>
                    <button 
                      className="settings-close-btn"
                      onClick={() => setIsSettingsOpen(false)}
                      title="Đóng cài đặt"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="settings-body">
                    {/* Mục 1: Cánh hoa anh đào rơi */}
                    <div className="settings-item">
                      <div className="settings-item-info">
                        <span className="settings-item-icon">🌸</span>
                        <div>
                          <div className="settings-item-title">Hoa anh đào rơi</div>
                          <div className="settings-item-desc">Hiệu ứng cánh hoa bay bổng</div>
                        </div>
                      </div>
                      <button 
                        type="button"
                        className={`settings-switch ${sakuraEnabled ? 'active' : ''}`}
                        onClick={() => setSakuraEnabled(prev => !prev)}
                        title={sakuraEnabled ? 'Tắt hoa rơi' : 'Bật hoa rơi'}
                      >
                        <span className="settings-switch-thumb"></span>
                      </button>
                    </div>

                    {/* Mục 2: Nhân vật Tèo 2D */}
                    <div className="settings-item">
                      <div className="settings-item-info">
                        <span className="settings-item-icon">🤖</span>
                        <div>
                          <div className="settings-item-title">Bạn đồng hành Tèo 2D</div>
                          <div className="settings-item-desc">Nhân vật di chuyển tương tác</div>
                        </div>
                      </div>
                      <button 
                        type="button"
                        className={`settings-switch ${teo2dEnabled ? 'active' : ''}`}
                        onClick={() => setTeo2dEnabled(prev => !prev)}
                        title={teo2dEnabled ? 'Tắt Tèo 2D' : 'Bật Tèo 2D'}
                      >
                        <span className="settings-switch-thumb"></span>
                      </button>
                    </div>

                    {/* Các tùy chọn phụ của Tèo 2D khi đang Bật */}
                    {teo2dEnabled && (
                      <div className="settings-subgroup">
                        <button
                          type="button"
                          className="settings-action-row"
                          onClick={() => {
                            setShowKeyGuide(true);
                            setIsSettingsOpen(false);
                          }}
                        >
                          <div className="settings-action-left">
                            <i className="fas fa-keyboard"></i>
                            <span>Phím điều khiển Tèo</span>
                          </div>
                          <span className="settings-action-badge">Xem phím <i className="fas fa-chevron-right" style={{ fontSize: '0.65rem' }}></i></span>
                        </button>

                        <div className="settings-item settings-subitem">
                          <div className="settings-item-info">
                            <i className="fas fa-gamepad" style={{ color: isLight ? '#ea580c' : '#38bdf8', fontSize: '0.95rem' }}></i>
                            <div>
                              <div className="settings-item-title">Tay cầm điều khiển ảo</div>
                              <div className="settings-item-desc">Dành cho cảm ứng điện thoại</div>
                            </div>
                          </div>
                          <button 
                            type="button"
                            className={`settings-switch ${showTouchPad ? 'active' : ''}`}
                            onClick={() => setShowTouchPad(prev => !prev)}
                            title={showTouchPad ? 'Tắt tay cầm ảo' : 'Bật tay cầm ảo'}
                          >
                            <span className="settings-switch-thumb"></span>
                          </button>
                        </div>

                        {/* Chế độ tự do dạo chơi (Auto Roam khi rảnh tay) */}
                        <div className="settings-item settings-subitem">
                          <div className="settings-item-info">
                            <span style={{ fontSize: '1rem', width: '18px', textAlign: 'center', display: 'inline-block' }}>🚶</span>
                            <div>
                              <div className="settings-item-title">Tự do dạo chơi (Auto Roam)</div>
                              <div className="settings-item-desc">Tự đi lại & tương tác khi rảnh tay</div>
                            </div>
                          </div>
                          <button 
                            type="button"
                            className={`settings-switch ${autoRoamEnabled ? 'active' : ''}`}
                            onClick={() => setAutoRoamEnabled(prev => !prev)}
                            title={autoRoamEnabled ? 'Tắt tự do dạo chơi' : 'Bật tự do dạo chơi'}
                          >
                            <span className="settings-switch-thumb"></span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Mục 3: Giao diện Sáng / Tối */}
                    <div className="settings-item">
                      <div className="settings-item-info">
                        <span className="settings-item-icon">{isLight ? '☀️' : '🌙'}</span>
                        <div>
                          <div className="settings-item-title">Chế độ giao diện</div>
                          <div className="settings-item-desc">{isLight ? 'Giao diện Sáng (Light)' : 'Giao diện Tối (Dark)'}</div>
                        </div>
                      </div>
                      <button 
                        type="button"
                        className={`settings-switch ${!isLight ? 'active' : ''}`}
                        onClick={toggleTheme}
                        title="Đổi giao diện Sáng / Tối"
                      >
                        <span className="settings-switch-thumb"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

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
                  <div className="avatar-with-frame header-avatar-wrap">
                    <img 
                      src="/teo.jpeg" 
                      alt="Avatar" 
                      className="header-avatar-img"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/30'; }} 
                    />
                    <img 
                      src="/avatar-frame.webp" 
                      alt="Khung Avatar Dark" 
                      className="avatar-animated-frame avatar-frame-dark" 
                    />
                    <img 
                      src="/avatar-frame-light.webp" 
                      alt="Khung Avatar Light" 
                      className="avatar-animated-frame avatar-frame-light" 
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
                    <a
                      key={item.id}
                      href={item.id === 'home' ? '#' : `#${item.id}`}
                      className="box drawer-nav-item"
                      style={{ 
                        '--w': '100%', 
                        '--h': '46px', 
                        '--r': '16px', 
                        '--tr': '15%',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSelectTab(item.id);
                      }}
                    >
                      <div className="circle-overlay"></div>
                      <i className={`fas ${item.icon}`} style={{ color, zIndex: 10 }}></i>
                      <span style={{ color, zIndex: 10, fontWeight: isActive ? 800 : 600 }}>{item.label}</span>
                    </a>
                  );
                })}
              </nav>

              <div style={{ marginTop: 'auto', paddingTop: '0.8rem', paddingBottom: '0.5rem' }}>
                <button
                  type="button"
                  className="box drawer-settings-btn"
                  style={{
                    '--w': '100%',
                    '--h': '44px',
                    '--r': '9999px',
                    '--tr': '15%',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.65rem',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    color: isLight ? '#0f172a' : '#ffffff'
                  }}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsSettingsOpen(true);
                  }}
                >
                  <div className="circle-overlay"></div>
                  <i className="fas fa-gear" style={{ color: isLight ? '#ea580c' : '#38bdf8', zIndex: 10 }}></i>
                  <span style={{ zIndex: 10 }}>Cài đặt trải nghiệm</span>
                </button>
              </div>

              <div className="drawer-footer" style={{ borderTopColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)', color: '#94a3b8' }}>
                <span>© 2026 Võ Duy Toàn</span>
              </div>
            </div>
          </div>
        </aside>
      </header>

      <style>{`
        /* Đảm bảo Header luôn đồng nhất 100% giống hệt Trang chủ và Về tôi trên mọi trang */
        .header-container { position: relative; width: 100%; z-index: 1000; }

        .header-container .box {
          border: 1px double rgba(255, 255, 255, 0.16) !important;
          box-shadow:
              inset 2px -2px 1px -1px rgba(255, 255, 255, 0.5),
              inset -2px 2px 1px -1px rgba(255, 255, 255, 0.5),
              inset 6px -6px 2px -6px rgba(255, 255, 255, 0.3),
              inset -6px 6px 2px -6px rgba(255, 255, 255, 0.3),
              inset 0 0 3px rgba(0, 0, 0, 0.95),
              0 12px 35px rgba(0, 0, 0, 0.7) !important;
          background: rgba(10, 16, 30, 0.82) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          overflow: hidden;
        }

        .header-container .box:before {
          content: '' !important;
          position: absolute !important;
          z-index: 1 !important;
          top: 35% !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: calc(100% - 16px) !important;
          height: calc(100% - 16px) !important;
          border-radius: var(--r) !important;
          border: 1px solid rgba(255, 255, 255, 0.18) !important;
          filter: blur(8px) !important;
          pointer-events: none !important;
        }

        .header-container .box:after {
          z-index: 1 !important;
          content: '' !important;
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          border-radius: var(--r) !important;
          filter: blur(2px) !important;
          background: linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.22) 0%,
              transparent var(--tr),
              transparent calc(100% - var(--tr)),
              rgba(255, 255, 255, 0.15) 100%
          ) !important;
          pointer-events: none !important;
        }

        .header-container .box .circle-overlay {
          position: absolute !important;
          z-index: 1 !important;
          inset: 4px !important;
          border: 1px solid rgba(255, 255, 255, 0.18) !important;
          border-radius: var(--r) !important;
          filter: blur(1px) !important;
          pointer-events: none !important;
        }

        .header-container .nav-tab-box {
          border: none !important;
        }

        /* GIAO DIỆN SÁNG (LIGHT MODE) ĐỒNG NHẤT CHO HEADER */
        body.light-mode .header-container .box {
          border: 1px double rgba(51, 51, 51, 0.08) !important;
          box-shadow:
              inset 2px -2px 1px -1px rgba(255, 255, 255, 0.9),
              inset -2px 2px 1px -1px rgba(255, 255, 255, 0.9),
              inset 6px -6px 1px -6px rgba(255, 255, 255, 0.55),
              inset -6px 6px 1px -6px rgba(255, 255, 255, 0.55),
              inset 0 0 2px rgba(0, 0, 0, 0.8),
              0 4px 8px rgba(0, 0, 0, 0.2) !important;
          background: rgba(255, 255, 255, 0.04) !important;
          backdrop-filter: blur(2px) !important;
          -webkit-backdrop-filter: blur(2px) !important;
        }

        body.light-mode .header-container .box:before {
          border: 1px solid rgba(0, 0, 0, 0.9) !important;
          filter: blur(8px) !important;
        }

        body.light-mode .header-container .box:after {
          filter: blur(3px) !important;
          background: linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.8) 0%,
              transparent var(--tr),
              transparent calc(100% - var(--tr)),
              rgba(255, 255, 255, 0.8) 100%
          ) !important;
        }

        body.light-mode .header-container .box .circle-overlay {
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
        }

        body.light-mode .header-container .nav-tab-box {
          border: none !important;
        }
        .header-box { width: 100% !important; height: 60px !important; padding: 0 1.8rem; display: flex; justify-content: space-between; align-items: center; cursor: default; }
        .header-inner { position: relative; z-index: 10; width: 100%; display: flex; justify-content: space-between; align-items: center; }
        .brand-wrapper { text-decoration: none; display: flex; align-items: center; gap: 0.8rem; font-weight: 800; font-size: 1.15rem; cursor: pointer; }
        .brand-wrapper img.header-avatar-img { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; background-color: #1e293b; display: block; position: relative; z-index: 2; }
        .nav-links-box { display: flex; align-items: center; gap: 0.5rem; }
        .nav-tab-box { text-decoration: none; padding: 0 1.25rem !important; font-size: 0.85rem; cursor: pointer; border: none; }
        .nav-tab-box span { position: relative; z-index: 10; transition: color 0.2s ease; }
        
        .header-glow-left {
          position: absolute; left: -18px; top: 50%; transform: translateY(-50%);
          width: 55px; height: 55px; border-radius: 50%;
          background: radial-gradient(circle, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.4) 50%, transparent 80%);
          filter: blur(3px); pointer-events: none; z-index: 1;
        }

        .header-actions { display: flex; align-items: center; gap: 0.75rem; }
        .header-action-btn { width: 36px; height: 36px; border-radius: 50%; background: transparent; border: none; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center; }
        .theme-toggle-box, .settings-toggle-box { cursor: pointer; }

        /* NÚT VÀ POPUP CÀI ĐẶT TRẢI NGHIỆM */
        .settings-backdrop {
          position: fixed;
          inset: 0;
          z-index: 10004;
          background: rgba(3, 7, 18, 0.45);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          animation: fadeInBackdrop 0.2s ease forwards;
        }

        @keyframes fadeInBackdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .settings-popup-wrapper {
          position: fixed;
          top: 76px;
          right: 24px;
          z-index: 10005;
          animation: settingsPopupIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes settingsPopupIn {
          from { opacity: 0; transform: translateY(-10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .settings-glass-card {
          padding: 1.15rem !important;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6) !important;
        }

        .settings-inner {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }

        .settings-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        body.light-mode .settings-header {
          border-bottom-color: rgba(0, 0, 0, 0.08);
        }

        .settings-title-group {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-weight: 800;
          font-size: 0.82rem;
          letter-spacing: 0.5px;
          color: var(--text-heading);
        }

        .settings-close-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 1.25rem;
          cursor: pointer;
          line-height: 1;
          padding: 2px 6px;
          border-radius: 6px;
          transition: color 0.15s ease;
        }

        .settings-close-btn:hover {
          color: #ef4444;
        }

        .settings-body {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .settings-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 0.45rem 0.25rem;
        }

        .settings-item-info {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .settings-item-icon {
          font-size: 1.15rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
        }

        .settings-item-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-heading);
          line-height: 1.2;
        }

        .settings-item-desc {
          font-size: 0.68rem;
          color: #94a3b8;
          margin-top: 2px;
        }

        body.light-mode .settings-item-desc {
          color: #64748b;
        }

        .settings-subgroup {
          margin-left: 1.8rem;
          padding-left: 0.6rem;
          border-left: 2px dashed rgba(56, 189, 248, 0.35);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        body.light-mode .settings-subgroup {
          border-left-color: rgba(234, 88, 12, 0.35);
        }

        .settings-subitem {
          padding: 0.2rem 0;
        }

        .settings-action-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0.45rem 0.6rem;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-heading);
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        body.light-mode .settings-action-row {
          background: rgba(0, 0, 0, 0.03);
          border-color: rgba(0, 0, 0, 0.08);
        }

        .settings-action-row:hover {
          background: rgba(56, 189, 248, 0.15);
          border-color: #38bdf8;
          color: #38bdf8;
        }

        body.light-mode .settings-action-row:hover {
          background: rgba(234, 88, 12, 0.12);
          border-color: #ea580c;
          color: #ea580c;
        }

        .settings-action-left {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .settings-action-badge {
          font-size: 0.65rem;
          color: #38bdf8;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        body.light-mode .settings-action-badge {
          color: #ea580c;
        }

        /* TOGGLE SWITCH CÔNG TẮC GẠT */
        .settings-switch {
          width: 44px;
          height: 24px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 2px;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .settings-switch.active {
          background: linear-gradient(135deg, #0284c7, #38bdf8);
          border-color: #38bdf8;
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.4);
        }

        body.light-mode .settings-switch {
          background: rgba(0, 0, 0, 0.12);
          border-color: rgba(0, 0, 0, 0.15);
        }

        body.light-mode .settings-switch.active {
          background: linear-gradient(135deg, #ea580c, #f97316);
          border-color: #ea580c;
          box-shadow: 0 0 10px rgba(234, 88, 12, 0.35);
        }

        .settings-switch-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.35);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateX(0);
        }

        .settings-switch.active .settings-switch-thumb {
          transform: translateX(20px);
        }

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
          .settings-popup-wrapper {
            top: 66px;
            right: 12px;
            left: 12px;
            display: flex;
            justify-content: center;
          }
          .settings-glass-card {
            --w: 100% !important;
            width: 100% !important;
            max-width: 360px !important;
          }
          .header-box { padding: 0 1rem !important; height: 54px !important; }
          .brand-wrapper { font-size: 1rem; gap: 0.5rem; }
          .brand-wrapper img.header-avatar-img { width: 28px; height: 28px; }
        }
      `}</style>
    </>
  );
}