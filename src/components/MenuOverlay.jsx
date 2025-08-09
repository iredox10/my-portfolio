// src/components/MenuOverlay.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const MenuOverlay = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  const overlayVariants = {
    hidden: {
      clipPath: 'circle(10px at 90% 6%)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        delay: 0.5,
      },
    },
    visible: {
      clipPath: 'circle(150% at 90% 6%)',
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
      },
    },
  };

  const listVariants = {
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
    hidden: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } },
    visible: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-slate-900 text-white flex flex-col items-center justify-center z-30"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20800%22%3E%3Cpath%20fill%3D%22rgba(255,255,255,0.03)%22%20d%3D%22M0%200h800v800H0z%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
          
          <motion.ul
            className="text-center space-y-8"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {menuItems.map((item) => (
              <motion.li key={item.name} variants={itemVariants}>
                <a 
                  href={item.href} 
                  onClick={onClose}
                  className="text-4xl md:text-5xl font-bold text-gray-300 hover:text-white transition-colors"
                >
                  <motion.span
                    whileHover={{ 
                      color: '#c084fc',
                      textShadow: '0 0 15px rgba(192, 132, 252, 0.5)'
                    }}
                  >
                    {item.name}
                  </motion.span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuOverlay;