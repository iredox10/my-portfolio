
// src/components/SkillsSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaHtml5, FaCss3Alt, FaSass, FaNodeJs, FaDocker, FaGitAlt, FaGithub } from 'react-icons/fa';
import {
  SiStyledcomponents,
  SiTailwindcss,
  SiSvelte,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiNeovim,
  // SiVisualstudiocode,
  SiVite
} from 'react-icons/si';
import { VscFileCode } from 'react-icons/vsc';

// Data for skills with categories and react-icons
const skillsData = {
  Frontend: [
    { name: 'React', icon: <FaReact /> },
    { name: 'HTML', icon: <FaHtml5 /> },
    { name: 'CSS', icon: <FaCss3Alt /> },
    { name: 'SCSS', icon: <FaSass /> },
    { name: 'Styled Comp.', icon: <SiStyledcomponents /> },
    { name: 'TailwindCSS', icon: <SiTailwindcss /> },
    { name: 'Svelte', icon: <SiSvelte /> },
  ],
  Backend: [
    { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'Express.js', icon: <SiExpress /> },
    { name: 'MongoDB', icon: <SiMongodb /> },
    { name: 'PostgreSQL', icon: <SiPostgresql /> },
  ],
  Tools: [
    { name: 'Neovim', icon: <SiNeovim /> },
    { name: 'VS Code', icon: <VscFileCode /> },
    { name: 'Docker', icon: <FaDocker /> },
    { name: 'Git', icon: <FaGitAlt /> },
    { name: 'Vite', icon: <SiVite /> },
    { name: 'GitHub', icon: <FaGithub /> },
  ],
};

const SkillCard = ({ name, icon }) => (
  <motion.div
    className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-lg text-center aspect-square"
    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <div className="text-4xl mb-3 text-gray-300">{icon}</div>
    <span className="text-sm font-medium text-gray-200">{name}</span>
  </motion.div>
);

const SkillsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    },
  };

  return (
    <section className="bg-black text-white py-20 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Technologies I Use
        </motion.h2>

        {Object.entries(skillsData).map(([category, skills]) => (
          <motion.div
            key={category}
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <h3 className="text-2xl font-semibold text-gray-400 mb-6">{category}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {skills.map(skill => (
                <motion.div key={skill.name} variants={itemVariants}>
                  <SkillCard name={skill.name} icon={skill.icon} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
