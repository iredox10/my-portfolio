// src/components/ContactSection.jsx
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Linkedin, Github } from 'lucide-react';

// A simple, reusable 3D globe component
const Globe = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let width, height;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let rotation = 0;

    const setup = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * 2; // Retina scaling
      canvas.height = height * 2;
      ctx.scale(2, 2);
    };

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.3)';
      ctx.lineWidth = 0.5;
      
      const radius = Math.min(width, height) * 0.4;
      const center = { x: width / 2, y: height / 2 };
      
      const targetRotation = mouse.current.x * 0.001;
      rotation += (targetRotation - rotation) * 0.05;

      for (let i = -4; i <= 4; i++) {
        const latRadius = radius * Math.cos(Math.asin(i / 5));
        ctx.beginPath();
        ctx.ellipse(center.x, center.y, latRadius, radius / 8, rotation, 0, 2 * Math.PI);
        ctx.stroke();
      }

      for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.ellipse(center.x, center.y, radius, radius, rotation + (i * Math.PI / 5), Math.PI * 0.4, Math.PI * 0.6);
        ctx.stroke();
      }
      
      requestAnimationFrame(draw);
    };

    setup();
    window.addEventListener('resize', setup);
    window.addEventListener('mousemove', onMouseMove);
    draw();

    return () => {
      window.removeEventListener('resize', setup);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    
    await new Promise(res => setTimeout(res, 1500));

    try {
      const response = await fetch(e.target.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('There was an error. Please try again.');
      }
    } catch (error) {
      alert('There was an error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } }
  };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <section id="contact" className="bg-gray-900 text-white py-24 px-8 md:px-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20800%22%3E%3Cpath%20fill%3D%22rgba(255,255,255,0.03)%22%20d%3D%22M0%200h800v800H0z%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="lg:pr-8">
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-4" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Let's <span className="text-purple-400">Connect</span>
          </motion.h2>
          <motion.p className="text-lg text-gray-400 mb-8" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            Have a project in mind or just want to say hello? My inbox is always open. I'll get back to you as soon as possible.
          </motion.p>
          <div className="w-full h-64 md:h-80 opacity-50">
            <Globe />
          </div>
          <motion.div className="flex space-x-6 mt-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            <a href="mailto:idreesadam200@gmail.com" className="text-gray-400 hover:text-purple-400 transition-colors"><Mail size={28} /></a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors"><Linkedin size={28} /></a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors"><Github size={28} /></a>
          </motion.div>
        </div>

        <motion.div 
          className="bg-slate-800/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl"
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {isSubmitted ? (
            <div className="text-center py-12">
              <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <h3 className="text-2xl font-bold text-purple-400">Transmission Complete</h3>
                <p className="text-gray-300 mt-2">Thank you! Your message is on its way across the cosmos. I'll be in touch soon.</p>
              </motion.div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} action="https://formsubmit.co/idreesadam200@gmail.com" method="POST">
              <input type="hidden" name="_captcha" value="false" />
              <div className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                  <input type="text" name="name" id="name" required className="block w-full bg-white/5 border border-white/20 rounded-md py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition placeholder:text-gray-500" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input type="email" name="email" id="email" required className="block w-full bg-white/5 border border-white/20 rounded-md py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition placeholder:text-gray-500" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                  <textarea name="message" id="message" rows="5" required className="block w-full bg-white/5 border border-white/20 rounded-md py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition placeholder:text-gray-500"></textarea>
                </motion.div>
                <motion.div variants={itemVariants} className="text-center pt-4">
                  <motion.button type="submit" disabled={isSubmitting} className="group w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                    {isSubmitting ? 'Transmitting...' : 'Send Message'}
                    <Send className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </motion.div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;