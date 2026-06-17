import React from 'react';

const DistortedImage = ({ url }) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* 
        Instead of a heavy WebGL context per image which causes "Context Lost" crashes,
        we use an aggressive Brutalist CSS hover effect.
      */}
      <img 
        src={url} 
        alt="Project cover" 
        className="w-full h-full object-cover opacity-50 grayscale contrast-[1.2] transition-all duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 group-hover:contrast-[1.1]"
      />
      {/* Scanline overlay for cyber/brutalist feel */}
      <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2rV7928GhgBEGxoEAAAAAxgB2XAA2HMAAAAASUVORK5CYII=')] opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700 group-hover:opacity-0"></div>
    </div>
  );
};

export default DistortedImage;
