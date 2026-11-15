import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

// Import các trang
import Home from './page/home';
import About from './page/about';
import Projects from './page/projects';
import Tools from './page/tools';
import Moments from './page/moments';
import SourceDetail from './page/source-detail';

import './style.css';

const VALID_TABS = ['home', 'about', 'projects', 'tools', 'moments', 'source-detail'];

const TAB_TITLES = {
  home: 'Võ Duy Toàn | Trang Chủ',
  about: 'Võ Duy Toàn | Về Tôi',
  projects: 'Võ Duy Toàn | Dự Án',
  tools: 'Võ Duy Toàn | Công Cụ',
  moments: 'Võ Duy Toàn | Khoảnh Khắc',
  'source-detail': 'Võ Duy Toàn | Chi Tiết Mã Nguồn'
};

const getTabFromUrl = () => {
  if (typeof window === 'undefined') return 'home';

  // 0. Kiểm tra truy vấn chi tiết mã nguồn (?source=36 hoặc ?sourceId=36)
  const params = new URLSearchParams(window.location.search);
  if (params.has('source') || params.has('sourceId')) {
    return 'source-detail';
  }

  // 1. Kiểm tra Hash (chuẩn SPA: #about, #projects, #source/36...)
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
  if (hash.startsWith('source')) return 'source-detail';
  if (VALID_TABS.includes(hash)) return hash;

  // 2. Kiểm tra Pathname nếu có (ví dụ: /about, /source-detail)
  const path = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase().trim();
  if (path === 'source-detail' || path.startsWith('source')) return 'source-detail';
  if (VALID_TABS.includes(path)) return path;

  return 'home';
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTabState] = useState(getTabFromUrl);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [isPageSwitching, setIsPageSwitching] = useState(false);
  const laserTimerRef = useRef(null);

  const triggerLaser = () => {
    setIsPageSwitching(false);
    if (laserTimerRef.current) clearTimeout(laserTimerRef.current);
    requestAnimationFrame(() => {
      setIsPageSwitching(true);
      laserTimerRef.current = setTimeout(() => {
        setIsPageSwitching(false);
      }, 550);
    });
  };

  const triggerTransition = (callback) => {
    triggerLaser();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof document !== 'undefined' && document.startViewTransition) {
      document.startViewTransition(() => {
        callback();
      });
    } else {
      callback();
    }
  };

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
      triggerTransition(() => {
        setActiveTabState(currentTab);
      });
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
      if (laserTimerRef.current) clearTimeout(laserTimerRef.current);
    };
  }, []);

  // Hàm chuyển tab đồng bộ URL trên thanh địa chỉ
  const changeTab = (newTab, updateUrl = true) => {
    const targetTab = VALID_TABS.includes(newTab) ? newTab : 'home';

    triggerTransition(() => {
      setActiveTabState(targetTab);

      if (updateUrl && typeof window !== 'undefined') {
        if (targetTab === 'home') {
          // Xóa query param source khi quay về trang chủ
          const params = new URLSearchParams(window.location.search);
          params.delete('source');
          params.delete('sourceId');
          const qStr = params.toString();
          const newUrl = window.location.pathname + (qStr ? `?${qStr}` : '');
          window.history.pushState({ tab: 'home' }, '', newUrl);
        } else if (targetTab === 'source-detail') {
          // Không ghi đè URL nếu đang ở trang chi tiết
        } else {
          const newHash = `#${targetTab}`;
          window.history.pushState({ tab: targetTab }, '', window.location.pathname + newHash);
        }
      }
    });
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Khóa duy nhất cho hiệu ứng chuyển động trang mượt mà
  const getPageTransitionKey = () => {
    if (activeTab === 'source-detail') {
      const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
      const sId = params.get('source') || params.get('sourceId') || 'detail';
      return `source-detail-${sId}`;
    }
    return activeTab;
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
      case 'source-detail':
        return <SourceDetail theme={theme} onBack={() => changeTab('home')} />;
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
        
        <main style={{ minHeight: '80vh', padding: '20px 0', position: 'relative' }}>
          {/* Tia laser quét ngang đỉnh nội dung khi chuyển trang */}
          <div className={`cyber-page-laser ${isPageSwitching ? 'active' : ''}`}></div>

          {/* Lớp bọc hiệu ứng kính mờ & trượt mượt mà */}
          <div key={getPageTransitionKey()} className="page-transition-wrapper">
            {renderPage()}
          </div>
        </main>

        {/* Truyền theme xuống Footer */}
        <Footer theme={theme} />
      </div>
    </>
  );
}
