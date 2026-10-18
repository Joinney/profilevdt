import './style.css';
import { renderHeader, initHeaderEvents } from './components/Header.js';
import { renderFooter } from './components/Footer.js';

const app = document.querySelector('#app');

const sourceCodes = [
  { title: "Cây Thông Noel", lang: "HTML", date: "24/12/2025", img: "https://images.unsplash.com/photo-1543258103-a62bdc069871?w=400&q=80" },
  { title: "Cây Thông Noel 2", lang: "HTML", date: "24/12/2025", img: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&q=80" },
  { title: "Thầy trò rủ nhau đi thỉnh kinh", lang: "HTML", date: "20/12/2025", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80" },
  { title: "Vẽ Tom and Jerry bằng...", lang: "PYTHON", date: "15/12/2025", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80" },
  { title: "Loopy đáng yêu", lang: "PYTHON", date: "10/12/2025", img: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&q=80" },
  { title: "I Love You 2d", lang: "HTML", date: "05/12/2025", img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&q=80" },
  { title: "Change Photo", lang: "HTML", date: "01/12/2025", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" },
  { title: "Baw chịu một chút màu mè...", lang: "HTML", date: "28/11/2025", img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80" },
  { title: "Web tỏ tình", lang: "HTML", date: "20/11/2025", img: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&q=80" }
];

app.innerHTML = `
  <div class="dashboard-container">
    <!-- Header Component -->
    ${renderHeader()}

    <!-- Main Layout 2 Cột -->
    <div class="layout-2col">
      
      <!-- CỘT TRÁI (LỚN) -->
      <div class="col-main">
        
        <!-- Hàng Hero: Profile Card + Banner -->
        <div class="hero-grid">
          <!-- Profile Card -->
          <div class="box profile-card" style="--w: 100%; --h: auto; --r: 24px; --tr: 20%;">
            <div class="circle-overlay"></div>
            <div class="profile-content">
              <div class="box avatar-box" style="--w: 80px; --h: 80px; --r: 9999px; --tr: 35%;">
                <div class="circle-overlay"></div>
                <img src="/img/teone.jpeg" alt="Avatar" class="avatar-img" onerror="this.src='https://via.placeholder.com/80'" />
              </div>
              <div>
                <h2 class="name">Teo Building Code</h2>
                <p class="role">Software Engineer</p>
              </div>
              <div class="tag-row">
                <span class="tag-badge">Designer</span>
                <span class="tag-badge">Writer</span>
                <span class="tag-badge">Developer</span>
                <span class="tag-badge">Backend</span>
              </div>
              <div class="social-row">
                <a href="https://github.com/Joinney" target="_blank" class="box icon-btn" style="--w: 36px; --h: 36px; --r: 9999px;">
                  <div class="circle-overlay"></div>
                  <i class="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/zvoduytoanz/" target="_blank" class="box icon-btn" style="--w: 36px; --h: 36px; --r: 9999px;">
                  <div class="circle-overlay"></div>
                  <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://www.tiktok.com/@teohoclaptrinh" target="_blank" class="box icon-btn" style="--w: 36px; --h: 36px; --r: 9999px;">
                  <div class="circle-overlay"></div>
                  <i class="fab fa-tiktok"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Banner Card -->
          <div class="box banner-glass" style="--w: 100%; --h: 100%; --r: 24px; --tr: 15%;">
            <div class="circle-overlay"></div>
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop" alt="Banner E-Commerce" />
          </div>
        </div>

        <!-- Filter Bar & Clock -->
        <div class="controls-row">
          <div class="pills-group">
            <div class="box pill-btn active" style="--w: auto; --h: 36px; --r: 9999px;">
              <div class="circle-overlay"></div>
              <i class="fas fa-star" style="color: #f59e0b;"></i>
              <span>Nổi bật</span>
            </div>
            <div class="box pill-btn" style="--w: auto; --h: 36px; --r: 9999px;">
              <div class="circle-overlay"></div>
              <span>Mới nhất</span>
            </div>
            <div class="box pill-btn" style="--w: auto; --h: 36px; --r: 9999px;">
              <div class="circle-overlay"></div>
              <i class="fas fa-layer-group"></i>
              <span>Danh mục</span>
            </div>
            <div class="box pill-btn" style="--w: auto; --h: 36px; --r: 9999px;">
              <div class="circle-overlay"></div>
              <span>&lt;/&gt; Ngôn ngữ</span>
            </div>
          </div>

          <!-- Đồng hồ số điện tử -->
          <div class="box clock-box" style="--w: 160px; --h: 38px; --r: 9999px;">
            <div class="circle-overlay"></div>
            <span class="clock-text" id="live-clock">21:17</span>
          </div>
        </div>

        <!-- Khối MÃ NGUỒN (Grid 3x3) -->
        <div class="box source-section" style="--w: 100%; --h: auto; --r: 24px; --tr: 20%;">
          <div class="circle-overlay"></div>
          
          <div class="source-header">
            <div class="source-title">MÃ NGUỒN</div>
            <div class="box search-mini-box" style="--w: 200px; --h: 32px; --r: 9999px;">
              <div class="circle-overlay"></div>
              <input type="text" placeholder="Tìm kiếm source code..." />
              <i class="fas fa-search" style="z-index: 502; color: #64748b; font-size: 11px;"></i>
            </div>
          </div>

          <!-- 9 Thẻ Source Code -->
          <div class="grid-3x3">
            ${sourceCodes.map(item => `
              <div class="box code-card-glass" style="--w: 100%; --h: auto; --r: 16px; --tr: 15%;">
                <div class="circle-overlay"></div>
                <div class="card-thumb" style="z-index: 502;">
                  <img src="${item.img}" alt="${item.title}" />
                  <span class="thumb-badge"><i class="fas fa-play" style="font-size:6px"></i> Video</span>
                  <span class="thumb-tech-icon">5</span>
                </div>
                <div class="card-title-text" style="z-index: 502;">${item.title}</div>
                <div class="card-meta" style="z-index: 502;">
                  <span>${item.lang} • ${item.date}</span>
                  <div style="display: flex; gap: 8px;">
                    <i class="fas fa-eye"></i>
                    <i class="fas fa-download"></i>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Phân trang -->
          <div class="pagination-row">
            <div class="box page-btn active" style="--w: 26px; --h: 26px; --r: 9999px;"><span style="z-index: 502;">1</span></div>
            <div class="box page-btn" style="--w: 26px; --h: 26px; --r: 9999px;"><span style="z-index: 502;">2</span></div>
            <div class="box page-btn" style="--w: 26px; --h: 26px; --r: 9999px;"><span style="z-index: 502;">3</span></div>
          </div>
        </div>
      </div>

      <!-- CỘT PHẢI (NHỎ) -->
      <div class="col-side">
        <!-- Video Ngắn -->
        <div class="box shorts-glass" style="--w: 100%; --h: auto; --r: 24px; --tr: 20%;">
          <div class="circle-overlay"></div>
          <div class="shorts-header">
            <i class="fab fa-tiktok" style="color: #f43f5e;"></i> Video ngắn
          </div>
          <div class="shorts-preview" style="z-index: 502;">
            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop" alt="Short preview" />
            <div class="shorts-caption">Cây Thông 🎄</div>
          </div>
        </div>

        <!-- Thời gian vận hành -->
        <div class="box uptime-glass" style="--w: 100%; --h: auto; --r: 20px; --tr: 15%;">
          <div class="circle-overlay"></div>
          <div class="uptime-title">THỜI GIAN VẬN HÀNH</div>
          <div class="uptime-value">365 <span style="font-size: 0.8rem; font-weight: 500; color: #64748b;">Ngày</span></div>
        </div>
      </div>
    </div>

    <!-- Footer Component -->
    ${renderFooter()}
  </div>
`;

// Kích hoạt sự kiện đổi Theme trên Header
initHeaderEvents();

// Logic đồng hồ chạy thời gian thực
function updateClock() {
  const clock = document.getElementById('live-clock');
  if (!clock) return;
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  clock.textContent = `${h}:${m}`;
}
setInterval(updateClock, 1000);
updateClock();