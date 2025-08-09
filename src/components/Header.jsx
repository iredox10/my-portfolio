// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedMenuIcon = ({ isOpen, onClick }) => {
  const topVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 8 }
  };
  const middleVariants = {
    closed: { opacity: 1, x: 0 },
    open: { opacity: 0, x: -10 }
  };
  const bottomVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -8 }
  };

  return (
    <button onClick={onClick} className="w-8 h-8 relative focus:outline-none z-50" aria-label="Toggle Menu">
      <motion.div
        className="w-full h-0.5 bg-white absolute"
        style={{ top: '8px' }}
        variants={topVariants}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
      <motion.div
        className="w-full h-0.5 bg-white absolute"
        style={{ top: '16px' }}
        variants={middleVariants}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
      <motion.div
        className="w-full h-0.5 bg-white absolute"
        style={{ top: '24px' }}
        variants={bottomVariants}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    </button>
  );
};

const Header = ({ onMenuClick, isMenuOpen }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [lastYPos, setLastYPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const yPos = window.scrollY;
      const isScrollingUp = yPos < lastYPos;

      setIsHidden(!isScrollingUp && yPos > 200);
      setLastYPos(yPos);
    };

    window.addEventListener('scroll', handleScroll, false);
    return () => window.removeEventListener('scroll', handleScroll, false);
  }, [lastYPos]);

  const headerVariants = {
    hidden: { y: '-120%', opacity: 0 },
    visible: { y: '0%', opacity: 1 }
  };

  return (
    <motion.header
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-40"
      variants={headerVariants}
      initial={{ y: '-120%', opacity: 0 }}
      animate={isHidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative bg-slate-800/50 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4 flex justify-between items-center shadow-2xl">
        <style>
          {`
            @keyframes pulse-glow-header {
              0%, 100% { text-shadow: 0 0 10px rgba(192, 132, 252, 0.3); }
              50% { text-shadow: 0 0 20px rgba(236, 72, 153, 0.3); }
            }
            .logo-pulse {
              animation: pulse-glow-header 4s ease-in-out infinite;
            }
          `}
        </style>
        <a href="#" className="font-bold text-xl tracking-tighter text-white logo-pulse">
          Iredox Tech
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          {['about', 'skills', 'projects', 'experience', 'contact'].map(item => (
            <motion.a 
              key={item}
              href={`#${item}`} 
              className="capitalize hover:text-white transition-colors"
              whileHover={{ y: -2, color: '#c084fc' }}
            >
              {item}
            </motion.a>
          ))}
        </nav>
        <div className="md:hidden">
          <AnimatedMenuIcon isOpen={isMenuOpen} onClick={onMenuClick} />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;