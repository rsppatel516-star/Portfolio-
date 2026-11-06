import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../data/skills';
import { projects } from '../data/projects';
import {
  Code, Code2, Layout, Server, Smartphone, Cloud,
  Database, Cpu, Layers, ChevronRight, Zap, Target, Bot, Sparkles, BrainCircuit,
  Search, X, ExternalLink, Globe, Workflow
} from 'lucide-react';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPhp, FaJava,
  FaFigma, FaAws, FaGithub,
  FaSwift
} from 'react-icons/fa';
import {
  SiNextdotjs, SiTailwindcss, SiExpress, SiFlutter, SiMongodb,
  SiMysql, SiFirebase, SiVercel, SiPostman, SiDart, SiDocker, SiOpenai, SiXcode
} from 'react-icons/si';
import { BiServer } from 'react-icons/bi';
import { DiGit } from 'react-icons/di';
import { TbBrandReactNative, TbBrandVscode } from 'react-icons/tb';
import GridBackground from './ui/GridBackground';
import MagneticButton from './ui/MagneticButton';
import SectionHeading from './ui/SectionHeading';

const iconMap = {
  html5: <FaHtml5 />,
  css3: <FaCss3Alt />,
  javascript: <FaJs />,
  react: <FaReact />,
  nextjs: <SiNextdotjs />,
  tailwindcss: <SiTailwindcss />,
  nodejs: <FaNodeJs />,
  express: <SiExpress />,
  api: <BiServer />,
  php: <FaPhp />,
  java: <FaJava />,
  flutter: <SiFlutter />,
  swift: <FaSwift />,
  reactnative: <TbBrandReactNative />,
  dart: <SiDart />,
  mongodb: <SiMongodb />,
  mysql: <SiMysql />,
  firebase: <img src="/Firebase_Color_Logo.svg" alt="Firebase" className="w-[1em] h-[1em] inline-block object-contain" />,
  git: <DiGit />,
  github: <FaGithub />,
  vscode: <TbBrandVscode />,
  xcode: <img src="/Xcode.svg" alt="Xcode" className="w-[1em] h-[1em] inline-block object-contain" />,
  figma: <img src="/Figma.svg" alt="Figma" className="w-[1em] h-[1em] inline-block object-contain" />,
  vercel: <SiVercel />,
  postman: <SiPostman />,
  aws: <FaAws />,
  docker: <SiDocker />,
  storyboard: <Layers />,
  mobiledesign: <Smartphone />,
  uikit: <Layout />,
  mvvm: <img src="/MVVM.svg" alt="MVVM" className="w-[1em] h-[1em] inline-block object-contain" />,
  openai: <SiOpenai />,
  antigravity: <img src="/antigravity-skill.svg" alt="Antigravity" className="w-[1em] h-[1em] inline-block object-contain" />,
  gemini: <img src="/gemini-skill.svg" alt="Gemini" className="w-[1em] h-[1em] inline-block object-contain" />,
  copilot: <FaGithub />,
  claude: <img src="/claude-skill.svg" alt="Claude AI" className="w-[1em] h-[1em] inline-block object-contain" />,
  cursor: <img src="/cursor.svg" alt="Cursor" className="w-[1em] h-[1em] inline-block object-contain" />
};

const techColors = {
  html5: 'text-[#E34F26]', css3: 'text-[#1572B6]', javascript: 'text-[#F7DF1E]',
  react: 'text-[#61DAFB]', nextjs: 'text-dark-textMain', tailwindcss: 'text-[#06B6D4]',
  nodejs: 'text-[#339933]', express: 'text-dark-textMain', api: 'text-[#00E5FF]',
  php: 'text-[#777BB4]', java: 'text-[#007396]', flutter: 'text-[#02569B]',
  reactnative: 'text-[#61DAFB]', dart: 'text-[#0175C2]', mongodb: 'text-[#47A248]',
  mysql: 'text-[#4479A1]', firebase: 'text-[#FFCA28]', git: 'text-[#F05032]',
  github: 'text-dark-textMain', vscode: 'text-[#007ACC]', xcode: 'text-[#147EFB]', figma: 'text-[#F24E1E]',
  vercel: 'text-dark-textMain', postman: 'text-[#FF6C37]', aws: 'text-[#FF9900]',
  docker: 'text-[#2496ED]', swift: 'text-[#FA7343]',
  storyboard: 'text-[#818CF8]', mobiledesign: 'text-[#F43F5E]',
  uikit: 'text-[#2AC3FF]', mvvm: 'text-[#3ED6FF]',
  openai: 'text-[#10A37F]', antigravity: 'text-[#3186FF]', gemini: 'text-[#8E75FF]', copilot: 'text-dark-textMain', claude: 'text-[#D97757]',
  cursor: 'text-dark-textMain'
};

const techHexColors = {
  html5: '#E34F26', css3: '#1572B6', javascript: '#F7DF1E',
  react: '#61DAFB', nextjs: '#ffffff', tailwindcss: '#06B6D4',
  nodejs: '#339933', express: '#ffffff', api: '#00E5FF',
  php: '#777BB4', java: '#007396', flutter: '#02569B',
  reactnative: '#61DAFB', dart: '#0175C2', mongodb: '#47A248',
  mysql: '#4479A1', firebase: '#FFCA28', git: '#F05032',
  github: '#ffffff', vscode: '#007ACC', xcode: '#147EFB', figma: '#F24E1E',
  vercel: '#ffffff', postman: '#FF6C37', aws: '#FF9900',
  docker: '#2496ED', swift: '#FA7343',
  storyboard: '#818CF8', mobiledesign: '#F43F5E',
  uikit: '#2AC3FF', mvvm: '#3ED6FF',
  openai: '#10A37F', antigravity: '#3186FF', gemini: '#8E75FF', copilot: '#ffffff', claude: '#D97757',
  cursor: '#ffffff'
};

const getTechHexColor = (icon) => {
  const isLight = typeof document !== 'undefined' && (document.documentElement.getAttribute('data-theme') === 'light' || document.documentElement.classList.contains('light'));
  const raw = techHexColors[icon] || '#6366f1';
  if (isLight && raw.toLowerCase() === '#ffffff') {
    return '#4f46e5';
  }
  return raw;
};

const categoryIcons = {
  'Frontend': <Layout size={14} />,
  'Backend': <Server size={14} />,
  'Mobile': <Smartphone size={14} />,
  'Database': <Database size={14} />,
  'Tools & Platforms': <Layers size={14} />,
  'Cloud & DevOps': <Cloud size={14} />,
  'AI Tools': <Bot size={14} />,
};

const FilterButton = ({ cat, activeTab, onSelect, icon }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { left, top } = buttonRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - left, y: e.clientY - top });
  };

  return (
    <MagneticButton onClick={onSelect}>
      <button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        className={`relative flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 md:px-7 py-2.5 sm:py-3 md:py-3.5 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.25em] transition-all duration-500 border overflow-hidden group/btn cursor-pointer whitespace-nowrap backdrop-blur-xl shadow-sm ${activeTab === cat
          ? 'bg-gradient-to-br from-violet-600/20 via-indigo-600/20 to-purple-600/10 dark:from-violet-600/30 dark:to-indigo-600/30 text-indigo-900 dark:text-dark-textMain border-indigo-500/40 shadow-indigo-500/10'
          : 'bg-white/80 dark:bg-white/[0.05] border-slate-200/90 dark:border-white/10 text-slate-600 dark:text-dark-textMuted hover:text-slate-900 dark:hover:text-dark-textMain hover:bg-slate-100/80 dark:hover:bg-dark-textMain/[0.12] hover:border-indigo-500/30'
          }`}
      >
        {activeTab === cat && (
          <motion.div
            layoutId="activeSkillTab"
            className="absolute inset-0 bg-gradient-to-r from-violet-600/15 via-indigo-600/20 to-violet-600/15 dark:from-violet-600/20 dark:to-indigo-600/35 backdrop-blur-md"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}

        <div
          className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, rgba(99, 101, 241, 0.15), transparent)`,
          }}
        />

        <span className="relative z-10 flex items-center gap-3">
          {icon}
          {cat}
        </span>
      </button>
    </MagneticButton>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.99, 1],
    },
  },
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skills[0].category);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = skills.map(s => s.category);

  // Flattened system technologies for global querying
  const allSkills = skills.flatMap(cat =>
    cat.technologies.map(t => ({ ...t, category: cat.category }))
  );

  const filteredSkills = searchQuery.trim() === ''
    ? skills.find(s => s.category === activeTab)?.technologies || []
    : allSkills.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Dynamic system project matcher for the project count stamp
  const _getRelatedProjectsCount = (techName) => {
    if (!techName) return 0;

    const isMatch = (projSkill, selectedName) => {
      const p = projSkill.toLowerCase().trim();
      const t = selectedName.toLowerCase().trim();
      if (p === t) return true;

      // Standardize naming variants (React/React.js, Express/Express.js, HTML5/HTML, CSS3/CSS)
      const normalize = (name) => {
        return name.toLowerCase()
          .replace(/\.js$/, '')
          .replace(/5$/, '')
          .replace(/3$/, '')
          .replace(/[^a-z0-9]/g, '');
      };

      return normalize(projSkill) === normalize(selectedName);
    };

    return projects.filter(proj =>
      proj.skillsUsed?.some(s => isMatch(s, techName)) ||
      proj.tags?.some(t => isMatch(t, techName))
    ).length;
  };

  const handleCategorySelect = (cat) => {
    setSearchQuery('');
    setActiveTab(cat);
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden text-dark-textMain">
      <GridBackground
        opacity="05"
        mask="radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header Section with Signature Typography, Sparkles, and Developer Animation */}
        <SectionHeading
          badge="TECHNICAL ARSENAL"
          badgeIcon={Code2}
          prefix="Technical "
          highlight="Engine & Stack"
          suffix=" for High-Impact Software"
          description="Comprehensive spectrum of modern frontend ecosystems, native SwiftUI architectures, scalable backend services, and AI-accelerated workflows."
          rightContent={
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full max-w-xs sm:max-w-sm min-h-[80px] flex items-center justify-center p-2 rounded-3xl"
            >
              <img
                src="/developer animation.svg"
                alt="Developer Coding Animation"
                loading="lazy"
                decoding="async"
                className="w-full max-h-[190px] object-contain drop-shadow-[0_0_25px_rgba(99,102,241,0.3)] select-none pointer-events-none"
              />
            </motion.div>
          }
        />

        {/* System Category Controller */}
        {searchQuery.trim() === '' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center lg:justify-start gap-4 mb-16"
          >
            {categories.map((cat) => (
              <motion.div key={cat} variants={itemVariants}>
                <FilterButton
                  cat={cat}
                  activeTab={activeTab}
                  onSelect={() => handleCategorySelect(cat)}
                  icon={categoryIcons[cat]}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Query Status Readout */}
        {searchQuery.trim() !== '' && (
          <div className="mb-8 font-mono text-[10px] text-indigo-400 tracking-wider text-center lg:text-left flex items-center gap-2 justify-center lg:justify-start">
            <span className="w-1 h-1 rounded-full bg-indigo-400 animate-ping" />
            <span>FOUND {filteredSkills.length} MATCHING COMPONENT(S) IN CYBER ENGINE</span>
          </div>
        )}

        {/* Skill Matrix */}
        <div className="min-h-[380px]">
          <AnimatePresence mode="wait">
            {filteredSkills.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <Cpu className="text-dark-textMain/20 w-12 h-12 mb-4 animate-bounce" />
                <p className="font-mono text-xs text-dark-textMain/40 uppercase tracking-widest">No matching nodes in database</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeTab + searchQuery}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(15px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
              >
                {filteredSkills.map((tech, index) => {
                  return (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      onMouseEnter={() => setHoveredTech(tech.name)}
                      onMouseLeave={() => setHoveredTech(null)}
                      style={{
                        borderColor: hoveredTech === tech.name ? `${getTechHexColor(tech.icon)}45` : undefined,
                        boxShadow: hoveredTech === tech.name ? `0 0 25px -5px ${getTechHexColor(tech.icon)}25` : undefined
                      }}
                      className="group relative h-48 backdrop-blur-xl bg-white/85 dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/10 shadow-[0_4px_20px_rgba(15,23,42,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] rounded-3xl p-6 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-500 hover:bg-slate-50 dark:hover:bg-white/[0.08] cursor-default"
                    >

                      {/* Floating Large Brand Glow */}
                      <div className={`absolute -bottom-10 -right-10 text-9xl opacity-[0.02] dark:opacity-[0.01] group-hover:opacity-[0.1] dark:group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none ${techColors[tech.icon]}`}>
                        {iconMap[tech.icon]}
                      </div>

                      {/* Main Skill Icon */}
                      <div className={`text-5xl mb-5 transform group-hover:scale-105 transition-transform duration-500 filter drop-shadow-[0_2px_8px_rgba(15,23,42,0.08)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.03)] ${techColors[tech.icon]}`}>
                        {iconMap[tech.icon]}
                      </div>

                      {/* Skill Name */}
                      <span className="text-[12px] uppercase font-bold tracking-[0.22em] text-slate-700 dark:text-dark-textMain/60 group-hover:text-slate-900 dark:group-hover:text-dark-textMain transition-colors duration-300 relative z-10 font-mono">
                        {tech.name}
                      </span>

                      {/* High-Tech Scanline Scan Effect */}
                      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Technical Footer Telemetry */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-6 border-t border-slate-200/80 dark:border-dark-textMain/5 flex flex-col sm:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-8">
            <div className="flex -space-x-3">
              {['swift', 'nodejs', 'nextjs'].map((icon, i) => (
                <div key={i} className={`w-9 h-9 rounded-full bg-slate-100 dark:bg-dark-textMain/5 border border-slate-200/80 dark:border-white/5 flex items-center justify-center text-base transition-transform hover:z-10 hover:scale-110 cursor-default ${techColors[icon]}`}>
                  {iconMap[icon]}
                </div>
              ))}
              <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-dark-textMain/5 border border-slate-200/80 dark:border-white/5 flex items-center justify-center text-base text-slate-500 dark:text-dark-textMain/40 relative group/soon">
                <div className="absolute inset-0 rounded-full bg-indigo-500/10 animate-pulse" />
                <SiDocker className="opacity-50 group-hover/soon:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white dark:bg-dark-bg/90 dark:text-white backdrop-blur-md rounded-lg text-[7px] font-black uppercase tracking-[0.2em] opacity-0 group-hover/soon:opacity-100 group-hover/soon:-top-12 transition-all duration-500 whitespace-nowrap pointer-events-none shadow-[0_4px_16px_rgba(0,0,0,0.3)] flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-indigo-400 animate-ping" />
                  Coming Soon: Docker
                </div>
              </div>
            </div>
            <p className="text-[9px] font-mono uppercase tracking-widest text-slate-500 dark:text-dark-textMain/40">Console: Nominal // System Diagnostics Online</p>
          </div>

          <div className="flex items-center gap-4 text-slate-400 dark:text-dark-textMain/30">
            <Zap size={12} className="text-violet-400" />
            <span className="text-[9px] font-mono uppercase tracking-widest">Always Learning . Always Building</span>
            <Zap size={12} className="text-violet-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
