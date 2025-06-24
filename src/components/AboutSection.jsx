
// src/components/AboutSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section className="bg-black text-white py-20 px-8 md:px-16">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        <div className="md:col-span-1">
          <motion.h2
            className="text-3xl font-bold text-gray-400 sticky top-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>
        </div>
        <div className="md:col-span-2">
          <motion.p
            className="text-xl md:text-2xl leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            I'm a passionate developer and designer with a keen eye for detail, creating seamless and engaging digital experiences. My work is driven by a love for clean code, modern design, and user-centric solutions.
          </motion.p>
          <motion.p
            className="text-lg leading-relaxed text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            With a background in both front-end and back-end development, I bridge the gap between aesthetics and functionality. I thrive on turning complex problems into beautiful, intuitive, and high-performing web applications that not only look good but also perform exceptionally.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
