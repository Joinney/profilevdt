import React, { useState, useMemo } from 'react';

// Danh sách dữ liệu công cụ chính xác từ voduytoan.netlify.app/congcu
const toolsData = [
  {
    id: 1,
    title: "xóa ảnh vật thẻ",
    category: "IMG",
    date: "18/12/2025",
    description: "Công cụ xóa vật thể và các chi tiết thừa trong ảnh thông minh bằng trí tuệ nhân tạo AI nhanh chóng và tiện lợi.",
    image: "/tools/xoa-vat-the.jpg",
    fallbackImage: "https://lh3.googleusercontent.com/d/1cn870kcGS6ekSANcBR5aLsP98Jy0_-tI=w1000",
    link: "https://vdt-xoa-vat-the.netlify.app/",
    tags: ["IMG", "AI", "Editor"]
  },
  {
    id: 2,
    title: "Tạo Mã QR cho riêng bạn",
    category: "QR",
    date: "26/12/2025",
    description: "Công cụ tạo mã QR nghệ thuật cá nhân hóa độc đáo, dễ dàng & sáng tạo với nhiều màu sắc và phong cách.",
    image: "/tools/tao-qrcode.png",
    fallbackImage: "https://lh3.googleusercontent.com/d/1WIRPpTgr27VZDOyV8b5wok7kSQD-rnqu=w1000",
    link: "https://vdt-qrcode.netlify.app/",
    tags: ["QR", "Generator", "Custom"]
  },
  {
    id: 3,
    title: "Công Cụ Triển Khai Office",
    category: "Office",
    date: "08/08/2025",
    description: "Công Cụ Hỗ Trợ Tải và Kích Hoạt Bản Quyền Office Mọi Phiên Bản Nhanh Chóng và Hoàn Toàn Miễn Phí.",
    image: "/tools/trien-khai-office.svg",
    fallbackImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    link: "https://trien-khai-office.netlify.app/",
    tags: ["Office", "Windows", "Scripts"]
  },
  {
    id: 4,
    title: "Công Cụ Vẽ Ảnh Python",
    category: "Art",
    date: "06/05/2025",
    description: "Công Cụ Chuyển Đổi Hình Ảnh Thành Tranh Vẽ Bằng Ngôn Ngữ Lập Trình Python Cực Kỳ Độc Đáo.",
    image: "/tools/tao-anh-python.png",
    fallbackImage: "https://lh3.googleusercontent.com/d/1nZpWDkWOY0Y5SHCVsG7jE8so_a4qD8gE=w1000",
    link: "https://tao-anh-python.netlify.app/",
    tags: ["Art", "Python", "Creative"]
  }
];

export default function Tools({ theme }) {
  const isLight = theme === 'light';
  const [activeCategory, setActiveCategory] = useState('ALL');

  // Thống kê số lượng từng danh mục
  const categories = useMemo(() => {
    return [
      { id: 'ALL', name: 'Tất cả', count: toolsData.length },
      { id: 'Art', name: 'Art', count: toolsData.filter(t => t.category === 'Art').length },
      { id: 'IMG', name: 'IMG', count: toolsData.filter(t => t.category === 'IMG').length },
      { id: 'Office', name: 'Office', count: toolsData.filter(t => t.category === 'Office').length },
      { id: 'QR', name: 'QR', count: toolsData.filter(t => t.category === 'QR').length }
    ];
  }, []);

  // Lọc danh sách công cụ theo danh mục đã chọn
  const filteredTools = useMemo(() => {
    if (activeCategory === 'ALL') return toolsData;
    return toolsData.filter(t => t.category.toLowerCase() === activeCategory.toLowerCase());
  }, [activeCategory]);

  const handleOpenTool = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="tools-page-container">
      {/* KHUNG BỐ CỤC 2 CỘT (SIDEBAR 3 CỘT + NỘI DUNG 9 CỘT) */}
      <div className="tools-layout-grid">
        {/* ========================================================= */}
        {/* CỘT TRÁI: SIDEBAR                                        */}
        {/* ========================================================= */}
        <aside className="tools-sidebar">
          {/* 1. THẺ PROFILE TEO BUILDING CODE */}
          <div className="box tools-profile-card" style={{ '--w': '100%', '--h': 'auto', '--r': '24px', '--tr': '18%' }}>
            <div className="circle-overlay"></div>

            <div className="profile-card-content">
              {/* Avatar với vòng sáng online */}
              <div className="avatar-frame">
                <img 
                  src="/tools/teone.jpeg" 
                  alt="Võ Duy Toàn" 
                  onError={(e) => { e.target.src = '/teo.jpeg'; }}
                  className="avatar-img"
                />
                <span className="online-beacon" title="Trực tuyến"></span>
              </div>

              {/* Tên & Huy hiệu */}
              <h2 className="brand-title">Teo Building Code</h2>
              <span className="special-badge">
                <i className="fas fa-cube"></i> Các Công Cụ Đặc Sắc
              </span>

              {/* Liên kết mạng xã hội */}
              <div className="social-links-row">
                <a href="https://www.tiktok.com/@teohoclaptrinh" target="_blank" rel="noreferrer" className="social-pill" title="TikTok">
                  <i className="fab fa-tiktok"></i>
                </a>
                <a href="https://www.linkedin.com/in/zvoduytoanz/" target="_blank" rel="noreferrer" className="social-pill" title="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://github.com/Joinney" target="_blank" rel="noreferrer" className="social-pill" title="GitHub">
                  <i className="fab fa-github"></i>
                </a>
              </div>

              {/* Khối thống kê 3 cột */}
              <div className="stats-trio-row">
                <div className="stat-unit">
                  <span className="stat-number">{toolsData.length}</span>
                  <span className="stat-label">Công cụ</span>
                </div>
                <div className="stat-unit">
                  <span className="stat-number">4</span>
                  <span className="stat-label">Danh mục</span>
                </div>
                <div className="stat-unit">
                  <span className="stat-number">89</span>
                  <span className="stat-label">Tags</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. THẺ BỘ LỌC DANH MỤC */}
          <div className="box tools-filter-card" style={{ '--w': '100%', '--h': 'auto', '--r': '24px', '--tr': '20%' }}>
            <div className="circle-overlay"></div>

            <div className="filter-card-content">
              <h3 className="filter-card-heading">
                <i className="fas fa-layer-group"></i> Bộ lọc danh mục
              </h3>

              <div className="filter-buttons-list">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`filter-nav-btn ${isActive ? 'active' : ''}`}
                    >
                      <span className="cat-name">{cat.name}</span>
                      <span className="cat-count-badge">{cat.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* CỘT PHẢI: DANH SÁCH CÔNG CỤ (ALTERNATING SLANT CARDS)     */}
        {/* ========================================================= */}
        <main className="tools-main-column">
          {/* Header trên danh sách */}
          <div className="tools-section-header">
            <h1 className="tools-section-title">
              {activeCategory === 'ALL' ? 'Tất cả công cụ' : `Danh mục: ${activeCategory}`}
            </h1>
            <span className="tools-last-updated">
              <i className="fas fa-clock"></i> Cập nhật lần cuối: 10/01/2026
            </span>
          </div>

          {/* Danh sách thẻ công cụ */}
          <div className="tools-cards-stream">
            {filteredTools.map((tool, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={tool.id}
                  className={`box slant-tool-card ${isEven ? 'slant-even' : 'slant-odd'}`}
                  style={{ '--w': '100%', '--h': 'auto', '--r': '22px', '--tr': '15%' }}
                  onClick={() => handleOpenTool(tool.link)}
                >
                  <div className="circle-overlay"></div>

                  <div className="slant-card-content">
                    {/* KHỐI NỘI DUNG VĂN BẢN */}
                    <div className="card-text-zone">
                      <div className="card-top-meta">
                        <span className="category-pill">{tool.category}</span>
                        <span className="date-text">
                          <i className="far fa-calendar-alt"></i> {tool.date}
                        </span>
                      </div>

                      <h2 className="tool-title" title={tool.title}>
                        {tool.title}
                      </h2>

                      <p className="tool-desc">
                        {tool.description}
                      </p>

                      {/* Danh sách tags */}
                      <div className="tool-tags-cluster">
                        {tool.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="tool-tag-chip">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Nút hành động */}
                      <div className="card-action-bar">
                        <button 
                          type="button" 
                          className="open-tool-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenTool(tool.link);
                          }}
                        >
                          <span>more...</span>
                          <i className="fas fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>

                    {/* KHỐI HÌNH ẢNH CẮT VÁT (CLIP SLANT) */}
                    <div className={`card-media-zone ${isEven ? 'clip-slant-left' : 'clip-slant-right'}`}>
                      <img 
                        src={tool.image} 
                        alt={tool.title}
                        onError={(e) => {
                          if (tool.fallbackImage && e.target.src !== tool.fallbackImage) {
                            e.target.src = tool.fallbackImage;
                          }
                        }}
                        className="tool-cover-img"
                      />
                      <div className="media-glass-shine"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* STYLES RIÊNG BIỆT DÀNH CHO TRANG CÔNG CỤ */}
      <style>{`
        .tools-page-container {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 1rem 0.5rem 3rem 0.5rem;
        }

        .tools-layout-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 2rem;
          align-items: start;
        }

        /* ------------------------------------------------------------- */
        /* CỘT TRÁI: SIDEBAR                                             */
        /* ------------------------------------------------------------- */
        .tools-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: sticky;
          top: 80px;
        }

        /* Thẻ Profile */
        .tools-profile-card {
          padding: 1.8rem 1.4rem !important;
        }

        .profile-card-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          z-index: 10;
        }

        .avatar-frame {
          position: relative;
          width: 96px;
          height: 96px;
          border-radius: 50%;
          padding: 4px;
          border: 2px solid rgba(56, 189, 248, 0.4);
          box-shadow: 0 0 20px var(--accent-glow);
          margin-bottom: 1rem;
        }

        .avatar-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: block;
        }

        .online-beacon {
          position: absolute;
          bottom: 3px;
          right: 3px;
          width: 15px;
          height: 15px;
          background: #10b981;
          border: 2px solid #0f172a;
          border-radius: 50%;
          box-shadow: 0 0 10px #10b981;
          animation: beaconPulse 2s infinite ease-in-out;
        }

        @keyframes beaconPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.75; }
        }

        .brand-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text-heading);
          margin: 0 0 0.4rem 0;
        }

        .special-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-color);
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 9999px;
          padding: 4px 12px;
          margin-bottom: 1.2rem;
        }

        .social-links-row {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.4rem;
        }

        .social-pill {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          background: var(--chip-bg);
          border: 1px solid var(--chip-border);
          transition: transform 0.2s, color 0.2s, border-color 0.2s;
        }

        .social-pill:hover {
          transform: translateY(-3px);
          color: var(--accent-color);
          border-color: var(--accent-color);
          box-shadow: 0 4px 12px var(--accent-glow);
        }

        /* Khối thống kê */
        .stats-trio-row {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
          padding-top: 1.2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        body.light-mode .stats-trio-row {
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }

        .stat-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
        }

        .stat-number {
          font-size: 1.25rem;
          font-weight: 900;
          color: var(--text-heading);
        }

        .stat-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.3px;
        }

        /* Thẻ Bộ Lọc */
        .tools-filter-card {
          padding: 1.4rem !important;
        }

        .filter-card-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          z-index: 10;
        }

        .filter-card-heading {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--text-heading);
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0;
        }

        .filter-card-heading i {
          color: var(--accent-color);
        }

        .filter-buttons-list {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .filter-nav-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 1rem;
          border-radius: 12px;
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-muted);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
        }

        .filter-nav-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-heading);
          transform: translateX(3px);
        }

        body.light-mode .filter-nav-btn:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .filter-nav-btn.active {
          background: rgba(56, 189, 248, 0.16);
          color: var(--accent-color);
          border: 1px solid rgba(56, 189, 248, 0.35);
          font-weight: 800;
        }

        body.light-mode .filter-nav-btn.active {
          background: rgba(234, 88, 12, 0.14);
          color: #ea580c;
          border-color: rgba(234, 88, 12, 0.35);
        }

        .cat-count-badge {
          font-size: 0.72rem;
          padding: 2px 8px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* ------------------------------------------------------------- */
        /* CỘT PHẢI: NỘI DUNG CHÍNH                                      */
        /* ------------------------------------------------------------- */
        .tools-main-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .tools-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.8rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        body.light-mode .tools-section-header {
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .tools-section-title {
          font-size: 1.8rem;
          font-weight: 900;
          color: var(--text-heading);
          margin: 0;
          letter-spacing: -0.5px;
        }

        .tools-last-updated {
          font-size: 0.82rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .tools-cards-stream {
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
        }

        /* Thẻ Công Cụ Đan Xen Slant Card */
        .slant-tool-card {
          padding: 0 !important;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }

        .slant-tool-card:hover {
          transform: translateY(-4px) scale(1.008);
          box-shadow: 0 16px 36px var(--accent-glow) !important;
        }

        .slant-card-content {
          width: 100%;
          display: flex;
          min-height: 240px;
          z-index: 10;
        }

        /* Cấu trúc đảo chiều Even vs Odd */
        .slant-even .slant-card-content {
          flex-direction: row;
        }

        .slant-odd .slant-card-content {
          flex-direction: row-reverse;
        }

        /* Phần Text */
        .card-text-zone {
          flex: 1.2;
          padding: 1.8rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.75rem;
          z-index: 15;
        }

        .card-top-meta {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .category-pill {
          background: rgba(56, 189, 248, 0.15);
          color: var(--accent-color);
          border: 1px solid rgba(56, 189, 248, 0.35);
          border-radius: 9999px;
          padding: 3px 10px;
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        body.light-mode .category-pill {
          background: rgba(234, 88, 12, 0.12);
          color: #ea580c;
          border-color: rgba(234, 88, 12, 0.35);
        }

        .date-text {
          font-size: 0.78rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .tool-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-heading);
          margin: 0;
          line-height: 1.3;
        }

        .tool-desc {
          font-size: 0.88rem;
          color: var(--text-body);
          line-height: 1.5;
          margin: 0;
        }

        .tool-tags-cluster {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 0.2rem;
        }

        .tool-tag-chip {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-muted);
          background: var(--chip-bg);
          border: 1px solid var(--chip-border);
          padding: 2px 8px;
          border-radius: 6px;
        }

        .card-action-bar {
          margin-top: 0.5rem;
        }

        .open-tool-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-heading);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          cursor: pointer;
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }

        body.light-mode .open-tool-btn {
          background: rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.12);
        }

        .open-tool-btn:hover {
          background: var(--accent-color);
          color: #ffffff;
          border-color: var(--accent-color);
          transform: translateX(3px);
        }

        /* Phần Media Cắt Vát */
        .card-media-zone {
          flex: 1;
          position: relative;
          overflow: hidden;
          background: #000000;
        }

        .tool-cover-img {
          width: 100%;
          height: 100%;
          min-height: 240px;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .slant-tool-card:hover .tool-cover-img {
          transform: scale(1.08);
        }

        .media-glass-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, transparent 60%);
          pointer-events: none;
        }

        /* Clip path vát chéo trên màn hình Desktop */
        @media (min-width: 769px) {
          .clip-slant-left {
            clip-path: polygon(12% 0, 100% 0, 100% 100%, 0% 100%);
            margin-left: -5%;
          }

          .clip-slant-right {
            clip-path: polygon(0 0, 100% 0, 88% 100%, 0% 100%);
            margin-right: -5%;
          }
        }

        /* ------------------------------------------------------------- */
        /* RESPONSIVE MOBILE & TABLET                                    */
        /* ------------------------------------------------------------- */
        @media (max-width: 1024px) {
          .tools-layout-grid {
            grid-template-columns: 280px 1fr;
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .tools-layout-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .tools-sidebar {
            position: static;
          }

          .slant-card-content,
          .slant-even .slant-card-content,
          .slant-odd .slant-card-content {
            flex-direction: column-reverse !important;
          }

          .card-media-zone {
            width: 100%;
            height: 200px;
            clip-path: none !important;
            margin: 0 !important;
          }

          .card-text-zone {
            padding: 1.4rem;
          }

          .tools-section-title {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
}
