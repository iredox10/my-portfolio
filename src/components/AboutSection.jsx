// src/components/AboutSection.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Code2, Rocket } from 'lucide-react';
import InteractiveTerminal from './InteractiveTerminal';

const stats = [
  { icon: Briefcase, value: '2+', label: 'Years Coding', delay: 0.6 },
  { icon: Code2, value: '10+', label: 'Projects Shipped', delay: 0.75 },
  { icon: Rocket, value: '4', label: 'Live Apps', delay: 0.9 },
];

const StatCard = ({ icon: Icon, value, label, delay }) => (
  <motion.div
    className="bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm border border-slate-200/60 dark:border-white/[0.07] rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-shadow"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -6, scale: 1.02 }}
  >
    <div className="text-purple-600 dark:text-purple-400 mx-auto mb-3 w-10 h-10 flex items-center justify-center bg-purple-500/10 rounded-lg">
      <Icon size={20} />
    </div>
    <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{value}</h3>
    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{label}</p>
  </motion.div>
);

// Avatar initials fallback (shown until user adds real photo)
const Avatar = () => (
  <div className="relative w-full max-w-sm mx-auto">
    <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl bg-gradient-to-br from-purple-900/80 to-pink-900/60 dark:from-purple-950 dark:to-pink-950 flex flex-col items-center justify-center gap-4">
      {/* Replace the src below with your real photo — e.g. src="/me.jpg" */}
      <img
        src="/me.jpg"
        alt="Idris Adam"
        className="w-full h-full object-cover"
        onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
      />
      {/* Fallback shown if image fails */}
      <div className="hidden flex-col items-center justify-center gap-3 w-full h-full absolute inset-0">
        <span className="text-7xl font-black text-white/20 select-none">IA</span>
        <p className="text-xs text-white/30 font-mono tracking-widest">Add photo in /public/me.jpg</p>
      </div>
    </div>
  </div>
);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const yText = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yImage = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section id="about" ref={sectionRef} className="py-28 px-8 md:px-16 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Section header — consistent eyebrow format */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-purple-600 dark:text-purple-400 mb-4 px-4 py-1.5 bg-purple-500/10 rounded-full border border-purple-500/20">
            Who I Am
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Me</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            A self-driven developer from Kano, Nigeria, obsessed with building things that work beautifully.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

          {/* Photo */}
          <motion.div className="lg:col-span-2" style={{ y: yImage }}>
            <Avatar />
          </motion.div>

          {/* Text */}
          <motion.div className="lg:col-span-3" style={{ y: yText }}>
            <motion.p
              className="text-xl leading-relaxed text-slate-700 dark:text-slate-300 mb-5"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            >
              I'm <strong className="text-slate-900 dark:text-white">Idris Adam</strong> — a full-stack web developer based in Kano, Nigeria. I graduated with an HND in Computer Science from Kano State Polytechnic in 2024 and spent 2023–2024 as a Software Developer Intern at Steadfast Limited, where I built and maintained real production UIs in React.
            </motion.p>
            <motion.p
              className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-10"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.35 }}
            >
              What drives me is turning complex problems into simple, elegant software. I care deeply about clean code, performance, and the small details that make a product feel genuinely great to use. Currently open to full-time or remote opportunities.
            </motion.p>

            {/* Honest stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {stats.map((s) => <StatCard key={s.label} {...s} />)}
            </div>

            <InteractiveTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;