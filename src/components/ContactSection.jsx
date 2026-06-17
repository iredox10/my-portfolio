import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const containerRef = useRef(null);
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ submitting: false, submitted: false, error: '' });

  useGSAP(() => {
    gsap.fromTo('.contact-char',
      { yPercent: 120, skewY: 10 },
      {
        yPercent: 0,
        skewY: 0,
        stagger: 0.05,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );
  }, { scope: containerRef });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fields.name || !fields.email || !fields.message) {
      setStatus({ ...status, error: 'ALL FIELDS REQUIRED.' });
      return;
    }

    setStatus({ submitting: true, submitted: false, error: '' });
    
    const formData = new FormData();
    formData.append('name', fields.name);
    formData.append('email', fields.email);
    formData.append('message', fields.message);
    formData.append('_captcha', 'false');

    try {
      const res = await fetch('https://formsubmit.co/idreesadam200@gmail.com', {
        method: 'POST', body: formData, headers: { Accept: 'application/json' },
      });
      if (res.ok) { 
        setStatus({ submitting: false, submitted: true, error: '' });
        setFields({ name: '', email: '', message: '' });
      } else { 
        setStatus({ submitting: false, submitted: false, error: 'TRANSMISSION FAILED.' }); 
      }
    } catch {
      setStatus({ submitting: false, submitted: false, error: 'NETWORK ERROR.' });
    }
  };

  return (
    <section id="contact" ref={containerRef} className="w-full min-h-screen bg-black flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 relative z-10 border-t border-white/10">
      
      <div>
        <span className="text-white font-mono text-sm uppercase tracking-[0.3em] border border-white/20 px-4 py-2 rounded-full">
          The Climax
        </span>
      </div>

      <div className="flex-grow flex flex-col xl:flex-row justify-between items-center w-full my-16 gap-16">
        
        {/* Massive Text (Left Side on Desktop) */}
        <div className="w-full xl:w-1/2 flex flex-col items-start mix-blend-difference pointer-events-none">
           <h2 className="text-[20vw] xl:text-[12vw] font-black uppercase text-white tracking-tighter leading-[0.8]">
             <div className="overflow-hidden flex">
               {"LET'S".split('').map((char, i) => <div key={'lets'+i} className="contact-char origin-bottom">{char}</div>)}
             </div>
             <div className="overflow-hidden flex">
               {"TALK".split('').map((char, i) => <div key={'talk'+i} className="contact-char origin-bottom">{char}</div>)}
             </div>
           </h2>
        </div>

        {/* Brutalist Form (Right Side on Desktop) */}
        <div className="w-full xl:w-1/2 max-w-2xl bg-black border border-white/20 p-8 md:p-12 z-20">
          {status.submitted ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="text-6xl mb-6">✅</span>
              <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">Transmission Sent</h3>
              <p className="text-white/50 font-mono mt-4 tracking-widest uppercase">I will respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-12" noValidate>
              
              <div className="flex flex-col gap-2">
                <label className="text-white/50 font-mono text-sm uppercase tracking-widest">01. Name</label>
                <input 
                  type="text" 
                  value={fields.name}
                  onChange={e => setFields({...fields, name: e.target.value})}
                  className="bg-transparent border-b-2 border-white/20 text-white text-2xl md:text-4xl py-2 focus:border-white outline-none font-black tracking-tighter uppercase transition-colors rounded-none"
                  placeholder="JOHN DOE"
                  data-cursor-pointer
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white/50 font-mono text-sm uppercase tracking-widest">02. Email</label>
                <input 
                  type="email" 
                  value={fields.email}
                  onChange={e => setFields({...fields, email: e.target.value})}
                  className="bg-transparent border-b-2 border-white/20 text-white text-2xl md:text-4xl py-2 focus:border-white outline-none font-black tracking-tighter uppercase transition-colors rounded-none"
                  placeholder="HELLO@WORLD.COM"
                  data-cursor-pointer
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white/50 font-mono text-sm uppercase tracking-widest">03. Message</label>
                <textarea 
                  rows={3}
                  value={fields.message}
                  onChange={e => setFields({...fields, message: e.target.value})}
                  className="bg-transparent border-b-2 border-white/20 text-white text-xl md:text-3xl py-2 focus:border-white outline-none font-black tracking-tight uppercase transition-colors resize-none rounded-none"
                  placeholder="TELL ME ABOUT YOUR PROJECT..."
                  data-cursor-pointer
                />
              </div>

              {status.error && (
                <div className="text-pink-500 font-mono text-sm uppercase tracking-widest bg-pink-500/10 p-4 border border-pink-500/20">
                  {status.error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={status.submitting}
                className="w-full bg-white text-black font-black text-2xl md:text-4xl uppercase py-6 hover:bg-[#a855f7] hover:text-white transition-colors duration-500 tracking-tighter disabled:opacity-50 disabled:cursor-not-allowed"
                data-cursor-pointer
              >
                {status.submitting ? 'SENDING...' : 'INITIATE'}
              </button>
            </form>
          )}
        </div>

      </div>

      <footer className="w-full flex flex-col md:flex-row justify-between items-center border-t border-white/20 pt-8 gap-6 md:gap-4">
        <p className="text-white/50 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-center md:text-left">
          © {new Date().getFullYear()} Iredox. All Rights Reserved. <br className="md:hidden" /> Developed with extreme prejudice.
        </p>
        <div className="flex gap-6 md:gap-12">
           {['Instagram', 'Twitter', 'LinkedIn'].map(social => (
             <a key={social} href="#" className="text-white font-mono text-[10px] md:text-xs uppercase hover:text-[#a855f7] transition-colors tracking-[0.2em]" data-cursor-pointer>
               {social}
             </a>
           ))}
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;