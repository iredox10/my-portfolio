import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const containerRef = useRef(null);
  
  const text = "I am Idris Adam, a Full-Stack Developer from Kano, Nigeria. From my roots at Kano State Polytechnic to engineering production UIs at Steadfast Limited, I reject the mundane. I forge visceral, high-performance web environments that command attention.";
  
  const words = text.split(" ");

  useGSAP(() => {
    const wordElements = gsap.utils.toArray('.about-word');
    
    // Smooth scrub reveal of text
    gsap.fromTo(wordElements, 
      { color: "rgba(255,255,255,0.1)" },
      {
        color: "rgba(255,255,255,1)",
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 70%",
          scrub: true,
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="w-full min-h-screen flex flex-col justify-center py-32 px-6 md:px-12 bg-black border-t border-white/10 z-10 relative overflow-hidden">
      
      <div className="mb-12">
        <span className="text-white font-mono text-sm uppercase tracking-[0.3em] border border-white/20 px-4 py-2 rounded-full">
          The Manifesto
        </span>
      </div>

      <div className="max-w-[90vw] md:max-w-[75vw] mb-24">
        <h2 className="text-[8vw] md:text-[5vw] font-black uppercase text-white/10 leading-[1] tracking-tighter">
          {words.map((word, i) => (
            <span key={i} className="about-word inline-block mr-[2vw] md:mr-[1.2vw]">
              {word}
            </span>
          ))}
        </h2>
      </div>

      {/* Brutalist Grid: Avatar & Stats */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mt-12 border-t border-white/20 pt-12">
        
        {/* Avatar Area */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="relative w-full aspect-[4/5] border-2 border-white/20 overflow-hidden group grayscale hover:grayscale-0 transition-all duration-700">
            <img 
              src="/me.jpg" 
              alt="Idris Adam" 
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback if image fails */}
            <div className="hidden absolute inset-0 bg-black flex-col items-center justify-center border-t border-white/20">
              <span className="text-white/20 font-black text-8xl uppercase tracking-tighter">IA</span>
              <p className="text-white/50 font-mono text-[10px] tracking-widest mt-4 uppercase">/public/me.jpg missing</p>
            </div>
            
            {/* Brutalist overlay lines */}
            <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)' }}></div>
          </div>
          <div className="flex justify-between items-center border-b border-white/20 pb-2">
            <span className="font-mono text-xs uppercase tracking-widest text-white/50">Subject</span>
            <span className="font-mono text-xs uppercase tracking-widest text-white font-bold">Idris Adam</span>
          </div>
        </div>

        {/* Stats Area */}
        <div className="md:col-span-7 flex flex-col justify-end gap-12">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col border-l-2 border-white/20 pl-6">
              <span className="text-6xl md:text-8xl font-black text-white tracking-tighter">2+</span>
              <span className="font-mono text-[10px] md:text-xs text-white/50 uppercase tracking-[0.2em] mt-2">Years<br/>Coding</span>
            </div>
            
            <div className="flex flex-col border-l-2 border-white/20 pl-6">
              <span className="text-6xl md:text-8xl font-black text-white tracking-tighter">10+</span>
              <span className="font-mono text-[10px] md:text-xs text-white/50 uppercase tracking-[0.2em] mt-2">Projects<br/>Shipped</span>
            </div>
            
            <div className="flex flex-col border-l-2 border-white/20 pl-6">
              <span className="text-6xl md:text-8xl font-black text-white tracking-tighter">04</span>
              <span className="font-mono text-[10px] md:text-xs text-white/50 uppercase tracking-[0.2em] mt-2">Live<br/>Apps</span>
            </div>
          </div>

          <div className="bg-white text-black p-8 md:p-12">
            <h3 className="font-black text-3xl md:text-5xl uppercase tracking-tighter mb-4">The Objective</h3>
            <p className="font-medium text-lg md:text-xl leading-tight opacity-80">
              Transforming complex problems into elegant, highly scalable software. Clean code, optimal performance, and extreme attention to visceral details. Currently open to remote and full-time opportunities.
            </p>
          </div>

        </div>

      </div>

      <div className="absolute bottom-12 right-12 mix-blend-difference pointer-events-none hidden md:block">
        <div className="w-32 h-32 rounded-full border border-white/20 animate-spin-slow flex items-center justify-center">
          <span className="text-white font-mono text-xs uppercase tracking-widest absolute">Scroll</span>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;