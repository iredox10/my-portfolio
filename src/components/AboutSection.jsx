// src/components/AboutSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Code, Users } from 'lucide-react';

const StatCard = ({ icon, value, label, delay }) => (
  <motion.div
    className="bg-gray-800/50 border border-white/10 rounded-xl p-6 text-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6, delay }}
  >
    <div className="text-purple-400 mx-auto mb-3 w-12 h-12 flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-3xl font-bold text-white">{value}</h3>
    <p className="text-gray-400 mt-1">{label}</p>
  </motion.div>
);

const AboutSection = () => {
  return (
    <section id="about" className="bg-gray-900 text-white py-24 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            About <span className="text-purple-400">Me</span>
          </h2>
          <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
            A brief introduction to my journey and passion for technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-sm mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-30"></div>
              <img 
                src="https://placehold.co/400x400/111827/FFFFFF?text=Iredox" 
                alt="Iredox Tech" 
                className="relative w-full rounded-full border-4 border-gray-700 shadow-lg"
              />
            </div>
          </motion.div>

          <div className="lg:col-span-3">
            <motion.p
              className="text-xl leading-relaxed text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I'm a full-stack web developer with a passion for building beautiful, functional, and user-centric web applications. I thrive on solving complex problems and turning ideas into reality through clean, efficient, and scalable code.
            </motion.p>
            <motion.p
              className="text-lg leading-relaxed text-gray-400 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              My expertise spans the entire web development stack, from crafting responsive user interfaces with modern frontend frameworks to designing robust backend services. I'm always eager to learn and improve my craft.
            </motion.p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard icon={<Award size={32} />} value="3+" label="Years Experience" delay={0.6} />
              <StatCard icon={<Code size={32} />} value="20+" label="Projects Completed" delay={0.8} />
              <StatCard icon={<Users size={32} />} value="15+" label="Happy Clients" delay={1.0} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;