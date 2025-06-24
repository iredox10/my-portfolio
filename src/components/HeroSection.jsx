
// src/components/HeroSection.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);

    // Particle generation
    const particleContainer = document.getElementById('particle-container');
    if (particleContainer) {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particleContainer.appendChild(particle);
      }
    }

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  const transform = (factor, xOffset = 0, yOffset = 0) => {
    const x = (mousePosition.x - window.innerWidth / 2) * factor + xOffset;
    const y = (mousePosition.y - window.innerHeight / 2) * factor + yOffset;
    return `translate(${x}px, ${y}px)`;
  };

  return (
    <>
      <style>
        {`
                #particle-container {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                    z-index: 0;
                }
                .particle {
                    position: absolute;
                    width: 3px;
                    height: 3px;
                    background-color: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    opacity: 0;
                    animation-name: float;
                    animation-timing-function: ease-in-out;
                    animation-iteration-count: infinite;
                }
                @keyframes float {
                    0% { transform: translateY(0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(-100vh); opacity: 0; }
                }
                `}
      </style>
      <section className="h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
        <div id="particle-container"></div>

        <div className="relative text-center uppercase font-bold select-none" style={{ fontSize: 'clamp(3rem, 20vw, 15rem)', lineHeight: '0.8' }}>
          {/* Shadow Layer */}
          <motion.h1
            className="text-white/10"
            style={{ transform: transform(0.05) }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          >
            Hello
          </motion.h1>

          {/* Main Text Layer */}
          <motion.h1
            className="absolute inset-0 text-white"
            style={{ transform: transform(-0.02) }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          >
            Hello
          </motion.h1>

          {/* Outline Layer */}
          <motion.h1
            className="absolute inset-0"
            style={{
              transform: transform(-0.04),
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.5)',
              color: 'transparent',
            }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          >
            Hello
          </motion.h1>
        </div>

        <motion.div
          className="absolute bottom-8 flex flex-col items-center text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;

