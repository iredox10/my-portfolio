// src/components/HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight, Code, Database, Cloud } from 'lucide-react';

// Animated background component
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden bg-gray-900">
    <motion.div
      className="absolute top-0 left-0 w-96 h-96 bg-purple-900/50 rounded-full filter blur-3xl"
      animate={{
        x: [-100, 100, -100],
        y: [-100, 100, -100],
        scale: [1, 1.2, 1],
      }}
      transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute bottom-0 right-0 w-96 h-96 bg-pink-900/50 rounded-full filter blur-3xl"
      animate={{
        x: [100, -100, 100],
        y: [100, -100, 100],
        scale: [1, 1.2, 1],
      }}
      transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    />
  </div>
);

// Placeholder for a hero image with some flair
const HeroImage = () => (
  <motion.div
    className="relative w-full h-full flex items-center justify-center"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="absolute w-3/4 h-3/4 bg-black rounded-3xl shadow-2xl shadow-purple-500/20 transform rotate-6" />
    <div className="absolute w-3/4 h-3/4 bg-gray-800 border border-white/10 rounded-3xl p-6 flex flex-col justify-between transform -rotate-3 transition-transform duration-500 hover:rotate-0">
      <div className="flex justify-between items-center text-gray-500">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs font-mono">/dev/portfolio</span>
      </div>
      <div className="text-left font-mono text-sm text-green-400">
        <p>&gt; Iredox.location</p>
        <p className="text-gray-400">  "Kano, Nigeria"</p>
        <p>&gt; Iredox.skills</p>
        <p className="text-gray-400">  ["React", "Node.js", "Next.js", "APIs"]</p>
        <p className="text-green-400 animate-pulse">&gt; █</p>
      </div>
      <div className="flex justify-around items-center text-gray-400">
        <Code className="w-8 h-8" />
        <Database className="w-8 h-8" />
        <Cloud className="w-8 h-8" />
      </div>
    </div>
  </motion.div>
);

const HeroSection = () => {
  const name = "Iredox Tech".split("");
  const tagline = "Full-Stack Web Developer".split("");

  return (
    <section className="h-screen w-full grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Left Column - Visuals */}
      <div className="relative h-full w-full flex items-center justify-center p-8">
        <HeroImage />
      </div>

      {/* Right Column - Text */}
      <div className="relative flex flex-col justify-center items-start p-8 md:p-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.span 
            className="text-purple-400 font-semibold text-lg"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } } }}
          >
            Hello, I'm
          </motion.span>
          
          <h2 className="text-4xl md:text-6xl font-bold mt-1 text-white">
            {name.map((el, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i / 15 }}
              >
                {el}
              </motion.span>
            ))}
          </h2>

          <h3 className="text-xl md:text-2xl text-gray-300 mt-4">
            {tagline.map((el, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 1.2 + i / 20 }}
              >
                {el}
              </motion.span>
            ))}
          </h3>

          <motion.p 
            className="text-gray-400 mt-6 max-w-md text-base"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 2.0 } } }}
          >
            I build dynamic and responsive web applications from front to back. 
            Passionate about clean code, modern technologies, and creating intuitive user experiences.
          </motion.p>

          <motion.button
            className="mt-8 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 2.2 } } }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const projectsSection = document.getElementById('projects');
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            View My Work
            <motion.div initial={{ x: 0 }} whileHover={{ x: 5 }}>
              <MoveRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;