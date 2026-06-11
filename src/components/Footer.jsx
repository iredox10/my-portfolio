// src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUp, Twitter, Download, Heart } from 'lucide-react';

const SOCIALS = [
  { icon: Mail, href: 'mailto:idreesadam200@gmail.com', label: 'Email' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/idris-adam-3ab197117/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/iredox10', label: 'GitHub' },
  { icon: Twitter, href: 'https://www.x.com/iredox50', label: 'Twitter/X' },
];

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* ── Floating scroll-to-top button ── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-top"
            onClick={scrollToTop}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center shadow-2xl shadow-purple-500/40"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Footer ── */}
      <footer className="relative text-slate-900 dark:text-white py-12 px-8 md:px-16 border-t border-black/10 dark:border-white/[0.06] bg-slate-100/80 dark:bg-black/60 backdrop-blur-sm z-10">
        <div className="max-w-6xl mx-auto">
          {/* Top row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8 pb-8 border-b border-black/5 dark:border-white/[0.05]">
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Iredox<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">.</span>
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                Building scalable digital experiences.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-200/60 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-400 border border-transparent hover:border-purple-500/20 transition-all duration-200"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>

            {/* Resume download */}
            <motion.a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow duration-300"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download size={15} />
              Download CV
            </motion.a>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 dark:text-slate-600">
            <p>
              &copy; {new Date().getFullYear()} Idris Adam (Iredox). All rights reserved.
            </p>
            <p className="flex items-center gap-1.5">
              Built with <Heart size={11} className="text-pink-500 fill-pink-500" /> using React, Three.js &amp; Framer Motion
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
