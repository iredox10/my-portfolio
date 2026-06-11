// src/components/ProjectCard.jsx
import React, { useRef } from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, i, progress, range, targetScale }) => {
  const cardRef = useRef(null);

  const scale = useTransform(progress, range, [1, targetScale]);
  const imageScroll = useTransform(progress, range, [0, 100]);
  const backgroundY = useSpring(
    useTransform(imageScroll, [0, 100], ['0%', '-15%']),
    { stiffness: 400, damping: 90 }
  );

  // Subtle 3D tilt — kept but reduced from ±10deg to ±5deg
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const boundary = { width: 800, height: 500 };

  const handleMouseMove = (e) => {
    if (e.nativeEvent.pointerType === 'touch') return;
    if (cardRef.current) {
      const { left, top } = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    }
  };

  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const rotateX = useSpring(useTransform(mouseY, [0, boundary.height], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [0, boundary.width], [-5, 5]), { stiffness: 300, damping: 30 });

  // Subtle cursor glow (kept — purposeful feedback)
  const cursorGlow = useTransform(
    [mouseX, mouseY],
    ([x, y]) => x > 0 && y > 0
      ? `radial-gradient(600px at ${x}px ${y}px, rgba(168,85,247,0.08), transparent 70%)`
      : 'transparent'
  );

  const contentVariants = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.08, delayChildren: 0.2 } },
  };

  return (
    <div className="h-screen w-full flex items-center justify-center sticky top-0">
      <motion.div
        ref={cardRef}
        className="relative w-[90%] max-w-4xl h-[70vh] max-h-[500px] rounded-3xl overflow-hidden border border-white/10"
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: 'rgba(10, 10, 20, 0.92)',
          // Clean solid border — no supernova animation
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background image with parallax */}
        <motion.div
          className="absolute inset-[-5%] w-[110%] h-[110%]"
          style={{
            backgroundImage: `url(${project.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: backgroundY,
          }}
        />

        {/* Dark gradient overlay — always-on, no extra decorations */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

        {/* Cursor glow — subtle, purposeful */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ background: cursorGlow }} />

        {/* Accent line at bottom matching project colour */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${project.accent ?? '#a855f7'}, transparent)` }}
        />

        {/* Content */}
        <div className="relative w-full h-full p-6 md:p-10 flex flex-col justify-end" style={{ transform: 'translateZ(50px)' }}>
          <motion.div
            className="w-full md:max-w-xl"
            variants={contentVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={contentVariants} className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono text-slate-400">{project.year}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full border border-current/20" style={{ color: project.accent ?? '#a855f7' }}>
                {project.role ?? project.tags[0]}
              </span>
            </motion.div>

            <motion.h3 variants={contentVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {project.title}
            </motion.h3>

            <motion.p variants={contentVariants} className="text-slate-300 mt-3 text-sm md:text-base leading-relaxed max-w-lg">
              {project.description}
            </motion.p>

            <motion.div variants={contentVariants} className="flex flex-wrap gap-2 mt-4">
              {project.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 text-xs bg-white/10 text-white/70 rounded-full border border-white/10 backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div variants={contentVariants} className="flex items-center gap-4 mt-6">
              <a
                href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 font-semibold rounded-lg text-sm hover:bg-purple-50 transition-colors"
              >
                <ExternalLink size={15} /> Live Site
              </a>
              <a
                href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 text-white/80 font-medium rounded-lg text-sm hover:bg-white/15 border border-white/10 transition-colors"
              >
                <Github size={15} /> Code
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
