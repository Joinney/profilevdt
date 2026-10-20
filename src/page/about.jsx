import React from 'react';

export default function About() {
  const skills = ["React.js", "Next.js", "Node.js", "TypeScript", "ASP.NET Core", "Unity 2D/3D", "Docker", "Tailwind CSS"];

  return (
    <div className="layout-2col">
      <div className="col-main">
        {/* Giới thiệu bản thân */}
        <div className="box profile-card" style={{ '--w': '100%', '--h': 'auto', '--r': '24px', '--tr': '20%' }}>
          <div className="circle-overlay"></div>
          <div className="profile-content">
            <div className="box avatar-box" style={{ '--w': '90px', '--h': '90px', '--r': '9999px' }}>
              <div className="circle-overlay"></div>
              <img src="/teo.jpeg" alt="Avatar" className="avatar-img" onError={(e) => { e.target.src = 'https://via.placeholder.com/90'; }} />
            </div>
            <div>
              <h2 className="name">Võ Duy Toàn</h2>
              <p className="role">Full-Stack & Software Engineer</p>
            </div>
            <p style={{ zIndex: 502, color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Sinh viên ngành Kỹ thuật Phần mềm tại Trường Đại học Nguyễn Tất Thành. Đam mê phát triển web full-stack, ứng dụng di động, tích hợp AI và phát triển game 2D/3D trên Unity Engine.
            </p>
          </div>
        </div>

        {/* Học vấn & Kinh nghiệm */}
        <div className="box source-section" style={{ '--w': '100%', '--h': 'auto', '--r': '24px', marginTop: '20px' }}>
          <div className="circle-overlay"></div>
          <div className="source-title" style={{ marginBottom: '16px' }}>HỌC VẤN & HÀNH TRÌNH</div>
          <div style={{ zIndex: 502, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ color: '#38bdf8', margin: '0 0 6px 0' }}>Trường Đại học Nguyễn Tất Thành (NTTU)</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>Chuyên ngành: Kỹ thuật Phần mềm | GPA: 3.16/4.0</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ color: '#38bdf8', margin: '0 0 6px 0' }}>Lập trình & Phát triển Phần mềm</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>Thực hành xây dựng microservices, ứng dụng thương mại điện tử, IoT và Capstone Project game 2D.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-side">
        {/* Kỹ năng chính */}
        <div className="box shorts-glass" style={{ '--w': '100%', '--h': 'auto', '--r': '24px' }}>
          <div className="circle-overlay"></div>
          <div className="shorts-header"><i className="fas fa-code" style={{ color: '#38bdf8' }}></i> Kỹ năng chính</div>
          <div style={{ zIndex: 502, display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
            {skills.map((skill, index) => (
              <span key={index} className="tag-badge">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}