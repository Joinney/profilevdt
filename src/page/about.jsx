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
    <>
      <div className="layout-2col">
        {/* ========================================= */}
        {/* CỘT CHÍNH (BÊN TRÁI: 2.3fr)               */}
        {/* ========================================= */}
        <div className="col-main">
          {/* 1. Khối Giới thiệu bản thân */}
          <div className="box profile-card" style={{ '--w': '100%', '--h': 'auto', '--r': '26px', '--tr': '18%' }}>
            <div className="circle-overlay"></div>
            
            <div className="about-hero-grid">
              <div className="box about-avatar-box" style={{ '--w': '96px', '--h': '96px', '--r': '9999px', '--tr': '30%' }}>
                <div className="circle-overlay"></div>
                <img 
                  src="/teo.jpeg" 
                  alt="Võ Duy Toàn" 
                  className="avatar-img" 
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/96'; }} 
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
          <div className="box source-section" style={{ '--w': '100%', '--h': 'auto', '--r': '24px', '--tr': '20%' }}>
            <div className="circle-overlay"></div>
            
            <div className="source-header">
              <div className="source-title">HÀNH TRÌNH PHÁT TRIỂN</div>
            </div>

            <div className="about-timeline">
              <div className="timeline-card">
                <div className="box timeline-marker" style={{ '--w': '38px', '--h': '38px', '--r': '50%' }}>
                  <div className="circle-overlay"></div>
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div className="box timeline-body" style={{ '--w': '100%', '--h': 'auto', '--r': '16px', '--tr': '12%' }}>
                  <div className="circle-overlay"></div>
                  <div className="timeline-content-inner">
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
              </div>

              <div className="timeline-card">
                <div className="box timeline-marker" style={{ '--w': '38px', '--h': '38px', '--r': '50%' }}>
                  <div className="circle-overlay"></div>
                  <i className="fas fa-laptop-code"></i>
                </div>
                <div className="box timeline-body" style={{ '--w': '100%', '--h': 'auto', '--r': '16px', '--tr': '12%' }}>
                  <div className="circle-overlay"></div>
                  <div className="timeline-content-inner">
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
              </div>

              <div className="timeline-card">
                <div className="box timeline-marker" style={{ '--w': '38px', '--h': '38px', '--r': '50%' }}>
                  <div className="circle-overlay"></div>
                  <i className="fas fa-rocket"></i>
                </div>
                <div className="box timeline-body" style={{ '--w': '100%', '--h': 'auto', '--r': '16px', '--tr': '12%' }}>
                  <div className="circle-overlay"></div>
                  <div className="timeline-content-inner">
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
        </div>

        {/* ========================================= */}
        {/* CỘT PHỤ (BÊN PHẢI: 1fr)                   */}
        {/* ========================================= */}
        <div className="col-side">
          {/* 4. Khối Kỹ năng kỹ thuật */}
          <div className="box shorts-glass" style={{ '--w': '100%', '--h': 'auto', '--r': '24px', '--tr': '20%' }}>
            <div className="circle-overlay"></div>
            
            <div className="shorts-header">
              <i className="fas fa-layer-group"></i> 
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
          <div className="box uptime-glass" style={{ '--w': '100%', '--h': 'auto', '--r': '20px', '--tr': '15%' }}>
            <div className="circle-overlay"></div>
            
            <div className="uptime-title">
              <i className="fas fa-compass"></i>
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

        .about-btn-link:hover,
        .about-stat-item:hover,
        .timeline-body:hover {
          filter: brightness(1.08);
          transform: translateY(-2px);
          cursor: pointer;
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

        /* ========================================================= */
        /* BỐ CỤC 2 CỘT RỘNG RÃI                                    */
        /* ========================================================= */
        .layout-2col {
          display: grid;
          grid-template-columns: 2.3fr 1fr;
          gap: 1.5rem;
          width: 100%;
        }

        .col-main, .col-side {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
        }

        /* 1. Profile Hero */
        .profile-card {
          width: 100% !important;
          cursor: default;
          padding: 1.6rem 1.4rem;
          display: block;
        }

        .about-hero-grid {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 1.5rem;
          align-items: center;
          width: 100%;
        }

        .about-avatar-box {
          cursor: default;
          overflow: hidden;
          flex-shrink: 0;
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
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.35);
          padding: 3px 12px;
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
          font-size: 1.6rem;
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
        }

        .about-hero-info .role {
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
          color: #38bdf8;
        }

        .about-bio {
          font-size: 0.86rem;
          line-height: 1.65;
          color: #cbd5e1;
        }

        .about-contact-links {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
          margin-top: 0.4rem;
        }

        .about-btn-link {
          padding: 0 1.2rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: #cbd5e1;
          gap: 0.5rem;
        }
        .about-btn-link i, .about-btn-link span { z-index: 10; }

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
          color: #fff;
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
        .source-section {
          width: 100% !important;
          padding: 2rem !important;
          display: flex;
          flex-direction: column;
          gap: 1.5rem !important;
          cursor: default;
        }

        .source-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 10;
          width: 100%;
        }

        .source-title {
          font-size: 1.25rem;
          font-weight: 900;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          letter-spacing: 0.5px;
        }

        .source-title:before {
          content: '';
          width: 4px;
          height: 22px;
          background: #38bdf8;
          border-radius: 2px;
        }

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
          flex-shrink: 0;
          color: #38bdf8;
          font-size: 0.85rem;
        }
        .timeline-marker i { z-index: 10; }

        .timeline-body {
          flex: 1;
          padding: 1.1rem 1.3rem !important;
          align-items: stretch !important;
        }

        .timeline-content-inner {
          position: relative;
          z-index: 10;
          width: 100%;
          display: flex;
          flex-direction: column;
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
        .shorts-glass {
          width: 100% !important;
          padding: 1.5rem !important;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          cursor: default;
        }

        .shorts-header {
          font-size: 0.95rem;
          font-weight: 800;
          color: #fff;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .shorts-header i {
          color: #38bdf8;
        }

        .skill-groups-container {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          width: 100%;
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

        .skill-tags-flow .tag-badge {
          font-size: 0.68rem;
          padding: 3px 10px;
          border-radius: 9999px;
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #38bdf8;
        }

        /* 5. Cột phải: Nguyên tắc */
        .uptime-glass {
          width: 100% !important;
          padding: 1.3rem !important;
          display: flex;
          flex-direction: column;
          align-items: flex-start !important;
          gap: 0.8rem;
          cursor: default;
        }

        .uptime-title {
          font-size: 0.75rem;
          letter-spacing: 1px;
          font-weight: 800;
          text-transform: uppercase;
          color: #64748b;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .uptime-title i {
          color: #38bdf8;
        }

        .work-principles-list {
          position: relative;
          z-index: 10;
          list-style: none;
          padding: 0;
          margin: 0;
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

        /* ========================================================= */
        /* MÀU CHỮ LIGHT MODE: ĐEN & CAM                             */
        /* ========================================================= */
        body.light-mode .name,
        body.light-mode .source-title,
        body.light-mode .stat-val,
        body.light-mode .timeline-head h4,
        body.light-mode .shorts-header,
        body.light-mode .about-btn-link {
          color: #0f172a !important;
          filter: drop-shadow(0 20px 3px rgba(102, 102, 102, 0.15));
        }

        body.light-mode .role,
        body.light-mode .stat-icon,
        body.light-mode .timeline-marker,
        body.light-mode .shorts-header i,
        body.light-mode .skill-group-title i,
        body.light-mode .uptime-title i,
        body.light-mode .work-principles-list li i {
          color: #ea580c !important;
        }

        body.light-mode .source-title:before,
        body.light-mode .status-dot {
          background: #ea580c !important;
          box-shadow: 0 0 8px #ea580c !important;
        }

        body.light-mode .about-status-badge,
        body.light-mode .timeline-tag {
          color: #ea580c !important;
          background: rgba(234, 88, 12, 0.12) !important;
          border-color: rgba(234, 88, 12, 0.35) !important;
        }

        body.light-mode .stat-label,
        body.light-mode .timeline-sub,
        body.light-mode .skill-group-title,
        body.light-mode .uptime-title {
          color: #64748b !important;
        }

        body.light-mode .about-bio,
        body.light-mode .timeline-text,
        body.light-mode .work-principles-list li {
          color: #334155 !important;
        }

        body.light-mode .about-bio strong,
        body.light-mode .timeline-text strong,
        body.light-mode .work-principles-list li strong {
          color: #0f172a !important;
        }

        body.light-mode .skill-tags-flow .tag-badge {
          background: rgba(234, 88, 12, 0.12) !important;
          border-color: rgba(234, 88, 12, 0.35) !important;
          color: #ea580c !important;
        }

        body.light-mode .about-timeline:before {
          background: rgba(0, 0, 0, 0.1) !important;
        }

        /* ========================================================= */
        /* RESPONSIVE                                                */
        /* ========================================================= */
        @media (max-width: 1150px) {
          .layout-2col { grid-template-columns: 1fr; }
          .about-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .box {
            --r: 18px;
          }

          .about-hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            justify-items: center;
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
            --w: 32px !important;
            --h: 32px !important;
            font-size: 0.75rem !important;
          }

          .about-timeline:before {
            left: 15px;
          }
        }

        @media (max-width: 380px) {
          .box {
            --r: 14px;
          }
        }
      `}</style>
    </>
  );
}