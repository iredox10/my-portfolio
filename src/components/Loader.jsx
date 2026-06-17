import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Loader = ({ onLoadingComplete }) => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = { val: 0 };
    
    const tl = gsap.timeline({
      onComplete: () => {
        // Aggressive slice-up exit
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "expo.inOut",
          onComplete: onLoadingComplete
        });
      }
    });

    // Aggressive counter
    tl.to(current, {
      val: 100,
      duration: 2.5,
      ease: "power3.inOut",
      onUpdate: () => {
        setProgress(Math.round(current.val));
      }
    })
    // Text entrance
    .fromTo('.loader-char', 
      { yPercent: 120, skewY: 10 },
      { yPercent: 0, skewY: 0, stagger: 0.04, duration: 1, ease: "power4.out" },
      "-=1.5"
    )
    // Text exit
    .to('.loader-char', {
      yPercent: -120,
      skewY: -10,
      stagger: 0.04,
      duration: 0.8,
      ease: "power4.in"
    }, "+=0.2");

  }, [onLoadingComplete]);

  const brand = "IREDOX".split("");

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100000] bg-black text-white flex flex-col items-center justify-center overflow-hidden">
      
      {/* Massive Brand Reveal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex text-[18vw] font-black uppercase tracking-tighter mix-blend-difference pointer-events-none">
        {brand.map((char, i) => (
          <div key={i} className="overflow-hidden leading-none">
             <div className="loader-char origin-bottom">{char}</div>
          </div>
        ))}
      </div>

      {/* Brutalist Counter */}
      <div className="absolute bottom-4 right-8 md:bottom-12 md:right-16 text-[12vw] font-mono leading-none tracking-tighter text-white">
        {progress}
      </div>

      {/* Loading bar minimal */}
      <div className="absolute bottom-0 left-0 h-1 bg-white" style={{ width: `${progress}%` }}></div>

    </div>
  );
};

export default Loader;