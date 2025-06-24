
// src/components/ExperienceSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const experienceData = [
  {
    type: 'Education',
    title: 'HND in Computer Science',
    institution: 'Kano State Polytechnic',
    date: 'Graduated 2024',
    icon: <FaGraduationCap />,
    description: "Achieved a Higher National Diploma, building a strong foundation in software development, database management, and core computer science principles."
  },
  {
    type: 'Work',
    title: 'Software Developer Intern',
    institution: 'Steadfast Limited',
    date: '2023 - 2024',
    icon: <FaBriefcase />,
    description: "Contributed to live projects, gained hands-on experience with modern web technologies, and collaborated within an agile team to deliver high-quality software solutions."
  },
];

const TimelineItem = ({ data, isLast }) => {
  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };
  return (
    <motion.div
      className="flex items-start relative pl-16"
      variants={itemVariants}
    >
      <div className="absolute left-0 flex flex-col items-center h-full">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-gray-300 text-2xl z-10 ring-8 ring-black">
          {data.icon}
        </div>
        {!isLast && <div className="w-px flex-grow bg-white/20 mt-2"></div>}
      </div>
      <div className="bg-white/5 p-6 rounded-lg flex-1">
        <p className="text-sm font-semibold text-gray-400 mb-1">{data.date}</p>
        <h3 className="text-xl font-bold text-white mb-2">{data.title}</h3>
        <p className="text-lg text-gray-300 mb-3">{data.institution}</p>
        <p className="text-gray-400 leading-relaxed">{data.description}</p>
      </div>
    </motion.div>
  );
};


const ExperienceSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  return (
    <section className="bg-black text-white py-20 px-8 md:px-16">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          My Journey
        </motion.h2>

        <motion.div
          className="space-y-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {experienceData.map((item, index) => (
            <TimelineItem key={index} data={item} isLast={index === experienceData.length - 1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
