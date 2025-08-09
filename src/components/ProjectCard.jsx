// src/components/ProjectCard.jsx
import React, { useRef } from 'react';
import { motion, useTransform, useMotionValue, useSpring, useTime } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const Particle = ({ mouseX, mouseY, boundary, intensity, size }) => {
  const particleX = useSpring(useTransform(mouseX, [0, boundary.width], [-intensity, intensity]), { stiffness: 400, damping: 50 });
  const particleY = useSpring(useTransform(mouseY, [0, boundary.height], [-intensity, intensity]), { stiffness: 400, damping: 50 });
  const time = useTime();
  const slowDriftX = useTransform(time, [0, 10000], [0, Math.random() * 20 - 10], { clamp: false });
  const slowDriftY = useTransform(time, [0, 10000], [0, Math.random() * 20 - 10], { clamp: false });

  return (
    <motion.div 
      className="absolute bg-white/90 rounded-full"
      style={{ 
        width: size,
        height: size,
        x: useSpring(particleX), 
        y: useSpring(particleY),
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        translateX: slowDriftX,
        translateY: slowDriftY,
      }} 
    />
  );
};

const ProjectCard = ({ project, i, progress, range, targetScale }) => {
  const cardRef = useRef(null);
  
  const scale = useTransform(progress, range, [1, targetScale]);
  const imageScroll = useTransform(progress, range, [0, 100]);
  const backgroundY = useSpring(useTransform(imageScroll, [0, 100], ['0%', '-25%']), { stiffness: 400, damping: 90 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const boundary = { width: 800, height: 500 };

  const handleMouseMove = (e) => {
    if (e.nativeEvent.pointerType === "touch") return;
    if (cardRef.current) {
      const { left, top } = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useSpring(useTransform(mouseY, [0, boundary.height], [10, -10]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, boundary.width], [-10, 10]), { stiffness: 300, damping: 20 });

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center sticky top-0">
      <style>
        {`
          @property --angle {
            syntax: '<angle>';
            initial-value: 0deg;
            inherits: false;
          }
          .supernova-border {
            border: 3px solid;
            border-image: conic-gradient(from var(--angle), transparent, #a855f7, #ec4899, #f59e0b, #ec4899, #a855f7, transparent) 1;
            animation: rotate 8s linear infinite;
          }
          @keyframes rotate {
            to { --angle: 360deg; }
          }
          .pulsing-text {
            animation: pulse-glow 4s ease-in-out infinite;
          }
          @keyframes pulse-glow {
            0%, 100% { text-shadow: 0 0 20px rgba(192, 132, 252, 0.4); }
            50% { text-shadow: 0 0 35px rgba(236, 72, 153, 0.4); }
          }
        `}
      </style>
      <motion.div
        ref={cardRef}
        className="relative w-[90%] max-w-4xl h-[70vh] max-h-[500px] rounded-3xl overflow-hidden supernova-border"
        style={{ 
          scale, 
          top: `calc(-5vh + ${i * 25}px)`,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: 'rgba(15, 23, 42, 0.85)'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={(e) => e.nativeEvent.pointerType === "touch" && handleMouseLeave()}
      >
        <div className="absolute inset-0" style={{ transform: 'translateZ(-100px)', transformStyle: 'preserve-3d' }}>
          <motion.div 
            className="absolute inset-[-10%] w-[120%] h-[120%]"
            style={{ 
              backgroundImage: `url(${project.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              y: backgroundY
            }}
          />
          <div className="absolute inset-0 hidden md:block">
            {Array.from({ length: 30 }).map((_, idx) => <Particle key={idx} mouseX={mouseX} mouseY={mouseY} boundary={boundary} intensity={(idx % 3 + 1) * 20} size={(idx % 2 + 1) * 0.75 + 0.5} />)}
          </div>
        </div>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => (x > 0 && y > 0 ? `radial-gradient(800px at ${x}px ${y}px, rgba(168, 85, 247, 0.1), transparent 70%), radial-gradient(600px at ${x}px ${y}px, rgba(236, 72, 153, 0.1), transparent 70%)` : 'transparent')
            ),
          }}
        />

        <div className="relative w-full h-full p-6 md:p-10 flex flex-col justify-center" style={{ transform: 'translateZ(50px)' }}>
          <motion.div
            className="w-full md:max-w-lg"
            variants={contentVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.span variants={contentVariants} className="text-sm font-semibold text-purple-400">{project.year}</motion.span>
            <motion.h3 variants={contentVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 pulsing-text">{project.title}</motion.h3>
            <motion.p variants={contentVariants} className="text-gray-200 mt-4 text-base leading-relaxed" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>{project.description}</motion.p>
            <motion.div variants={contentVariants} className="flex flex-wrap gap-2 mt-6">
              {project.tags.map(tag => (
                <motion.span key={tag} className="px-3 py-1 text-xs md:text-sm bg-white/5 text-white rounded-full backdrop-blur-sm border border-white/10" whileHover={{ scale: 1.1, y: -2, background: 'rgba(255,255,255,0.1)', boxShadow: '0 0 10px rgba(255,255,255,0.1)' }}>{tag}</motion.span>
              ))}
            </motion.div>
            <motion.div variants={contentVariants} className="flex items-center gap-4 mt-8">
              <motion.a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/40 transition-all duration-300 text-sm md:text-base" whileHover={{ scale: 1.05, y: -3, boxShadow: '0px 10px 20px rgba(0,0,0,0.3)' }} whileTap={{ scale: 0.95 }}>
                <ExternalLink size={18} /> Live Site
              </motion.a>
              <motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                <Github size={24} />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
