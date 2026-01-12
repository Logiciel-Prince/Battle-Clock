
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Clock, Info, AlarmClock } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  const navItems = [
    { id: 'all', label: 'Updates', icon: <Clock className="w-3.5 h-3.5" /> },
    { id: 'bgmi', label: 'BGMI', icon: null },
    { id: 'pubg', label: 'PUBG', icon: null },
    { id: 'about', label: 'Intel', icon: <Info className="w-3.5 h-3.5" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/60 dark:bg-slate-950/60 border-b border-slate-200 dark:border-white/5 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setActiveTab('all')}
          >
            <div className="relative">
              {/* Tactical Alarm Clock Logo Container */}
              <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(244,63,94,0.4)] relative overflow-hidden">
                <div className="group-hover:animate-bounce">
                    <AlarmClock className="text-white w-7 h-7 relative z-10 group-hover:rotate-12 transition-transform duration-150" />
                </div>
                {/* Background Scanline in logo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white dark:bg-rose-500 rounded-full animate-ping opacity-75" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black font-rajdhani tracking-tighter text-slate-900 dark:text-white leading-none uppercase">
                BATTLE<span className="text-rose-500">CLOCK</span>
              </span>
              <span className="text-[8px] font-black tracking-[0.4em] text-slate-500 uppercase leading-none mt-1">
                Tactical Sync Terminal
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 p-1 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 ${
                  activeTab === item.id
                    ? 'bg-rose-600 text-white shadow-xl shadow-rose-600/20'
                    : 'text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/5'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-3 rounded-2xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all border border-slate-200 dark:border-white/5"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Nav */}
      <div className="lg:hidden flex overflow-x-auto border-t border-slate-200 dark:border-white/5 scrollbar-hide py-3 px-6 gap-2 bg-slate-50/80 dark:bg-slate-950/40">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === item.id
                ? 'bg-rose-600 text-white shadow-lg'
                : 'bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-slate-400'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
