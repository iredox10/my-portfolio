
// src/components/MenuOverlay.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MenuOverlay = ({ isOpen, onClose }) => {
  const menuVariants = {
    hidden: { y: "-100%" },
    visible: { y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: { y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.5 } }
  };

  const linkVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.5 + i * 0.1, duration: 0.5 }
    })
  };

  const menuItems = ["Home", "Work", "About", "Contact"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black text-white flex flex-col z-30"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex justify-between items-center p-4 md:p-8">
            <span className="font-bold text-lg tracking-tighter">Navigation</span>
            <button onClick={onClose} className="font-bold text-lg tracking-tighter">Close</button>
          </div>
          <div className="flex-grow flex items-center justify-center">
            <ul className="text-center">
              {menuItems.map((item, i) => (
                <motion.li key={item} custom={i} variants={linkVariants} initial="hidden" animate="visible" exit="hidden">
                  <a href="#" className="text-5xl md:text-7xl font-bold hover:italic block py-4">{item}</a>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuOverlay;
