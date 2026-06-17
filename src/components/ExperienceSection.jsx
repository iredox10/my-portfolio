import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { experiences } from '../data/experiences';

gsap.registerPlugin(ScrollTrigger);

const ExperienceItem = ({ exp }) => {
  return (
    <div 
      className="group border-b border-white/20 py-12 md:py-16 px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-white hover:text-black transition-colors duration-500 cursor-pointer" 
      data-cursor-pointer
    >
      <div className="flex flex-col relative z-10">
        <h3 className="text-[8vw] md:text-[4vw] font-black uppercase tracking-tighter leading-none mb-2 md:mb-0 group-hover:translate-x-8 transition-transform duration-500 ease-out">
          {exp.title}
        </h3>
        <span className="text-white/50 font-mono text-xs md:text-sm uppercase tracking-widest group-hover:text-black/60 group-hover:translate-x-8 transition-all duration-500 delay-75">
          {exp.company}
        </span>
      </div>
      
      <div className="mt-8 md:mt-0 md:text-right relative z-10">
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] mb-4 md:mb-2">{exp.period}</p>
        <p className="max-w-md text-sm md:text-base text-white/70 group-hover:text-black/80 transition-colors duration-500 hidden md:block">
          {exp.description}
        </p>
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.exp-item', 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="experience" ref={containerRef} className="w-full py-32 md:py-48 bg-black border-t border-white/10 z-10 relative">
      <div className="mb-16 md:mb-24 px-6 md:px-12">
        <span className="text-white font-mono text-sm uppercase tracking-[0.3em] border border-white/20 px-4 py-2 rounded-full">
          The Journey
        </span>
      </div>

      <div className="w-full border-t border-white/20">
        {experiences.map((exp, i) => (
          <div key={i} className="exp-item">
            <ExperienceItem exp={exp} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;