import React, { useState, useEffect, useRef } from 'react';

const projectList = [
  {
    id: 1,
    title: "Demi Mart",
    subtitle: "Nền tảng thương mại điện tử & Bán lẻ đa kênh",
    desc: "Hệ sinh thái E-Commerce toàn diện được xây dựng trên kiến trúc Polyglot Microservices hiệu năng cao. Tích hợp thanh toán trực tuyến, quản lý tồn kho theo thời gian thực và trải nghiệm mua sắm mượt mà trên cả Web lẫn Mobile.",
    tech: ["Next.js 14", "React Native", "Node.js", "Go", "Docker", "Redis", "MongoDB"],
    features: [
      "Kiến trúc Microservices",
      "Thanh toán VNPAY / Momo",
      "Quản lý đơn hàng Real-time",
      "Bộ nhớ đệm Redis Caching",
      "Giao diện chuẩn Glass UI",
      "Đồng bộ Web & Mobile App"
    ],
    floatingTags: ["Microservices", "Real-time Order", "Cross-Platform"],
    mockupImg: "https://images.unsplash.com/photo-1557821552-17105176677c?w=900&q=80",
    stats: "10K+ Products",
    demoUrl: "https://github.com/Joinney",
    githubUrl: "https://github.com/Joinney"
  },
  {
    id: 2,
    title: "Glitchverse: The Final Fight",
    subtitle: "Game đối kháng 2D đa vũ trụ trên Unity Engine",
    desc: "Trò chơi hành động đối kháng 2D nhịp độ cao với cơ chế combo phức tạp, hệ thống Finite State Machine (FSM) AI thông minh và góc máy Cinemachine điện ảnh mang đến cảm giác chiến đấu mãn nhãn.",
    tech: ["Unity Engine", "C#", "FSM AI", "Cinemachine", "Sprite Animation"],
    features: [
      "Hệ thống Combo & Cancel",
      "Trí tuệ nhân tạo FSM AI",
      "Góc máy điện ảnh sống động",
      "Chế độ đấu đối kháng 1v1",
      "Tối ưu 60 FPS mượt mà",
      "Hiệu ứng âm thanh chân thực"
    ],
    floatingTags: ["2D Combat", "Finite State AI", "Unity 60FPS"],
    mockupImg: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&q=80",
    stats: "Arcade Fighting",
    demoUrl: "https://github.com/Joinney",
    githubUrl: "https://github.com/Joinney"
  },
  {
    id: 3,
    title: "G3TD Smart Greenhouse",
    subtitle: "Hệ thống nhà kính thông minh giám sát & điều khiển IoT",
    desc: "Giải pháp IoT toàn diện ứng dụng vi điều khiển ESP32 và cảm biến đa tầng. Hệ thống tự động đo nhiệt độ, độ ẩm, ánh sáng và điều khiển tưới tiêu tự động qua Dashboard 3D Three.js và Mobile App.",
    tech: ["ESP32", "C++", "Firebase Realtime", "React Native", "Three.js", "IoT"],
    features: [
      "Giám sát cảm biến Real-time",
      "Điều khiển máy bơm tự động",
      "Mô hình 3D trực quan hóa",
      "Cảnh báo độ ẩm tức thì",
      "Lưu trữ dữ liệu đám mây",
      "Tích hợp điều khiển giọng nói"
    ],
    floatingTags: ["IoT Hardware", "Three.js 3D", "Firebase"],
    mockupImg: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=900&q=80",
    stats: "Smart Agriculture",
    demoUrl: "https://github.com/Joinney",
    githubUrl: "https://github.com/Joinney"
  },
  {
    id: 4,
    title: "G3TD Furniture Store",
    subtitle: "Trang thương mại điện tử nội thất cao cấp ASP.NET Core",
    desc: "Web bán hàng nội thất gia đình hiện đại với kiến trúc ASP.NET Core MVC, Entity Framework Core, SQL Server và tích hợp cổng thanh toán bảo mật chuẩn doanh nghiệp.",
    tech: ["ASP.NET Core", "C#", "SQL Server", "EF Core", "Tailwind CSS"],
    features: [
      "Quản lý danh mục & biến thể",
      "Xác thực phân quyền Role-based",
      "Giỏ hàng & Đặt hàng nhanh",
      "Thống kê doanh thu biểu đồ",
      "Tối ưu SEO Onpage",
      "Bảo mật giao dịch an toàn"
    ],
    floatingTags: ["Enterprise MVC", "SQL Server", "E-Commerce"],
    mockupImg: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80",
    stats: "Retail Enterprise",
    demoUrl: "https://github.com/Joinney",
    githubUrl: "https://github.com/Joinney"
  },
  {
    id: 5,
    title: "Suika Game: Multiverse",
    subtitle: "Web Game giải đố vật lý 2D tương tác cao",
    desc: "Trò chơi ghép trái cây giải đố 2D dựa trên động cơ vật lý Matter.js. Tối ưu hiệu năng rendering bằng HTML5 Canvas và các thuật toán tính toán va chạm vật lý thời gian thực.",
    tech: ["JavaScript", "Matter.js", "HTML5 Canvas", "Web Audio API"],
    features: [
      "Động cơ vật lý chân thực",
      "Hiệu ứng âm thanh nảy vui nhộn",
      "Bảng xếp hạng điểm cao",
      "Chế độ combo tính điểm",
      "Tương thích mọi thiết bị",
      "Tải nhanh không cần cài đặt"
    ],
    floatingTags: ["Physics Engine", "Canvas 2D", "Casual Game"],
    mockupImg: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900&q=80",
    stats: "Casual Web Game",
    demoUrl: "https://github.com/Joinney",
    githubUrl: "https://github.com/Joinney"
  },
  {
    id: 6,
    title: "Personal Glass Portfolio",
    subtitle: "Không gian trưng bày kỹ thuật cá nhân phong cách Glassmorphism",
    desc: "Trang cá nhân tương tác cao áp dụng chuẩn thiết kế Glassmorphism hiện đại, tích hợp WebGL Shader mô phỏng chất lỏng và đồ họa 3D xoay quanh nhân vật trung tâm.",
    tech: ["React.js", "Vite", "WebGL Shaders", "CSS Glass Primitive"],
    features: [
      "Thiết kế kính mờ cao cấp",
      "Vòng quay 3D tương tác độc lập",
      "Mô phỏng nước vật lý WebGL",
      "Hỗ trợ trọn vẹn Dark/Light",
      "Tối ưu mượt mà trên Mobile",
      "Kiến trúc Component sạch"
    ],
    floatingTags: ["Glassmorphism", "WebGL Water", "Interactive 3D"],
    mockupImg: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&q=80",
    stats: "Creative Portfolio",
    demoUrl: "https://github.com/Joinney",
    githubUrl: "https://github.com/Joinney"
  }
];

export default function Projects() {
  const [pausedCardId, setPausedCardId] = useState(null);
  const [activeDetailIndex, setActiveDetailIndex] = useState(0);

  const [cardAngles, setCardAngles] = useState(() =>
    projectList.map((_, index) => (360 / projectList.length) * index)
  );

  const [radii, setRadii] = useState({ rx: 540, ry: 150 });
  const containerRef = useRef(null);
  const detailSectionRef = useRef(null);
  const requestRef = useRef();
  const pausedIdRef = useRef(null);

  useEffect(() => {
    pausedIdRef.current = pausedCardId;
  }, [pausedCardId]);

  // Responsive bán kính vòng xoay 3D
  useEffect(() => {
    const handleResize = () => {
      const containerWidth = containerRef.current 
        ? containerRef.current.offsetWidth 
        : window.innerWidth;

      if (containerWidth <= 380) {
        setRadii({ rx: 135, ry: 55 });
      } else if (containerWidth < 480) {
        setRadii({ rx: 170, ry: 75 });
      } else if (containerWidth < 768) {
        setRadii({ rx: 240, ry: 95 });
      } else if (containerWidth < 1150) {
        setRadii({ rx: 390, ry: 120 });
      } else {
        setRadii({ rx: 550, ry: 160 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Vòng lặp xoay độc lập: chỉ dừng thẻ đang được chạm
  useEffect(() => {
    let lastTime = performance.now();
    
    const animate = (time) => {
      const deltaTime = time - lastTime;
      lastTime = time;
      const angleDelta = deltaTime * 0.015;

      setCardAngles((prevAngles) =>
        prevAngles.map((angle, idx) => {
          const card = projectList[idx];
          if (card.id === pausedIdRef.current) {
            return angle;
          }
          return (angle + angleDelta) % 360;
        })
      );

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Click vào thẻ trên vòng xoay -> Cuộn mượt xuống xem chi tiết
  const handleSelectProject = (idx) => {
    setActiveDetailIndex(idx);
    if (detailSectionRef.current) {
      detailSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentProject = projectList[activeDetailIndex];

  return (
    <div className="projects-page-container">
      {/* ========================================================= */}
      {/* PHẦN 1: VÒNG XOAY ELIP 3D TƯƠNG TÁC QUANH NHÂN VẬT        */}
      {/* ========================================================= */}
      <section className="projects-orbit-wrapper">
        <div className="source-header-clean">
          <div className="source-title-clean">DỰ ÁN NỔI BẬT</div>
          <span className="orbit-hint-text">
            Chạm vào thẻ để dừng xoay • Bấm vào để xem chi tiết bên dưới
          </span>
        </div>

        <div 
          ref={containerRef}
          className="orbit-container"
          style={{
            '--rx': `${radii.rx}px`,
            '--ry': `${radii.ry}px`
          }}
        >
          <div className="orbit-ellipse-line"></div>

          {/* Ảnh nhân vật trung tâm không bóng đen */}
          <div className="center-avatar-clean">
            <img 
              src="/teoproject.png" 
              alt="Teo Building Code" 
              onError={(e) => { e.target.src = '/teo.jpeg'; }} 
            />
          </div>

          {/* Các thẻ dự án xoay 3D */}
          {projectList.map((item, index) => {
            const currentAngleDeg = cardAngles[index] || 0;
            const currentAngleRad = (currentAngleDeg * Math.PI) / 180;

            const x = Math.cos(currentAngleRad) * radii.rx;
            const y = Math.sin(currentAngleRad) * radii.ry;

            const isCurrentPaused = pausedCardId === item.id;
            const isCurrentActive = activeDetailIndex === index;

            const scale = isCurrentPaused 
              ? 1.06 
              : 0.82 + ((y + radii.ry) / (radii.ry * 2 || 1)) * 0.3;

            const opacity = isCurrentPaused 
              ? 1 
              : 0.92 + ((y + radii.ry) / (radii.ry * 2 || 1)) * 0.08;

            const zIndex = isCurrentPaused 
              ? 700 
              : Math.round(150 + (y / (radii.ry || 1)) * 100);

            return (
              <div
                key={item.id}
                className={`box project-card-glass ${isCurrentPaused ? 'is-card-paused' : ''} ${isCurrentActive ? 'is-card-selected' : ''}`}
                style={{
                  '--w': '215px',
                  '--h': 'auto',
                  '--r': '18px',
                  '--tr': '20%',
                  padding: '10px',
                  transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                  opacity: opacity,
                  zIndex: zIndex
                }}
                onMouseEnter={() => setPausedCardId(item.id)}
                onMouseLeave={() => setPausedCardId(null)}
                onTouchStart={() => setPausedCardId(item.id)}
                onTouchEnd={() => setPausedCardId(null)}
                onClick={() => handleSelectProject(index)}
              >
                <div className="circle-overlay"></div>

                <div className="card-inner-glass">
                  <div className="card-thumb">
                    <img src={item.mockupImg} alt={item.title} />
                  </div>
                  <h4 className="project-title">{item.title}</h4>
                  <p className="project-desc">{item.desc}</p>
                  <div className="project-techs">
                    {item.tech.slice(0, 3).map((t, i) => (
                      <span key={i} className="tag-badge">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* PHẦN 2: LĂN XUỐNG DƯỚI - TRÌNH CHIẾU DỰ ÁN CHI TIẾT        */}
      {/* ========================================================= */}
      <section ref={detailSectionRef} className="box project-detail-section">
        <div className="circle-overlay"></div>

        <div className="detail-inner-grid">
          {/* CỘT TRÁI: THÔNG TIN CHI TIẾT */}
          <div className="detail-info-col">
            <div className="detail-meta-header">
              <span className="detail-counter-badge">
                DỰ ÁN {activeDetailIndex + 1} / {projectList.length}
              </span>
              <span className="detail-stat-pill">
                <i className="fas fa-chart-simple"></i> {currentProject.stats}
              </span>
            </div>

            <h2 className="detail-project-title">{currentProject.title}</h2>
            <p className="detail-project-sub">{currentProject.subtitle}</p>
            <p className="detail-project-desc">{currentProject.desc}</p>

            {/* Ngăn xếp công nghệ */}
            <div className="detail-section-block">
              <span className="detail-block-title">NGĂN XẾP CÔNG NGHỆ</span>
              <div className="detail-tech-chips">
                {currentProject.tech.map((t, idx) => (
                  <span key={idx} className="tech-chip-item">{t}</span>
                ))}
              </div>
            </div>

            {/* Tính năng chính (2 cột) */}
            <div className="detail-section-block">
              <span className="detail-block-title">TÍNH NĂNG CHÍNH</span>
              <div className="detail-features-grid">
                {currentProject.features.map((f, idx) => (
                  <div key={idx} className="feature-item">
                    <span className="feature-bullet-dot"></span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nút thao tác */}
            <div className="detail-action-buttons">
              <a 
                href={currentProject.demoUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="box detail-btn-primary" 
                style={{ '--w': 'auto', '--h': '42px', '--r': '9999px' }}
              >
                <div className="circle-overlay"></div>
                <i className="fas fa-arrow-up-right-from-square"></i>
                <span>Xem Demo / Chi Tiết</span>
              </a>

              <a 
                href={currentProject.githubUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="box detail-btn-secondary" 
                style={{ '--w': 'auto', '--h': '42px', '--r': '9999px' }}
              >
                <div className="circle-overlay"></div>
                <i className="fab fa-github"></i>
                <span>Mã Nguồn</span>
              </a>
            </div>
          </div>

          {/* CỘT PHẢI: MOCKUP VÀ FLOATING TAGS ÔM GỌN */}
          <div className="detail-mockup-col">
            <div className="mockup-frame-wrapper">
              {/* Thẻ tag nổi lơ lửng được định vị theo khung ảnh */}
              {currentProject.floatingTags.map((tag, idx) => (
                <div 
                  key={idx} 
                  className={`box floating-tag-badge float-pos-${idx + 1}`}
                  style={{ 
                    '--w': 'auto', 
                    '--h': 'auto', 
                    '--r': '9999px'
                  }}
                >
                  <div className="circle-overlay"></div>
                  <span className="floating-dot"></span>
                  <span>{tag}</span>
                </div>
              ))}

              {/* Tấm Mockup kính */}
              <div className="box mockup-display-card">
                <div className="circle-overlay"></div>
                <img 
                  src={currentProject.mockupImg} 
                  alt={currentProject.title} 
                  className="mockup-img" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Thanh chuyển đổi phân trang */}
        <div className="detail-pagination-bar">
          <button 
            className="box page-arrow-btn"
            style={{ '--w': '38px', '--h': '38px', '--r': '50%' }}
            onClick={() => setActiveDetailIndex(prev => (prev === 0 ? projectList.length - 1 : prev - 1))}
            aria-label="Dự án trước"
          >
            <div className="circle-overlay"></div>
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="pagination-pills-list">
            {projectList.map((p, idx) => (
              <button
                key={p.id}
                className={`page-dot-pill ${activeDetailIndex === idx ? 'active' : ''}`}
                onClick={() => setActiveDetailIndex(idx)}
                aria-label={`Dự án ${idx + 1}`}
              >
                <span>{idx + 1}</span>
              </button>
            ))}
          </div>

          <button 
            className="box page-arrow-btn"
            style={{ '--w': '38px', '--h': '38px', '--r': '50%' }}
            onClick={() => setActiveDetailIndex(prev => (prev === projectList.length - 1 ? 0 : prev + 1))}
            aria-label="Dự án sau"
          >
            <div className="circle-overlay"></div>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </section>

      <style>{`
        .projects-page-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        /* --- PHẦN 1: VÒNG XOAY 3D --- */
        .projects-orbit-wrapper {
          position: relative;
          width: 100%;
          min-height: 680px;
          display: flex;
          flex-direction: column;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          overflow: visible;
        }

        .source-header-clean {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          z-index: 502;
          margin-bottom: 12px;
          flex-wrap: wrap;
          gap: 8px;
        }

        .source-title-clean {
          font-size: 1.35rem;
          font-weight: 800;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .source-title-clean::before {
          content: '';
          width: 4px;
          height: 22px;
          background: #38bdf8;
          border-radius: 2px;
        }

        .orbit-hint-text {
          font-size: 0.82rem;
          color: #94a3b8;
          z-index: 10;
        }

        .orbit-container {
          position: relative;
          width: 100%;
          height: 620px;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1200px;
          margin-top: -30px;
          z-index: 10;
        }

        .orbit-ellipse-line {
          position: absolute;
          width: calc(var(--rx, 550px) * 2);
          height: calc(var(--ry, 160px) * 2);
          border: 2px dashed rgba(56, 189, 248, 0.45);
          border-radius: 50%;
          pointer-events: none;
          transform: rotateX(65deg);
          transition: width 0.3s ease, height 0.3s ease;
        }

        .center-avatar-clean {
          position: absolute;
          z-index: 150;
          width: min(720px, 94vw);
          height: min(720px, 94vw);
          max-height: 640px;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
          transition: width 0.3s ease, height 0.3s ease;
        }

        .center-avatar-clean img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          filter: none !important;
        }

        /* Thẻ xoay 3D */
        .project-card-glass {
          position: absolute;
          display: flex !important;
          flex-direction: column !important;
          align-items: stretch !important;
          justify-content: flex-start !important;
          cursor: pointer;
          touch-action: manipulation;
          transition: border-color 0.2s ease, filter 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
          overflow: hidden;
          user-select: none;
        }

        .project-card-glass.is-card-paused,
        .project-card-glass:hover {
          filter: brightness(1.15) !important;
          border-color: rgba(56, 189, 248, 0.8) !important;
          box-shadow:
              inset 2px -2px 1px -1px rgba(255, 255, 255, 0.8),
              inset -2px 2px 1px -1px rgba(255, 255, 255, 0.8),
              0 18px 40px rgba(56, 189, 248, 0.5) !important;
          opacity: 1 !important;
          z-index: 700 !important;
        }

        .project-card-glass.is-card-selected {
          border-color: #38bdf8 !important;
          box-shadow: 0 0 25px rgba(56, 189, 248, 0.7) !important;
        }

        .card-inner-glass {
          position: relative;
          z-index: 10;
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .project-card-glass .card-thumb {
          width: 100%;
          height: 105px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 8px;
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .project-card-glass .card-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }

        .project-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff !important;
          margin: 4px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .project-desc {
          font-size: 0.74rem;
          color: #cbd5e1 !important;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 30px;
          margin-bottom: 8px;
        }

        .project-techs {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }

        .project-techs .tag-badge {
          font-size: 0.64rem;
          padding: 2px 7px;
          background: rgba(56, 189, 248, 0.15);
          border: 1px solid rgba(56, 189, 248, 0.35);
          color: #38bdf8;
          font-weight: 600;
          border-radius: 6px;
        }

        /* --- PHẦN 2: KHỐI TRÌNH CHIẾU DỰ ÁN CHI TIẾT --- */
        .project-detail-section {
          width: 100% !important;
          padding: 2.2rem !important;
          border-radius: 28px !important;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          cursor: default;
        }

        .detail-inner-grid {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 2.5rem;
          align-items: center;
          width: 100%;
        }

        /* Cột thông tin trái */
        .detail-info-col {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .detail-meta-header {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          flex-wrap: wrap;
        }

        .detail-counter-badge {
          font-size: 0.75rem;
          font-weight: 800;
          color: #38bdf8;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .detail-stat-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 9999px;
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.28);
          color: #cbd5e1;
        }

        .detail-project-title {
          font-size: 2.2rem;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.15;
          letter-spacing: -0.5px;
        }

        .detail-project-sub {
          font-size: 0.95rem;
          font-weight: 700;
          color: #38bdf8;
          line-height: 1.4;
        }

        .detail-project-desc {
          font-size: 0.88rem;
          line-height: 1.7;
          color: #94a3b8;
        }

        .detail-section-block {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .detail-block-title {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 1.2px;
          color: #64748b;
          text-transform: uppercase;
        }

        .detail-tech-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-chip-item {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #f1f5f9;
        }

        .detail-features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.6rem 1.2rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #cbd5e1;
        }

        .feature-bullet-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 6px #38bdf8;
          flex-shrink: 0;
        }

        .detail-action-buttons {
          display: flex;
          gap: 0.8rem;
          flex-wrap: wrap;
          margin-top: 0.6rem;
        }

        .detail-btn-primary {
          padding: 0 1.4rem;
          font-size: 0.85rem;
          font-weight: 800;
          color: #ffffff;
          background: rgba(56, 189, 248, 0.25) !important;
          border-color: rgba(56, 189, 248, 0.6) !important;
          gap: 0.6rem;
          cursor: pointer;
        }
        .detail-btn-primary i, .detail-btn-primary span { z-index: 10; }
        .detail-btn-primary:hover {
          background: rgba(56, 189, 248, 0.4) !important;
          box-shadow: 0 0 20px rgba(56, 189, 248, 0.5);
        }

        .detail-btn-secondary {
          padding: 0 1.3rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: #cbd5e1;
          gap: 0.6rem;
          cursor: pointer;
        }
        .detail-btn-secondary i, .detail-btn-secondary span { z-index: 10; }
        .detail-btn-secondary:hover {
          color: #ffffff;
        }

        /* Cột Mockup & Floating tags phải */
        .detail-mockup-col {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .mockup-frame-wrapper {
          position: relative;
          width: 100%;
          max-width: 440px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .mockup-display-card {
          width: 100% !important;
          height: 480px;
          border-radius: 28px !important;
          overflow: hidden;
          padding: 12px !important;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.7);
        }

        .mockup-img {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
        }

        /* Thẻ tag nổi lơ lửng: Co gọn ôm sát chữ như ảnh mẫu */
        .floating-tag-badge {
          position: absolute;
          z-index: 30;
          width: max-content !important;
          max-width: max-content !important;
          white-space: nowrap;
          padding: 7px 16px !important;
          border-radius: 9999px !important;
          font-size: 0.78rem;
          font-weight: 700;
          color: #ffffff;
          display: inline-flex !important;
          align-items: center;
          gap: 8px;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.65);
          animation: floatSway 4s ease-in-out infinite alternate;
          pointer-events: none;
        }

        .floating-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 8px #38bdf8;
          z-index: 10;
          flex-shrink: 0;
        }
        .floating-tag-badge span { z-index: 10; }

        /* Tọa độ đặt thẻ tag nổi gác mép viền ảnh chuẩn thiết kế */
        .float-pos-1 {
          top: 35px;
          left: -20px;
          animation-delay: 0s;
        }

        .float-pos-2 {
          top: 48%;
          right: -25px;
          animation-delay: 1.5s;
        }

        .float-pos-3 {
          bottom: 40px;
          left: -15px;
          animation-delay: 2.8s;
        }

        @keyframes floatSway {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-10px) rotate(1deg); }
        }

        /* Pagination Bar chuyển đổi dự án */
        .detail-pagination-bar {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.2rem;
          width: 100%;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .page-arrow-btn {
          cursor: pointer;
          color: #94a3b8;
          font-size: 0.85rem;
        }
        .page-arrow-btn i { z-index: 10; }
        .page-arrow-btn:hover { color: #ffffff; }

        .pagination-pills-list {
          display: flex;
          gap: 0.5rem;
        }

        .page-dot-pill {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.04);
          color: #94a3b8;
          font-size: 0.78rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .page-dot-pill:hover {
          color: #ffffff;
          border-color: rgba(56, 189, 248, 0.4);
        }

        .page-dot-pill.active {
          background: #38bdf8;
          border-color: #38bdf8;
          color: #020617;
          box-shadow: 0 0 14px rgba(56, 189, 248, 0.5);
        }

        /* LIGHT MODE */
        body.light-mode .source-title-clean,
        body.light-mode .detail-project-title {
          color: #0f172a !important;
        }

        body.light-mode .orbit-ellipse-line {
          border-color: rgba(2, 132, 199, 0.45);
        }

        body.light-mode .detail-project-sub {
          color: #0284c7 !important;
        }

        body.light-mode .detail-project-desc {
          color: #475569 !important;
        }

        body.light-mode .tech-chip-item {
          background: rgba(0, 0, 0, 0.04);
          border-color: rgba(0, 0, 0, 0.1);
          color: #1e293b;
        }

        body.light-mode .feature-item {
          color: #334155;
        }

        body.light-mode .floating-tag-badge {
          color: #0f172a;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        body.light-mode .page-dot-pill {
          background: rgba(0, 0, 0, 0.04);
          border-color: rgba(0, 0, 0, 0.12);
          color: #64748b;
        }

        body.light-mode .page-dot-pill.active {
          background: #0284c7;
          border-color: #0284c7;
          color: #ffffff;
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .detail-inner-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .detail-mockup-col {
            order: -1;
          }

          .mockup-display-card {
            height: 380px;
          }

          .float-pos-1 { left: 5px; top: 15px; }
          .float-pos-2 { right: 5px; }
          .float-pos-3 { left: 10px; bottom: 15px; }
        }

        @media (max-width: 640px) {
          .detail-project-title {
            font-size: 1.6rem;
          }

          .detail-features-grid {
            grid-template-columns: 1fr;
          }

          .mockup-display-card {
            height: 300px;
          }

          .floating-tag-badge {
            display: none;
          }

          .detail-action-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}