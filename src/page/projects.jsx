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
  const [radii, setRadii] = useState({ rx: 540, ry: 150 });
  const containerRef = useRef(null);
  const requestRef = useRef();

  // ĐIỀU CHỈNH QUỸ ĐẠO TỰ ĐỘNG THEO MỌI CỠ MÀN HÌNH
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

  // VÒNG LẶP CHUYỂN ĐỘNG XOAY 60FPS
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
        .projects-orbit-wrapper {
          position: relative;
          width: 100%;
          min-height: 720px;
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

        body.light-mode .source-title-clean {
          color: #2b2b2b !important;
        }

        /* KHUNG CHỨA TOÀN BỘ QUỸ ĐẠO */
        .orbit-container {
          position: relative;
          width: 100%;
          height: 660px;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1200px;
          margin-top: -30px;
          z-index: 10;
        }

        /* ĐƯỜNG QUỸ ĐẠO ELIP CHẠY VÒNG */
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

        body.light-mode .orbit-ellipse-line {
          border-color: rgba(2, 132, 199, 0.45);
        }

        /* ẢNH NHÂN VẬT TRUNG TÂM (KHÔNG BÓNG ĐEN) */
        .center-avatar-clean {
          position: absolute;
          z-index: 150;
          width: min(750px, 96vw);
          height: min(750px, 96vw);
          max-height: 680px;
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
          filter: none !important; /* XÓA BỎ HOÀN TOÀN BÓNG ĐEN */
        }

        /* THẺ BÀI DỰ ÁN 3D CHUẨN KÍNH GLASSMORPHISM */
        .project-card-glass {
          position: absolute;
          display: flex !important;
          flex-direction: column !important;
          align-items: stretch !important;
          justify-content: flex-start !important;
          cursor: pointer;
          touch-action: manipulation;
          transition: transform 0.1s linear, filter 0.2s ease, opacity 0.2s ease;
          overflow: hidden;
        }

        .project-card-glass:hover {
          filter: brightness(1.12);
          border-color: rgba(56, 189, 248, 0.6) !important;
          box-shadow:
              inset 2px -2px 1px -1px rgba(255, 255, 255, 0.7),
              inset -2px 2px 1px -1px rgba(255, 255, 255, 0.7),
              0 15px 35px rgba(56, 189, 248, 0.45) !important;
          opacity: 1 !important;
          z-index: 600 !important;
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

        /* LIGHT MODE CHO THẺ DỰ ÁN */
        body.light-mode .project-title {
          color: #0f172a !important;
        }

        body.light-mode .project-desc {
          color: #475569 !important;
        }

        body.light-mode .project-techs .tag-badge {
          background: rgba(2, 132, 199, 0.1);
          border-color: rgba(2, 132, 199, 0.3);
          color: #0284c7;
        }

        /* RESPONSIVE TABLET & MOBILE */
        @media (max-width: 768px) {
          .projects-orbit-wrapper {
            min-height: 580px;
          }
          .orbit-container {
            height: 520px;
            margin-top: -15px;
          }
          .center-avatar-clean {
            width: min(520px, 92vw);
            height: min(520px, 92vw);
            max-height: 480px;
          }
          .project-card-glass {
            --w: 145px !important;
            padding: 8px !important;
            --r: 14px !important;
          }
          .project-card-glass .card-thumb {
            height: 65px;
            margin-bottom: 4px;
          }
          .project-title {
            font-size: 0.78rem;
          }
          .project-desc {
            display: none;
          }
          .project-techs .tag-badge {
            font-size: 0.55rem;
            padding: 1px 4px;
          }
        }

        @media (max-width: 480px) {
          .projects-orbit-wrapper {
            min-height: 520px;
          }
          .orbit-container {
            height: 460px;
            margin-top: 0px;
          }
          .center-avatar-clean {
            width: 95vw;
            height: 95vw;
            max-height: 420px;
          }
          .project-card-glass {
            --w: 105px !important;
            padding: 6px !important;
            --r: 12px !important;
          }
          .project-card-glass .card-thumb {
            height: 48px;
            border-radius: 6px;
          }
          .project-title {
            font-size: 0.68rem;
            margin: 2px 0;
          }
          .project-techs {
            gap: 2px;
          }
          .project-techs .tag-badge {
            font-size: 0.5rem;
            padding: 1px 3px;
          }
        }

        @media (max-width: 380px) {
          .project-card-glass {
            --w: 92px !important;
            padding: 5px !important;
          }
          .project-card-glass .card-thumb {
            height: 40px;
          }
          .project-title {
            font-size: 0.6rem;
          }
          .project-techs .tag-badge {
            display: none;
          }
        }
      `}</style>

      <div className="source-header-clean">
        <div className="source-title-clean">DỰ ÁN CỦA TÔI</div>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8', zIndex: 10 }}>
          Rê chuột hoặc chạm vào để dừng
        </span>
      </div>

      <div 
        ref={containerRef}
        className="orbit-container"
        style={{
          '--rx': `${radii.rx}px`,
          '--ry': `${radii.ry}px`
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* ĐƯỜNG ELIP 3D */}
        <div className="orbit-ellipse-line"></div>

        {/* ẢNH NHÂN VẬT GỐC NÉT CĂNG KHÔNG BÓNG ĐEN */}
        <div className="center-avatar-clean">
          <img 
            src="/teoproject.png" 
            alt="Teo Building Code" 
            onError={(e) => { e.target.src = '/teo.jpeg'; }} 
          />
        </div>

        {/* CÁC THẺ DỰ ÁN KÍNH (.box) XOAY 3D */}
        {projectList.map((item, index) => {
          const stepAngle = (360 / projectList.length) * index;
          const currentAngleRad = ((rotationAngle + stepAngle) * Math.PI) / 180;

          const x = Math.cos(currentAngleRad) * radii.rx;
          const y = Math.sin(currentAngleRad) * radii.ry;

          const scale = 0.82 + ((y + radii.ry) / (radii.ry * 2 || 1)) * 0.3;
          const opacity = 0.92 + ((y + radii.ry) / (radii.ry * 2 || 1)) * 0.08;
          const zIndex = Math.round(150 + (y / (radii.ry || 1)) * 100);

          return (
            <div
              key={item.id}
              className="box project-card-glass"
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
            >
              <div className="circle-overlay"></div>

              <div className="card-inner-glass">
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
            </div>
          );
        })}
      </div>
    </div>
  );
}