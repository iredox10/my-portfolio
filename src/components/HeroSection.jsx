import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowRight, Terminal, Database, Code, MapPin, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AvailabilityCard = ({ className }) => {
  const cardRef = useRef();

  useGSAP(() => {
    // Floating animation
    gsap.to(cardRef.current, {
      y: -10,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  }, []);

  const rows = [
    { icon: Terminal, color: 'text-purple-500', bg: 'bg-purple-500/10', label: 'Frontend', value: 'React · Next.js · TypeScript' },
    { icon: Database, color: 'text-pink-500', bg: 'bg-pink-500/10', label: 'Backend', value: 'Node.js · Express · MongoDB' },
    { icon: Code, color: 'text-violet-400', bg: 'bg-violet-500/10', label: 'Tooling', value: 'Git · Docker · Vite' },
  ];

  return (
    <div ref={cardRef} className={`relative w-full max-w-md mx-auto bg-white/60 dark:bg-[#111116]/60 backdrop-blur-2xl border border-slate-200/60 dark:border-white/[0.05] rounded-2xl p-6 shadow-xl shadow-purple-500/5 overflow-hidden ${className}`}>
      {/* Status header */}
      <div className="flex items-center justify-between border-b border-slate-200/30 dark:border-white/[0.05] pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Available for hire</span>
        </div>
        <span className="text-lg" title="Nigeria">🇳🇬</span>
      </div>

      {/* Skill rows */}
      <div className="space-y-3.5 mb-5">
        {rows.map(({ icon: Icon, color, bg, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${bg} ${color} flex-shrink-0`}>
              <Icon size={14} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-none">{label}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200/30 dark:border-white/[0.05] pt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <MapPin size={11} /><span>Kano, Nigeria</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-purple-600 dark:text-purple-400">
          <Clock size={11} /><span>≤ 24h reply</span>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Eyebrow and text reveal
    tl.fromTo('.hero-text-element', 
      { y: 60, opacity: 0, rotateX: -20 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" }
    );

    // Card reveal
    tl.fromTo('.hero-card-element',
      { x: 40, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
      "-=1"
    );

    // Scroll indicator float
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Scroll parallax effect
    gsap.to(textRef.current, {
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
    <section ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-16 z-10 perspective-1000">
      
      {/* Background glow removed; handled by ThreeJS background now */}

      <div className="container mx-auto px-6 md:px-12 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-20">
        
        {/* Left: Typography */}
        <div ref={textRef} className="flex flex-col items-start">
          <div className="hero-text-element flex items-center gap-3 mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500" />
            </span>
            <span className="text-sm font-medium tracking-wide text-slate-600 dark:text-slate-400 uppercase">
              Idris Adam · Full-Stack Developer
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter text-slate-900 dark:text-white leading-[1.05] mb-6">
            <div className="overflow-hidden pb-2"><div className="hero-text-element">Architecting</div></div>
            <div className="overflow-hidden pb-2"><div className="hero-text-element text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Scalable</div></div>
            <div className="overflow-hidden pb-2"><div className="hero-text-element">Solutions.</div></div>
          </h1>

          <p className="hero-text-element text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-lg mb-10 leading-relaxed font-light">
            I build robust, high-performance web applications — merging clean architecture with seamless user experiences to deliver products that scale.
          </p>

          <div className="hero-text-element flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white text-slate-900 rounded-full font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-xl shadow-white/10"
            >
              Explore My Work <ArrowRight size={17} />
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 border border-slate-300 dark:border-white/20 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-full font-medium transition-colors flex items-center justify-center"
            >
              Get in Touch
            </button>
          </div>
        </div>

        {/* Right: Availability card */}
        <div className="relative w-full z-20 hidden lg:block hero-card-element">
          <AvailabilityCard />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500">
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        <div ref={scrollIndicatorRef}>
          <ChevronDown size={20} className="text-purple-500" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
