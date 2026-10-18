export function renderHeader() {
  return `
    <header class="header-container">
      <div class="box header-box" style="--w: 100%; --h: 58px; --r: 29px; --tr: 15%;">
        <div class="circle-overlay"></div>
        
        <!-- Vầng hào quang đỏ trang trí góc trái -->
        <div class="header-glow-left"></div>

        <div class="header-inner">
          <!-- Brand / Logo -->
          <a href="index.html" class="brand-wrapper">
            <img src="/img/teoicon.png" alt="Avatar" onerror="this.src='https://via.placeholder.com/32'" />
            <span>Teo Building Code</span>
          </a>

          <!-- Menu Navigation dạng Glass Pills -->
          <nav class="nav-links-box">
            <a href="#" class="nav-tab active">Trang chủ</a>
            <a href="#about" class="nav-tab">Về tôi</a>
            <a href="#projects" class="nav-tab">Dự án</a>
            <a href="#tools" class="nav-tab">Công cụ</a>
            <a href="#moments" class="nav-tab">Khoảnh khắc</a>
          </nav>

          <!-- Actions: Nút Search + Nút Toggle Theme -->
          <div class="header-actions">
            <button class="header-action-btn" title="Tìm kiếm">
              <i class="fas fa-search"></i>
            </button>
            
            <div class="box theme-toggle-box" id="theme-btn" style="--w: 36px; --h: 36px; --r: 9999px; --tr: 20%;" title="Đổi giao diện Sáng / Tối">
              <div class="circle-overlay"></div>
              <i class="fas fa-moon theme-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
}

// Xử lý sự kiện click chuyển theme
export function initHeaderEvents() {
  const themeBtn = document.getElementById('theme-btn');
  if (!themeBtn) return;

  const themeIcon = themeBtn.querySelector('.theme-icon');

  // Khôi phục trạng thái theme từ LocalStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    if (themeIcon) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  }

  // Lắng nghe sự kiện click trực tiếp
  themeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isLight = document.body.classList.toggle('light-mode');

    if (isLight) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      localStorage.setItem('theme', 'light');
    } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      localStorage.setItem('theme', 'dark');
    }
  });

  // Chuyển tab active khi click
  const navTabs = document.querySelectorAll('.nav-links-box .nav-tab');
  navTabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      navTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
}