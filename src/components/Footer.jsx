// src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 text-white py-12 px-8 md:px-16 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left Side: Signature & Copyright */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-white">Iredox Tech</h3>
          <p className="text-sm text-gray-400 mt-1">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex space-x-6">
          <motion.a 
            href="mailto:idreesadam200@gmail.com" 
            className="text-gray-400 hover:text-purple-400 transition-colors"
            whileHover={{ y: -3 }}
          >
            <Mail size={24} />
          </motion.a>
          <motion.a 
            href="#" 
            className="text-gray-400 hover:text-purple-400 transition-colors"
            whileHover={{ y: -3 }}
          >
            <Linkedin size={24} />
          </motion.a>
          <motion.a 
            href="#" 
            className="text-gray-400 hover:text-purple-400 transition-colors"
            whileHover={{ y: -3 }}
          >
            <Github size={24} />
          </motion.a>
        </div>

        {/* Right Side: Back to Top */}
        <div className="text-center md:text-right">
          <motion.button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            whileHover={{ y: -3 }}
          >
            <span>Back to Top</span>
            <ArrowUp size={20} className="transform group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;