// src/components/ExperienceSection.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const experienceData = [
  {
    type: 'Work',
    title: 'Software Developer Intern',
    institution: 'Steadfast Limited',
    date: '2023 - 2024',
    icon: <FaBriefcase />,
    description: "Developed and maintained responsive user interfaces using React and Tailwind CSS. Collaborated with a team to build and consume RESTful APIs, contributing to the full software development lifecycle in an agile environment."
  },
  {
    type: 'Education',
    title: 'HND in Computer Science',
    institution: 'Kano State Polytechnic',
    date: 'Graduated 2024',
    icon: <FaGraduationCap />,
    description: "Achieved a Higher National Diploma, building a strong foundation in software development, database management, and core computer science principles."
  },
  // To add more, place new items here. They will appear from top to bottom.
];

const TimelineItem = ({ experience, isLeft }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [isLeft ? -200 : 200, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-center my-12"
      style={{ x, opacity }}
    >
      <div className={`flex ${isLeft ? 'flex-row-reverse' : 'flex-row'} items-center w-full`}>
        <motion.div 
          className="w-full lg:w-2/5"
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="relative bg-slate-800/70 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className={`absolute -top-5 ${isLeft ? '-right-5' : '-left-5'} w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl ring-4 ring-slate-900`}>
              {experience.icon}
            </div>
            <p className="text-sm font-semibold text-purple-400 mb-1">{experience.date}</p>
            <h3 className="text-2xl font-bold text-white mb-2">{experience.title}</h3>
            <p className="text-lg text-gray-300 mb-3">{experience.institution}</p>
            <p className="text-gray-400 leading-relaxed">{experience.description}</p>
          </div>
        </motion.div>
        <div className="hidden lg:block w-1/5" />
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section id="experience" ref={targetRef} className="bg-gray-900 text-white py-24 px-8 md:px-16 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20800%22%3E%3Cpath%20fill%3D%22rgba(255,255,255,0.03)%22%20d%3D%22M0%200h800v800H0z%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          My <span className="text-purple-400">Ascension</span>
        </motion.h2>
        <p className="text-lg text-gray-400 text-center max-w-2xl mx-auto mb-24">
          Follow my journey from education to professional practice. Each step marks a new level of growth and expertise.
        </p>

        <div className="relative">
          {/* The Timeline Path */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-700 -translate-x-1/2" />
          <motion.div 
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 -translate-x-1/2"
            style={{ scaleY: pathLength, transformOrigin: 'top' }}
          />

          <div className="space-y-8">
            {experienceData.map((exp, index) => (
              <div key={index} className="relative">
                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                  <motion.div 
                    className="w-4 h-4 rounded-full bg-purple-500 border-2 border-slate-900"
                    style={{
                      scale: useTransform(scrollYProgress, [index / experienceData.length * 0.8, (index + 1) / experienceData.length * 0.8], [1, 1.5])
                    }}
                  />
                </div>
                <TimelineItem experience={exp} isLeft={index % 2 === 0} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
