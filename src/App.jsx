import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

// Import các trang
import Home from './page/home';
import About from './page/about';
import Projects from './page/projects';
import Tools from './page/tools';
import Moments from './page/moments';

import './style.css';

const VALID_TABS = ['home', 'about', 'projects', 'tools', 'moments'];

const TAB_TITLES = {
  home: 'Võ Duy Toàn | Trang Chủ',
  about: 'Võ Duy Toàn | Về Tôi',
  projects: 'Võ Duy Toàn | Dự Án',
  tools: 'Võ Duy Toàn | Công Cụ',
  moments: 'Võ Duy Toàn | Khoảnh Khắc'
};

const getTabFromUrl = () => {
  if (typeof window === 'undefined') return 'home';
  // 1. Kiểm tra Hash (chuẩn SPA trên mọi server tĩnh như GitHub Pages, Vercel: #about, #projects...)
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
  if (VALID_TABS.includes(hash)) return hash;

  // 2. Kiểm tra Pathname nếu có (ví dụ: /about)
  const path = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase().trim();
  if (VALID_TABS.includes(path)) return path;

  return 'home';
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTabState] = useState(getTabFromUrl);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Cập nhật Document Title theo trang hiện tại
  useEffect(() => {
    document.title = TAB_TITLES[activeTab] || 'Võ Duy Toàn | Profile';
  }, [activeTab]);

  // Lắng nghe sự kiện chuyển trang khi người dùng bấm Back / Forward hoặc đổi Hash
  useEffect(() => {
    const handleUrlChange = () => {
      const currentTab = getTabFromUrl();
      setActiveTabState(currentTab);
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Hàm chuyển tab đồng bộ URL trên thanh địa chỉ
  const changeTab = (newTab, updateUrl = true) => {
    const targetTab = VALID_TABS.includes(newTab) ? newTab : 'home';
    setActiveTabState(targetTab);

    if (updateUrl && typeof window !== 'undefined') {
      const newHash = targetTab === 'home' ? '' : `#${targetTab}`;
      const newUrl = window.location.pathname + (newHash ? newHash : '') + window.location.search;
      if (window.location.hash !== newHash) {
        window.history.pushState({ tab: targetTab }, '', newUrl);
      }
    }
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'about':
        return typeof About === 'function' ? <About /> : <div>Trang Về Tôi đang cập nhật...</div>;
      case 'projects':
        return typeof Projects === 'function' ? <Projects /> : <div>Trang Dự Án đang cập nhật...</div>;
      case 'tools':
        return typeof Tools === 'function' ? <Tools /> : <div>Trang Công Cụ đang cập nhật...</div>;
      case 'moments':
        return typeof Moments === 'function' ? <Moments /> : <div>Trang Khoảnh Khắc đang cập nhật...</div>;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <>
      {isLoading && (
        <LoadingScreen 
          theme={theme} 
          onFinish={() => setIsLoading(false)} 
        />
      )}

      <div className="dashboard-container">
        <Header 
          activeTab={activeTab} 
          setActiveTab={changeTab} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
        
        <main style={{ minHeight: '80vh', padding: '20px 0' }}>
          {renderPage()}
        </main>

        {/* Truyền theme xuống Footer */}
        <Footer theme={theme} />
      </div>
    </>
  );
}
