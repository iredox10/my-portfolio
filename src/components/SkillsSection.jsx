// src/components/SkillsSection.jsx
import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaDocker, FaGitAlt, FaGithub } from 'react-icons/fa';
import { SiTailwindcss, SiSvelte, SiExpress, SiMongodb, SiPostgresql, SiVite, SiJavascript, SiTypescript, SiNextdotjs } from 'react-icons/si';

const skills = {
  Frontend: [
    { name: 'React', icon: <FaReact size="100%" /> },
    { name: 'Next.js', icon: <SiNextdotjs size="100%" /> },
    { name: 'JavaScript', icon: <SiJavascript size="100%" /> },
    { name: 'TypeScript', icon: <SiTypescript size="100%" /> },
    { name: 'HTML', icon: <FaHtml5 size="100%" /> },
    { name: 'TailwindCSS', icon: <SiTailwindcss size="100%" /> },
  ],
  Backend: [
    { name: 'Node.js', icon: <FaNodeJs size="100%" /> },
    { name: 'Express', icon: <SiExpress size="100%" /> },
    { name: 'MongoDB', icon: <SiMongodb size="100%" /> },
    { name: 'PostgreSQL', icon: <SiPostgresql size="100%" /> },
  ],
  Tools: [
    { name: 'Git', icon: <FaGitAlt size="100%" /> },
    { name: 'GitHub', icon: <FaGithub size="100%" /> },
    { name: 'Docker', icon: <FaDocker size="100%" /> },
    { name: 'Vite', icon: <SiVite size="100%" /> },
  ],
};

const desktopSkills = [
  { name: 'React', icon: <FaReact size="100%" />, position: { top: '20%', left: '25%' }, size: 110 },
  { name: 'Next.js', icon: <SiNextdotjs size="100%" />, position: { top: '35%', left: '10%' }, size: 90 },
  { name: 'JavaScript', icon: <SiJavascript size="100%" />, position: { top: '50%', left: '30%' }, size: 90 },
  { name: 'TypeScript', icon: <SiTypescript size="100%" />, position: { top: '25%', left: '45%' }, size: 80 },
  { name: 'HTML', icon: <FaHtml5 size="100%" />, position: { top: '65%', left: '15%' }, size: 80 },
  { name: 'TailwindCSS', icon: <SiTailwindcss size="100%" />, position: { top: '55%', left: '50%' }, size: 100 },
  { name: 'Node.js', icon: <FaNodeJs size="100%" />, position: { top: '20%', right: '25%' }, size: 110 },
  { name: 'Express', icon: <SiExpress size="100%" />, position: { top: '35%', right: '10%' }, size: 90 },
  { name: 'MongoDB', icon: <SiMongodb size="100%" />, position: { top: '50%', right: '30%' }, size: 100 },
  { name: 'PostgreSQL', icon: <SiPostgresql size="100%" />, position: { top: '65%', right: '15%' }, size: 90 },
  { name: 'Git', icon: <FaGitAlt size="100%" />, position: { bottom: '10%', left: '40%' }, size: 90 },
  { name: 'GitHub', icon: <FaGithub size="100%" />, position: { bottom: '10%', left: '60%' }, size: 90 },
  { name: 'Docker', icon: <FaDocker size="100%" />, position: { bottom: '25%', left: '50%' }, size: 100 },
  { name: 'Vite', icon: <SiVite size="100%" />, position: { bottom: '15%', left: '20%' }, size: 80 },
];

const SkillOrb = ({ skill, mouseX, mouseY, isMobile = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const ref = useRef(null);

  const dx = useMotionValue(0);
  const dy = useMotionValue(0);

  if (ref.current && !isMobile) {
    const rect = ref.current.getBoundingClientRect();
    const orbX = rect.left + rect.width / 2;
    const orbY = rect.top + rect.height / 2;
    dx.set(orbX - mouseX.get());
    dy.set(orbY - mouseY.get());
  }

  const distance = useTransform([dx, dy], ([latestX, latestY]) => Math.sqrt(latestX ** 2 + latestY ** 2));
  const pullX = useSpring(useTransform(distance, [0, 200], [0, -dx.get() * 0.2]), { stiffness: 400, damping: 50 });
  const pullY = useSpring(useTransform(distance, [0, 200], [0, -dy.get() * 0.2]), { stiffness: 400, damping: 50 });

  const orbSize = isMobile ? 80 : skill.size;

  return (
    <motion.div
      ref={ref}
      className={isMobile ? 'relative' : 'absolute'}
      style={isMobile ? {} : { ...skill.position, width: orbSize, height: orbSize, x: pullX, y: pullY }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTap={() => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 500);
      }}
      variants={{
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 150 } }
      }}
    >
      <motion.div
        className="relative rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center p-[15%]"
        style={{ width: orbSize, height: orbSize }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="text-gray-400 group-hover:text-purple-400 transition-colors duration-300 w-full h-full">
          {skill.icon}
        </div>
        <motion.div 
          className="absolute inset-0 rounded-full"
          initial={{ boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}
          animate={{
            boxShadow: isHovered ? '0 0 30px rgba(192, 132, 252, 0.5)' : '0 0 10px rgba(0,0,0,0.5)',
            scale: [1, 1.05, 1],
            y: [0, -orbSize * 0.05, 0]
          }}
          transition={{
            boxShadow: { duration: 0.3 },
            scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }}
        />
        {isClicked && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-purple-400"
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.div>
      <motion.span 
        className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-sm text-gray-300 whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {skill.name}
      </motion.span>
    </motion.div>
  );
};

const SkillsSection = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }
  };

  return (
    <section 
      id="skills" 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="bg-gray-900 text-white py-24 px-8 md:px-16 relative min-h-screen md:h-[120vh] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20800%22%3E%3Cpath%20fill%3D%22rgba(255,255,255,0.03)%22%20d%3D%22M0%200h800v800H0z%22%2F%3E%3Cpath%20fill%3D%22rgba(255,255,255,0.03)%22%20d%3D%22M400%200c-110.5%200-200%2089.5-200%20200s89.5%20200%20200%20200%20200-89.5%20200-200S510.5%200%20400%200zM400%20800c110.5%200%20200-89.5%20200-200s-89.5-200-200-200-200%2089.5-200%20200%2089.5%20200%20200%20200z%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(1000px at ${mouseX.get()}px ${mouseY.get()}px, rgba(168, 85, 247, 0.15), transparent 80%)`
        }}
      />
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          My Digital <span className="text-purple-400">Nebula</span>
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          An interactive constellation of the technologies I command. Hover, click, and explore.
        </motion.p>
      </div>
      
      {/* Desktop Nebula */}
      <motion.div 
        className="hidden md:block absolute inset-0 top-60"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.05 }}
      >
        {desktopSkills.map((skill) => (
          <SkillOrb key={skill.name} skill={skill} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </motion.div>

      {/* Mobile Galactic Stream */}
      <div className="md:hidden mt-20 space-y-16">
        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category}>
            <motion.h3 
              className="text-2xl font-semibold text-center text-gray-400 mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              {category}
            </motion.h3>
            <motion.div 
              className="flex flex-wrap justify-center items-center gap-x-8 gap-y-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {skillList.map((skill) => (
                <SkillOrb key={skill.name} skill={skill} isMobile={true} />
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;