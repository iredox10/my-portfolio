import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MenuOverlay = ({ isOpen, onNavigate }) => {
  const overlayRef = useRef(null);
  
  const links = [
    { label: 'ABOUT', target: 'about' },
    { label: 'SKILLS', target: 'skills' },
    { label: 'WORK', target: 'projects' },
    { label: 'CONTACT', target: 'contact' }
  ];

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, {
        yPercent: 0,
        duration: 1,
        ease: "expo.inOut"
      });
      gsap.fromTo('.menu-link', 
        { yPercent: 120, skewY: 8 },
        { yPercent: 0, skewY: 0, duration: 1, stagger: 0.1, ease: "power4.out", delay: 0.3 }
      );
    } else {
      gsap.to(overlayRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut"
      });
    }
  }, [isOpen]);

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-black z-[90] flex flex-col justify-center px-6 md:px-24"
      style={{ transform: 'translateY(-100%)' }}
    >
      <nav className="flex flex-col gap-0 md:gap-4">
        {links.map((link) => (
          <div key={link.label} className="overflow-hidden">
            <button
              onClick={() => onNavigate(link.target)}
              className="menu-link block text-[15vw] md:text-[10vw] font-black uppercase text-white leading-[0.8] tracking-tighter hover:text-white/40 transition-colors text-left"
              data-cursor-pointer
            >
              {link.label}
            </button>
          </div>
        ))}
      </nav>
      
      <div className="absolute bottom-8 left-6 md:left-24 flex gap-6 md:gap-12 overflow-hidden">
        {['Twitter', 'LinkedIn', 'GitHub'].map(social => (
           <a key={social} href="#" className="menu-link text-white/50 font-mono text-xs md:text-sm uppercase hover:text-white transition-colors tracking-widest" data-cursor-pointer>
             {social}
           </a>
        ))}
      </div>
    </div>
  );
};

export default MenuOverlay;
