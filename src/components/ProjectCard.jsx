// src/components/ProjectCard.jsx
import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, i, progress, range, targetScale }) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="h-screen w-full flex items-center justify-center sticky top-0">
      <motion.div 
        className="relative w-[90%] max-w-4xl h-[70vh] max-h-[500px] bg-gray-800 border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
        style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
      >
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">
          {/* Image Side */}
          <div className="relative w-full h-full overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.imageUrl})` }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r" />
          </div>

          {/* Content Side */}
          <div className="relative p-8 flex flex-col justify-between">
            <div>
              <span className="text-sm font-semibold text-purple-400">{project.year}</span>
              <h3 className="text-3xl font-bold text-white mt-2">{project.title}</h3>
              <p className="text-gray-300 mt-4 text-base leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-sm bg-white/10 text-white rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={18} />
                Live Site
              </motion.a>
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={22} />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;