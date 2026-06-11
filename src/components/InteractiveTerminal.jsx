import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const InteractiveTerminal = () => {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to IredoxOS v2.0.4' },
    { type: 'system', text: 'Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef(null);

  const commands = {
    help: 'Available commands: about, skills, projects, contact, clear, sudo',
    about: 'I am a Full-Stack Web Developer passionate about clean code and modern tech.',
    skills: 'React, Node.js, Next.js, APIs, MongoDB, Three.js, TailwindCSS',
    projects: 'Type "ls" to view projects or visit the projects section below.',
    contact: 'Email: idreesadam200@gmail.com | Twitter: @iredox50',
    clear: 'CLEAR_TERMINAL',
    sudo: 'Nice try! But you do not have root privileges here. 😂',
    ls: '1. E-Commerce \n2. Portfolio \n3. SaaS Dashboard'
  };

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: 'user', text: `$ ${input}` }];

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (commands[cmd]) {
      newHistory.push({ type: 'system', text: commands[cmd] });
    } else {
      newHistory.push({ type: 'error', text: `Command not found: ${cmd}` });
    }

    setHistory(newHistory);
    setInput('');
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto rounded-lg overflow-hidden bg-slate-900/80 dark:bg-black/80 backdrop-blur-md border border-white/20 shadow-2xl font-mono text-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center px-4 py-2 bg-slate-800 dark:bg-zinc-900 border-b border-white/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="ml-4 text-xs text-gray-400">iredox@portfolio:~</span>
      </div>
      
      <div className="p-4 h-64 overflow-y-auto">
        {history.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.type === 'error' ? 'text-red-400' : msg.type === 'user' ? 'text-blue-400' : 'text-green-400'}`}>
            {msg.text.split('\n').map((line, i) => <div key={i}>{line}</div>)}
          </div>
        ))}
        <form onSubmit={handleCommand} className="flex mt-2">
          <span className="text-blue-400 mr-2">$</span>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </form>
        <div ref={endOfMessagesRef} />
      </div>
    </motion.div>
  );
};

export default InteractiveTerminal;