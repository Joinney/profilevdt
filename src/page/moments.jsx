import React from 'react';

const momentsList = [
  {
    title: "Hoạt động CLB Tiếng Anh NIIE",
    date: "Tháng 04/2026",
    desc: "Tham gia các buổi giao lưu văn hóa và chia sẻ kỹ năng tiếng Anh cùng bạn bè sinh viên.",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&q=80"
  },
  {
    title: "Hoàn thành Chứng chỉ Software Engineering",
    date: "Tháng 10/2026",
    desc: "Xác thực chứng chỉ hoàn thành khóa học phát triển phần mềm trên Simplilearn SkillUp.",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&q=80"
  },
  {
    title: "Làm việc cùng Teammates",
    date: "Năm 2026",
    desc: "Hợp tác phát triển các đồ án lớn cùng đồng đội Huyền Diệu, Văn Thuận và Minh Thuận.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80"
  }
];

export default function Moments() {
  return (
    <>
      <div className="moments-page-wrapper">
        <div className="box source-section" style={{ '--w': '100%', '--h': 'auto', '--r': '26px', '--tr': '20%', padding: '2rem' }}>
          <div className="circle-overlay"></div>
          
          <div className="source-header">
            <div className="source-title">KHOẢNH KHẮC & KỶ NIỆM</div>
          </div>

          <div className="moments-grid">
            {momentsList.map((item, index) => (
              <div 
                key={index} 
                className="box code-card-glass moment-card" 
                style={{ '--w': '100%', '--h': 'auto', '--r': '20px', '--tr': '16%', padding: '1.2rem' }}
              >
                <div className="circle-overlay"></div>
                <div className="card-thumb moment-thumb" style={{ zIndex: 10 }}>
                  <img src={item.img} alt={item.title} />
                  <span className="thumb-badge">
                    <i className="fas fa-camera" style={{ fontSize: '8px' }}></i> Kỷ niệm
                  </span>
                </div>
                <div className="moment-content" style={{ zIndex: 10 }}>
                  <span className="moment-date">{item.date}</span>
                  <h3 className="moment-title">{item.title}</h3>
                  <p className="moment-desc">{item.desc}</p>
                </div>
              </div>
            ))}
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

        .code-card-glass:hover {
          filter: brightness(1.08);
          transform: translateY(-2px);
          cursor: pointer;
        }

        .moments-page-wrapper {
          width: 100%;
        }

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

        .moments-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.4rem;
          z-index: 10;
          width: 100%;
        }

        .moment-card {
          width: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 0.9rem !important;
          align-items: flex-start !important;
        }

        .moment-thumb {
          width: 100%;
          height: 200px;
          border-radius: 14px;
          overflow: hidden;
          position: relative;
          background: #0f172a;
        }

        .moment-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .thumb-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(3, 7, 18, 0.7);
          font-size: 0.7rem;
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.35);
          padding: 3px 9px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 5px;
          backdrop-filter: blur(4px);
        }

        .moment-content {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          width: 100%;
        }

        .moment-date {
          font-size: 0.75rem;
          font-weight: 700;
          color: #38bdf8;
        }

        .moment-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #f1f5f9;
          margin: 0;
          line-height: 1.35;
        }

        .moment-desc {
          font-size: 0.84rem;
          color: #94a3b8;
          line-height: 1.6;
          margin: 0;
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

        body.light-mode .source-title,
        body.light-mode .moment-title {
          color: #0f172a !important;
          filter: drop-shadow(0 20px 3px rgba(102, 102, 102, 0.15));
        }

        body.light-mode .source-title:before {
          background: #ea580c !important;
          box-shadow: 0 0 8px #ea580c !important;
        }

        body.light-mode .moment-date {
          color: #ea580c !important;
        }

        body.light-mode .moment-desc {
          color: #334155 !important;
        }

        body.light-mode .thumb-badge {
          background: rgba(255, 255, 255, 0.85) !important;
          color: #ea580c !important;
          border-color: rgba(234, 88, 12, 0.35) !important;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .source-section {
            padding: 1.1rem !important;
            gap: 1rem !important;
          }
          .source-title {
            font-size: 1.1rem;
          }
          .moments-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .moment-thumb {
            height: 170px;
          }
        }
      `}</style>
    </>
  );
}
