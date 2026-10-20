import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

// Import các trang
import Home from './page/home';
import About from './page/about';
import Projects from './page/projects';
import Tools from './page/tools';
import Moments from './page/moments';

import './style.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Hàm hiển thị trang tương ứng
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
    <div className="dashboard-container">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main style={{ minHeight: '80vh', padding: '20px 0' }}>
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
}