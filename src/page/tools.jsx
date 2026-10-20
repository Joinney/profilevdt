import React from 'react';

const toolCategories = [
  {
    category: "Ngôn ngữ & Frontend",
    tools: [
      { name: "JavaScript / TypeScript", desc: "Ngôn ngữ lập trình web chính", icon: "fab fa-js" },
      { name: "React / Next.js", desc: "Xây dựng UI responsive & SSR", icon: "fab fa-react" },
      { name: "Tailwind CSS", desc: "Styling & Glassmorphic UI", icon: "fas fa-paint-brush" }
    ]
  },
  {
    category: "Backend & Cơ sở dữ liệu",
    tools: [
      { name: "Node.js / Express", desc: "Xây dựng RESTful API & Microservices", icon: "fab fa-node-js" },
      { name: "PostgreSQL & MongoDB", desc: "Quản trị CSDL quan hệ & NoSQL", icon: "fas fa-database" },
      { name: "Redis & RabbitMQ", desc: "Caching & Message Broker", icon: "fas fa-server" }
    ]
  },
  {
    category: "DevOps & Công cụ phát triển",
    tools: [
      { name: "Docker & NGINX", desc: "Containerization & Reverse Proxy", icon: "fab fa-docker" },
      { name: "Unity Engine", desc: "Lập trình & Thiết kế Game 2D/3D", icon: "fas fa-gamepad" },
      { name: "VS Code & Claude Code", desc: "Trình soạn thảo & AI Assistant", icon: "fas fa-code" }
    ]
  }
];

export default function Tools() {
  return (
    <div className="box source-section" style={{ '--w': '100%', '--h': 'auto', '--r': '24px' }}>
      <div className="circle-overlay"></div>
      <div className="source-header">
        <div className="source-title">CÔNG CỤ & CÔNG NGHỆ SỬ DỤNG</div>
      </div>

      <div style={{ zIndex: 502, display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '16px' }}>
        {toolCategories.map((cat, idx) => (
          <div key={idx}>
            <h3 style={{ color: '#38bdf8', fontSize: '1rem', marginBottom: '12px' }}>{cat.category}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '14px' }}>
              {cat.tools.map((t, i) => (
                <div key={i} className="box code-card-glass" style={{ '--w': '100%', '--h': 'auto', '--r': '12px', padding: '14px' }}>
                  <div className="circle-overlay"></div>
                  <div style={{ zIndex: 502, display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <i className={t.icon} style={{ fontSize: '1.5rem', color: '#f59e0b' }}></i>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '0.95rem', color: '#f8fafc' }}>{t.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{t.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}