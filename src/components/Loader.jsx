import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const Loader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const textRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // We run the loading sequence completely in GSAP
    const tl = gsap.timeline({
      onComplete: () => {
        // Tell App the loader is done, it will unmount via framer-motion exit
        setTimeout(() => onLoadingComplete(), 200);
      }
    });

    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 2.2,
      ease: "power3.inOut",
      onUpdate: () => {
        setProgress(Math.round(counter.val));
      }
    }, 0);

    // Initial scale-in of the ring
    tl.fromTo(ringRef.current, 
      { rotation: -90, scale: 0.5, opacity: 0 },
      { rotation: 0, scale: 1, opacity: 1, duration: 1.5, ease: "power4.out" },
      0
    );

    // Reveal text
    tl.fromTo(textRef.current,
      { y: 50, opacity: 0, skewY: 5 },
      { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: "power4.out" },
      0.3
    );

  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-[#09090b] flex flex-col items-center justify-center z-[100] overflow-hidden"
      exit={{ 
        y: "-100%", 
        opacity: 0, 
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div ref={ringRef} className="w-28 h-28 md:w-36 md:h-36 rounded-full border border-purple-500/10 flex items-center justify-center mb-8 relative">
          {/* Outer rotating dashed ring */}
          <div className="w-full h-full rounded-full border border-transparent border-t-purple-500/50 border-b-pink-500/50 absolute animate-spin" style={{ animationDuration: '4s' }} />
          {/* Inner counter */}
          <div className="text-4xl md:text-5xl font-light text-white tabular-nums tracking-tighter">
            {progress}<span className="text-xl md:text-2xl text-purple-400">%</span>
          </div>
        </div>

        <div className="overflow-hidden p-2">
          <h1 ref={textRef} className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">
            Iredox<span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-pink-500">.</span>
          </h1>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;