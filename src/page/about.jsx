import React from 'react';

export default function About() {
  const techCategories = [
    {
      category: "Frontend & Mobile",
      icon: "fa-laptop-code",
      skills: ["React.js", "Next.js", "React Native", "Flutter", "Tailwind CSS", "TypeScript"]
    },
    {
      category: "Backend & Systems",
      icon: "fa-server",
      skills: ["Node.js", "Go", "Python", "ASP.NET Core", "RESTful API", "Microservices"]
    },
    {
      category: "Database & Cloud",
      icon: "fa-database",
      skills: ["PostgreSQL", "MongoDB", "Redis", "RabbitMQ", "Docker", "Supabase"]
    },
    {
      category: "Game & IoT Hardware",
      icon: "fa-microchip",
      skills: ["Unity 2D/3D", "C# Game Dev", "ESP32", "Firebase IoT", "MCP Protocol"]
    }
  ];

  const highlights = [
    { label: "GPA Tích Lũy", val: "3.2 / 4.0", icon: "fa-graduation-cap" },
    { label: "Kinh Nghiệm", val: "Intern Backend", icon: "fa-briefcase" },
    { label: "Dự Án Hoàn Thành", val: "12+ Apps", icon: "fa-folder-tree" },
    { label: "Địa Điểm", val: "TP. Hồ Chí Minh", icon: "fa-location-dot" }
  ];

  return (
    <div className="about-container-wrapper">
      {/* BỐ CỤC 2 CỘT TÁCH BIỆT RÕ RÀNG */}
      <div className="layout-2col">
        {/* ========================================= */}
        {/* CỘT CHÍNH (BÊN TRÁI: 2.2fr)               */}
        {/* ========================================= */}
        <div className="col-main">
          {/* 1. Khối Giới thiệu bản thân */}
          <div className="box profile-card" style={{ '--w': '100%', '--h': 'auto', '--r': '26px', '--tr': '18%' }}>
            <div className="circle-overlay"></div>
            
            <div className="about-hero-grid">
              <div className="box about-avatar-box" style={{ '--w': '100px', '--h': '100px', '--r': '9999px', '--tr': '25%' }}>
                <div className="circle-overlay"></div>
                <img 
                  src="/teo.jpeg" 
                  alt="Võ Duy Toàn" 
                  className="avatar-img" 
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/100'; }} 
                />
              </div>

              <div className="about-hero-info">
                <div className="about-status-badge">
                  <span className="status-dot"></span> Sẵn sàng đón nhận cơ hội mới
                </div>
                <h1 className="name">Võ Duy Toàn</h1>
                <p className="role">Full-Stack & Software Engineer</p>
                <p className="about-bio">
                  Sinh viên năm cuối ngành Kỹ thuật Phần mềm tại <strong>Trường Đại học Nguyễn Tất Thành</strong>. 
                  Tập trung chuyên sâu vào kiến trúc <strong>Microservices đa ngôn ngữ</strong>, xây dựng hệ thống 
                  phân tán hiệu năng cao, ứng dụng di động đa nền tảng và tích hợp IoT AI.
                </p>

                <div className="about-contact-links">
                  <a href="https://github.com/Joinney" target="_blank" rel="noreferrer" className="box about-btn-link" style={{ '--w': 'auto', '--h': '38px', '--r': '9999px' }}>
                    <div className="circle-overlay"></div>
                    <i className="fab fa-github"></i>
                    <span>GitHub</span>
                  </a>
                  <a href="https://www.linkedin.com/in/zvoduytoanz/" target="_blank" rel="noreferrer" className="box about-btn-link" style={{ '--w': 'auto', '--h': '38px', '--r': '9999px' }}>
                    <div className="circle-overlay"></div>
                    <i className="fab fa-linkedin"></i>
                    <span>LinkedIn</span>
                  </a>
                  <a href="mailto:contact@voduytoan.dev" className="box about-btn-link" style={{ '--w': 'auto', '--h': '38px', '--r': '9999px' }}>
                    <div className="circle-overlay"></div>
                    <i className="fas fa-envelope"></i>
                    <span>Email Me</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Lưới 4 thẻ thống kê nhanh */}
          <div className="about-stats-grid">
            {highlights.map((item, index) => (
              <div key={index} className="box about-stat-item" style={{ '--w': '100%', '--h': 'auto', '--r': '20px', '--tr': '15%' }}>
                <div className="circle-overlay"></div>
                <div className="stat-content">
                  <i className={`fas ${item.icon} stat-icon`}></i>
                  <div>
                    <span className="stat-val">{item.val}</span>
                    <span className="stat-label">{item.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 3. Khối Học vấn & Hành trình */}
          <div className="box source-section" style={{ '--w': '100%', '--h': 'auto', '--r': '26px', padding: '1.8rem' }}>
            <div className="circle-overlay"></div>
            
            <div className="source-header" style={{ marginBottom: '1.2rem' }}>
              <div className="source-title">HÀNH TRÌNH PHÁT TRIỂN</div>
            </div>

            <div className="about-timeline">
              <div className="timeline-card">
                <div className="timeline-marker">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div className="timeline-body">
                  <div className="timeline-head">
                    <h4>Đại học Nguyễn Tất Thành (NTTU)</h4>
                    <span className="timeline-tag">2022 - 2026</span>
                  </div>
                  <p className="timeline-sub">Cử nhân Kỹ thuật Phần mềm • GPA: 3.2 / 4.0</p>
                  <p className="timeline-text">
                    Nghiên cứu cấu trúc dữ liệu và giải thuật, nguyên lý hệ thống phân tán, kiến trúc hướng dịch vụ (SOA), quy trình CI/CD và phương pháp phát triển Agile/Scrum.
                  </p>
                </div>
              </div>

              <div className="timeline-card">
                <div className="timeline-marker">
                  <i className="fas fa-laptop-code"></i>
                </div>
                <div className="timeline-body">
                  <div className="timeline-head">
                    <h4>ETECHS Company</h4>
                    <span className="timeline-tag">03/2026 - 05/2026</span>
                  </div>
                  <p className="timeline-sub">Backend Developer Intern</p>
                  <p className="timeline-text">
                    Thiết kế và tối ưu RESTful API, triển khai xác thực JWT/OAuth2, kết nối CSDL PostgreSQL & NoSQL, đồng thời đóng gói container Docker cho môi trường staging.
                  </p>
                </div>
              </div>

              <div className="timeline-card">
                <div className="timeline-marker">
                  <i className="fas fa-rocket"></i>
                </div>
                <div className="timeline-body">
                  <div className="timeline-head">
                    <h4>Dự Án Nghiên Cứu & Độc Lập</h4>
                    <span className="timeline-tag">Hiện tại</span>
                  </div>
                  <p className="timeline-sub">Architect & Lead Developer</p>
                  <p className="timeline-text">
                    Trực tiếp phát triển nền tảng thương mại điện tử Polyglot Microservices <strong>Demi Mart</strong>, Game đối kháng 2D Unity <strong>Glitchverse</strong> và hệ thống giám sát nông nghiệp thông minh <strong>G3TD Smart Greenhouse IoT</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* CỘT PHỤ (BÊN PHẢI: 1fr)                   */}
        {/* ========================================= */}
        <div className="col-side">
          {/* 4. Khối Kỹ năng kỹ thuật */}
          <div className="box shorts-glass" style={{ '--w': '100%', '--h': 'auto', '--r': '26px', padding: '1.6rem' }}>
            <div className="circle-overlay"></div>
            
            <div className="shorts-header">
              <i className="fas fa-layer-group" style={{ color: '#38bdf8' }}></i> 
              <span>Kỹ Năng Kỹ Thuật</span>
            </div>

            <div className="skill-groups-container">
              {techCategories.map((group, idx) => (
                <div key={idx} className="skill-group-block">
                  <div className="skill-group-title">
                    <i className={`fas ${group.icon}`}></i>
                    <span>{group.category}</span>
                  </div>
                  <div className="skill-tags-flow">
                    {group.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="tag-badge">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Khối Nguyên tắc làm việc */}
          <div className="box uptime-glass" style={{ '--w': '100%', '--h': 'auto', '--r': '24px', alignItems: 'flex-start', padding: '1.5rem' }}>
            <div className="circle-overlay"></div>
            
            <div className="uptime-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-compass" style={{ color: '#38bdf8' }}></i>
              <span>NGUYÊN TẮC LÀM VIỆC</span>
            </div>
            
            <ul className="work-principles-list">
              <li>
                <i className="fas fa-check-circle"></i>
                <span><strong>Code sạch & có cấu trúc:</strong> Áp dụng chuẩn SOLID, Clean Architecture dễ bảo trì.</span>
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                <span><strong>Hiệu năng làm trọng tâm:</strong> Tối ưu truy vấn DB, áp dụng Caching và hạn chế nghẽn I/O.</span>
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                <span><strong>Liên tục cập nhật:</strong> Chủ động nghiên cứu công nghệ mới và ứng dụng AI vào quy trình kỹ thuật.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .about-container-wrapper {
          width: 100%;
        }

        /* BỐ CỤC 2 CỘT TÁCH BIỆT */
        .layout-2col {
          display: grid;
          grid-template-columns: 2.2fr 1fr;
          gap: 1.5rem;
          width: 100%;
          align-items: start;
        }

        .col-main, .col-side {
          display: flex;
          flex-direction: column;
          gap: 1.5rem; /* Khoảng cách rộng giữa các khối kính */
          width: 100%;
        }

        /* 1. Profile Hero */
        .about-hero-grid {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 1.8rem;
          align-items: center;
          width: 100%;
          padding: 1.8rem 1.6rem;
        }

        .about-avatar-box {
          cursor: default;
          flex-shrink: 0;
          overflow: hidden;
        }

        .about-avatar-box .avatar-img {
          width: calc(100% - 10px);
          height: calc(100% - 10px);
          border-radius: 50%;
          object-fit: cover;
          z-index: 2;
          background-color: #1e293b;
        }

        .about-hero-info {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          text-align: left;
        }

        .about-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          align-self: flex-start;
          font-size: 0.72rem;
          font-weight: 700;
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.3);
          padding: 4px 12px;
          border-radius: 9999px;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 8px #38bdf8;
          animation: pulseGlow 1.8s infinite;
        }

        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.35); opacity: 0.6; }
        }

        .about-hero-info .name {
          font-size: 1.65rem;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.2;
        }

        .about-hero-info .role {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #38bdf8;
        }

        .about-bio {
          font-size: 0.88rem;
          line-height: 1.65;
          color: #cbd5e1;
          margin-top: 2px;
        }

        .about-contact-links {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
          margin-top: 0.6rem;
        }

        .about-btn-link {
          padding: 0 1.1rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: #cbd5e1;
          gap: 0.5rem;
          cursor: pointer;
        }
        .about-btn-link i, .about-btn-link span { z-index: 10; }
        .about-btn-link:hover {
          color: #ffffff;
          filter: brightness(1.15);
          transform: translateY(-2px);
        }

        /* 2. Grid 4 Stats */
        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          width: 100%;
        }

        .about-stat-item {
          padding: 1.1rem !important;
          cursor: default;
        }

        .stat-content {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          width: 100%;
        }

        .stat-icon {
          font-size: 1.35rem;
          color: #38bdf8;
        }

        .stat-val {
          display: block;
          font-size: 1.05rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.2;
        }

        .stat-label {
          display: block;
          font-size: 0.68rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #64748b;
        }

        /* 3. Timeline */
        .about-timeline {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .about-timeline:before {
          content: '';
          position: absolute;
          left: 18px;
          top: 15px;
          bottom: 15px;
          width: 2px;
          background: rgba(255, 255, 255, 0.1);
          z-index: 1;
        }

        .timeline-card {
          position: relative;
          display: flex;
          gap: 1.2rem;
          align-items: flex-start;
          z-index: 2;
        }

        .timeline-marker {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #0b1329;
          border: 1.5px solid #38bdf8;
          color: #38bdf8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          flex-shrink: 0;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
        }

        .timeline-body {
          flex: 1;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 1.1rem 1.3rem;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .timeline-body:hover {
          border-color: rgba(56, 189, 248, 0.35);
          background: rgba(255, 255, 255, 0.05);
        }

        .timeline-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 4px;
        }

        .timeline-head h4 {
          font-size: 0.98rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .timeline-tag {
          font-size: 0.72rem;
          font-weight: 700;
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.25);
          padding: 2px 8px;
          border-radius: 6px;
        }

        .timeline-sub {
          font-size: 0.8rem;
          font-weight: 600;
          color: #94a3b8;
          margin: 0 0 8px 0;
        }

        .timeline-text {
          font-size: 0.82rem;
          line-height: 1.55;
          color: #cbd5e1;
          margin: 0;
        }

        /* 4. Cột phải: Kỹ năng */
        .skill-groups-container {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          width: 100%;
          margin-top: 0.5rem;
        }

        .skill-group-block {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .skill-group-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #94a3b8;
        }

        .skill-group-title i {
          color: #38bdf8;
          font-size: 0.85rem;
        }

        .skill-tags-flow {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        /* 5. Cột phải: Nguyên tắc */
        .work-principles-list {
          position: relative;
          z-index: 10;
          list-style: none;
          padding: 0;
          margin: 0.8rem 0 0 0;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          width: 100%;
        }

        .work-principles-list li {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-size: 0.8rem;
          line-height: 1.5;
          color: #cbd5e1;
        }

        .work-principles-list li i {
          color: #38bdf8;
          font-size: 0.85rem;
          margin-top: 3px;
          flex-shrink: 0;
        }

        /* LIGHT MODE */
        body.light-mode .about-hero-info .name,
        body.light-mode .stat-val,
        body.light-mode .timeline-head h4 {
          color: #1e293b !important;
        }

        body.light-mode .about-bio,
        body.light-mode .timeline-text,
        body.light-mode .work-principles-list li {
          color: #475569 !important;
        }

        body.light-mode .about-btn-link {
          color: #475569;
        }
        body.light-mode .about-btn-link:hover {
          color: #000000;
        }

        body.light-mode .timeline-marker {
          background: #f1f5f9;
          border-color: #0284c7;
          color: #0284c7;
        }

        body.light-mode .timeline-body {
          background: rgba(0, 0, 0, 0.02);
          border-color: rgba(0, 0, 0, 0.08);
        }

        /* RESPONSIVE */
        @media (max-width: 1150px) {
          .layout-2col {
            grid-template-columns: 1fr; /* Xuống 1 cột trên màn hình nhỏ */
          }
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .about-hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            justify-items: center;
            padding: 1.2rem;
            gap: 1rem;
          }

          .about-hero-info {
            align-items: center;
            text-align: center;
          }

          .about-status-badge {
            align-self: center;
          }

          .about-contact-links {
            justify-content: center;
          }

          .about-stats-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }

          .timeline-card {
            gap: 0.8rem;
          }

          .timeline-marker {
            width: 32px;
            height: 32px;
            font-size: 0.75rem;
          }

          .about-timeline:before {
            left: 15px;
          }
        }
      `}</style>
    </div>
  );
}