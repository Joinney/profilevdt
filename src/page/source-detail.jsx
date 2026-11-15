import React, { useState, useEffect } from 'react';
import { sourceCodes } from '../data/sourceCodes';

export default function SourceDetail({ theme, onBack }) {
  const isLight = theme === 'light';

  // Lấy ID sản phẩm từ URL (?source=36 hoặc #source/36)
  const getSourceIdFromUrl = () => {
    if (typeof window === 'undefined') return 36;
    const params = new URLSearchParams(window.location.search);
    const qId = params.get('source') || params.get('sourceId') || params.get('id');
    if (qId) return parseInt(qId) || 36;

    const hash = window.location.hash;
    const match = hash.match(/source\/(\d+)/) || hash.match(/id=(\d+)/);
    if (match) return parseInt(match[1]) || 36;

    return 36;
  };

  const [currentId, setCurrentId] = useState(getSourceIdFromUrl);
  const [activeMedia, setActiveMedia] = useState('video'); // 'video' | 'image'
  const [copied, setCopied] = useState(false);

  // Lắng nghe thay đổi URL (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const id = getSourceIdFromUrl();
      setCurrentId(id);
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Cuộn lên đầu trang khi đổi mã nguồn
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentId]);

  // Tìm sản phẩm hiện tại
  const item = sourceCodes.find(s => s.id === currentId) || sourceCodes[0];

  // Các sản phẩm cùng chuyên mục đề xuất
  const relatedItems = sourceCodes
    .filter(s => s.id !== item.id && (s.category === item.category || s.lang === item.lang))
    .slice(0, 4);

  // Cập nhật Document Title
  useEffect(() => {
    if (item && item.title) {
      document.title = `${item.title} | Mã Nguồn - Võ Duy Toàn`;
    }
  }, [item]);

  // Đổi sản phẩm xem chi tiết
  const handleSelectRelated = (relatedId) => {
    setCurrentId(relatedId);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('source', relatedId);
      window.history.pushState({ sourceId: relatedId }, '', url.toString());
    }
  };

  // Sao chép liên kết chia sẻ
  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Nút quay lại danh sách
  const handleGoBack = (e) => {
    if (e) e.preventDefault();
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('source');
      url.searchParams.delete('sourceId');
      url.searchParams.delete('id');
      window.history.pushState({}, '', url.pathname + (url.search ? url.search : '') + '#home');
      window.dispatchEvent(new Event('popstate'));
    }
    if (typeof onBack === 'function') onBack();
  };

  const isPython = item.lang.toUpperCase().includes('PYTHON');

  return (
    <div className="source-detail-page">
      {/* 1. THANH ĐIỀU HƯỚNG VÀ BREADCRUMB */}
      <div className="box detail-nav-glass" style={{ '--w': '100%', '--h': 'auto', '--r': '20px', '--tr': '15%' }}>
        <div className="circle-overlay"></div>
        <div className="detail-nav-inner">
          <button className="back-link-btn" onClick={handleGoBack}>
            <i className="fas fa-arrow-left"></i>
            <span>Quay lại danh sách</span>
          </button>

          <div className="breadcrumb-trail">
            <span onClick={handleGoBack} style={{ cursor: 'pointer' }}>Trang chủ</span>
            <i className="fas fa-chevron-right"></i>
            <span onClick={handleGoBack} style={{ cursor: 'pointer' }}>Mã nguồn</span>
            <i className="fas fa-chevron-right"></i>
            <span className="current-crumb">{item.title}</span>
          </div>

          <button className="share-btn-glass" onClick={handleCopyLink} title="Sao chép link chia sẻ">
            <i className={`fas ${copied ? 'fa-check' : 'fa-share-nodes'}`} style={{ color: copied ? '#22c55e' : '' }}></i>
            <span>{copied ? 'Đã sao chép link!' : 'Chia sẻ'}</span>
          </button>
        </div>
      </div>

      {/* 2. KHUNG TRÌNH DIỄN CHÍNH (MAIN SHOWCASE GRID) */}
      <div className="detail-showcase-grid">
        {/* CỘT TRÁI: KHU VỰC MEDIA (VIDEO DEMO & HÌNH ẢNH) */}
        <div className="box media-showcase-box" style={{ '--w': '100%', '--h': 'auto', '--r': '26px', '--tr': '20%' }}>
          <div className="circle-overlay"></div>
          
          <div className="media-container">
            {/* Tag thông tin nổi trên Media */}
            <div className="media-top-tags">
              <span className="media-badge badge-price">
                <i className="fas fa-tag"></i> {item.price || 'FREE'}
              </span>
              <span className="media-badge badge-category">
                {item.category}
              </span>
              <span className="media-badge badge-lang" style={{ background: isPython ? '#2563eb' : '#ea580c' }}>
                {item.lang}
              </span>
            </div>

            {/* Trình phát Video Demo hoặc Hình ảnh */}
            {item.video && activeMedia === 'video' ? (
              <div className="video-player-wrapper">
                <video 
                  controls 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  poster={item.img}
                  src={item.video}
                  className="showcase-video"
                  onError={() => {
                    // Nếu video lỗi tải (ví dụ 401 hoặc link hạn chế), tự động chuyển sang hiển thị ảnh chụp màn hình
                    setActiveMedia('image');
                  }}
                >
                  Trình duyệt của bạn không hỗ trợ phát video HTML5.
                </video>
              </div>
            ) : (
              <div className="image-display-wrapper">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="showcase-img"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80';
                  }}
                />
              </div>
            )}

            {/* Thanh chuyển đổi chế độ xem Video / Ảnh */}
            {item.video && (
              <div className="media-toggle-tabs">
                <button 
                  className={`toggle-tab-btn ${activeMedia === 'video' ? 'active' : ''}`}
                  onClick={() => setActiveMedia('video')}
                >
                  <i className="fas fa-play-circle"></i> Video Demo
                </button>
                <button 
                  className={`toggle-tab-btn ${activeMedia === 'image' ? 'active' : ''}`}
                  onClick={() => setActiveMedia('image')}
                >
                  <i className="fas fa-image"></i> Ảnh chụp màn hình
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CỘT PHẢI: THÔNG TIN CHI TIẾT & HÀNH ĐỘNG */}
        <div className="box info-showcase-box" style={{ '--w': '100%', '--h': 'auto', '--r': '26px', '--tr': '20%' }}>
          <div className="circle-overlay"></div>

          <div className="info-content-inner">
            <div className="info-header">
              <span className="item-id-badge">ID SẢN PHẨM: #{item.id}</span>
              <h1 className="item-title">{item.title}</h1>
              <p className="item-sub">
                Mã nguồn hiệu ứng & giao diện tương tác chất lượng cao, tối ưu hóa trải nghiệm người dùng mượt mà trên nền tảng {item.lang}.
              </p>
            </div>

            {/* Thông tin tác giả & thời gian */}
            <div className="author-meta-card">
              <img 
                src="/teo.jpeg" 
                alt="Avatar tác giả" 
                className="author-avatar"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
              />
              <div className="author-text">
                <div className="author-name">Võ Duy Toàn</div>
                <div className="author-role">Ngày đăng: {item.date} • Đã kiểm duyệt</div>
              </div>
              <span className="verified-pill">
                <i className="fas fa-circle-check"></i> Đầy đủ mã nguồn
              </span>
            </div>

            {/* Cụm nút hành động chính */}
            <div className="actions-cluster">
              {(item.download || item.driveLink) && (
                <a 
                  href={item.download || item.driveLink} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="box primary-action-btn"
                  style={{ '--w': '100%', '--h': '52px', '--r': '16px', '--tr': '20%' }}
                >
                  <div className="circle-overlay"></div>
                  <i className="fas fa-cloud-arrow-down"></i>
                  <span>TẢI MÃ NGUỒN (GOOGLE DRIVE)</span>
                </a>
              )}

              {item.demo && (
                <a 
                  href={item.demo} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="box secondary-action-btn"
                  style={{ '--w': '100%', '--h': '46px', '--r': '14px', '--tr': '15%' }}
                >
                  <div className="circle-overlay"></div>
                  <i className="fas fa-arrow-up-right-from-square"></i>
                  <span>Xem Trực Tuyến (Live Demo)</span>
                </a>
              )}
            </div>

            {/* Bảng thông số kỹ thuật */}
            <div className="specs-list">
              <div className="spec-row">
                <span className="spec-label"><i className="fas fa-code"></i> Ngôn ngữ chính:</span>
                <span className="spec-value">{item.lang}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label"><i className="fas fa-shapes"></i> Thể loại:</span>
                <span className="spec-value">{item.category}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label"><i className="fas fa-money-bill-wave"></i> Chi phí:</span>
                <span className="spec-value highlight-price">{item.price}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label"><i className="fas fa-shield-halved"></i> Giấy phép:</span>
                <span className="spec-value">Miễn phí học tập & Nghiên cứu</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. HƯỚNG DẪN CÀI ĐẶT & CHẠY MÃ NGUỒN */}
      <div className="box guide-section-box" style={{ '--w': '100%', '--h': 'auto', '--r': '24px', '--tr': '15%' }}>
        <div className="circle-overlay"></div>

        <div className="guide-inner">
          <h3 className="section-title">
            <i className="fas fa-terminal" style={{ color: '#38bdf8' }}></i> Hướng Dẫn Cài Đặt & Khởi Chạy
          </h3>

          <div className="steps-container">
            {isPython ? (
              <>
                <div className="step-card">
                  <div className="step-num">01</div>
                  <div className="step-content">
                    <h4>Tải & Cài Đặt Python</h4>
                    <p>Đảm bảo máy tính đã cài đặt Python (phiên bản 3.9 trở lên). Kiểm tra bằng lệnh <code>python --version</code> trong Terminal.</p>
                  </div>
                </div>
                <div className="step-card">
                  <div className="step-num">02</div>
                  <div className="step-content">
                    <h4>Cài đặt thư viện phụ thuộc (nếu có)</h4>
                    <p>Mở Terminal tại thư mục mã nguồn và cài đặt các gói cần thiết: <code>pip install -r requirements.txt</code>.</p>
                  </div>
                </div>
                <div className="step-card">
                  <div className="step-num">03</div>
                  <div className="step-content">
                    <h4>Khởi chạy ứng dụng</h4>
                    <p>Chạy file script chính bằng lệnh: <code>python main.py</code> hoặc tên file <code>.py</code> tương ứng.</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="step-card">
                  <div className="step-num">01</div>
                  <div className="step-content">
                    <h4>Tải & Giải Nén Mã Nguồn</h4>
                    <p>Bấm nút <strong>"Tải mã nguồn"</strong> ở trên để tải file nén <code>.zip</code> hoặc thư mục từ Google Drive về máy.</p>
                  </div>
                </div>
                <div className="step-card">
                  <div className="step-num">02</div>
                  <div className="step-content">
                    <h4>Mở Bằng Visual Studio Code</h4>
                    <p>Mở thư mục mã nguồn trong VS Code. Cài đặt tiện ích mở rộng <strong>Live Server</strong> (Ritwick Dey).</p>
                  </div>
                </div>
                <div className="step-card">
                  <div className="step-num">03</div>
                  <div className="step-content">
                    <h4>Khởi Chạy Trực Tiếp</h4>
                    <p>Nhấp chuột phải vào file <code>index.html</code> và chọn <strong>"Open with Live Server"</strong> (hoặc nhấn đúp chuột vào file để mở trực tiếp trong trình duyệt).</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 4. MÃ NGUỒN CÙNG CHUYÊN MỤC ĐỀ XUẤT */}
      {relatedItems.length > 0 && (
        <div className="related-section">
          <div className="related-header">
            <h3 className="section-title">
              <i className="fas fa-layer-group" style={{ color: '#38bdf8' }}></i> Mã Nguồn Cùng Chuyên Mục Đề Xuất
            </h3>
            <span className="related-sub">Các dự án tương tự bạn có thể quan tâm</span>
          </div>

          <div className="related-grid">
            {relatedItems.map(rel => (
              <div 
                key={rel.id} 
                className="box related-card-glass"
                style={{ '--w': '100%', '--h': 'auto', '--r': '18px', '--tr': '15%' }}
                onClick={() => handleSelectRelated(rel.id)}
              >
                <div className="circle-overlay"></div>
                <div className="rel-thumb">
                  <img 
                    src={rel.img} 
                    alt={rel.title}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80';
                    }}
                  />
                  <span className="rel-badge">{rel.price}</span>
                </div>
                <div className="rel-info">
                  <div className="rel-title" title={rel.title}>{rel.title}</div>
                  <div className="rel-meta">
                    <span>{rel.lang}</span>
                    <span className="rel-view-text"><i className="fas fa-arrow-right"></i> Xem chi tiết</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CSS RIÊNG CHO TRANG CHI TIẾT MÃ NGUỒN CHUẨN GLASSMORPHISM */}
      <style>{`
        .source-detail-page {
          width: 100%;
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
          padding: 0.5rem 0.8rem 3rem 0.8rem;
        }

        /* 1. Thanh điều hướng Breadcrumb */
        .detail-nav-glass {
          padding: 0.9rem 1.4rem !important;
        }
        .detail-nav-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          z-index: 10;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .back-link-btn {
          background: transparent;
          border: none;
          color: #38bdf8;
          font-weight: 700;
          font-size: 0.88rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .back-link-btn:hover {
          transform: translateX(-3px);
          color: #0284c7;
        }
        body.light-mode .back-link-btn {
          color: #ea580c;
        }
        .breadcrumb-trail {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 600;
        }
        .breadcrumb-trail i {
          font-size: 0.7rem;
          opacity: 0.6;
        }
        .current-crumb {
          color: #f1f5f9;
          font-weight: 700;
          max-width: 260px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        body.light-mode .current-crumb {
          color: #0f172a;
        }
        .share-btn-glass {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #f1f5f9;
          padding: 0.4rem 1rem;
          border-radius: 9999px;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: all 0.2s ease;
        }
        .share-btn-glass:hover {
          background: rgba(56, 189, 248, 0.2);
          border-color: #38bdf8;
        }

        /* 2. Grid Trình diễn (Showcase Grid) */
        .detail-showcase-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 1.8rem;
          width: 100%;
        }

        @media (max-width: 950px) {
          .detail-showcase-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Cột Trái: Media */
        .media-showcase-box {
          padding: 1.2rem !important;
          display: flex;
          flex-direction: column;
        }
        .media-container {
          position: relative;
          width: 100%;
          z-index: 10;
          border-radius: 18px;
          overflow: hidden;
          background: #090d16;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .media-top-tags {
          position: absolute;
          top: 14px;
          left: 14px;
          display: flex;
          gap: 0.5rem;
          z-index: 20;
        }
        .media-badge {
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 800;
          backdrop-filter: blur(8px);
          color: #fff;
          text-shadow: 0 1px 3px rgba(0,0,0,0.6);
        }
        .badge-price {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 2px 10px rgba(16, 185, 129, 0.4);
        }
        .badge-category {
          background: rgba(15, 23, 42, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .badge-lang {
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .video-player-wrapper {
          width: 100%;
          height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
        }
        .showcase-video {
          width: 100%;
          height: 100%;
          object-fit: contain;
          outline: none;
        }
        .image-display-wrapper {
          width: 100%;
          height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #090d16;
        }
        .showcase-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        @media (max-width: 600px) {
          .video-player-wrapper, .image-display-wrapper {
            height: 320px;
          }
        }

        .media-toggle-tabs {
          display: flex;
          background: rgba(15, 23, 42, 0.9);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.6rem;
          gap: 0.5rem;
        }
        .toggle-tab-btn {
          flex: 1;
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 8px 12px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }
        .toggle-tab-btn.active {
          background: rgba(56, 189, 248, 0.18);
          color: #38bdf8;
        }

        /* Cột Phải: Thông tin sản phẩm */
        .info-showcase-box {
          padding: 1.8rem !important;
          display: flex;
          flex-direction: column;
        }
        .info-content-inner {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
          width: 100%;
          z-index: 10;
        }
        .item-id-badge {
          font-size: 0.72rem;
          color: #38bdf8;
          font-weight: 800;
          letter-spacing: 1px;
        }
        body.light-mode .item-id-badge {
          color: #ea580c;
        }
        .item-title {
          font-size: 1.85rem;
          font-weight: 900;
          color: #f1f5f9;
          line-height: 1.25;
          margin-top: 0.3rem;
        }
        body.light-mode .item-title {
          color: #0f172a;
        }
        .item-sub {
          font-size: 0.92rem;
          color: #94a3b8;
          line-height: 1.6;
          margin-top: 0.5rem;
        }
        body.light-mode .item-sub {
          color: #475569;
        }

        .author-meta-card {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.85rem 1rem;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .author-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #38bdf8;
        }
        body.light-mode .author-avatar {
          border-color: #ea580c;
        }
        .author-name {
          font-weight: 800;
          font-size: 0.9rem;
          color: #f1f5f9;
        }
        body.light-mode .author-name {
          color: #0f172a;
        }
        .author-role {
          font-size: 0.75rem;
          color: #64748b;
        }
        .verified-pill {
          margin-left: auto;
          font-size: 0.75rem;
          color: #10b981;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        /* Nút hành động */
        .actions-cluster {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .primary-action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          font-weight: 800;
          font-size: 0.95rem;
          color: #fff !important;
          text-decoration: none;
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%) !important;
          box-shadow: 0 8px 24px rgba(2, 132, 199, 0.35) !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .primary-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(2, 132, 199, 0.5) !important;
        }
        body.light-mode .primary-action-btn {
          background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%) !important;
          box-shadow: 0 8px 24px rgba(234, 88, 12, 0.35) !important;
        }

        .secondary-action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 0.88rem;
          color: #38bdf8 !important;
          text-decoration: none;
          border: 1px solid rgba(56, 189, 248, 0.4) !important;
          transition: all 0.2s ease;
        }
        .secondary-action-btn:hover {
          background: rgba(56, 189, 248, 0.15) !important;
        }
        body.light-mode .secondary-action-btn {
          color: #ea580c !important;
          border-color: rgba(234, 88, 12, 0.4) !important;
        }

        /* Bảng thông số */
        .specs-list {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          border-top: 1px dashed rgba(255, 255, 255, 0.1);
          padding-top: 1rem;
        }
        .spec-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
        }
        .spec-label {
          color: #64748b;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .spec-value {
          color: #f1f5f9;
          font-weight: 700;
        }
        body.light-mode .spec-value {
          color: #0f172a;
        }
        .highlight-price {
          color: #10b981 !important;
          font-weight: 900;
        }

        /* 3. Phần Hướng dẫn cài đặt */
        .guide-section-box {
          padding: 2rem !important;
        }
        .guide-inner {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
          width: 100%;
          z-index: 10;
        }
        .section-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #f1f5f9;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        body.light-mode .section-title {
          color: #0f172a;
        }
        .steps-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.2rem;
        }
        @media (max-width: 800px) {
          .steps-container {
            grid-template-columns: 1fr;
          }
        }
        .step-card {
          padding: 1.4rem;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .step-num {
          font-size: 1.5rem;
          font-weight: 900;
          color: #38bdf8;
          opacity: 0.8;
        }
        body.light-mode .step-num {
          color: #ea580c;
        }
        .step-content h4 {
          font-size: 0.98rem;
          font-weight: 800;
          color: #f1f5f9;
          margin-bottom: 0.35rem;
        }
        body.light-mode .step-content h4 {
          color: #0f172a;
        }
        .step-content p {
          font-size: 0.82rem;
          color: #94a3b8;
          line-height: 1.55;
        }
        body.light-mode .step-content p {
          color: #475569;
        }
        .step-content code {
          background: rgba(0, 0, 0, 0.4);
          color: #38bdf8;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.78rem;
        }

        /* 4. Mã nguồn cùng chuyên mục */
        .related-section {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          width: 100%;
        }
        .related-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
        }
        .related-sub {
          font-size: 0.82rem;
          color: #64748b;
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.2rem;
          width: 100%;
        }
        @media (max-width: 900px) {
          .related-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 500px) {
          .related-grid {
            grid-template-columns: 1fr;
          }
        }
        .related-card-glass {
          padding: 0.75rem !important;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .related-card-glass:hover {
          transform: translateY(-4px);
        }
        .rel-thumb {
          width: 100%;
          height: 130px;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          background: #0f172a;
          z-index: 10;
        }
        .rel-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .rel-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(0, 0, 0, 0.75);
          color: #10b981;
          font-size: 0.68rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 6px;
          backdrop-filter: blur(4px);
        }
        .rel-info {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          z-index: 10;
        }
        .rel-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: #f1f5f9;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        body.light-mode .rel-title {
          color: #0f172a;
        }
        .rel-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 600;
        }
        .rel-view-text {
          color: #38bdf8;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        body.light-mode .rel-view-text {
          color: #ea580c;
        }
      `}</style>
    </div>
  );
}
