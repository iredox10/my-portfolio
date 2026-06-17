import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const AudioContext = createContext(null);

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const audioCtxRef = useRef(null);
  const droneOscRef = useRef(null);
  const droneGainRef = useRef(null);

  const initAudio = () => {
    if (audioCtxRef.current) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtxRef.current = new AudioContextClass();
    
    // Ambient drone
    const osc = audioCtxRef.current.createOscillator();
    const gainNode = audioCtxRef.current.createGain();
    
    osc.type = 'sine';
    osc.frequency.value = 55; // Low ambient drone (A1)
    
    gainNode.gain.value = 0; // Start silent
    
    osc.connect(gainNode);
    gainNode.connect(audioCtxRef.current.destination);
    
    osc.start();
    
    droneOscRef.current = osc;
    droneGainRef.current = gainNode;
  };

  useEffect(() => {
    if (isAudioEnabled) {
      initAudio();
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      // Fade in drone smoothly
      droneGainRef.current.gain.setTargetAtTime(0.08, audioCtxRef.current.currentTime, 1);
    } else {
      if (droneGainRef.current && audioCtxRef.current) {
        // Fade out drone
        droneGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
      }
    }
  }, [isAudioEnabled]);

  const playHoverClick = () => {
    if (!isAudioEnabled || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    // Brutalist sharp click sound
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    
    filter.type = 'highpass';
    filter.frequency.value = 800;
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.06);
  };

  const toggleAudio = () => setIsAudioEnabled(prev => !prev);

  // Global hover listener to inject sound to any element with data-cursor-pointer
  useEffect(() => {
    if (!isAudioEnabled) return;
    
    const elements = document.querySelectorAll('[data-cursor-pointer]');
    const handleMouseOver = () => playHoverClick();
    
    elements.forEach(el => el.addEventListener('mouseenter', handleMouseOver));
    
    return () => {
      elements.forEach(el => el.removeEventListener('mouseenter', handleMouseOver));
    };
  }); // Run on every render to catch newly added elements

  return (
    <AudioContext.Provider value={{ isAudioEnabled, toggleAudio, playHoverClick }}>
      {children}
    </AudioContext.Provider>
  );
};
