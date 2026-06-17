import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { projects } from '../data/projects';
import GithubStats from './GithubStats';
import { ExternalLink, Github } from 'lucide-react';
import DistortedImage from './DistortedImage';

gsap.registerPlugin(ScrollTrigger);

const ProjectCardHorizontal = ({ project, index }) => {
  return (
    <div className="w-[90vw] md:w-[70vw] lg:w-[50vw] h-[75vh] flex-shrink-0 flex flex-col justify-center px-4 md:px-8">
      <div className="relative w-full h-full rounded-none overflow-hidden group bg-black/50 border border-white/10 transition-all duration-700 hover:border-white/40">
        
        <div className="absolute inset-0 z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-1000">
          <DistortedImage url={project.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'} />
        </div>
        
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-1000 z-10 pointer-events-none"></div>
        
        <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 z-20 pointer-events-none">
          <div className="flex flex-wrap gap-2 mb-4">
             {project.tags.map(tag => (
                <span key={tag} className="text-[10px] md:text-xs uppercase tracking-[0.2em] px-3 py-1 bg-black/50 text-white border border-white/20">
                  {tag}
                </span>
             ))}
          </div>
          
          <div className="mt-auto pointer-events-auto">
            <h3 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter uppercase mix-blend-difference">{project.title}</h3>
            <p className="text-lg text-white/80 mb-8 max-w-xl font-mono text-sm leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-4">
               <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-black bg-white hover:bg-gray-200 px-6 py-4 transition-colors pointer-events-auto cursor-pointer" data-cursor-pointer>
                 <ExternalLink size={14} /> View Live
               </a>
               <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white bg-transparent border border-white/40 hover:bg-white/10 px-6 py-4 transition-colors pointer-events-auto cursor-pointer" data-cursor-pointer>
                 <Github size={14} /> Source
               </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.project-card-wrapper');
    
    if (sections.length > 0) {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + (scrollContainerRef.current.offsetWidth || window.innerWidth),
        }
      });
    }

    gsap.fromTo('.projects-title',
      { opacity: 0, x: -100 },
      { 
        opacity: 0.2, 
        x: 0, 
        duration: 1.5, 
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

  }, { scope: containerRef });

  return (
    <>
      <section id="projects" ref={containerRef} className="relative bg-black text-white overflow-hidden h-screen flex flex-col justify-center border-t border-white/10">
        
        {/* Massive background text */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 z-0 pointer-events-none projects-title whitespace-nowrap overflow-hidden">
            <h2 className="text-[20vw] font-black text-white tracking-tighter uppercase leading-none mix-blend-overlay">
              Selected Work
            </h2>
        </div>

        <div className="w-full flex items-center z-10">
          <div ref={scrollContainerRef} className="flex flex-nowrap pl-[5vw] md:pl-[10vw] items-center">
              {projects.map((project, i) => (
                <div key={project.id} className="project-card-wrapper">
                  <ProjectCardHorizontal project={project} index={i} />
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black relative z-10 border-t border-white/10">
        <GithubStats />
      </section>
    </>
  );
};

export default ProjectsSection;