
import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import { GameType } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const renderPage = () => {
    switch (activeTab) {
      case 'all':
        return <Home />;
      case 'bgmi':
        return <Home gameFilter={GameType.BGMI} />;
      case 'pubg':
        return <Home gameFilter={GameType.PUBG} />;
      case 'about':
        return <About />;
      default:
        return <Home />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
          {renderPage()}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
