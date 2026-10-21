import React, { useState, useMemo } from 'react';

const toolCategories = [
  {
    id: "frontend",
    category: "Ngôn ngữ & Frontend",
    icon: "fa-laptop-code",
    tools: [
      { name: "JavaScript / TypeScript", desc: "Ngôn ngữ phát triển logic web & ứng dụng", icon: "fab fa-js", color: "#f7df1e", level: "Thành thạo" },
      { name: "React.js / Next.js", desc: "Xây dựng Single Page App & Server-Side Rendering", icon: "fab fa-react", color: "#61dafb", level: "Chuyên sâu" },
      { name: "Tailwind CSS", desc: "Thiết kế UI tiện ích & giao diện Glassmorphism", icon: "fas fa-wind", color: "#38bdf8", level: "Thành thạo" },
      { name: "React Native / Flutter", desc: "Lập trình ứng dụng di động đa nền tảng", icon: "fas fa-mobile-screen-button", color: "#45d3ff", level: "Khá" }
    ]
  },
  {
    id: "backend",
    category: "Backend & Cơ sở dữ liệu",
    icon: "fa-server",
    tools: [
      { name: "Node.js / Express", desc: "Xây dựng RESTful API, WebSockets & Event-Driven", icon: "fab fa-node-js", color: "#22c55e", level: "Chuyên sâu" },
      { name: "Go / Python / C#", desc: "Phát triển Microservices hiệu năng cao & Scripting", icon: "fas fa-code", color: "#06b6d4", level: "Khá" },
      { name: "PostgreSQL & SQL Server", desc: "Hệ quản trị CSDL quan hệ, tối ưu truy vấn & Index", icon: "fas fa-database", color: "#3b82f6", level: "Thành thạo" },
      { name: "MongoDB & Supabase", desc: "CSDL NoSQL phân tán & giải pháp Backend-as-a-Service", icon: "fas fa-leaf", color: "#10b981", level: "Thành thạo" },
      { name: "Redis & RabbitMQ", desc: "Bộ nhớ đệm In-memory Caching & Message Broker", icon: "fas fa-bolt", color: "#ef4444", level: "Khá" }
    ]
  },
  {
    id: "devops",
    category: "DevOps & Cloud Deployment",
    icon: "fa-cloud",
    tools: [
      { name: "Docker & Docker Compose", desc: "Đóng gói Container & môi trường phát triển độc lập", icon: "fab fa-docker", color: "#0284c7", level: "Thành thạo" },
      { name: "CI/CD & Git CLI", desc: "Tự động hóa luồng kiểm thử & triển khai GitHub", icon: "fab fa-git-alt", color: "#f97316", level: "Thành thạo" },
      { name: "Vercel / Render / Cloudflare", desc: "Triển khai Serverless Functions, CDN & Edge Workers", icon: "fas fa-cloud-arrow-up", color: "#a855f7", level: "Thành thạo" }
    ]
  },
  {
    id: "game-ai",
    category: "Game Dev, IoT & AI Tools",
    icon: "fa-gamepad",
    tools: [
      { name: "Unity Engine & C#", desc: "Lập trình Game 2D đối kháng & Finite State Machine AI", icon: "fas fa-gamepad", color: "#e2e8f0", level: "Đam mê" },
      { name: "ESP32 & IoT Microcontrollers", desc: "Phát triển hệ thống phần cứng cảm biến & điều khiển", icon: "fas fa-microchip", color: "#14b8a6", level: "Khá" },
      { name: "VS Code & Claude Code", desc: "Môi trường lập trình chính & AI Assistant tăng tốc", icon: "fas fa-terminal", color: "#ec4899", level: "Hàng ngày" }
    ]
  }
];

export default function Tools() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Lọc dữ liệu theo ô tìm kiếm và nhóm danh mục
  const filteredCategories = useMemo(() => {
    return toolCategories
      .filter(cat => activeCategory === 'all' || cat.id === activeCategory)
      .map(cat => ({
        ...cat,
        tools: cat.tools.filter(t => 
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.desc.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }))
      .filter(cat => cat.tools.length > 0);
  }, [searchQuery, activeCategory]);

  return (
    <div className="tools-page-wrapper">
      <div className="box source-section" style={{ '--w': '100%', '--h': 'auto', '--r': '26px', padding: '1.8rem' }}>
        <div className="circle-overlay"></div>

        {/* Thanh Header trang Công Cụ */}
        <div className="tools-top-bar">
          <div className="source-title">CÔNG CỤ & CÔNG NGHỆ SỬ DỤNG</div>

          {/* Ô tìm kiếm tương tác */}
          <div className="box search-mini-box tools-search-input" style={{ '--w': '240px', '--h': '38px', '--r': '9999px' }}>
            <div className="circle-overlay"></div>
            <i className="fas fa-search" style={{ color: '#64748b', fontSize: '13px', zIndex: 10, marginRight: '8px' }}></i>
            <input 
              type="text" 
              placeholder="Tìm công cụ, công nghệ..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <i 
                className="fas fa-times" 
                style={{ color: '#64748b', fontSize: '12px', zIndex: 10, cursor: 'pointer' }}
                onClick={() => setSearchQuery('')}
              ></i>
            )}
          </div>
        </div>

        {/* Bộ lọc theo nhóm danh mục */}
        <div className="tools-filter-pills">
          <button 
            className={`box tool-filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            style={{ '--w': 'auto', '--h': '36px', '--r': '9999px' }}
            onClick={() => setActiveCategory('all')}
          >
            <div className="circle-overlay"></div>
            <i className="fas fa-layer-group"></i>
            <span>Tất cả ({toolCategories.reduce((acc, c) => acc + c.tools.length, 0)})</span>
          </button>
          {toolCategories.map(cat => (
            <button 
              key={cat.id}
              className={`box tool-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              style={{ '--w': 'auto', '--h': '36px', '--r': '9999px' }}
              onClick={() => setActiveCategory(cat.id)}
            >
              <div className="circle-overlay"></div>
              <i className={`fas ${cat.icon}`}></i>
              <span>{cat.category}</span>
            </button>
          ))}
        </div>

        {/* Danh sách hiển thị theo từng nhóm */}
        <div className="tools-groups-list">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat, idx) => (
              <div key={idx} className="tool-category-section">
                <div className="tool-category-heading">
                  <div className="tool-heading-icon">
                    <i className={`fas ${cat.icon}`}></i>
                  </div>
                  <h3>{cat.category}</h3>
                  <span className="tool-category-count">{cat.tools.length} công cụ</span>
                </div>

                <div className="tools-cards-grid">
                  {cat.tools.map((t, i) => (
                    <div 
                      key={i} 
                      className="box tool-card-glass" 
                      style={{ '--w': '100%', '--h': 'auto', '--r': '18px', '--tr': '18%' }}
                    >
                      <div className="circle-overlay"></div>
                      <div className="tool-card-content">
                        <div className="tool-icon-wrap" style={{ color: t.color }}>
                          <i className={t.icon}></i>
                        </div>
                        <div className="tool-details">
                          <div className="tool-name-row">
                            <span className="tool-title-text">{t.name}</span>
                            <span className="tool-level-badge">{t.level}</span>
                          </div>
                          <p className="tool-desc-text">{t.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="tools-empty-state">
              <i className="fas fa-search"></i>
              <p>Không tìm thấy công cụ nào phù hợp với từ khóa "<strong>{searchQuery}</strong>"</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .tools-page-wrapper {
          width: 100%;
        }

        /* Top Bar */
        .tools-top-bar {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1.2rem;
        }

        .tools-search-input {
          padding: 0 1rem;
        }

        /* Filter Pills */
        .tools-filter-pills {
          position: relative;
          z-index: 10;
          display: flex;
          gap: 0.6rem;
          overflow-x: auto;
          padding-bottom: 4px;
          margin-bottom: 1.8rem;
          scrollbar-width: none;
        }

        .tools-filter-pills::-webkit-scrollbar {
          display: none;
        }

        .tool-filter-btn {
          padding: 0 1.1rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: #94a3b8;
          gap: 0.5rem;
          flex-shrink: 0;
          cursor: pointer;
        }
        .tool-filter-btn i, .tool-filter-btn span { z-index: 10; }

        .tool-filter-btn:hover {
          color: #ffffff;
        }

        .tool-filter-btn.active {
          color: #ffffff !important;
          border-color: rgba(56, 189, 248, 0.5) !important;
          background: rgba(56, 189, 248, 0.16) !important;
        }

        /* Nhóm danh mục */
        .tools-groups-list {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 100%;
        }

        .tool-category-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .tool-category-heading {
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }

        .tool-heading-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #38bdf8;
          font-size: 0.9rem;
        }

        .tool-category-heading h3 {
          font-size: 1.05rem;
          font-weight: 800;
          color: #f1f5f9;
          margin: 0;
          letter-spacing: 0.3px;
        }

        .tool-category-count {
          font-size: 0.72rem;
          color: #64748b;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.05);
          padding: 2px 8px;
          border-radius: 9999px;
        }

        /* Lưới thẻ công cụ */
        .tools-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.1rem;
          width: 100%;
        }

        .tool-card-glass {
          padding: 1.1rem !important;
          cursor: default;
          justify-content: flex-start !important;
          align-items: flex-start !important;
          transition: transform 0.2s ease, filter 0.2s ease, border-color 0.2s ease;
        }

        .tool-card-glass:hover {
          transform: translateY(-3px);
          filter: brightness(1.1);
          border-color: rgba(56, 189, 248, 0.4) !important;
        }

        .tool-card-content {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          width: 100%;
        }

        .tool-icon-wrap {
          font-size: 1.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
        }

        .tool-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          overflow: hidden;
        }

        .tool-name-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.4rem;
        }

        .tool-title-text {
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tool-level-badge {
          font-size: 0.65rem;
          font-weight: 700;
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.3);
          padding: 2px 7px;
          border-radius: 6px;
          flex-shrink: 0;
        }

        .tool-desc-text {
          font-size: 0.78rem;
          line-height: 1.45;
          color: #94a3b8;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Empty State */
        .tools-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem;
          gap: 1rem;
          color: #64748b;
        }

        .tools-empty-state i {
          font-size: 2.5rem;
          color: #38bdf8;
          opacity: 0.6;
        }

        .tools-empty-state p {
          font-size: 0.92rem;
          color: #94a3b8;
          margin: 0;
        }

        /* LIGHT MODE */
        body.light-mode .tool-category-heading h3,
        body.light-mode .tool-title-text {
          color: #1e293b !important;
        }

        body.light-mode .tool-desc-text {
          color: #64748b !important;
        }

        body.light-mode .tool-filter-btn {
          color: #64748b;
        }
        body.light-mode .tool-filter-btn:hover {
          color: #1e293b;
        }
        body.light-mode .tool-filter-btn.active {
          color: #0284c7 !important;
          background: rgba(2, 132, 199, 0.12) !important;
          border-color: rgba(2, 132, 199, 0.35) !important;
        }

        body.light-mode .tool-heading-icon {
          background: rgba(2, 132, 199, 0.1);
          border-color: rgba(2, 132, 199, 0.2);
          color: #0284c7;
        }

        body.light-mode .tool-level-badge {
          color: #0284c7;
          background: rgba(2, 132, 199, 0.1);
          border-color: rgba(2, 132, 199, 0.25);
        }

        body.light-mode .tool-icon-wrap {
          background: rgba(0, 0, 0, 0.03);
          border-color: rgba(0, 0, 0, 0.08);
        }

        /* RESPONSIVE */
        @media (max-width: 640px) {
          .tools-top-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .tools-search-input {
            width: 100% !important;
          }
          .tools-cards-grid {
            grid-template-columns: 1fr;
            gap: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}