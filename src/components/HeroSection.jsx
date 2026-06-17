import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    // Brutalist text stagger reveal
    gsap.fromTo('.brutalist-text', 
      { yPercent: 120, rotateZ: 3 },
      { yPercent: 0, rotateZ: 0, duration: 1.5, stagger: 0.1, ease: "power4.out", delay: 0.2 }
    );
    
    // Scroll based parallax
    gsap.to('.hero-content', {
      yPercent: 40,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col justify-end pb-16 px-6 md:px-12 z-20 pointer-events-none mix-blend-difference">
      {/* We use mix-blend-difference so the white text inverts the LiquidCore colors behind it */}
      <div className="hero-content flex flex-col items-start gap-2 pointer-events-none w-full">
        
        <div className="overflow-hidden mb-4">
          <p className="text-white text-lg md:text-2xl font-mono tracking-widest uppercase brutalist-text">
            Idris Adam —
          </p>
        </div>

        <h1 className="text-[14vw] leading-[0.8] font-black text-white uppercase tracking-tighter w-full">
          <div className="overflow-hidden"><div className="brutalist-text text-white">Creative</div></div>
          <div className="overflow-hidden flex justify-end w-full"><div className="brutalist-text text-white">Developer</div></div>
        </h1>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full mt-12 md:mt-24 gap-8">
          <div className="overflow-hidden max-w-lg">
            <p className="text-white/80 text-xl md:text-2xl font-medium leading-tight brutalist-text">
              Engineering highly immersive WebGL architectures and hyper-kinetic interfaces.
            </p>
          </div>
        </div>

      </div>

      {/* Brutalist Availability Badge */}
      <div className="absolute bottom-8 right-6 md:right-12 z-30 brutalist-text hidden md:block">
        <div className="flex flex-col items-end gap-2 text-right">
          <div className="flex items-center gap-3 border border-white/20 rounded-full px-5 py-2.5 bg-black/50 backdrop-blur-md hover:bg-white hover:text-black transition-colors pointer-events-auto" data-cursor-pointer>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest font-bold">Available for hire</span>
          </div>
          <p className="text-white/50 font-mono text-[10px] uppercase tracking-widest mt-2">
            Kano, NG — ≤ 24h reply
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
