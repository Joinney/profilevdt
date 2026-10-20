import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './style.css';

const sourceCodes = [
  { title: "Cây Thông Noel", lang: "HTML", date: "24/12/2025", img: "https://images.unsplash.com/photo-1543258103-a62bdc069871?w=400&q=80" },
  { title: "Cây Thông Noel 2", lang: "HTML", date: "24/12/2025", img: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&q=80" },
  { title: "Thầy trò rủ nhau đi thỉnh kinh", lang: "HTML", date: "20/12/2025", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80" },
  { title: "Vẽ Tom and Jerry bằng...", lang: "PYTHON", date: "15/12/2025", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80" },
  { title: "Loopy đáng yêu", lang: "PYTHON", date: "10/12/2025", img: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&q=80" },
  { title: "I Love You 2d", lang: "HTML", date: "05/12/2025", img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&q=80" },
  { title: "Change Photo", lang: "HTML", date: "01/12/2025", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" },
  { title: "Baw chịu một chút màu mè...", lang: "HTML", date: "28/11/2025", img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80" },
  { title: "Web tỏ tình", lang: "HTML", date: "20/11/2025", img: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&q=80" }
];

export default function App() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="dashboard-container">
      <Header />

      <div className="layout-2col">
        {/* CỘT TRÁI */}
        <div className="col-main">
          <div className="hero-grid">
            <div className="box profile-card" style={{ '--w': '100%', '--h': 'auto', '--r': '24px', '--tr': '20%' }}>
              <div className="circle-overlay"></div>
              <div className="profile-content">
                <div className="box avatar-box" style={{ '--w': '80px', '--h': '80px', '--r': '9999px', '--tr': '35%' }}>
                  <div className="circle-overlay"></div>
                  <img 
                    src="/img/teone.jpeg" 
                    alt="Avatar" 
                    className="avatar-img" 
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/80'; }} 
                  />
                </div>
                <div>
                  <h2 className="name">Teo Building Code</h2>
                  <p className="role">Software Engineer</p>
                </div>
                <div className="tag-row">
                  <span className="tag-badge">Designer</span>
                  <span className="tag-badge">Writer</span>
                  <span className="tag-badge">Developer</span>
                  <span className="tag-badge">Backend</span>
                </div>
                <div className="social-row">
                  <a href="https://github.com/Joinney" target="_blank" rel="noreferrer" className="box icon-btn" style={{ '--w': '36px', '--h': '36px', '--r': '9999px' }}>
                    <div className="circle-overlay"></div>
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/zvoduytoanz/" target="_blank" rel="noreferrer" className="box icon-btn" style={{ '--w': '36px', '--h': '36px', '--r': '9999px' }}>
                    <div className="circle-overlay"></div>
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="https://www.tiktok.com/@teohoclaptrinh" target="_blank" rel="noreferrer" className="box icon-btn" style={{ '--w': '36px', '--h': '36px', '--r': '9999px' }}>
                    <div className="circle-overlay"></div>
                    <i className="fab fa-tiktok"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="box banner-glass" style={{ '--w': '100%', '--h': '100%', '--r': '24px', '--tr': '15%' }}>
              <div className="circle-overlay"></div>
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop" alt="Banner E-Commerce" />
            </div>
          </div>

          <div className="controls-row">
            <div className="pills-group">
              <div className="box pill-btn active" style={{ '--w': 'auto', '--h': '36px', '--r': '9999px' }}>
                <div className="circle-overlay"></div>
                <i className="fas fa-star" style={{ color: '#f59e0b' }}></i>
                <span>Nổi bật</span>
              </div>
              <div className="box pill-btn" style={{ '--w': 'auto', '--h': '36px', '--r': '9999px' }}>
                <div className="circle-overlay"></div>
                <span>Mới nhất</span>
              </div>
              <div className="box pill-btn" style={{ '--w': 'auto', '--h': '36px', '--r': '9999px' }}>
                <div className="circle-overlay"></div>
                <i className="fas fa-layer-group"></i>
                <span>Danh mục</span>
              </div>
              <div className="box pill-btn" style={{ '--w': 'auto', '--h': '36px', '--r': '9999px' }}>
                <div className="circle-overlay"></div>
                <span>&lt;/&gt; Ngôn ngữ</span>
              </div>
            </div>

            <div className="box clock-box" style={{ '--w': '160px', '--h': '38px', '--r': '9999px' }}>
              <div className="circle-overlay"></div>
              <span className="clock-text">{time}</span>
            </div>
          </div>

          <div className="box source-section" style={{ '--w': '100%', '--h': 'auto', '--r': '24px', '--tr': '20%' }}>
            <div className="circle-overlay"></div>
            
            <div className="source-header">
              <div className="source-title">MÃ NGUỒN</div>
              <div className="box search-mini-box" style={{ '--w': '200px', '--h': '32px', '--r': '9999px' }}>
                <div className="circle-overlay"></div>
                <input type="text" placeholder="Tìm kiếm source code..." />
                <i className="fas fa-search" style={{ zIndex: 502, color: '#64748b', fontSize: '11px' }}></i>
              </div>
            </div>

            <div className="grid-3x3">
              {sourceCodes.map((item, index) => (
                <div key={index} className="box code-card-glass" style={{ '--w': '100%', '--h': 'auto', '--r': '16px', '--tr': '15%' }}>
                  <div className="circle-overlay"></div>
                  <div className="card-thumb" style={{ zIndex: 502 }}>
                    <img src={item.img} alt={item.title} />
                    <span className="thumb-badge"><i className="fas fa-play" style={{ fontSize: '6px' }}></i> Video</span>
                    <span className="thumb-tech-icon">5</span>
                  </div>
                  <div className="card-title-text" style={{ zIndex: 502 }}>{item.title}</div>
                  <div className="card-meta" style={{ zIndex: 502 }}>
                    <span>{item.lang} - {item.date}</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <i className="fas fa-eye"></i>
                      <i className="fas fa-download"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pagination-row">
              <div className="box page-btn active" style={{ '--w': '26px', '--h': '26px', '--r': '9999px' }}><span style={{ zIndex: 502 }}>1</span></div>
              <div className="box page-btn" style={{ '--w': '26px', '--h': '26px', '--r': '9999px' }}><span style={{ zIndex: 502 }}>2</span></div>
              <div className="box page-btn" style={{ '--w': '26px', '--h': '26px', '--r': '9999px' }}><span style={{ zIndex: 502 }}>3</span></div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI */}
        <div className="col-side">
          <div className="box shorts-glass" style={{ '--w': '100%', '--h': 'auto', '--r': '24px', '--tr': '20%' }}>
            <div className="circle-overlay"></div>
            <div className="shorts-header">
              <i className="fab fa-tiktok" style={{ color: '#f43f5e' }}></i> Video ngắn
            </div>
            <div className="shorts-preview" style={{ zIndex: 502 }}>
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop" alt="Short preview" />
              <div className="shorts-caption">Cây Thông 🎄</div>
            </div>
          </div>

          <div className="box uptime-glass" style={{ '--w': '100%', '--h': 'auto', '--r': '20px', '--tr': '15%' }}>
            <div className="circle-overlay"></div>
            <div className="uptime-title">THỜI GIAN VẬN HÀNH</div>
            <div className="uptime-value">365 <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#64748b' }}>Ngày</span></div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}