import React, { useState, useEffect } from 'react';

// Dữ liệu các hoạt động kỷ niệm mở rộng
const otherMoments = [
  {
    id: 1,
    title: "Hoạt động CLB Tiếng Anh NIIE",
    date: "Tháng 04/2026",
    tag: "Câu Lạc Bộ",
    desc: "Tham gia các buổi giao lưu văn hóa và chia sẻ kỹ năng tiếng Anh cùng bạn bè sinh viên NIIE.",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
  },
  {
    id: 2,
    title: "Hoàn thành Chứng chỉ Software Engineering",
    date: "Tháng 10/2026",
    tag: "Chứng Chỉ",
    desc: "Xác thực chứng chỉ hoàn thành khóa học phát triển phần mềm trên nền tảng Simplilearn SkillUp.",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
  },
  {
    id: 3,
    title: "Hợp Tác Phát Triển Cùng Teammates",
    date: "Năm 2026",
    tag: "Teamwork",
    desc: "Hợp tác phát triển các đồ án lớn cùng đồng đội Huyền Diệu, Văn Thuận và Minh Thuận.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
  }
];

export default function Moments({ theme }) {
  const isLight = theme === 'light';
  const [selectedImage, setSelectedImage] = useState(null);

  // Đóng modal khi nhấn phím Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="moments-page-container">
      {/* 1. HERO HEADER */}
      <div className="moments-hero-header">
        <span className="moments-badge">
          <i className="fas fa-sparkles"></i> KỶ NIỆM & HỢP TÁC
        </span>
        <h1 className="moments-main-title">Hợp Tác & Hoạt Động</h1>
        <p className="moments-subtitle">Kết nối đam mê - Lan tỏa giá trị</p>
      </div>

      {/* 2. DỰ ÁN NỔI BẬT: MV "CỨ BƯỚC ĐI" (CHÍNH TỪ VODUYTOAN.NETLIFY.APP/KHOANHKHAC) */}
      <div className="box mv-showcase-box" style={{ '--w': '100%', '--h': 'auto', '--r': '26px', '--tr': '18%' }}>
        <div className="circle-overlay"></div>

        <div className="mv-card-content">
          {/* KHUNG VIDEO EMBED CHUẨN FACEBOOK */}
          <div className="video-hero-wrapper">
            <div className="video-responsive-container">
              <iframe 
                src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fcunhjhjhj%2Fvideos%2F1435137190480283%2F&show_text=false&width=560&t=0&autoplay=1&mute=1" 
                title="MV Cứ Bước Đi - HUTECH x Teo Building Code"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" 
                allowFullScreen={true}
                className="fb-video-iframe"
              />
            </div>

            {/* Lớp thông tin phủ trên Video */}
            <div className="video-info-overlay">
              <div className="video-overlay-inner">
                <span className="hutech-badge">
                  <i className="fas fa-graduation-cap"></i> HUTECH x Teo Building Code
                </span>
                <h2 className="mv-title">MV "CỨ BƯỚC ĐI"</h2>
                <p className="mv-desc">Sản phẩm môn học "Quản Trị Dự Án Truyền Thông"</p>
              </div>
            </div>
          </div>

          {/* NỘI DUNG 2 CỘT CHI TIẾT DƯỚI VIDEO */}
          <div className="mv-details-grid">
            {/* CỘT 1: EKIP SẢN XUẤT */}
            <div className="crew-column">
              <h3 className="section-col-title crew-heading">
                <span className="accent-bar"></span>
                <span>Ekip Sản Xuất</span>
              </h3>

              <div className="crew-list">
                <div className="crew-item">
                  <span className="role-label">Đạo diễn & Ý tưởng:</span>
                  <span className="role-name">Thiên An</span>
                </div>
                <div className="crew-item">
                  <span className="role-label">Sản xuất (Producer):</span>
                  <span className="role-name">Thiên An</span>
                </div>
                <div className="crew-item">
                  <span className="role-label">Quay phim & Dựng (D.O.P & Editor):</span>
                  <span className="role-name">Triệu Tuấn Kiệt</span>
                </div>
                <div className="crew-item">
                  <span className="role-label">Trợ lý sản xuất:</span>
                  <span className="role-name">Tuyết Trinh - Thanh Tuấn - Hồng Ngọc</span>
                </div>
                <div className="crew-item">
                  <span className="role-label">Âm nhạc:</span>
                  <span className="role-name">congtri_ & QUYEN <span className="sub-role">(Composer/Singer)</span>, Cloudist <span className="sub-role">(Producer)</span></span>
                </div>
                <div className="crew-item">
                  <span className="role-label">Diễn viên:</span>
                  <span className="role-name">Thiên An - Ng Mac Anh Phi</span>
                </div>

                {/* BAND NHẠC */}
                <div className="crew-item band-block">
                  <span className="role-label">Band Nhạc:</span>
                  <div className="band-tags-group">
                    <span className="band-chip">Mientrungboys</span>
                    <span className="band-chip">Nambambo</span>
                    <span className="band-chip highlight-author">
                      <i className="fas fa-star" style={{ fontSize: '10px' }}></i> Võ Duy Toàn
                    </span>
                    <span className="band-chip">Phúc Lâm</span>
                  </div>
                </div>

                {/* GIẢNG VIÊN HƯỚNG DẪN */}
                <div className="crew-item gvhd-block">
                  <span className="role-label">GVHD:</span>
                  <span className="role-name gvhd-name">Cô Nguyễn Tố Uyên</span>
                </div>
              </div>
            </div>

            {/* CỘT 2: HÀNH TRÌNH & CẢM XÚC + ẢNH KỶ NIỆM */}
            <div className="reflection-column">
              <h3 className="section-col-title reflection-heading">
                <span className="accent-bar green-bar"></span>
                <span>Hành Trình & Cảm Xúc</span>
              </h3>

              <div className="reflection-quote-card">
                <i className="fas fa-quote-left quote-icon"></i>
                <p className="quote-text">
                  "Một hành trình đầy màu sắc và đáng nhớ với những người đồng đội tuyệt vời! Cảm ơn mọi người vì đã luôn nỗ lực hết mình."
                </p>
                <div className="quote-sign">
                  Luôn trân trọng và biết ơn! ❤️
                </div>
              </div>

              {/* KHUNG ẢNH KỶ NIỆM CHỤP CHUNG */}
              <div 
                className="memory-photo-wrapper group"
                onClick={() => setSelectedImage({
                  src: '/cbd.jpg',
                  title: 'Kỷ niệm quay MV Cứ Bước Đi',
                  desc: 'HUTECH x Teo Building Code'
                })}
              >
                <div className="photo-inner">
                  <img 
                    src="/cbd.jpg" 
                    alt="Kỷ niệm quay MV Cứ Bước Đi" 
                    onError={(e) => {
                      e.target.src = 'https://voduytoan.netlify.app/img/cbd.jpg';
                    }}
                    className="memory-img"
                  />
                  <div className="photo-overlay">
                    <span className="photo-zoom-btn">
                      <i className="fas fa-search-plus"></i> Xem ảnh lớn
                    </span>
                    <p className="photo-caption">Kỷ niệm quay MV Cứ Bước Đi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BỘ SƯU TẬP CÁC KHOẢNH KHẮC & SỰ KIỆN KHÁC */}
      <div className="other-moments-section">
        <div className="section-sub-header">
          <h2 className="section-sub-title">
            <i className="fas fa-images"></i> Khoảnh Khắc Đáng Nhớ Khác
          </h2>
          <p className="section-sub-desc">Các dấu mốc học tập, rèn luyện và hợp tác trong hành trình phát triển</p>
        </div>

        <div className="moments-grid-cards">
          {otherMoments.map((item) => (
            <div 
              key={item.id} 
              className="box moment-glass-card" 
              style={{ '--w': '100%', '--h': 'auto', '--r': '20px', '--tr': '16%' }}
              onClick={() => setSelectedImage({
                src: item.img,
                title: item.title,
                desc: item.desc
              })}
            >
              <div className="circle-overlay"></div>
              
              <div className="moment-card-thumb">
                <img src={item.img} alt={item.title} />
                <span className="moment-card-tag">
                  <i className="fas fa-bookmark" style={{ fontSize: '9px' }}></i> {item.tag}
                </span>
                <span className="moment-date-badge">{item.date}</span>
              </div>

              <div className="moment-card-body">
                <h3 className="moment-card-title">{item.title}</h3>
                <p className="moment-card-desc">{item.desc}</p>
                <div className="moment-card-footer">
                  <span className="zoom-hint">
                    <i className="fas fa-expand-alt"></i> Mở xem ảnh
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. MODAL / LIGHTBOX XEM ẢNH TOÀN MÀN HÌNH */}
      {selectedImage && (
        <div className="lightbox-backdrop" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setSelectedImage(null)} title="Đóng (Esc)">
              <i className="fas fa-times"></i>
            </button>
            <div className="lightbox-image-container">
              <img src={selectedImage.src} alt={selectedImage.title} className="lightbox-img" />
            </div>
            <div className="lightbox-caption-bar">
              <h4 className="lightbox-title">{selectedImage.title}</h4>
              <p className="lightbox-desc">{selectedImage.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* STYLES RIÊNG BIỆT DÀNH CHO TRANG KHOẢNH KHẮC */}
      <style>{`
        .moments-page-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          padding: 0.5rem 0.5rem 2rem 0.5rem;
        }

        /* 1. Header */
        .moments-hero-header {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          padding: 1rem 0;
        }

        .moments-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(56, 189, 248, 0.12);
          color: var(--accent-color);
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 9999px;
          padding: 6px 16px;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .moments-main-title {
          font-size: 2.4rem;
          font-weight: 900;
          color: var(--text-heading);
          letter-spacing: -0.5px;
          margin: 0;
        }

        .moments-subtitle {
          font-size: 1.05rem;
          color: var(--text-muted);
          font-weight: 500;
          margin: 0;
        }

        /* 2. MV Showcase Card */
        .mv-showcase-box {
          padding: 0 !important;
          overflow: hidden;
        }

        .mv-card-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          z-index: 10;
        }

        /* Video Frame */
        .video-hero-wrapper {
          position: relative;
          width: 100%;
          background: #000000;
          overflow: hidden;
          border-bottom: 1px solid var(--glass-border);
        }

        .video-responsive-container {
          position: relative;
          width: 100%;
          padding-top: 56.25%; /* 16:9 Aspect Ratio */
        }

        .fb-video-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        .video-info-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.6) 50%, transparent 100%);
          padding: 2.5rem 2rem 1.2rem 2rem;
          pointer-events: none;
        }

        .video-overlay-inner {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .hutech-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--accent-color);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 800;
          padding: 4px 12px;
          border-radius: 9999px;
          width: fit-content;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 12px var(--accent-glow);
        }

        .mv-title {
          font-size: 2rem;
          font-weight: 900;
          color: #ffffff;
          margin: 0;
          text-shadow: 0 2px 8px rgba(0,0,0,0.8);
        }

        .mv-desc {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 500;
          margin: 0;
        }

        /* Grid 2 cột chi tiết */
        .mv-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          padding: 2.2rem;
        }

        .section-col-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-heading);
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .accent-bar {
          width: 4px;
          height: 22px;
          background: var(--accent-color);
          border-radius: 4px;
        }

        .accent-bar.green-bar {
          background: #22c55e;
        }

        /* Danh sách Ekip */
        .crew-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .crew-item {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
        }

        body.light-mode .crew-item {
          border-bottom: 1px dashed rgba(0, 0, 0, 0.08);
        }

        .role-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        .role-name {
          font-size: 0.95rem;
          color: var(--text-heading);
          font-weight: 600;
        }

        .sub-role {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: normal;
        }

        /* Band Tags */
        .band-tags-group {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.3rem;
        }

        .band-chip {
          padding: 5px 12px;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          background: var(--chip-bg);
          border: 1px solid var(--chip-border);
          color: var(--text-heading);
          transition: transform 0.2s, background 0.2s;
        }

        .band-chip:hover {
          transform: translateY(-2px);
        }

        .band-chip.highlight-author {
          background: rgba(56, 189, 248, 0.2);
          color: var(--accent-color);
          border: 1px solid rgba(56, 189, 248, 0.45);
          font-weight: 800;
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.25);
        }

        body.light-mode .band-chip.highlight-author {
          background: rgba(234, 88, 12, 0.15);
          color: #ea580c;
          border-color: rgba(234, 88, 12, 0.35);
        }

        /* GVHD */
        .gvhd-name {
          color: var(--accent-color);
          font-weight: 800;
          font-size: 1.05rem;
        }

        /* Cột 2: Cảm xúc & Ảnh */
        .reflection-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .reflection-quote-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 1.2rem 1.5rem;
          position: relative;
        }

        body.light-mode .reflection-quote-card {
          background: rgba(0, 0, 0, 0.02);
        }

        .quote-icon {
          font-size: 1.6rem;
          color: var(--accent-color);
          opacity: 0.4;
          margin-bottom: 0.5rem;
          display: block;
        }

        .quote-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-body);
          font-style: italic;
          margin-bottom: 0.75rem;
        }

        .quote-sign {
          text-align: right;
          font-size: 0.9rem;
          font-weight: 800;
          color: var(--accent-color);
        }

        /* Khung ảnh kỷ niệm */
        .memory-photo-wrapper {
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid var(--glass-border);
          cursor: pointer;
          position: relative;
          background: #000000;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .memory-photo-wrapper:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px var(--accent-glow);
        }

        .photo-inner {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16 / 10;
        }

        .memory-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .memory-photo-wrapper:hover .memory-img {
          transform: scale(1.06);
        }

        .photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 60%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.2rem;
          opacity: 0.9;
          transition: opacity 0.3s ease;
        }

        .photo-zoom-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(0, 0, 0, 0.6);
          color: #ffffff;
          padding: 6px 12px;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .photo-caption {
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0;
        }

        /* 3. Bộ sưu tập khoảnh khắc khác */
        .other-moments-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .section-sub-header {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .section-sub-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-heading);
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0;
        }

        .section-sub-title i {
          color: var(--accent-color);
        }

        .section-sub-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin: 0;
        }

        .moments-grid-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .moment-glass-card {
          flex-direction: column;
          cursor: pointer;
          align-items: stretch !important;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .moment-glass-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px var(--accent-glow);
        }

        .moment-card-thumb {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
          z-index: 10;
        }

        .moment-card-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .moment-glass-card:hover .moment-card-thumb img {
          transform: scale(1.08);
        }

        .moment-card-tag {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(0, 0, 0, 0.65);
          color: #ffffff;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .moment-date-badge {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: var(--accent-color);
          color: #ffffff;
          padding: 3px 9px;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 700;
          box-shadow: 0 2px 8px var(--accent-glow);
        }

        .moment-card-body {
          padding: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          z-index: 10;
        }

        .moment-card-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--text-heading);
          margin: 0;
          line-height: 1.4;
        }

        .moment-card-desc {
          font-size: 0.85rem;
          color: var(--text-body);
          line-height: 1.5;
          margin: 0;
        }

        .moment-card-footer {
          margin-top: 0.5rem;
          display: flex;
          justify-content: flex-end;
        }

        .zoom-hint {
          font-size: 0.75rem;
          color: var(--accent-color);
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* 4. Lightbox Modal */
        .lightbox-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: lightboxFadeIn 0.25s ease-out;
        }

        @keyframes lightboxFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .lightbox-content-box {
          position: relative;
          max-width: 900px;
          width: 100%;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
          display: flex;
          flex-direction: column;
        }

        .lightbox-close-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 38px;
          height: 38px;
          background: rgba(0, 0, 0, 0.65);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          z-index: 20;
          transition: background 0.2s, transform 0.2s;
        }

        .lightbox-close-btn:hover {
          background: var(--accent-color);
          transform: rotate(90deg);
        }

        .lightbox-image-container {
          width: 100%;
          max-height: 70vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000000;
        }

        .lightbox-img {
          max-width: 100%;
          max-height: 70vh;
          object-fit: contain;
        }

        .lightbox-caption-bar {
          padding: 1.2rem 1.5rem;
          border-top: 1px solid var(--glass-border);
        }

        .lightbox-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-heading);
          margin: 0 0 0.3rem 0;
        }

        .lightbox-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin: 0;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .mv-details-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 1.5rem;
          }

          .moments-main-title {
            font-size: 1.8rem;
          }

          .mv-title {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
}
