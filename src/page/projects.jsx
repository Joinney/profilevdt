import React, { useState, useEffect, useRef } from 'react';

const projectList = [
  {
    id: 1,
    title: "Supermarket NIIE (Demi Mart)",
    subtitle: "Hệ thống thương mại điện tử & Siêu thị trực tuyến đa kênh",
    desc: "Hệ sinh thái thương mại điện tử siêu thị trực tuyến toàn diện bao gồm Web App (Next.js 14 / TypeScript), Mobile App (React Native), AI Service Chatbot tư vấn và hệ thống Backend Node.js Microservices được triển khai bằng Docker & NGINX.",
    tech: ["Next.js 14", "TypeScript", "React Native", "Node.js", "Python AI", "Docker", "NGINX", "MongoDB"],
    features: [
      "Web App Next.js 14 & Tailwind CSS",
      "Mobile App React Native (iOS & Android)",
      "AI Service Chatbot tư vấn & gợi ý sản phẩm",
      "Backend Microservices & NGINX Reverse Proxy",
      "Đồng bộ giỏ hàng & Đơn hàng Real-time",
      "Admin Dashboard quản lý kho & bán hàng"
    ],
    floatingTags: ["Fullstack Microservices", "AI Chatbot", "Web & Mobile App"],
    mockupImg: "/projects/supermarket_niie.png",
    stats: "E-Commerce System",
    demoUrl: "https://demimart-fe.onrender.com",
    githubUrl: "https://github.com/Joinney/Supermarket_niie"
  },
    {
    id: 2,
    title: "EduTech Central",
    subtitle: "Nền tảng học tập trực tuyến đa dịch vụ & Trợ lý AI",
    desc: "Nền tảng giáo dục trực tuyến toàn diện theo kiến trúc Microservices và Monorepo (pnpm-workspace). Tích hợp Frontend React (Vite), Backend Node.js, PostgreSQL (Prisma ORM), cổng thanh toán VNPay, lớp học Google Meet API và cụm trợ lý AI (DeepSeek, GLM, Qwen) hỗ trợ giải đáp 24/7.",
    tech: ["React.js", "Vite", "Node.js", "PostgreSQL", "Prisma ORM", "DeepSeek AI", "Docker", "VNPay", "Google Meet API"],
    features: [
      "Kiến trúc Monorepo & Microservices",
      "Trợ lý AI đa mô hình (DeepSeek, GLM, Qwen)",
      "Thanh toán khóa học VNPay an toàn",
      "Phòng học trực tuyến Google Meet API",
      "Phân quyền: Học viên, Giảng viên & Admin",
      "Quản lý khóa học, video & tài liệu PDF"
    ],
    floatingTags: ["EdTech Platform", "AI Assistant", "Monorepo Microservices"],
    mockupImg: "/projects/edutechcentral.png",
    stats: "E-Learning Platform",
    demoUrl: "https://edutech-central.onrender.com",
    githubUrl: "https://github.com/Joinney/EduTech_Central"
  },
  {
    id: 3,
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
    stats: "Arcade Fighting Game",
    demoUrl: "https://joinneyz.itch.io/",
    githubUrl: "https://github.com/Joinney/Glitchverse-The-Final-Figh"
  },
  {
    id: 4,
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
    mockupImg: "/projects/greenhouse.png",
    stats: "Smart Agriculture",
    demoUrl: "https://github.com/Joinney/Greenhouse_IOT",
    githubUrl: "https://github.com/Joinney/Greenhouse_IOT"
  },
  {
    id: 5,
    title: "G3TD Furniture Store (Final Project)",
    subtitle: "Đồ án thương mại điện tử nội thất cao cấp ASP.NET Core",
    desc: "Đồ án kết thúc môn / dự án tốt nghiệp xây dựng nền tảng thương mại điện tử kinh doanh nội thất trực tuyến với kiến trúc ASP.NET Core MVC, Entity Framework Core, SQL Server và hệ thống phân quyền giao dịch bảo mật.",
    tech: ["ASP.NET Core", "C#", "SQL Server", "EF Core", "Tailwind CSS"],
    features: [
      "Quản lý danh mục & biến thể",
      "Xác thực phân quyền Role-based",
      "Giỏ hàng & Đặt hàng nhanh",
      "Thống kê doanh thu biểu đồ",
      "Tối ưu SEO Onpage",
      "Bảo mật giao dịch an toàn"
    ],
    floatingTags: ["Enterprise MVC", "SQL Server", "Final Project"],
    mockupImg: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80",
    stats: "Retail Enterprise",
    demoUrl: "https://github.com/ThuanVan060504/Final-Project",
    githubUrl: "https://github.com/ThuanVan060504/Final-Project"
  },
    {
    id: 6,
    title: "PerryFly",
    subtitle: "Game Arcade 2D bay lượn phiêu lưu vui nhộn",
    desc: "Trò chơi hành động bay lượn 2D nhịp độ nhanh lấy cảm hứng từ nhân vật Perry. Điều khiển vượt chướng ngại vật với cơ chế tính toán trọng lực vật lý mượt mà, thu thập vật phẩm và hệ thống ghi điểm theo thời gian thực.",
    tech: ["Unity Engine", "C#", "2D Physics", "Sprite Animation", "Audio FX"],
    features: [
      "Cơ chế điều khiển bay lượn mượt mà",
      "Hệ thống tạo chướng ngại vật ngẫu nhiên",
      "Vật lý va chạm 2D chân thực",
      "Bảng ghi nhận điểm số kỷ lục",
      "Hiệu ứng âm thanh vui nhộn sống động",
      "Tối ưu 60 FPS trải nghiệm mượt mà"
    ],
    floatingTags: ["2D Arcade", "Unity C#", "Physics Flying"],
    mockupImg: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=900&q=80",
    stats: "2D Arcade Game",
    demoUrl: "https://github.com/Joinney/PerryFly",
    githubUrl: "https://github.com/Joinney/PerryFly"
  },
    {
    id: 7,
    title: "Python Shop Bán Hàng Mini",
    subtitle: "Hệ thống ứng dụng quản lý & bán hàng mini bằng Python",
    desc: "Ứng dụng quản lý cửa hàng và bán lẻ mini được phát triển bằng ngôn ngữ Python. Tích hợp cơ sở dữ liệu SQLite gọn nhẹ, giao diện thân thiện trực quan hỗ trợ quản lý sản phẩm, lập giỏ hàng, xuất hóa đơn và thống kê doanh thu bán lẻ.",
    tech: ["Python", "SQLite", "GUI Desktop", "Data Analysis"],
    features: [
      "Quản lý danh mục & mặt hàng cửa hàng",
      "Tạo giỏ hàng và tính tiền tự động",
      "In & xuất hóa đơn bán lẻ chi tiết",
      "Lưu trữ dữ liệu SQLite an toàn, độc lập",
      "Báo cáo thống kê doanh số bán hàng",
      "Dễ cài đặt, chạy mượt mà không tốn tài nguyên"
    ],
    floatingTags: ["Python Core", "SQLite Database", "Retail Management"],
    mockupImg: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=900&q=80",
    stats: "Retail Application",
    demoUrl: "https://github.com/Joinney/Python-shop-ban-hang-mini",
    githubUrl: "https://github.com/Joinney/Python-shop-ban-hang-mini"
  },
    {
    id: 8,
    title: "Hệ Thống Quản Lý Rạp Chiếu Phim",
    subtitle: "Ứng dụng đặt vé & quản lý cụm rạp chiếu phim hiện đại",
    desc: "Hệ thống phần mềm quản lý toàn diện hoạt động của cụm rạp chiếu phim: từ quản lý lịch chiếu, phòng chiếu và sơ đồ ghế ngồi trực quan thời gian thực, đến đặt vé xem phim, bán combo bắp nước và báo cáo doanh thu theo từng suất chiếu.",
    tech: ["C#", ".NET", "SQL Server", "WinForms / WPF", "ADO.NET / EF Core"],
    features: [
      "Quản lý danh mục phim, suất chiếu & định dạng 2D/3D",
      "Sơ đồ chọn ghế ngồi trực quan thời gian thực (VIP / Thường / Đôi)",
      "Bán vé xem phim & tích hợp combo bắp nước",
      "Thống kê doanh thu theo ngày, tháng và từng bộ phim",
      "Phân quyền nhân viên bán vé và quản lý cụm rạp",
      "In hóa đơn và vé xem phim nhanh chóng"
    ],
    floatingTags: ["Cinema Management", "Seat Matrix Real-time", "Ticket Booking"],
    mockupImg: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=900&q=80",
    stats: "Cinema Booking System",
    demoUrl: "https://github.com/Joinney/Quanlyrapchieuphim",
    githubUrl: "https://github.com/Joinney/Quanlyrapchieuphim"
  },
  {
    id: 9,
    title: "Web Quiz - Thi Trắc Nghiệm Trực Tuyến",
    subtitle: "Nền tảng tạo đề & làm bài kiểm tra trắc nghiệm tương tác",
    desc: "Nền tảng web trắc nghiệm trực tuyến linh hoạt hỗ trợ tổ chức thi cử và ôn luyện kiến thức. Tích hợp bộ đếm ngược thời gian làm bài, tự động xáo trộn ngẫu nhiên câu hỏi, chấm điểm tức thì cùng bảng xếp hạng điểm số và xem lại chi tiết đáp án.",
    tech: ["HTML5", "CSS3", "JavaScript", "React.js", "Node.js"],
    features: [
      "Ngân hàng câu hỏi phong phú đa dạng chủ đề",
      "Bộ đếm thời gian làm bài chính xác (Countdown Timer)",
      "Tự động xáo trộn ngẫu nhiên câu hỏi & đáp án",
      "Chấm điểm tức thì & giải thích đáp án chi tiết",
      "Bảng vinh danh thành tích người chơi (Leaderboard)",
      "Giao diện responsive mượt mà trên mọi thiết bị"
    ],
    floatingTags: ["Online Quiz", "Auto Scoring", "Interactive Web"],
    mockupImg: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=900&q=80",
    stats: "Quiz & Testing App",
    demoUrl: "https://github.com/Joinney/web-quizz",
    githubUrl: "https://github.com/Joinney/web-quizz"
  },
  {
    id: 10,
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
    demoUrl: "https://github.com/Joinney/profilevdt",
    githubUrl: "https://github.com/Joinney/profilevdt"
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

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = containerRef.current 
        ? containerRef.current.offsetWidth 
        : window.innerWidth;

      if (containerWidth <= 380) {
        setRadii({ rx: 140, ry: 60 });
      } else if (containerWidth < 480) {
        setRadii({ rx: 165, ry: 75 });
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
            '--ry': `${radii.ry}px`,
            '--orbit-offset-y': `${radii.rx < 200 ? 50 : (radii.rx < 350 ? 25 : 0)}px`
          }}
        >
          <div className="orbit-ellipse-line"></div>

          <div className="center-avatar-clean">
            <img 
              src="/teoproject.png" 
              alt="Võ Duy Toàn" 
              onError={(e) => { e.target.src = '/teo.jpeg'; }} 
            />
          </div>

          {projectList.map((item, index) => {
            const currentAngleDeg = cardAngles[index] || 0;
            const currentAngleRad = (currentAngleDeg * Math.PI) / 180;

            const isMobile = radii.rx < 200;
            const isTablet = radii.rx < 350;
            const yOffset = isMobile ? 50 : (isTablet ? 25 : 0);

            const x = Math.cos(currentAngleRad) * radii.rx;
            const y = Math.sin(currentAngleRad) * radii.ry + yOffset;

            const isCurrentPaused = pausedCardId === item.id;
            const isCurrentActive = activeDetailIndex === index;

            const baseScale = isMobile ? 0.74 : (isTablet ? 0.8 : 0.82);
            const scaleBoost = isMobile ? 0.14 : (isTablet ? 0.22 : 0.3);

            const scale = isCurrentPaused 
              ? (isMobile ? 0.92 : 1.06) 
              : baseScale + (((y - yOffset) + radii.ry) / (radii.ry * 2 || 1)) * scaleBoost;

            const opacity = isCurrentPaused 
              ? 1 
              : 0.92 + (((y - yOffset) + radii.ry) / (radii.ry * 2 || 1)) * 0.08;

            const zIndex = isCurrentPaused 
              ? 700 
              : Math.round(150 + ((y - yOffset) / (radii.ry || 1)) * 100);

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
                    <img src={item.mockupImg} alt={item.title} onError={(e) => { e.target.src = 'https://raw.githubusercontent.com/Joinney/Supermarket_niie/main/Screenshot/demimart.png'; }} />
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
      {/* PHẦN 2: TRÌNH CHIẾU DỰ ÁN CHI TIẾT                       */}
      {/* ========================================================= */}
      <section ref={detailSectionRef} className="box project-detail-section">
        <div className="circle-overlay"></div>

        <div className="detail-inner-grid">
          {/* CỘT TRÁI */}
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

            <div className="detail-section-block">
              <span className="detail-block-title">NGĂN XẾP CÔNG NGHỆ</span>
              <div className="detail-tech-chips">
                {currentProject.tech.map((t, idx) => (
                  <span key={idx} className="tech-chip-item">{t}</span>
                ))}
              </div>
            </div>

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

          {/* CỘT PHẢI */}
          <div className="detail-mockup-col">
            <div className="mockup-frame-wrapper">
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

        {/* Thanh phân trang */}
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
        /* ========================================================= */
        /* HỆ THỐNG KÍNH THỰC THỂ (GLASS SURFACE PRIMITIVE)          */
        /* ========================================================= */
        .box {
          --w: 100%;
          --h: auto;
          --r: 28px;
          --tr: 25%;
          z-index: 10;
          position: relative;
          width: var(--w);
          height: var(--h);
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: var(--r);
          border: 1px double rgba(255, 255, 255, 0.16);

          box-shadow:
              inset 2px -2px 1px -1px rgba(255, 255, 255, 0.5),
              inset -2px 2px 1px -1px rgba(255, 255, 255, 0.5),
              inset 6px -6px 2px -6px rgba(255, 255, 255, 0.3),
              inset -6px 6px 2px -6px rgba(255, 255, 255, 0.3),
              inset 0 0 3px rgba(0, 0, 0, 0.95),
              0 12px 35px rgba(0, 0, 0, 0.7);

          background: rgba(10, 16, 30, 0.82);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          overflow: hidden;
          transition: transform 0.2s ease, filter 0.2s ease, background-color 0.2s ease;
        }

        .box svg {
          filter: drop-shadow(0 20px 3px rgba(0, 0, 0, 0.3));
        }

        .box:before {
          content: '';
          position: absolute;
          z-index: 1;
          top: 35%;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 16px);
          height: calc(100% - 16px);
          border-radius: var(--r);
          border: 1px solid rgba(255, 255, 255, 0.18);
          filter: blur(8px);
          pointer-events: none;
        }

        .box:after {
          z-index: 1;
          content: '';
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border-radius: var(--r);
          filter: blur(2px);
          background: linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.22) 0%,
              transparent var(--tr),
              transparent calc(100% - var(--tr)),
              rgba(255, 255, 255, 0.15) 100%
          );
          pointer-events: none;
        }

        .box .circle-overlay {
          position: absolute;
          z-index: 1;
          inset: 4px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: var(--r);
          filter: blur(1px);
          pointer-events: none;
        }

        .projects-page-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* --- PHẦN 1: VÒNG XOAY 3D --- */
        .projects-orbit-wrapper {
          position: relative;
          width: 100%;
          min-height: auto;
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
          color: var(--text-heading);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .source-title-clean::before {
          content: '';
          width: 4px;
          height: 22px;
          background: var(--accent-color);
          border-radius: 2px;
        }

        .orbit-hint-text {
          font-size: 0.82rem;
          color: var(--text-muted);
          z-index: 10;
        }

        .orbit-container {
          position: relative;
          width: 100%;
          height: 580px;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1200px;
          margin-top: -30px;
          z-index: 10;
        }

        .orbit-ellipse-line {
          position: absolute;
          top: calc(50% + var(--orbit-offset-y, 0px));
          left: 50%;
          transform: translate(-50%, -50%) rotateX(65deg);
          width: calc(var(--rx, 550px) * 2);
          height: calc(var(--ry, 160px) * 2);
          border: 2px dashed var(--orbit-line);
          border-radius: 50%;
          pointer-events: none;
          transition: width 0.3s ease, height 0.3s ease;
        }

        .center-avatar-clean {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 150;
          width: min(680px, 92vw);
          height: min(680px, 92vw);
          max-height: 600px;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
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
          filter: brightness(1.1) !important;
          border-color: var(--accent-color) !important;
          box-shadow: 0 16px 36px var(--accent-glow) !important;
          opacity: 1 !important;
          z-index: 700 !important;
        }

        .project-card-glass.is-card-selected {
          border-color: var(--accent-color) !important;
          box-shadow: 0 0 25px var(--accent-glow) !important;
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
          color: var(--text-heading) !important;
          margin: 4px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .project-desc {
          font-size: 0.74rem;
          color: var(--text-muted) !important;
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
          background: var(--tag-bg);
          border: 1px solid var(--tag-border);
          color: var(--accent-color);
          font-weight: 600;
          border-radius: 6px;
        }

        /* --- PHẦN 2: CHI TIẾT DỰ ÁN --- */
        .project-detail-section {
          width: 100% !important;
          padding: 2rem !important;
          border-radius: 24px !important;
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
          cursor: default;
        }

        .detail-inner-grid {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 2.2rem;
          align-items: center;
          width: 100%;
        }

        .detail-info-col {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
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
          color: var(--accent-color);
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
          background: var(--tag-bg);
          border: 1px solid var(--tag-border);
          color: var(--text-heading);
        }

        .detail-project-title {
          font-size: 2rem;
          font-weight: 900;
          color: var(--text-heading);
          line-height: 1.15;
          letter-spacing: -0.5px;
        }

        .detail-project-sub {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--accent-color);
          line-height: 1.4;
        }

        .detail-project-desc {
          font-size: 0.86rem;
          line-height: 1.65;
          color: var(--text-body);
        }

        .detail-section-block {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .detail-block-title {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 1.2px;
          color: var(--text-muted);
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
          background: var(--chip-bg);
          border: 1px solid var(--chip-border);
          color: var(--text-heading);
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
          color: var(--text-body);
        }

        .feature-bullet-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-color);
          box-shadow: 0 0 6px var(--accent-color);
          flex-shrink: 0;
        }

        .detail-action-buttons {
          display: flex;
          gap: 0.8rem;
          flex-wrap: wrap;
          margin-top: 0.4rem;
        }

        .detail-btn-primary {
          padding: 0 1.4rem;
          font-size: 0.85rem;
          font-weight: 800;
          color: #ffffff !important;
          background: var(--btn-primary-bg) !important;
          border-color: var(--accent-color) !important;
          gap: 0.6rem;
          cursor: pointer;
        }
        .detail-btn-primary i, .detail-btn-primary span { z-index: 10; }
        .detail-btn-primary:hover {
          filter: brightness(1.15);
          box-shadow: 0 0 20px var(--accent-glow);
        }

        .detail-btn-secondary {
          padding: 0 1.3rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-heading);
          gap: 0.6rem;
          cursor: pointer;
        }
        .detail-btn-secondary i, .detail-btn-secondary span { z-index: 10; }
        .detail-btn-secondary:hover {
          color: var(--accent-color);
          border-color: var(--accent-color) !important;
        }

        /* Mockup Frame */
        .detail-mockup-col {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .mockup-frame-wrapper {
          position: relative;
          width: 100%;
          max-width: 420px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .mockup-display-card {
          width: 100% !important;
          height: 440px;
          border-radius: 24px !important;
          overflow: hidden;
          padding: 10px !important;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5);
        }

        .mockup-img {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 18px;
        }

        /* Thẻ tag nổi lơ lửng */
        .floating-tag-badge {
          position: absolute;
          z-index: 30;
          width: max-content !important;
          max-width: max-content !important;
          white-space: nowrap;
          padding: 6px 14px !important;
          border-radius: 9999px !important;
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--text-heading) !important;
          display: inline-flex !important;
          align-items: center;
          gap: 8px;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
          animation: floatSway 4s ease-in-out infinite alternate;
          pointer-events: none;
        }

        .floating-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-color);
          box-shadow: 0 0 8px var(--accent-color);
          z-index: 10;
          flex-shrink: 0;
        }
        .floating-tag-badge span { z-index: 10; }

        .float-pos-1 { top: 30px; left: -15px; animation-delay: 0s; }
        .float-pos-2 { top: 48%; right: -20px; animation-delay: 1.5s; }
        .float-pos-3 { bottom: 35px; left: -10px; animation-delay: 2.8s; }

        @keyframes floatSway {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-8px) rotate(1deg); }
        }

        /* Pagination Bar */
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
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .page-arrow-btn i { z-index: 10; }
        .page-arrow-btn:hover { color: var(--accent-color); }

        .pagination-pills-list {
          display: flex;
          gap: 0.5rem;
        }

        .page-dot-pill {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid var(--chip-border);
          background: var(--chip-bg);
          color: var(--text-muted);
          font-size: 0.78rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .page-dot-pill:hover {
          color: var(--text-heading);
          border-color: var(--accent-color);
        }

        .page-dot-pill.active {
          background: var(--accent-color) !important;
          border-color: var(--accent-color) !important;
          color: #ffffff !important;
          box-shadow: 0 0 14px var(--accent-glow);
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .projects-page-container {
            gap: 1.25rem;
          }
          .detail-inner-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .detail-mockup-col { order: -1; }
          .mockup-display-card { height: 360px; }
          .float-pos-1 { left: 5px; top: 15px; }
          .float-pos-2 { right: 5px; }
          .float-pos-3 { left: 10px; bottom: 15px; }
        }

        @media (max-width: 768px) {
          .projects-page-container {
            gap: 1rem;
          }
          .orbit-container {
            height: 440px;
            margin-top: -15px;
            margin-bottom: 0;
          }
          .center-avatar-clean {
            width: min(440px, 90vw);
            height: min(440px, 90vw);
          }
          .project-card-glass {
            --w: 150px !important;
            width: 150px !important;
            padding: 7px !important;
            border-radius: 14px !important;
          }
          .project-card-glass .card-thumb {
            height: 72px !important;
            margin-bottom: 5px !important;
            border-radius: 8px !important;
          }
          .project-title {
            font-size: 0.8rem !important;
            margin: 2px 0 !important;
          }
          .project-desc {
            display: none !important;
          }
          .project-techs {
            gap: 3px !important;
          }
          .project-techs .tag-badge {
            font-size: 0.58rem !important;
            padding: 1px 5px !important;
          }
          .project-techs .tag-badge:nth-child(n+3) {
            display: none !important;
          }
        }

        @media (max-width: 640px) {
          .detail-project-title { font-size: 1.5rem; }
          .detail-features-grid { grid-template-columns: 1fr; }
          .mockup-display-card { height: 280px; }
          .floating-tag-badge { display: none; }
          .detail-action-buttons { flex-direction: column; }
        }

        @media (max-width: 480px) {
          .projects-page-container {
            gap: 0.75rem;
          }
          .orbit-container {
            height: 380px;
            margin-top: -15px;
            margin-bottom: 0;
          }
          .center-avatar-clean {
            width: min(300px, 82vw);
            height: min(300px, 82vw);
            top: 48%;
            left: 50%;
            transform: translate(-50%, -58%);
          }
          .project-card-glass {
            --w: 104px !important;
            width: 104px !important;
            padding: 5px !important;
            border-radius: 12px !important;
          }
          .project-card-glass .card-thumb {
            height: 48px !important;
            margin-bottom: 3px !important;
            border-radius: 6px !important;
          }
          .project-title {
            font-size: 0.66rem !important;
            margin: 1px 0 !important;
            line-height: 1.2 !important;
          }
          .project-desc {
            display: none !important;
          }
          .project-techs {
            gap: 2px !important;
          }
          .project-techs .tag-badge {
            font-size: 0.48rem !important;
            padding: 1px 4px !important;
          }
          .project-techs .tag-badge:nth-child(n+3) {
            display: none !important;
          }
        }

        /* ========================================================= */
        /* LIGHT MODE CỦA KÍNH THỰC THỂ                              */
        /* ========================================================= */
        body.light-mode .box {
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

        body.light-mode .box:before {
          border: 1px solid rgba(0, 0, 0, 0.9) !important;
          filter: blur(8px) !important;
        }

        body.light-mode .box:after {
          filter: blur(3px) !important;
          background: linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.8) 0%,
              transparent var(--tr),
              transparent calc(100% - var(--tr)),
              rgba(255, 255, 255, 0.8) 100%
          ) !important;
        }

        body.light-mode .box .circle-overlay {
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
        }

        body.light-mode .source-title-clean,
        body.light-mode .detail-project-title,
        body.light-mode .project-title {
          color: #0f172a !important;
          filter: drop-shadow(0 20px 3px rgba(102, 102, 102, 0.15));
        }

        body.light-mode .source-title-clean::before {
          background: #ea580c !important;
          box-shadow: 0 0 8px #ea580c !important;
        }

        body.light-mode .detail-project-sub,
        body.light-mode .detail-counter-badge {
          color: #ea580c !important;
        }

        body.light-mode .detail-project-desc,
        body.light-mode .project-desc,
        body.light-mode .feature-item {
          color: #334155 !important;
        }

        body.light-mode .orbit-hint-text,
        body.light-mode .detail-block-title {
          color: #64748b !important;
        }

        body.light-mode .floating-dot,
        body.light-mode .feature-bullet-dot {
          background: #ea580c !important;
          box-shadow: 0 0 8px #ea580c !important;
        }

        body.light-mode .floating-tag-badge {
          color: #0f172a !important;
        }

        body.light-mode .project-techs .tag-badge,
        body.light-mode .detail-stat-pill {
          color: #ea580c !important;
          background: rgba(234, 88, 12, 0.12) !important;
          border-color: rgba(234, 88, 12, 0.35) !important;
        }

        body.light-mode .detail-btn-primary {
          background: #ea580c !important;
          border-color: #ea580c !important;
          color: #ffffff !important;
          box-shadow: 0 0 16px rgba(234, 88, 12, 0.35) !important;
        }

        body.light-mode .detail-btn-secondary:hover {
          color: #ea580c !important;
          border-color: #ea580c !important;
        }

        body.light-mode .orbit-ellipse-line {
          border-color: rgba(234, 88, 12, 0.45) !important;
        }

        body.light-mode .project-card-glass.is-card-paused,
        body.light-mode .project-card-glass:hover,
        body.light-mode .project-card-glass.is-card-selected {
          border-color: #ea580c !important;
          box-shadow: 0 0 25px rgba(234, 88, 12, 0.35) !important;
        }

        body.light-mode .project-card-glass .card-thumb {
          background: #e2e8f0;
          border-color: rgba(0, 0, 0, 0.1);
        }

        body.light-mode .page-dot-pill {
          background: rgba(0, 0, 0, 0.04) !important;
          border-color: rgba(0, 0, 0, 0.12) !important;
          color: #64748b !important;
        }
        body.light-mode .page-dot-pill:hover {
          color: #0f172a !important;
        }
        body.light-mode .page-dot-pill.active {
          background: #ea580c !important;
          border-color: #ea580c !important;
          color: #ffffff !important;
          box-shadow: 0 0 14px rgba(234, 88, 12, 0.35) !important;
        }

        body.light-mode .page-arrow-btn {
          color: #64748b !important;
        }
        body.light-mode .page-arrow-btn:hover {
          color: #ea580c !important;
        }
      `}</style>
    </div>
  );
}