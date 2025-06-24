
// src/components/ProjectCard.jsx
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <div className="w-[80vw] md:w-[60vw] lg:w-[40vw] h-[60vh] flex-shrink-0 mr-8 relative overflow-hidden rounded-lg">
      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-8 text-white">
        <h3 className="text-3xl font-bold">{project.title}</h3>
        <p className="text-lg">{project.year}</p>
        <div className="mt-4">
          {project.tags.map(tag => (
            <span key={tag} className="inline-block bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">{tag}</span>
          ))}
        </div>
        <a href="#" className="absolute top-8 right-8 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center group">
          <ArrowUpRight className="w-8 h-8 transform group-hover:rotate-45 transition-transform duration-300" />
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
