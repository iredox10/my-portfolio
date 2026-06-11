// src/components/ContactSection.jsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Linkedin, Github, Copy, CheckCheck, AlertCircle } from 'lucide-react';

const EMAIL = 'idreesadam200@gmail.com';

// ─── Globe canvas ─────────────────────────────────────────────────────────────
const Globe = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    let width, height;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let rotation = 0;

    const setup = () => {
      width = canvas.offsetWidth; height = canvas.offsetHeight;
      canvas.width = width * 2; canvas.height = height * 2;
      ctx.scale(2, 2);
    };

    const onMouseMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(192,132,252,0.3)'; ctx.lineWidth = 0.5;
      const radius = Math.min(width, height) * 0.4;
      const center = { x: width / 2, y: height / 2 };
      rotation += (mouse.current.x * 0.001 - rotation) * 0.05;
      for (let i = -4; i <= 4; i++) {
        const latR = radius * Math.cos(Math.asin(i / 5));
        ctx.beginPath(); ctx.ellipse(center.x, center.y, latR, radius / 8, rotation, 0, 2 * Math.PI); ctx.stroke();
      }
      for (let i = 0; i < 10; i++) {
        ctx.beginPath(); ctx.ellipse(center.x, center.y, radius, radius, rotation + (i * Math.PI / 5), Math.PI * 0.4, Math.PI * 0.6); ctx.stroke();
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    setup();
    window.addEventListener('resize', setup);
    window.addEventListener('mousemove', onMouseMove);
    draw();
    return () => {
      window.removeEventListener('resize', setup);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

// ─── Field component with inline validation ───────────────────────────────────
const Field = ({ label, id, error, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-gray-400 mb-1.5">
      {label} <span className="text-pink-500">*</span>
    </label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5 mt-1.5 text-xs text-pink-500"
          role="alert"
        >
          <AlertCircle size={12} /> {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const inputClass = (hasError) =>
  `block w-full bg-transparent border rounded-lg py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 ${hasError
    ? 'border-pink-500 dark:border-pink-500 focus:ring-pink-500 focus:border-pink-500'
    : 'border-slate-300 dark:border-white/20'
  }`;

// ─── Copy email button ────────────────────────────────────────────────────────
const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = EMAIL; document.body.appendChild(el); el.select();
      document.execCommand('copy'); document.body.removeChild(el);
      setCopied(true); setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300 hover:border-purple-500/40 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 group w-full"
      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
      aria-label="Copy email address"
    >
      <Mail size={15} className="flex-shrink-0 text-slate-400 group-hover:text-purple-500 transition-colors" />
      <span className="flex-1 text-left font-mono text-xs truncate">{EMAIL}</span>
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span key="check" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
            <CheckCheck size={14} className="text-emerald-500" />
          </motion.span>
        ) : (
          <motion.span key="copy" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
            <Copy size={14} className="text-slate-400" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// ─── Validation helpers ───────────────────────────────────────────────────────
const validate = (fields) => {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Name is required.';
  else if (fields.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.';

  if (!fields.email.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = 'Please enter a valid email address.';

  if (!fields.message.trim()) errors.message = 'Message is required.';
  else if (fields.message.trim().length < 20) errors.message = 'Message must be at least 20 characters.';

  return errors;
};

// ─── ContactSection ───────────────────────────────────────────────────────────
const ContactSection = () => {
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Revalidate touched fields live
  useEffect(() => {
    const touchedFields = Object.keys(touched).filter(k => touched[k]);
    if (touchedFields.length === 0) return;
    const newErrors = validate(fields);
    setErrors(prev => {
      const next = { ...prev };
      touchedFields.forEach(k => { next[k] = newErrors[k] || ''; });
      return next;
    });
  }, [fields, touched]);

  const handleChange = (e) => setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleBlur = (e) => setTouched(prev => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mark all as touched to show errors
    setTouched({ name: true, email: true, message: true });
    const newErrors = validate(fields);
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return; // abort if invalid

    setIsSubmitting(true);
    setSubmitError('');
    const formData = new FormData();
    formData.append('name', fields.name);
    formData.append('email', fields.email);
    formData.append('message', fields.message);
    formData.append('_captcha', 'false');

    try {
      const res = await fetch('https://formsubmit.co/idreesadam200@gmail.com', {
        method: 'POST', body: formData, headers: { Accept: 'application/json' },
      });
      if (res.ok) { setIsSubmitted(true); }
      else { setSubmitError('Something went wrong. Please try again or email me directly.'); }
    } catch {
      setSubmitError('Network error. Please email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="text-slate-900 dark:text-white py-24 px-8 md:px-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">

        {/* Left */}
        <div className="lg:pr-8">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-purple-600 dark:text-purple-400 mb-4 px-4 py-1.5 bg-purple-500/10 rounded-full border border-purple-500/20">
            Get In Touch
          </span>
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Connect</span>
          </motion.h2>
          <motion.p className="text-lg text-slate-600 dark:text-gray-400 mb-6"
            initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
            Have a project in mind or just want to say hello? Use the form or copy my email directly.
          </motion.p>

          {/* Copy email button */}
          <motion.div className="mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.25 }}>
            <CopyEmailButton />
          </motion.div>

          {/* Globe */}
          <div className="w-full h-52 md:h-64 opacity-40 mb-6">
            <Globe />
          </div>

          {/* Social links */}
          <motion.div className="flex gap-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            {[
              { href: `mailto:${EMAIL}`, icon: Mail, label: 'Email' },
              { href: 'https://www.linkedin.com/in/idris-adam-3ab197117/', icon: Linkedin, label: 'LinkedIn' },
              { href: 'https://github.com/iredox10', icon: Github, label: 'GitHub' },
            ].map(({ href, icon: Icon, label }) => (
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-400 border border-transparent hover:border-purple-500/20 transition-all"
                whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }}>
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right: Form */}
        <motion.div
          className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-lg border border-slate-200/80 dark:border-white/10 rounded-2xl p-8 shadow-xl"
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}
        >
          {isSubmitted ? (
            <motion.div className="text-center py-12" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <CheckCheck size={32} className="text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message sent!</h3>
              <p className="text-slate-500 dark:text-gray-400 mt-2">Thank you — I'll be in touch within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-5">
                <Field label="Name" id="name" error={errors.name}>
                  <input
                    type="text" name="name" id="name" autoComplete="name"
                    value={fields.name} onChange={handleChange} onBlur={handleBlur}
                    placeholder="Idris Adam"
                    className={inputClass(errors.name && touched.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                </Field>

                <Field label="Email" id="email" error={errors.email}>
                  <input
                    type="email" name="email" id="email" autoComplete="email"
                    value={fields.email} onChange={handleChange} onBlur={handleBlur}
                    placeholder="you@company.com"
                    className={inputClass(errors.email && touched.email)}
                  />
                </Field>

                <Field label="Message" id="message" error={errors.message}>
                  <textarea
                    name="message" id="message" rows={5}
                    value={fields.message} onChange={handleChange} onBlur={handleBlur}
                    placeholder="Tell me about your project..."
                    className={inputClass(errors.message && touched.message)}
                  />
                  <p className="text-right text-[11px] text-slate-400 mt-1 font-mono">
                    {fields.message.length} / 20 min
                  </p>
                </Field>

                {/* Submit error */}
                <AnimatePresence>
                  {submitError && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-sm text-pink-500 bg-pink-500/10 rounded-lg px-3 py-2" role="alert">
                      <AlertCircle size={15} /> {submitError}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit" disabled={isSubmitting}
                  className="group w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }} whileTap={{ scale: 0.97 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending…
                    </span>
                  ) : (
                    <>Send Message <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;