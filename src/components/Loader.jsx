// src/components/Loader.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onLoadingComplete }) => {
  const [isMounted, setIsMounted] = useState(true);

  const text = "Iredox Tech".split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.5 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeInOut' }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 12, stiffness: 200 }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: { duration: 1, ease: [0.6, 0.01, -0.05, 0.95], delay: 1.8 }
    },
    exit: {
      scaleX: 0,
      transformOrigin: 'right',
      transition: { duration: 0.6, ease: 'easeInOut' }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(false);
      onLoadingComplete();
    }, 3000); // Total duration of the loader

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div 
          className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white tracking-wider"
            aria-label="Iredox Tech"
          >
            {text.map((char, index) => (
              <motion.span 
                key={index} 
                className="inline-block"
                variants={letterVariants}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          <div className="w-48 h-1 mt-4 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              variants={lineVariants}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;