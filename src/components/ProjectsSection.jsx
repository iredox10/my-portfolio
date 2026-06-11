import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import GithubStats from './GithubStats';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProjectCardHorizontal = ({ project, index }) => {
  return (
    <div className="w-[85vw] md:w-[60vw] lg:w-[45vw] h-[65vh] flex-shrink-0 flex flex-col justify-center px-4 md:px-8">
      <div className="relative w-full h-full rounded-3xl overflow-hidden group bg-[#111116]/80 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-500 hover:border-purple-500/30">
        
        {/* Placeholder image background - user can replace with actual img tags later */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-pink-900/10 group-hover:from-purple-900/20 group-hover:to-pink-900/20 transition-colors z-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white/5 font-black text-9xl uppercase overflow-hidden whitespace-nowrap opacity-20 transform -rotate-12 scale-150 transition-transform duration-1000 group-hover:scale-125">
          {project.title}
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-20 bg-gradient-to-t from-black via-black/60 to-transparent">
          <div className="flex flex-wrap gap-2 mb-4">
             {project.tags.map(tag => (
                <span key={tag} className="text-[10px] md:text-xs uppercase tracking-wider px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white/80 border border-white/5">
                  {tag}
                </span>
             ))}
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tighter">{project.title}</h3>
          <p className="text-lg text-white/60 mb-8 max-w-xl leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-4">
             <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-black bg-white hover:scale-105 px-6 py-3 rounded-full transition-transform">
               <ExternalLink size={16} /> Live Site
             </a>
             <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-colors backdrop-blur-md border border-white/10">
               <Github size={16} /> Source Code
             </a>
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
    
    // Only animate if we have sections
    if (sections.length > 0) {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1, // Smooth scrubbing
          snap: 1 / (sections.length - 1), // Snap to sections
          end: () => "+=" + (scrollContainerRef.current.offsetWidth || window.innerWidth),
        }
      });
    }

    // Title entrance animation
    gsap.fromTo('.projects-title',
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

  }, { scope: containerRef });

  return (
    <>
      <section id="projects" ref={containerRef} className="relative bg-transparent text-white overflow-hidden h-screen flex flex-col justify-center">
        
        {/* Title pinned in the background of the section */}
        <div className="absolute top-24 left-6 md:left-24 z-10 pointer-events-none projects-title">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-purple-400 mb-4 px-4 py-1.5 bg-purple-500/10 rounded-full border border-purple-500/20">
              Selected Work
            </span>
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Creations.</span>
            </h2>
        </div>

        <div className="w-full flex items-center pt-32">
          <div ref={scrollContainerRef} className="flex flex-nowrap pl-[5vw] md:pl-[20vw] items-center">
              {projects.map((project, i) => (
                <div key={project.id} className="project-card-wrapper">
                  <ProjectCardHorizontal project={project} index={i} />
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Put GithubStats in a separate unpinned section below */}
      <section className="py-24 bg-transparent relative z-10">
        <GithubStats />
      </section>
    </>
  );
};

export default ProjectsSection;