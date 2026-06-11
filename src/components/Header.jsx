// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Sparkles, Download } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

// Dark sections whose background would obscure light header text
const DARK_SECTION_IDS = ['skills'];

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Exp.' },   // Abbreviated so pill fits narrow screens
  { id: 'contact', label: 'Contact' },
];

// ─── Animated hamburger ────────────────────────────────────────────────────────
const Hamburger = ({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    aria-label="Toggle navigation menu"
    className="w-8 h-6 relative flex flex-col justify-between focus:outline-none"
  >
    {[
      { top: 0, variants: { closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 10 } } },
      { top: '50%', variants: { closed: { opacity: 1, scaleX: 1 }, open: { opacity: 0, scaleX: 0 } } },
      { top: 'auto', variants: { closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -10 } } },
    ].map(({ variants }, i) => (
      <motion.span
        key={i}
        className="block w-full h-0.5 bg-current rounded-full origin-center"
        variants={variants}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      />
    ))}
  </button>
);

// ─── Header ───────────────────────────────────────────────────────────────────
const Header = ({ onMenuClick, isMenuOpen }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isOverDark, setIsOverDark] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const lastYRef = useRef(0);

  // Hide on downscroll, show on upscroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsHidden(y > lastYRef.current && y > 180);
      lastYRef.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const obs = NAV_ITEMS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
      );
      o.observe(el);
      return o;
    }).filter(Boolean);
    return () => obs.forEach(o => o.disconnect());
  }, []);

  // Detect if over a dark-background section
  useEffect(() => {
    const obs = DARK_SECTION_IDS.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([entry]) => setIsOverDark(entry.isIntersecting),
        { threshold: 0.2 }
      );
      o.observe(el);
      return o;
    }).filter(Boolean);
    return () => obs.forEach(o => o.disconnect());
  }, []);

  // Colour tokens — flip when over dark canvas
  const glass = isOverDark
    ? 'bg-black/70 border-white/10'
    : 'bg-white/50 dark:bg-black/50 border-slate-200/50 dark:border-white/10';

  const textBase = isOverDark
    ? 'text-slate-300'
    : 'text-slate-500 dark:text-slate-400';

  const textActive = isOverDark ? 'text-white' : 'text-slate-900 dark:text-white';

  const activePillBg = isOverDark
    ? 'bg-white/15'
    : 'bg-slate-100 dark:bg-white/10';

  const hoverPillBg = isOverDark
    ? 'bg-white/10'
    : 'bg-slate-100/70 dark:bg-white/[0.07]';

  const logoGradient = isOverDark
    ? 'from-white to-slate-300'
    : 'from-slate-800 to-slate-500 dark:from-white dark:to-slate-400';

  const activeSectionLabel = NAV_ITEMS.find(n => n.id === activeSection)?.label ?? '';

  return (
    <motion.header
      className="fixed top-5 left-1/2 -translate-x-1/2 w-[95%] md:w-auto z-40"
      initial={{ y: '-120%', opacity: 0 }}
      animate={isHidden
        ? { y: '-140%', opacity: 0, scale: 0.96 }
        : { y: '0%', opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`relative ${glass} backdrop-blur-xl border rounded-full px-3 py-2.5 md:px-5 md:py-2.5 flex items-center gap-1 md:gap-2 shadow-sm transition-all duration-500`}
      >
        {/* ── Logo ── */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          aria-label="Back to top"
          className="flex items-center gap-2 font-bold text-lg tracking-tight flex-shrink-0 md:mr-2 group"
        >
          <motion.div
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white"
            whileHover={{ rotate: 180, scale: 1.05 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
          >
            <Sparkles size={15} />
          </motion.div>
          <span className={`hidden md:block text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r transition-all duration-300 ${logoGradient} group-hover:from-purple-500 group-hover:to-pink-500`}>
            Iredox
          </span>
        </a>

        {/* ── Divider (desktop) ── */}
        <div className={`hidden md:block w-px h-5 ${isOverDark ? 'bg-white/15' : 'bg-slate-200 dark:bg-white/10'} mx-1`} />

        {/* ── Desktop nav ── */}
        <nav
          className="hidden md:flex items-center"
          onMouseLeave={() => setHoveredId(null)}
        >
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = activeSection === id;
            const isHovered = hoveredId === id;

            return (
              <a
                key={id}
                href={`#${id}`}
                onMouseEnter={() => setHoveredId(id)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 select-none
                  ${isActive ? textActive : textBase}`}
              >
                {/* Active pill (always visible when section is active) */}
                {isActive && (
                  <motion.span
                    layoutId="active-pill"
                    className={`absolute inset-0 rounded-full ${activePillBg}`}
                    transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                  />
                )}

                {/* Hover ghost pill (only shows when not already active) */}
                {isHovered && !isActive && (
                  <motion.span
                    layoutId="hover-pill"
                    className={`absolute inset-0 rounded-full ${hoverPillBg}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  />
                )}

                <span className="relative z-10">{label}</span>
              </a>
            );
          })}
        </nav>

        {/* ── Divider (desktop) ── */}
        <div className={`hidden md:block w-px h-5 ${isOverDark ? 'bg-white/15' : 'bg-slate-200 dark:bg-white/10'} mx-1`} />

        {/* ── Right controls ── */}
        <div className="flex items-center gap-1.5 md:gap-2">

          {/* Resume download */}
          <a
            href="/resume.pdf"
            download
            aria-label="Download Resume"
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200
              ${isOverDark
                ? 'border-purple-400/40 text-purple-300 hover:bg-purple-500/15'
                : 'border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/8 dark:hover:bg-purple-500/10'}`}
          >
            <Download size={12} />
            Resume
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`p-2 rounded-full transition-colors focus:outline-none
              ${isOverDark
                ? 'hover:bg-white/10 text-slate-200'
                : 'hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300'}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.div key="sun"
                  initial={{ y: -12, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 12, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.22 }}
                >
                  <Sun size={16} className="text-amber-400" />
                </motion.div>
              ) : (
                <motion.div key="moon"
                  initial={{ y: -12, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 12, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.22 }}
                >
                  <Moon size={16} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile: current section label + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {activeSectionLabel && (
              <motion.span
                key={activeSectionLabel}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-xs font-semibold tracking-wide ${isOverDark ? 'text-purple-300' : 'text-purple-600 dark:text-purple-400'}`}
              >
                {activeSectionLabel}
              </motion.span>
            )}
            <div className={`p-2 rounded-full ${isOverDark ? 'text-white hover:bg-white/10' : 'text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10'} transition-colors`}>
              <Hamburger isOpen={isMenuOpen} onClick={onMenuClick} />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
