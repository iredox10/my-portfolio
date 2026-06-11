import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    // Don't activate on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;

    // Set initial position immediately (avoid jumping from top left)
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    // Use GSAP quickTo for maximum performance
    const xMoveCursor = gsap.quickTo(cursor, "x", { duration: 0.6, ease: "power3.out" });
    const yMoveCursor = gsap.quickTo(cursor, "y", { duration: 0.6, ease: "power3.out" });
    
    const xMoveDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const yMoveDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });

    const handleMouseMove = (e) => {
      xMoveCursor(e.clientX);
      yMoveCursor(e.clientY);
      xMoveDot(e.clientX);
      yMoveDot(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor-pointer]');
      if (target) {
        gsap.to(cursor, {
          scale: 2.2,
          backgroundColor: 'rgba(168, 85, 247, 0.15)',
          borderColor: '#a855f7',
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(dot, { 
          scale: 0, 
          opacity: 0, 
          duration: 0.2 
        });
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, [data-cursor-pointer]');
      if (target) {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 255, 255, 0.6)',
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(dot, { 
          scale: 1, 
          opacity: 1, 
          duration: 0.2 
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-white pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      />
      {/* Ring — springs behind */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/60 pointer-events-none z-[9999] hidden md:block backdrop-blur-[1px]"
      />
    </>
  );
};

export default CustomCursor;
