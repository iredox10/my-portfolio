
// src/components/ContactSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ContactSection = () => {
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="bg-black text-white py-20 px-8 md:px-16" id="contact">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Get in Touch
        </motion.h2>
        <motion.form
          action="https://formsubmit.co/idreesadam200@gmail.com"
          method="POST"
          className="space-y-6"
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <input type="hidden" name="_captcha" value="false" />
          <motion.div variants={itemVariants}>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="block w-full bg-white/5 border border-white/20 rounded-md py-3 px-4 focus:ring-1 focus:ring-white focus:border-white outline-none transition"
              placeholder="Your Name"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="block w-full bg-white/5 border border-white/20 rounded-md py-3 px-4 focus:ring-1 focus:ring-white focus:border-white outline-none transition"
              placeholder="your.email@example.com"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
            <textarea
              name="message"
              id="message"
              rows="5"
              required
              className="block w-full bg-white/5 border border-white/20 rounded-md py-3 px-4 focus:ring-1 focus:ring-white focus:border-white outline-none transition"
              placeholder="Let's build something amazing together..."
            ></textarea>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <button
              type="submit"
              className="group inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors duration-300"
            >
              Send Message
              <ArrowUpRight className="w-5 h-5 ml-2 transform group-hover:rotate-45 transition-transform duration-300" />
            </button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
