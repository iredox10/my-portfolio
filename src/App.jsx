
// src/App.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import MenuOverlay from './components/MenuOverlay';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection'; // <-- Import the new component
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import Footer from './components/Footer';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(prev => !prev);
  }

  useEffect(() => {
    if (isLoading || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading, isMenuOpen]);

  return (
    <>
      <style>{`
                html { scroll-behavior: smooth; }
                body { background-color: #000; color: #fff; font-family: 'Inter', sans-serif; cursor: none; }
                a, button { cursor: none; }
            `}</style>

      <Loader onLoadingComplete={handleLoadingComplete} />
      <CustomCursor />

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Header onMenuClick={handleMenuToggle} />
            <MenuOverlay isOpen={isMenuOpen} onClose={handleMenuToggle} />
            <main>
              <HeroSection />
              <AboutSection />
              <ProjectsSection />
              <SkillsSection />
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
