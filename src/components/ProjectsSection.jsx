// src/components/ProjectsSection.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

const ProjectsSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section id="projects" ref={containerRef} className="relative bg-gray-900 text-white">
      <div className="text-center py-16">
        <h2 className="text-4xl md:text-5xl font-bold">
          My <span className="text-purple-400">Creations</span>
        </h2>
        <p className="text-lg text-gray-400 mt-4">A selection of my favorite projects.</p>
      </div>
      
      {projects.map((project, i) => {
        const targetScale = 1 - ((projects.length - i) * 0.05);
        const range = [i * (1 / projects.length), 1];
        
        return (
          <ProjectCard 
            key={project.id}
            i={i}
            project={project}
            progress={scrollYProgress}
            range={range}
            targetScale={targetScale}
          />
        );
      })}
    </section>
  );
};

export default ProjectsSection;