
// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white p-8 md:p-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-4xl md:text-6xl font-bold">Let's create something together.</h3>
            <a href="mailto:hello@example.com" className="text-xl md:text-2xl mt-4 inline-block hover:italic">hello@example.com</a>
          </div>
          <div className="flex md:justify-end items-end">
            <ul className="flex space-x-6">
              <li><a href="#" className="text-lg hover:italic">Twitter</a></li>
              <li><a href="#" className="text-lg hover:italic">LinkedIn</a></li>
              <li><a href="#" className="text-lg hover:italic">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Nikolai Lehbr. All rights reserved.</p>
          <p>Design inspired by the original portfolio of Nikolai Lehbr.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
