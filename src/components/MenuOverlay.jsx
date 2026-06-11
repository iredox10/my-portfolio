// src/components/MenuOverlay.jsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MENU_ITEMS = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const MenuOverlay = ({ isOpen, onNavigate }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape' && isOpen) onNavigate(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-slate-50 dark:bg-[#080812] flex flex-col items-center justify-center z-30 overflow-hidden"
          initial={{ clipPath: 'circle(10px at calc(100% - 56px) 56px)' }}
          animate={{ clipPath: 'circle(150% at calc(100% - 56px) 56px)' }}
          exit={{ clipPath: 'circle(10px at calc(100% - 56px) 56px)' }}
          transition={{ type: 'spring', stiffness: 18, restDelta: 2 }}
        >
          {/* Decorative background element */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-20%] right-[-15%] w-[600px] h-[600px] rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-[100px]" />
            <div className="absolute bottom-[-20%] left-[-15%] w-[500px] h-[500px] rounded-full bg-pink-500/5 dark:bg-pink-500/10 blur-[100px]" />
          </div>

          {/* Nav links */}
          <motion.nav
            className="flex flex-col items-center gap-2 relative z-10"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } }, hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } } }}
          >
            {MENU_ITEMS.map(({ name, href }, i) => (
              <motion.div
                key={name}
                variants={{ hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } } }}
              >
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); onNavigate(href); }}
                  className="group relative block text-5xl md:text-7xl font-black text-slate-300 dark:text-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 leading-tight tracking-tight text-center px-8 py-1"
                >
                  {/* Number prefix */}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    0{i + 1}
                  </span>
                  <motion.span
                    className="inline-block"
                    whileHover={{ x: 12, color: '#a855f7' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    {name}
                  </motion.span>
                  {/* Underline */}
                  <span className="absolute bottom-0 left-8 right-8 h-px bg-slate-200 dark:bg-slate-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              </motion.div>
            ))}
          </motion.nav>

          {/* Footer note in overlay */}
          <motion.p
            className="absolute bottom-10 text-xs text-slate-400 dark:text-slate-600 font-mono tracking-widest"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px]">ESC</kbd> to close
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuOverlay;
