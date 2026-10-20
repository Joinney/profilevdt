import React, { useState, useEffect, useRef } from 'react';

const projectList = [
  {
    id: 1,
    title: "Demi Mart",
    desc: "Nền tảng thương mại điện tử Microservices với Next.js 14, React Native, Node.js, Docker & Redis.",
    tech: ["Next.js", "Node.js", "Docker", "MongoDB"],
    img: "https://images.unsplash.com/photo-1557821552-17105176677c?w=500&q=80"
  },
  {
    id: 2,
    title: "Glitchverse: The Final Fight",
    desc: "Dự án Game 2D đối kháng phát triển bằng Unity Engine với hệ thống AI Finite State Machine.",
    tech: ["Unity", "C#", "Cinemachine"],
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80"
  },
  {
    id: 3,
    title: "G3TD Furniture Store",
    desc: "Website bán đồ nội thất thương mại điện tử sử dụng ASP.NET Core MVC & SQL Server.",
    tech: ["ASP.NET Core", "C#", "SQL Server"],
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&q=80"
  },
  {
    id: 4,
    title: "Suika Game: Đa Vũ Trụ",
    desc: "Web game ghép trái cây vật lý 2D xây dựng bằng Matter.js và HTML5 Canvas.",
    tech: ["JavaScript", "Matter.js", "HTML5"],
    img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80"
  },
  {
    id: 5,
    title: "Smart Greenhouse IoT",
    desc: "Hệ thống giám sát và điều khiển nhà kính thông minh sử dụng ESP32, ESP8266 & Cảm biến.",
    tech: ["ESP32", "C++", "IoT", "Web App"],
    img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500&q=80"
  },
  {
    id: 6,
    title: "Personal Portfolio",
    desc: "Trang thông tin cá nhân thiết kế theo phong cách Glassmorphic UI tương tác cao.",
    tech: ["React", "CSS Glass", "JavaScript"],
    img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&q=80"
  }
];

export default function Projects() {
  const [isPaused, setIsPaused] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const requestRef = useRef();
  
  // BÁN KÍNH ELIP NGANG 3D OÂM TRỌN
  const radiusX = 460; 
  const radiusY = 120; 

  useEffect(() => {
    let lastTime = performance.now();
    
    const animate = (time) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      if (!isPaused) {
        setRotationAngle((prev) => (prev + deltaTime * 0.015) % 360);
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPaused]);

  return (
    <div className="projects-orbit-wrapper">
      <style>{`
        /* BỎ HOÀN TOÀN KHUNG VIỀN MÀNG KÍNH BỌC NGOÀI */
        .projects-orbit-wrapper {
          position: relative;
          width: 100%;
          min-height: 580px;
          display: flex;
          flex-direction: column;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }

        .source-header-clean {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          z-index: 502;
          margin-bottom: 10px;
        }

        .source-title-clean {
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .source-title-clean::before {
          content: '';
          width: 4px;
          height: 20px;
          background: #38bdf8;
          border-radius: 2px;
        }

        body.light-mode .source-title-clean {
          color: #2b2b2b !important;
        }

        /* KHUNG CHỨA CẢ CỤM - ĐẨY LÊN CAO NƠI CÂN ĐỐI (-60px) */
        .orbit-container {
          position: relative;
          width: 100%;
          height: 520px;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1000px;
          margin-top: -60px; /* ĐẨY CẢ CỤM LÊN CAO BẰNG MARGIN ÂM */
          z-index: 10;
        }

        .orbit-ellipse-line {
          position: absolute;
          width: ${radiusX * 2}px;
          height: ${radiusY * 2}px;
          border: 2px dashed rgba(56, 189, 248, 0.4);
          border-radius: 50%;
          pointer-events: none;
          transform: rotateX(65deg);
        }

        body.light-mode .orbit-ellipse-line {
          border-color: rgba(2, 132, 199, 0.4);
        }

        /* ẢNH NHÂN VẬT SIÊU TO (580px) GIỮ MÀU SẮC TƯƠI RỰC RỠ 100% GỐC */
        .center-avatar-clean {
          position: absolute;
          z-index: 100;
          width: 580px;
          height: 580px;
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
          filter: none !important; /* XÓA HẲN BỘ LỌC CONTRAST ĐỂ KHÔNG BỊ BIẾN MÀU */
        }

        /* THẺ BÀI DỰ ÁN 3D - HIỂN THỊ RÕ NÉT CĂNG */
        .project-card-orbit {
          position: absolute;
          width: 215px;
          padding: 12px;
          border-radius: 16px;
          background: #0f172a !important;
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.7);
          transition: transform 0.1s linear, border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
          cursor: pointer;
        }

        body.light-mode .project-card-orbit {
          background: #ffffff !important;
          border: 1px solid rgba(0, 0, 0, 0.15) !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12) !important;
        }

        body.light-mode .project-title {
          color: #0f172a !important;
        }

        body.light-mode .project-desc {
          color: #475569 !important;
        }

        .project-card-orbit:hover {
          border-color: #38bdf8 !important;
          box-shadow: 0 12px 30px rgba(56, 189, 248, 0.45) !important;
          opacity: 1 !important;
          z-index: 500 !important;
        }

        .project-card-orbit .card-thumb {
          width: 100%;
          height: 100px;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 8px;
          background: #1e293b;
        }

        .project-card-orbit .card-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: none !important; /* GIỮ NGUYÊN ĐỘ NÉT RÕ CỦA HÌNH ẢNH THẺ */
        }

        .project-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: #ffffff !important;
          margin: 4px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .project-desc {
          font-size: 0.72rem;
          color: #cbd5e1 !important;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 28px;
          margin-bottom: 8px;
        }

        .project-techs {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }

        .project-techs .tag-badge {
          font-size: 0.62rem;
          padding: 2px 6px;
          background: rgba(56, 189, 248, 0.2);
          border: 1px solid rgba(56, 189, 248, 0.4);
          color: #38bdf8;
          font-weight: 600;
          border-radius: 6px;
        }

        body.light-mode .project-techs .tag-badge {
          color: #0284c7;
        }

        @media (max-width: 768px) {
          .orbit-container { height: 420px; margin-top: -20px; }
          .center-avatar-clean { width: 320px; height: 320px; }
          .project-card-orbit { width: 150px; padding: 8px; }
          .project-card-orbit .card-thumb { height: 60px; }
        }
      `}</style>

      <div className="source-header-clean">
        <div className="source-title-clean">DỰ ÁN CỦA TÔI</div>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8', zIndex: 10 }}>
          Rê chuột vào để tạm dừng xoay
        </span>
      </div>

      <div 
        className="orbit-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="orbit-ellipse-line"></div>

        {/* ANH NHAN VAT TRUNG TAM CĂN GIỮA KHUNG */}
        <div className="center-avatar-clean">
          <img 
            src="/teoproject.png" 
            alt="Teo Building Code" 
            onError={(e) => { e.target.src = '/teo.jpeg'; }} 
          />
        </div>

        {/* CÁC THẺ DỰ ÁN XOAY ELIP NGANG 3D - HIỂN THỊ RÕ NÉT CĂNG */}
        {projectList.map((item, index) => {
          const stepAngle = (360 / projectList.length) * index;
          const currentAngleRad = ((rotationAngle + stepAngle) * Math.PI) / 180;

          const x = Math.cos(currentAngleRad) * radiusX;
          const y = Math.sin(currentAngleRad) * radiusY;

          const scale = 0.82 + ((y + radiusY) / (radiusY * 2)) * 0.3;
          // TĂNG ĐỘ MỜ TỪ 0.92 ĐẾN 1.0 ĐỂ THẺ BÀI LUÔN RÕ NÉT
          const opacity = 0.92 + ((y + radiusY) / (radiusY * 2)) * 0.08;
          const zIndex = Math.round(y + 300);

          return (
            <div
              key={item.id}
              className="project-card-orbit"
              style={{
                transform: `translate(${x}px, ${y}px) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex
              }}
            >
              <div className="card-thumb">
                <img src={item.img} alt={item.title} />
              </div>
              <h4 className="project-title">{item.title}</h4>
              <p className="project-desc">{item.desc}</p>
              <div className="project-techs">
                {item.tech.slice(0, 3).map((t, i) => (
                  <span key={i} className="tag-badge">{t}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}