// src/App.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEOMeta from './components/SEOMeta';

import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Header from './components/Header';
import MenuOverlay from './components/MenuOverlay';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import Footer from './components/Footer';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';



const SECTION_TITLES = {
  about: 'About | Iredox',
  skills: 'Skills | Iredox',
  projects: 'Projects | Iredox',
  experience: 'Experience | Iredox',
  contact: 'Contact | Iredox',
};
const DEFAULT_TITLE = 'Iredox | Full-Stack Developer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [targetSection, setTargetSection] = useState(null);

  const handleLoadingComplete = () => setIsLoading(false);
  const handleMenuToggle = () => setIsMenuOpen(prev => !prev);
  const handleNavigate = (href) => { setIsMenuOpen(false); setTargetSection(href); };

  // Lock scroll when loading or menu is open
  useEffect(() => {
    document.body.style.overflow = (isLoading || isMenuOpen) ? 'hidden' : 'auto';
  }, [isLoading, isMenuOpen]);

  // Smooth-scroll to target section after menu closes
  useEffect(() => {
    if (targetSection && !isMenuOpen) {
      const el = document.querySelector(targetSection);
      if (el) {
        setTimeout(() => { el.scrollIntoView({ behavior: 'smooth' }); setTargetSection(null); }, 100);
      }
    }
  }, [targetSection, isMenuOpen]);

  // Dynamic page title — updates as sections scroll into view
  useEffect(() => {
    if (isLoading) return;
    const observers = Object.entries(SECTION_TITLES).map(([id, title]) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) document.title = title; },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    }).filter(Boolean);

    // Reset to default when at top (hero section)
    const onScroll = () => { if (window.scrollY < 100) document.title = DEFAULT_TITLE; };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observers.forEach(o => o.disconnect());
      window.removeEventListener('scroll', onScroll);
      document.title = DEFAULT_TITLE;
    };
  }, [isLoading]);

  return (
    <>
      <SEOMeta />
      <style>{`
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; cursor: none; }
        a, button { cursor: none; }
      `}</style>

      {/* ── Skip to main content (keyboard accessibility) ── */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* ── Scroll progress bar ── */}
      {!isLoading && <ScrollProgress />}

      <AnimatePresence>
        {isLoading && <Loader onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <CustomCursor />

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >


            <Header onMenuClick={handleMenuToggle} isMenuOpen={isMenuOpen} />
            <MenuOverlay isOpen={isMenuOpen} onNavigate={handleNavigate} />

            <main id="main-content">
              <HeroSection />
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <ExperienceSection />
              <ContactSection />
              <Footer />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}