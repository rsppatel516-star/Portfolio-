import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, projectFilters } from '../data/projects';
import {
  ArrowUpRight, ArrowRight, FolderOpen,
  LayoutGrid, Globe, Smartphone, Palette, Layers
} from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import ProjectModal from './ui/ProjectModal';

const categoryIcons = {
  'All': LayoutGrid,
  'Web Apps': Globe,
  'Mobile Apps': Smartphone,
  'UI/UX Design': Palette,
};

const AnimatedCountBadge = ({ value }) => {
  return (
    <span className="inline-flex items-center justify-center overflow-hidden h-[1.25em] leading-none relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ y: 12, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -12, opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const ProjectFilterButton = ({ filter, count, activeFilter, setActiveFilter, setVisibleCount }) => {
  const isActive = activeFilter === filter;
  const Icon = categoryIcons[filter] || Layers;

  return (
    <MagneticButton onClick={() => { setActiveFilter(filter); setVisibleCount(6); }}>
      <button
        className={`relative px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm md:text-base font-bold transition-all duration-300 focus:outline-none flex items-center gap-2.5 cursor-pointer select-none group border backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] ${isActive
          ? 'bg-gradient-to-br from-violet-600/30 to-indigo-600/30 text-dark-textMain border-dark-textMain/20 border-t-dark-textMain/40 border-l-dark-textMain/40'
          : 'bg-gradient-to-br from-white/[0.08] to-transparent border-dark-textMain/10 border-t-dark-textMain/20 border-l-dark-textMain/20 text-dark-textMain/60 hover:text-dark-textMain hover:bg-dark-textMain/[0.12]'
          }`}
      >
        {isActive && (
          <motion.div
            layoutId="activeProjectFilterPill"
            className="absolute inset-0 bg-gradient-to-r from-violet-600/30 via-indigo-600/40 to-violet-600/30 backdrop-blur-md rounded-xl"
            transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
          />
        )}

        <span className="relative z-10 flex items-center gap-2">
          <Icon size={16} className={`transition-transform duration-300 ${isActive ? 'scale-110 text-violet-300' : 'text-purple-400 group-hover:text-purple-300'}`} />
          <span className="font-display tracking-wide">{filter}</span>
        </span>

        {/* Animated Count Badge */}
        <span
          className={`relative z-10 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold transition-all flex items-center justify-center min-w-[22px] ${isActive
            ? 'bg-violet-500/30 text-dark-textMain border border-violet-400/40 shadow-[0_0_10px_rgba(167,139,250,0.3)]'
            : 'bg-dark-textMain/5 text-dark-textMain/50 border border-dark-textMain/10 group-hover:border-dark-textMain/20 group-hover:text-dark-textMain/80'
            }`}
        >
          <AnimatedCountBadge value={count} />
        </span>
      </button>
    </MagneticButton>
  );
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedProject, setSelectedProject] = useState(null);

  // Lock body scroll & hide navbar when project modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  const filters = projectFilters;

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => {
      const cat = (p.category || '').toLowerCase();
      const target = activeFilter.toLowerCase();
      if (target.includes('web')) return cat.includes('web') || cat.includes('react') || cat.includes('javascript') || cat.includes('html');
      if (target.includes('mobile')) return cat.includes('mobile') || cat.includes('ios') || cat.includes('swift');
      if (target.includes('design')) return cat.includes('design') || cat.includes('ui') || cat.includes('figma');
      return cat === target;
    });

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const totalCount = projects.length;
  const filteredCount = filteredProjects.length;

  return (
    <section id="projects" className="py-20 md:py-28 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header Section */}
        <div className="mb-14 sm:mb-18">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-purple-400 mb-3 bg-purple-500/10 border border-purple-500/20"
              >
                <FolderOpen size={15} className="text-purple-400" />
                <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-purple-300">
                  FEATURED ARTIFACTS
                </span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.15] text-dark-textMain">
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">Artifacts</span>
              </h2>
              <p className="text-dark-textMuted text-sm sm:text-base font-bricolage max-w-xl mt-3">
                Curated collection of native iOS mobile architectures, responsive full-stack web platforms, and spatial design systems engineered with extreme performance and fluid ergonomics.
              </p>
            </div>

            {/* Project Animation SVG */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 shrink-0 self-center lg:self-auto flex items-center justify-center rounded-2xl"
            >
              <img
                src="/project animation.svg"
                alt="Project Showcase Animation"
                loading="lazy"
                decoding="async"
                width="220"
                height="220"
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_20px_rgba(124,58,237,0.3)] select-none pointer-events-none"
              />
            </motion.div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-12 sm:mb-16">
          {/* Category Filter Pills Dock */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => {
              const count = filter === 'All'
                ? projects.length
                : projects.filter(p => {
                  const cat = (p.category || '').toLowerCase();
                  const target = filter.toLowerCase();
                  if (target.includes('web')) return cat.includes('web') || cat.includes('react') || cat.includes('javascript') || cat.includes('html');
                  if (target.includes('mobile')) return cat.includes('mobile') || cat.includes('ios') || cat.includes('swift');
                  if (target.includes('design')) return cat.includes('design') || cat.includes('ui') || cat.includes('figma');
                  return cat === target;
                }).length;

              return (
                <ProjectFilterButton
                  key={filter}
                  filter={filter}
                  count={count}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  setVisibleCount={setVisibleCount}
                />
              );
            })}
          </div>

          {/* Animated Project Count Indicator */}
          <div className="flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-dark-textMain/10 bg-dark-textMain/[0.02] backdrop-blur-md text-xs sm:text-sm font-medium text-dark-textMain/60 whitespace-nowrap font-syne hover:border-violet-500/30 transition-all duration-300">
            <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse shadow-[0_0_8px_#a78bfa]" />
            </div>
            <span className="text-dark-textMain font-black text-sm sm:text-base font-mono flex items-center gap-1">
              <AnimatedCountBadge value={filteredCount} />
            </span>
            <span className="text-dark-textMain/40">
              of <span className="font-bold text-dark-textMain"><AnimatedCountBadge value={totalCount} /></span> artifacts
            </span>
          </div>
        </div>

        {/* Projects Grid: Simple, Modern & Professional Showcase */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, idx) => {
              const CatIcon = categoryIcons[project.category] || Layers;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative w-full aspect-[4/5] min-h-[340px] sm:min-h-[420px] md:min-h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-2xl bg-[#090d1a]/80 border border-white/[0.08] hover:border-violet-500/50 shadow-[0_10px_35px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_50px_rgba(124,58,237,0.22)] transition-all duration-500 cursor-pointer touch-manipulation"
                >
                  {/* Project Mockup Image - Full & Crisp (Taller 4:5 Framing) */}
                  <img
                    src={project.image}
                    alt={`${project.title} project preview - ${project.category} by Rudra Patel`}
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="750"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Subtle Border Glare */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/[0.06] pointer-events-none group-hover:border-violet-500/30 transition-colors duration-300" />

                  {/* Corner Index Tag (Discreet in default state) */}
                  <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/70 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  {/* Hover Overlay: Reveals ONLY Project Title & Category */}
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 sm:p-6 md:p-7 bg-gradient-to-t from-black/95 via-black/50 to-transparent backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                      {/* Category Badge & Year */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-violet-300 uppercase tracking-wider font-semibold">
                          <CatIcon size={13} className="text-violet-400" />
                          {project.category}
                        </span>
                        <span className="text-[10px] font-mono text-white/50 tracking-widest">
                          {project.year || '2025'}
                        </span>
                      </div>

                      {/* Project Title & Sleek Action Arrow */}
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-violet-200 group-hover:to-cyan-200 transition-colors line-clamp-1 sm:line-clamp-2">
                          {project.title}
                        </h3>

                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-violet-600 group-hover:border-violet-400 group-hover:scale-110 transition-all duration-300 shrink-0 shadow-lg shadow-violet-900/30">
                          <ArrowUpRight size={17} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Actions Row: Fully Responsive On Mobile and Desktop */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full max-w-sm sm:max-w-none mx-auto px-2">
          {/* Load More inline */}
          {visibleCount < filteredProjects.length && (
            <MagneticButton
              onClick={() => setVisibleCount(filteredProjects.length)}
              className="w-full sm:w-auto px-6 sm:px-9 py-3.5 sm:py-4 backdrop-blur-xl bg-white/[0.04] border border-white/[0.12] hover:border-indigo-400/50 hover:bg-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-full font-bold transition-all group overflow-hidden relative font-syne text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2.5 uppercase tracking-wider text-xs sm:text-sm text-white">
                Show All ({filteredProjects.length})
                <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
                  ↓
                </motion.span>
              </span>
            </MagneticButton>
          )}

          {/* Explore Case Studies → /artifacts page */}
          <Link to="/artifacts" className="inline-block w-full sm:w-auto">
            <MagneticButton className="w-full sm:w-auto px-6 sm:px-9 py-3.5 sm:py-4 backdrop-blur-xl bg-gradient-to-r from-violet-600 to-indigo-600 border border-white/20 shadow-[0_8px_32px_rgba(99,102,241,0.35)] text-white rounded-full font-bold hover:scale-105 hover:shadow-[0_12px_40px_rgba(99,102,241,0.55)] transition-all group overflow-hidden relative text-center">
              <span className="font-display relative z-10 flex items-center justify-center gap-2.5 uppercase tracking-wider text-xs sm:text-sm">
                Explore Case Studies
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </MagneticButton>
          </Link>
        </div>

      </div>

      {/* Responsive Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
