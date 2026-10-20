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
    <div className="box source-section" style={{ '--w': '100%', '--h': 'auto', '--r': '24px' }}>
      <div className="circle-overlay"></div>
      <div className="source-header">
        <div className="source-title">KHOẢNH KHẮC & KỶ NIỆM</div>
      </div>

      <div style={{ zIndex: 502, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '16px' }}>
        {momentsList.map((item, index) => (
          <div key={index} className="box code-card-glass" style={{ '--w': '100%', '--h': 'auto', '--r': '16px', padding: '16px' }}>
            <div className="circle-overlay"></div>
            <div className="card-thumb" style={{ zIndex: 502, borderRadius: '12px', overflow: 'hidden', height: '180px' }}>
              <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ zIndex: 502, marginTop: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 'bold' }}>{item.date}</span>
              <h3 style={{ fontSize: '1rem', margin: '4px 0 6px 0', color: '#f8fafc' }}>{item.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.5' }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}