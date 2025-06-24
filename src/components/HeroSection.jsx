
// src/components/HeroSection.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  const transformX = (factor) => (mousePosition.x - window.innerWidth / 2) * factor;
  const transformY = (factor) => (mousePosition.y - window.innerHeight / 2) * factor;

  return (
    <section className="h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
      <div className="text-center text-white font-bold uppercase" style={{ fontSize: 'clamp(3rem, 20vw, 15rem)' }}>
        <motion.h1
          className="relative"
          style={{ x: transformX(-0.02), y: transformY(-0.02) }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          Hello
        </motion.h1>
      </div>
      <div className="absolute bottom-8 text-white text-sm animate-bounce">
        Scroll Down
      </div>
    </section>
  );
};

export default HeroSection;
