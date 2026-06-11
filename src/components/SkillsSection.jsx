// src/components/SkillsSection.jsx
import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaDocker, FaGitAlt, FaGithub, FaPython } from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiMongodb, SiPostgresql, SiVite, SiJavascript, SiTypescript, SiNextdotjs, SiAppwrite, SiFirebase } from 'react-icons/si';

// ─── Data ─────────────────────────────────────────────────────────────────────
const SKILLS = [
  { name: 'React', Icon: FaReact, category: 'Frontend', level: 92, hex: '#61DAFB' },
  { name: 'Next.js', Icon: SiNextdotjs, category: 'Frontend', level: 80, hex: '#aaaaaa' },
  { name: 'JavaScript', Icon: SiJavascript, category: 'Frontend', level: 90, hex: '#F7DF1E' },
  { name: 'TypeScript', Icon: SiTypescript, category: 'Frontend', level: 75, hex: '#3178C6' },
  { name: 'HTML5', Icon: FaHtml5, category: 'Frontend', level: 95, hex: '#E34F26' },
  { name: 'CSS3', Icon: FaCss3Alt, category: 'Frontend', level: 88, hex: '#1572B6' },
  { name: 'Tailwind', Icon: SiTailwindcss, category: 'Frontend', level: 90, hex: '#38BDF8' },
  { name: 'Vite', Icon: SiVite, category: 'Frontend', level: 85, hex: '#646CFF' },
  { name: 'Node.js', Icon: FaNodeJs, category: 'Backend', level: 82, hex: '#5FA04E' },
  { name: 'Express', Icon: SiExpress, category: 'Backend', level: 78, hex: '#c0c0c0' },
  { name: 'Python', Icon: FaPython, category: 'Backend', level: 65, hex: '#3776AB' },
  { name: 'MongoDB', Icon: SiMongodb, category: 'Backend', level: 75, hex: '#47A248' },
  { name: 'PostgreSQL', Icon: SiPostgresql, category: 'Backend', level: 70, hex: '#4169E1' },
  { name: 'Appwrite', Icon: SiAppwrite, category: 'Backend', level: 80, hex: '#FD366E' },
  { name: 'Firebase', Icon: SiFirebase, category: 'Backend', level: 78, hex: '#FFCA28' },
  { name: 'Git', Icon: FaGitAlt, category: 'Tools', level: 88, hex: '#F05032' },
  { name: 'GitHub', Icon: FaGithub, category: 'Tools', level: 90, hex: '#cccccc' },
  { name: 'Docker', Icon: FaDocker, category: 'Tools', level: 60, hex: '#2496ED' },
];
const CATEGORIES = ['All', 'Frontend', 'Backend', 'Tools'];

// ─── Positions & Connections (module-level, deterministic) ────────────────────
const POSITIONS = (() => {
  let s = 12345;
  const r = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  return SKILLS.map((_, i) => {
    const t = i / SKILLS.length;
    const angle = t * Math.PI * 5.5;
    const radius = 2.0 + t * 3.8;
    return [Math.cos(angle) * radius + (r() - 0.5), (t - 0.5) * 7 + (r() - 0.5) * 1.5, Math.sin(angle) * radius + (r() - 0.5)];
  });
})();





// ─── SkillOrb ─────────────────────────────────────────────────────────────────
const SkillOrb = ({ skill, position, isActive, isHovered, onHover, onLeave }) => {
  const groupRef = useRef();
  const meshRef = useRef();
  const glowRef = useRef();
  const ringRef = useRef();
  const lightRef = useRef();
  const tRef = useRef(Math.random() * 100);
  const color = useMemo(() => new THREE.Color(skill.hex), [skill.hex]);

  useFrame((_, delta) => {
    tRef.current += delta;
    if (!meshRef.current) return;
    if (groupRef.current) groupRef.current.position.y = position[1] + Math.sin(tRef.current * 0.6) * 0.18;
    meshRef.current.rotation.y += delta * 0.4;
    meshRef.current.rotation.x += delta * 0.15;
    const target = isHovered ? 1.55 : isActive ? 1.0 : 0.3;
    ['x', 'y', 'z'].forEach(a => { meshRef.current.scale[a] = THREE.MathUtils.lerp(meshRef.current.scale[a], target, 0.09); });
    if (glowRef.current) glowRef.current.material.opacity = THREE.MathUtils.lerp(glowRef.current.material.opacity, isHovered ? 0.22 : isActive ? 0.1 : 0.02, 0.08);
    meshRef.current.material.opacity = THREE.MathUtils.lerp(meshRef.current.material.opacity, isActive ? 1 : 0.08, 0.08);
    meshRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(meshRef.current.material.emissiveIntensity, isHovered ? 1.8 : 0.5, 0.1);
    if (lightRef.current) lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, isHovered ? 3 : isActive ? 0.8 : 0.1, 0.08);
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 1.2;
      ringRef.current.rotation.x += delta * 0.4;
      ringRef.current.material.opacity = THREE.MathUtils.lerp(ringRef.current.material.opacity, isHovered ? 0.9 : 0, 0.1);
    }
  });

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]}>
      {/* Invisible large sphere for easier pointer hit detection */}
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); onHover(skill); }}
        onPointerOut={onLeave}
      >
        <sphereGeometry args={[0.7, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Visible icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.38, 1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} metalness={0.7} roughness={0.25} transparent opacity={1} />
      </mesh>

      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.62, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.1} side={THREE.BackSide} depthWrite={false} />
      </mesh>

      {/* Orbit ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.65, 0.022, 8, 60]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} transparent opacity={0} />
      </mesh>

      <pointLight ref={lightRef} color={skill.hex} intensity={0.8} distance={2.5} />

      {/* ── Always-visible HTML label ── */}
      {/* Only render when active to avoid DOM clutter for dimmed orbs */}
      {isActive && (
        <Html
          position={[0.55, 0.55, 0]}
          distanceFactor={6}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
          occlude={false}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              background: 'rgba(5,5,16,0.75)',
              backdropFilter: 'blur(8px)',
              border: `1px solid ${skill.hex}40`,
              borderRadius: '999px',
              padding: '3px 8px 3px 5px',
              boxShadow: isHovered ? `0 0 14px ${skill.hex}50` : 'none',
              transition: 'box-shadow 0.3s',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ color: skill.hex, fontSize: '11px', lineHeight: 1, display: 'flex' }}>
              <skill.Icon />
            </span>
            <span style={{
              color: isHovered ? '#fff' : 'rgba(255,255,255,0.7)',
              fontSize: '10px',
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.02em',
              transition: 'color 0.2s',
            }}>
              {skill.name}
            </span>
          </div>
        </Html>
      )}
    </group>
  );
};

// ─── CameraRig ────────────────────────────────────────────────────────────────
const CameraRig = ({ mouseRef }) => {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    const tx = Math.sin(t * 0.08) * 1.5 + mouseRef.current.x * 2.5;
    const ty = Math.cos(t * 0.06) * 0.8 + mouseRef.current.y * 1.5;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, tx, 0.018);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, ty, 0.018);
    camera.lookAt(0, 0, 0);
  });
  return null;
};

// ─── GalaxyScene ─────────────────────────────────────────────────────────────
const GalaxyScene = ({ activeCategory, hoveredSkill, setHoveredSkill, mouseRef }) => (
  <>
    <color attach="background" args={['#050510']} />
    <fog attach="fog" color="#050510" near={10} far={30} />
    <ambientLight intensity={0.1} />
    <Stars radius={60} depth={40} count={3000} factor={2.5} saturation={0.3} fade speed={0.2} />
    {SKILLS.map((skill, i) => (
      <SkillOrb
        key={skill.name}
        skill={skill}
        position={POSITIONS[i]}
        isActive={activeCategory === 'All' || skill.category === activeCategory}
        isHovered={hoveredSkill?.name === skill.name}
        onHover={setHoveredSkill}
        onLeave={() => setHoveredSkill(null)}
      />
    ))}
    <CameraRig mouseRef={mouseRef} />
  </>
);

// ─── Circular Progress Ring (SVG) ─────────────────────────────────────────────
const Ring = ({ pct, color, size = 80 }) => {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth="6" strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - (circ * pct) / 100 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />
    </svg>
  );
};

// ─── Mobile Skill Grid (touch-device fallback) ────────────────────────────────
const MobileSkillGrid = ({ activeCategory }) => {
  const filtered = activeCategory === 'All' ? SKILLS : SKILLS.filter(s => s.category === activeCategory);
  return (
    <div className="grid grid-cols-3 gap-3 px-1">
      {filtered.map((skill, i) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.3, delay: i * 0.04 }}
          className="flex flex-col items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3"
          style={{ borderColor: `${skill.hex}30` }}
        >
          <div className="text-2xl" style={{ color: skill.hex }}>
            <skill.Icon />
          </div>
          <p className="text-[11px] font-semibold text-white/80 text-center leading-tight">{skill.name}</p>
          <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${skill.hex}80, ${skill.hex})` }}
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: i * 0.04 + 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ─── SkillsSection ────────────────────────────────────────────────────────────
const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const sectionRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });




  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
      };
    }
  };

  const activeSkillsCount = activeCategory === 'All' ? SKILLS.length : SKILLS.filter(s => s.category === activeCategory).length;

  return (
    <section
      id="skills"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: '620px' }}
    >
      {/* ── 3D Canvas — hidden on mobile ── */}
      <div className="hidden md:block absolute inset-0">
        <Canvas camera={{ position: [0, 0, 12], fov: 58 }} dpr={[1, 1.5]} style={{ background: '#050510', width: '100%', height: '100%' }}>
          <GalaxyScene
            activeCategory={activeCategory}
            hoveredSkill={hoveredSkill}
            setHoveredSkill={setHoveredSkill}
            mouseRef={mouseRef}
          />
        </Canvas>
      </div>

      {/* ── Mobile background (dark, no canvas) ── */}
      <div className="md:hidden absolute inset-0 bg-[#050510]">
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(168,85,247,0.3), transparent 60%), radial-gradient(circle at 70% 70%, rgba(236,72,153,0.2), transparent 60%)' }} />
      </div>

      {/* ── Gradient fades ── */}
      <div className="absolute top-0 inset-x-0 h-28 pointer-events-none z-[5]" style={{ background: 'linear-gradient(to bottom, var(--bg-color, #fafafa), transparent)' }} />
      <div className="absolute bottom-0 inset-x-0 h-28 pointer-events-none z-[5]" style={{ background: 'linear-gradient(to top, var(--bg-color, #fafafa), transparent)' }} />

      {/* ── Desktop HTML Overlay ── */}
      <div className="hidden md:flex absolute inset-0 flex-col justify-between p-6 md:p-12 pointer-events-none select-none z-10">

        {/* Top — Title */}
        <div>
          <div className="overflow-hidden">
            <p data-gsap="title" className="text-xs md:text-sm font-mono tracking-[0.25em] uppercase text-purple-400 mb-3">✦ Technical Arsenal ✦</p>
          </div>
          <div className="overflow-hidden">
            <h2 data-gsap="title" className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-none tracking-tight">SKILL</h2>
          </div>
          <div className="overflow-hidden">
            <h2 data-gsap="title" className="text-5xl sm:text-6xl md:text-8xl font-black leading-none tracking-tight" style={{ WebkitTextStroke: '2px rgba(168,85,247,0.7)', color: 'transparent' }}>COSMOS</h2>
          </div>
          <div className="overflow-hidden mt-3">
            <p data-gsap="title" className="text-slate-400 text-sm md:text-base max-w-xs md:max-w-sm leading-relaxed">
              Each glowing orb is a technology I command. Hover any label to inspect proficiency.
            </p>
          </div>
        </div>

        {/* Bottom — Category filter + detail card */}
        <div className="flex items-end justify-between gap-4">

          {/* Category filter */}
          <div className="pointer-events-auto flex flex-col gap-2">
            <p data-gsap="cat" className="text-[10px] font-mono tracking-widest uppercase text-slate-600 mb-1">Filter</p>
            {CATEGORIES.map((cat) => {
              const count = cat === 'All' ? SKILLS.length : SKILLS.filter(s => s.category === cat).length;
              return (
                <button
                  key={cat}
                  data-gsap="cat"
                  onClick={() => setActiveCategory(cat)}
                  className={`group flex items-center gap-3 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${activeCategory === cat
                    ? 'bg-purple-600/90 border-purple-500 text-white shadow-lg shadow-purple-500/40 scale-105'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white backdrop-blur-sm'
                    }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${activeCategory === cat ? 'bg-white/20' : 'bg-white/10'}`}>{count}</span>
                </button>
              );
            })}
            <p className="text-[10px] text-slate-600 mt-1 font-mono">{activeSkillsCount} orbs active</p>
          </div>

          {/* Hovered skill detail card */}
          <AnimatePresence mode="popLayout">
            {hoveredSkill ? (
              <motion.div
                key={hoveredSkill.name}
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                className="relative pointer-events-none bg-white/5 backdrop-blur-2xl border rounded-2xl p-5 flex flex-col items-center gap-3 min-w-[180px]"
                style={{ borderColor: `${hoveredSkill.hex}40`, boxShadow: `0 0 40px ${hoveredSkill.hex}25` }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${hoveredSkill.hex}, transparent 70%)` }} />
                <div className="relative flex items-center justify-center">
                  <Ring pct={hoveredSkill.level} color={hoveredSkill.hex} size={80} />
                  <div className="absolute inset-0 flex items-center justify-center text-2xl" style={{ color: hoveredSkill.hex }}>
                    <hoveredSkill.Icon />
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-bold text-white text-base leading-tight">{hoveredSkill.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: hoveredSkill.hex }}>{hoveredSkill.category}</p>
                </div>
                <div className="w-full">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>Proficiency</span>
                    <span style={{ color: hoveredSkill.hex }}>{hoveredSkill.level}%</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${hoveredSkill.hex}80, ${hoveredSkill.hex})` }}
                      initial={{ width: 0 }} animate={{ width: `${hoveredSkill.level}%` }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="pointer-events-none text-right text-slate-600 text-xs font-mono"
              >
                Hover a label to inspect ↙
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile Layout ── */}
      <div className="md:hidden relative z-10 flex flex-col h-full px-5 pt-24 pb-24 overflow-y-auto">
        {/* Title */}
        <div className="mb-8 text-center">
          <p className="text-xs font-mono tracking-[0.25em] uppercase text-purple-400 mb-2">✦ Technical Arsenal ✦</p>
          <h2 className="text-5xl font-black text-white leading-none tracking-tight">SKILL</h2>
          <h2 className="text-5xl font-black leading-none tracking-tight mb-3" style={{ WebkitTextStroke: '1.5px rgba(168,85,247,0.7)', color: 'transparent' }}>COSMOS</h2>
          <p className="text-slate-400 text-sm max-w-xs mx-auto">Tap any technology to see details.</p>
        </div>

        {/* Category tabs (horizontal scroll on mobile) */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All' ? SKILLS.length : SKILLS.filter(s => s.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 ${activeCategory === cat
                  ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white/5 border-white/10 text-slate-400'
                  }`}
              >
                {cat} <span className="opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Skill grid */}
        <AnimatePresence mode="wait">
          <MobileSkillGrid key={activeCategory} activeCategory={activeCategory} />
        </AnimatePresence>
      </div>

      {/* ── Edge vignette (desktop only) ── */}
      <div className="hidden md:block absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, #050510 100%)' }} />
    </section>
  );
};

export default SkillsSection;