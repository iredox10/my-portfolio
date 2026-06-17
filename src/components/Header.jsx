import React from 'react';
import { useAudio } from './AudioProvider';

const Header = ({ onMenuClick, isMenuOpen }) => {
  const { isAudioEnabled, toggleAudio } = useAudio();
  
  return (
    <header className="fixed top-0 left-0 w-full p-6 md:p-10 z-[100] flex justify-between items-center mix-blend-difference pointer-events-none">
      <div 
        className="text-white font-black text-2xl tracking-tighter uppercase pointer-events-auto hover:scale-105 transition-transform" 
        data-cursor-pointer
      >
        IREDOX
      </div>
      
      <div className="flex gap-4 items-center">
        <button 
          onClick={toggleAudio}
          className="text-white font-mono text-[10px] md:text-xs uppercase tracking-widest pointer-events-auto border border-white/20 px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-white hover:text-black transition-colors"
          data-cursor-pointer
        >
          SOUND [{isAudioEnabled ? 'ON' : 'OFF'}]
        </button>
        <button 
          onClick={onMenuClick}
          className="text-white font-mono text-[10px] md:text-xs uppercase tracking-widest pointer-events-auto border border-white/20 px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-white hover:text-black transition-colors"
          data-cursor-pointer
        >
          {isMenuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>
    </header>
  );
};

export default Header;
