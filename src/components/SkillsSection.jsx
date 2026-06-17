import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const containerRef = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  
  const skills = [
    "REACT", "THREE.JS", "GSAP", "WEBGL", "TAILWIND", 
    "TYPESCRIPT", "NEXT.JS", "VITE", "NODE.JS", "GLSL"
  ];
  
  // Double the array for seamless infinite scrolling
  const marqueeItems = [...skills, ...skills, ...skills, ...skills];

  useGSAP(() => {
    // Infinite horizontal scroll
    gsap.to(marquee1Ref.current, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1
    });

    gsap.fromTo(marquee2Ref.current, 
      { xPercent: -50 },
      {
        xPercent: 0,
        ease: "none",
        duration: 20,
        repeat: -1
      }
    );

    // Scroll Trigger skew effect
    gsap.to('.marquee-wrapper', {
      skewX: -10,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

  }, { scope: containerRef });

  return (
    <section id="skills" ref={containerRef} className="w-full py-32 md:py-48 bg-black border-t border-white/10 overflow-hidden relative z-10 flex flex-col justify-center">
      
      <div className="mb-16 md:mb-24 px-6 md:px-12">
        <span className="text-white font-mono text-sm uppercase tracking-[0.3em] border border-white/20 px-4 py-2 rounded-full">
          The Arsenal
        </span>
      </div>

      <div className="marquee-wrapper relative flex whitespace-nowrap -rotate-3 scale-110">
        <div ref={marquee1Ref} className="flex gap-8 md:gap-16 items-center w-max">
           {marqueeItems.map((skill, i) => (
             <span 
               key={i} 
               className="text-[15vw] md:text-[10vw] font-black uppercase text-transparent hover:text-white transition-colors duration-300 cursor-default leading-none"
               style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)' }}
             >
               {skill}
             </span>
           ))}
        </div>
      </div>
      
      <div className="marquee-wrapper relative flex whitespace-nowrap rotate-2 scale-110 mt-8 md:mt-16">
        <div ref={marquee2Ref} className="flex gap-8 md:gap-16 items-center w-max">
           {marqueeItems.map((skill, i) => (
             <span 
               key={i} 
               className="text-[15vw] md:text-[10vw] font-black uppercase text-transparent hover:text-[#a855f7] transition-colors duration-300 cursor-default leading-none"
               style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)' }}
             >
               {skill}
             </span>
           ))}
        </div>
      </div>

    </section>
  );
};

export default SkillsSection;