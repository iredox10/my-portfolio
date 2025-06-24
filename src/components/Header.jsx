
// src/components/Header.jsx
import React from 'react';

const Header = ({ onMenuClick }) => (
  <header className="fixed top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-40 text-white mix-blend-difference">
    <a href="#" className="font-bold text-lg tracking-tighter">Nikolai Lehbr</a>
    <button onClick={onMenuClick} className="font-bold text-lg tracking-tighter">Menu</button>
  </header>
);

export default Header;
