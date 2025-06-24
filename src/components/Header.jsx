
// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedMenuIcon = ({ isOpen, onClick }) => {
  const topVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 5 }
  };
  const middleVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 }
  };
  const bottomVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -5 }
  };

  return (
    <button onClick={onClick} className="w-8 h-8 relative focus:outline-none" aria-label="Toggle Menu">
      <motion.div
        className="w-full h-0.5 bg-white absolute top-1.5"
        variants={topVariants}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.3 }}
      ></motion.div>
      <motion.div
        className="w-full h-0.5 bg-white absolute top-1/2 -translate-y-1/2"
        variants={middleVariants}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.3 }}
      ></motion.div>
      <motion.div
        className="w-full h-0.5 bg-white absolute bottom-1.5"
        variants={bottomVariants}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.3 }}
      ></motion.div>
    </button>
  );
};


const Header = ({ onMenuClick, isMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Set initial time
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Africa/Lagos' // WAT timezone
      }));
    };

    updateTime();
    const timerId = setInterval(updateTime, 1000 * 60); // Update every minute

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timerId);
    };
  }, []);

  const headerVariants = {
    top: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      backdropFilter: 'blur(0px)',
      paddingTop: '2rem',
      paddingBottom: '2rem',
    },
    scrolled: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(10px)',
      paddingTop: '1rem',
      paddingBottom: '1rem',
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 w-full px-4 md:px-8 flex justify-between items-center z-40 text-white"
      variants={headerVariants}
      animate={isScrolled ? 'scrolled' : 'top'}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <a href="#" className="font-bold text-lg tracking-tighter mix-blend-difference">Iredox Tech</a>

      <div className="flex items-center space-x-6">
        <div className="hidden md:flex items-center space-x-2 text-sm">
          <span>Abuja, NG</span>
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
          <span>{time}</span>
        </div>
        <AnimatedMenuIcon isOpen={isMenuOpen} onClick={onMenuClick} />
      </div>
    </motion.header>
  );
};

export default Header;
