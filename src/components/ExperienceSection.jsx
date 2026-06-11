// src/components/ExperienceSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import { ArrowUpRight } from 'lucide-react';

const items = [
  {
    type: 'Work',
    icon: FaBriefcase,
    title: 'Software Developer Intern',
    org: 'Steadfast Limited',
    date: 'Jul 2023 – Jun 2024',
    color: 'from-purple-600 to-pink-500',
    iconBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    description: 'Built and maintained responsive React UIs, consumed RESTful APIs, and collaborated in an agile team across the full software development lifecycle.',
  },
  {
    type: 'Education',
    icon: FaGraduationCap,
    title: 'HND — Computer Science',
    org: 'Kano State Polytechnic',
    date: 'Graduated 2024',
    color: 'from-pink-500 to-violet-500',
    iconBg: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
    description: 'Studied software development, database management, and core CS principles. Built multiple coursework projects using web technologies.',
  },
];

const TimelineCard = ({ item, i }) => (
  <motion.div
    className="relative flex gap-6 pb-10 last:pb-0"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.5, delay: i * 0.15 }}
  >
    {/* Vertical line */}
    {i < items.length - 1 && (
      <div className="absolute left-5 top-12 bottom-0 w-px bg-slate-200 dark:bg-white/[0.06]" />
    )}

    {/* Icon */}
    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm z-10 ${item.iconBg} border border-current/10`}>
      <item.icon />
    </div>

    {/* Content */}
    <motion.div
      className="flex-1 bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm border border-slate-200/60 dark:border-white/[0.07] rounded-2xl p-5 hover:shadow-lg transition-shadow duration-300 group"
      whileHover={{ y: -3 }}
    >
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight">{item.title}</h3>
          <p className={`text-sm font-semibold mt-0.5 text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}>{item.org}</p>
        </div>
        <span className="text-xs font-mono text-slate-400 dark:text-slate-500 whitespace-nowrap mt-0.5">{item.date}</span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
    </motion.div>
  </motion.div>
);

const ExperienceSection = () => (
  <section id="experience" className="py-28 px-8 md:px-16 relative z-10">
    <div className="max-w-3xl mx-auto">

      {/* Section header */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
      >
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-purple-600 dark:text-purple-400 mb-4 px-4 py-1.5 bg-purple-500/10 rounded-full border border-purple-500/20">
          My Journey
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Experience &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            Education
          </span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl mx-auto">
          My path from the classroom to building production software.
        </p>
      </motion.div>

      {/* Timeline */}
      <div>
        {items.map((item, i) => <TimelineCard key={item.title} item={item} i={i} />)}
      </div>

      {/* CTA */}
      <motion.div
        className="mt-10 text-center"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ delay: 0.4 }}
      >
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors group"
        >
          View full résumé
          <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </motion.div>
    </div>
  </section>
);

export default ExperienceSection;