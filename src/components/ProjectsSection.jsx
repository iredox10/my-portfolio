
// src/components/ProjectsSection.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects } from '../data/projects'; // Import data
import ProjectCard from './ProjectCard';

const ProjectsSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(projects.length - 1.5) * 85}vw`]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex pl-[10vw]">
          <div className="flex-shrink-0 w-[40vw] flex items-center justify-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white">Recent Work</h2>
          </div>
          {projects.map(project => <ProjectCard key={project.id} project={project} />)}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
