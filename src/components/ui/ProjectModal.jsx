import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ExternalLink, Github, Zap, CheckCircle2, Sparkles,
  Layers, Code2, ZoomIn, User, Calendar, Cpu, Activity, ShieldCheck,
  Globe, Smartphone, Palette, ArrowRight, CornerDownLeft
} from 'lucide-react';
import MagneticButton from './MagneticButton';

const categoryIcons = {
  'Web Apps': Globe,
  'Mobile Apps': Smartphone,
  'UI/UX Design': Palette,
  'All': Layers
};

// Orchestrated stagger animations for professional cascade entry
const modalContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08
    }
  }
};

const modalItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 26,
      stiffness: 340
    }
  }
};

export default function ProjectModal({
  project,
  onClose
}) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Keyboard listener: Esc to close lightbox or modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isZoomed) setIsZoomed(false);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isZoomed]);

  if (!project) return null;

  const CatIcon = categoryIcons[project.category] || Layers;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8 bg-[#04060f]/90 backdrop-blur-2xl"
        onClick={onClose}
      >
        {/* Ambient Pulsing Aurora Behind Modal */}
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-violet-600/25 via-indigo-600/20 to-cyan-500/15 rounded-full blur-[160px] pointer-events-none animate-pulse" />

        {/* Modal Window Container with Refractive Liquid Glass Effect */}
        <motion.div
          key={project.id}
          initial={{ scale: 0.93, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          className="liquid-glass rounded-2xl sm:rounded-3xl md:rounded-[32px] max-w-6xl w-full relative flex flex-col max-h-[94vh] md:max-h-[90vh] overflow-hidden group/modal"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Internal Liquid Aurora Fluid Mesh Drift */}
          <div className="absolute -top-36 -left-28 w-96 h-96 bg-violet-600/30 rounded-full blur-[110px] pointer-events-none animate-pulse" />
          <div className="absolute top-1/3 -right-28 w-96 h-96 bg-cyan-500/25 rounded-full blur-[120px] pointer-events-none animate-float" />
          <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-indigo-600/25 rounded-full blur-[100px] pointer-events-none" />

          {/* Liquid Glass Specular Light Sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-white/[0.05] to-transparent pointer-events-none z-10" />

          {/* Ambient Glowing Top Shimmer Beam Animation */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-violet-400 via-cyan-300 to-transparent opacity-90 animate-shimmer z-20" />

          {/* ── PROFESSIONAL WINDOW HEADER CHROME (Liquid Glass Dock) ── */}
          <div className="px-5 sm:px-7 py-3.5 sm:py-4 flex items-center justify-end relative z-30 shrink-0 select-none">

            {/* Right: Actions & Keyboard Shortcut Indicator */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.1] text-[10px] font-mono text-dark-textMuted shadow-inner">
                <span>ESC</span>
                <CornerDownLeft size={10} className="text-white/40" />
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 sm:p-2 bg-white/[0.06] hover:bg-rose-500/20 hover:text-rose-300 border border-white/[0.12] hover:border-rose-500/40 rounded-xl text-dark-textMuted transition-all duration-300 shadow-sm flex items-center justify-center cursor-pointer group/close"
                aria-label="Close modal"
                title="Close Modal (Esc)"
              >
                <X size={16} className="group-hover/close:rotate-90 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* ── SCROLLABLE MODAL BODY CONTENT ── */}
          <div className="overflow-y-auto custom-scrollbar p-5 sm:p-7 md:p-9 space-y-6 sm:space-y-8 -webkit-overflow-scrolling-touch flex-grow">
            <motion.div
              variants={modalContainerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 lg:gap-10"
            >

              {/* ── LEFT COLUMN: Interactive Mockup Showcase & Action Suite (5 Cols) ── */}
              <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
                
                {/* Visual Mockup Container (Clean, Crisp, Clickable for Zoom with Liquid Glass Frame) */}
                <motion.div
                  variants={modalItemVariants}
                  onClick={() => setIsZoomed(true)}
                  className="group/img relative w-full aspect-[4/3] sm:aspect-[4/3.5] lg:aspect-[4/4.8] rounded-2xl sm:rounded-3xl overflow-hidden liquid-glass-inner hover:border-violet-400/50 shadow-2xl transition-all duration-500 cursor-pointer flex items-center justify-center"
                  title="Click to view full-resolution image">
                  {/* Subtle Ambient Radial Lighting */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 via-transparent to-cyan-500/10 opacity-70 group-hover/img:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Clean High-Resolution Mockup */}
                  <img
                    src={project.image}
                    alt={`${project.title} detailed architecture preview`}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/img:scale-105"
                  />

                  {/* Subtle edge vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080b18]/80 via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Floating Zoom Indicator Pill */}
                  <div className="absolute top-3.5 left-3.5 z-20 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-white text-[11px] font-mono flex items-center gap-1.5 shadow-lg group-hover/img:scale-105 transition-transform duration-300">
                    <ZoomIn size={13} className="text-violet-400" />
                    <span>Click to Expand</span>
                  </div>

                  {/* Bottom Image Tag */}
                  <div className="absolute bottom-3.5 right-3.5 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 text-[10px] font-mono text-white/80">
                    {project.platform || 'Production Build'}
                  </div>
                </motion.div>

                {/* Action Link Buttons Suite: Responsive grid (stacks on narrow mobile, side-by-side on sm+) */}
                <motion.div
                  variants={modalItemVariants}
                  className={`grid ${
                    project.liveUrl && project.liveUrl !== '#' && project.githubUrl && project.githubUrl !== '#'
                      ? 'grid-cols-1 min-[420px]:grid-cols-2'
                      : 'grid-cols-1'
                  } gap-2.5 sm:gap-3 w-full`}
                >
                  {/* Column 1: Live View */}
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <MagneticButton className="w-full">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group/btn w-full flex items-center justify-center gap-2 py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl font-body font-semibold text-white text-xs sm:text-sm transition-all duration-300 overflow-hidden shadow-[0_4px_25px_rgba(124,58,237,0.35)] hover:shadow-[0_8px_35px_rgba(99,102,241,0.55)] text-center normal-case"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 group-hover/btn:scale-105 transition-transform duration-500" />
                        <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 text-white font-medium sm:font-semibold text-xs sm:text-sm whitespace-nowrap">
                          <ExternalLink size={15} className="text-violet-200 group-hover/btn:scale-110 transition-transform shrink-0" />
                          <span>Live View</span>
                          <ArrowRight size={13} className="text-violet-200 group-hover/btn:translate-x-1 transition-transform shrink-0" />
                        </span>
                      </a>
                    </MagneticButton>
                  )}

                  {/* Column 2: Source Code */}
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <MagneticButton className="w-full">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 px-3 sm:px-4 liquid-glass-inner hover:bg-white/[0.08] text-white font-semibold text-xs sm:text-sm rounded-xl sm:rounded-2xl hover:border-violet-500/40 transition-all duration-300 group/gh text-center shadow-sm normal-case whitespace-nowrap"
                      >
                        <Github size={15} className="text-dark-textMuted group-hover/gh:text-white transition-colors shrink-0" />
                        <span className="font-medium sm:font-semibold">Source Code</span>
                      </a>
                    </MagneticButton>
                  )}
                </motion.div>

                {/* Architecture Seal / Status Badge: Fully Responsive */}
                <motion.div
                  variants={modalItemVariants}
                  className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl liquid-glass-inner flex items-center justify-between gap-2.5 text-xs font-mono"
                >
                  <div className="flex items-center gap-2 text-dark-textMuted min-w-0">
                    <ShieldCheck size={16} className="text-violet-400 shrink-0" />
                    <span className="truncate">Deployment Status</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-sm shrink-0 whitespace-nowrap text-[11px] sm:text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    {project.status || 'Active Production'}
                  </span>
                </motion.div>

              </div>

              {/* ── RIGHT COLUMN: High-End Specifications & Text Details (7 Cols) ── */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                
                <div>
                  {/* Top Meta Row: Category, Timeline & Benchmarks */}
                  <motion.div variants={modalItemVariants} className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-mono font-bold tracking-wide uppercase shadow-[inset_0_1px_0_0_rgba(167,139,250,0.2)]">
                      <CatIcon size={12} className="text-violet-400" />
                      {project.category}
                    </span>

                    <span className="px-3 py-1 rounded-full liquid-glass-inner text-xs font-mono text-dark-textMuted">
                      {project.year || '2025'}
                    </span>

                  </motion.div>

                  {/* Commanding Project Title */}
                  <motion.h2
                    variants={modalItemVariants}
                    className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white tracking-tight leading-[1.15] mb-2"
                  >
                    {project.title}
                  </motion.h2>

                  {/* Refined Subtitle */}
                  {project.subtitle && (
                    <motion.p
                      variants={modalItemVariants}
                      className="text-sm sm:text-base font-bricolage text-violet-200/80 mb-5 leading-relaxed"
                    >
                      {project.subtitle}
                    </motion.p>
                  )}

                  {/* ── SPECIFICATION METRIC CARDS GRID (Liquid Glass Inner) ── */}
                  <motion.div
                    variants={modalItemVariants}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 p-3.5 rounded-2xl  mb-6"
                  >
                    {/* Role */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-violet-400/40 hover:bg-white/[0.06] transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-dark-textMuted flex items-center gap-1 mb-1">
                        <User size={11} className="text-violet-400" /> Role
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white font-syne block truncate">
                        {project.role || 'Digital Architect'}
                      </span>
                    </div>

                    {/* Timeline */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-400/40 hover:bg-white/[0.06] transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-dark-textMuted flex items-center gap-1 mb-1">
                        <Calendar size={11} className="text-indigo-400" /> Timeline
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white font-syne block">
                        {project.year || '2025'}
                      </span>
                    </div>

                    {/* Platform */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-400/40 hover:bg-white/[0.06] transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-dark-textMuted flex items-center gap-1 mb-1">
                        <Cpu size={11} className="text-cyan-400" /> Platform
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white font-syne block truncate">
                        {project.platform || 'Web Application'}
                      </span>
                    </div>

                  </motion.div>

                  {/* ── ABOUT / EXECUTIVE ARCHITECTURE OVERVIEW ── */}
                  <motion.div variants={modalItemVariants} className="mb-6">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-violet-300 mb-2.5 flex items-center gap-2">
                      <Sparkles size={13} className="text-violet-400" />
                      Executive Overview
                    </h3>
                    <p className="text-dark-textMuted text-xs sm:text-sm md:text-[15px] font-bricolage leading-relaxed">
                      {project.description}
                    </p>
                  </motion.div>

                  {/* ── CORE CAPABILITIES & KEY FEATURES (Liquid Glass Cards) ── */}
                  {project.keyFeatures && project.keyFeatures.length > 0 && (
                    <motion.div variants={modalItemVariants} className="mb-6">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-violet-300 mb-3 flex items-center gap-2 border-b border-white/[0.08] pb-2">
                        <Zap size={13} className="text-violet-400" />
                        Engineered Capabilities & Features
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {project.keyFeatures.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 p-3 rounded-xl liquid-glass-inner hover:border-violet-400/40 hover:bg-white/[0.06] transition-all duration-300 group/feat"
                          >
                            <CheckCircle2 size={15} className="text-violet-400 shrink-0 mt-0.5 group-hover/feat:scale-110 group-hover/feat:text-cyan-300 transition-all" />
                            <span className="text-white/85 text-xs sm:text-sm font-bricolage leading-relaxed">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ── TECHNOLOGY STACK & SKILLS STRIP ── */}
                  <motion.div variants={modalItemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-white/[0.08]">
                    {/* Tech Stack */}
                    {project.tags && project.tags.length > 0 && (
                      <div>
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-dark-textMuted mb-2.5 flex items-center gap-1.5">
                          <Code2 size={13} className="text-violet-400" /> Technologies
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-mono text-violet-200 bg-violet-500/10 px-2.5 py-1 rounded-lg border border-violet-500/25 hover:border-violet-400/50 hover:bg-violet-500/20 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(167,139,250,0.15)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills Utilized */}
                    {project.skillsUsed && project.skillsUsed.length > 0 && (
                      <div>
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-dark-textMuted mb-2.5 flex items-center gap-1.5">
                          <Layers size={13} className="text-cyan-400" /> Competencies
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {project.skillsUsed.map((skill) => (
                            <span
                              key={skill}
                              className="text-[11px] font-mono text-cyan-200 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/25 hover:border-cyan-400/50 hover:bg-cyan-500/20 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(6,182,212,0.15)]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>

                </div>

                {/* Footer Assurance Banner */}
                <motion.div
                  variants={modalItemVariants}
                  className="mt-6 p-3 rounded-xl liquid-glass-inner border border-violet-500/30 flex items-center gap-2.5 text-[11px] font-mono text-violet-300/90 shadow-[inset_0_1px_0_0_rgba(167,139,250,0.15)]"
                >
                  <ShieldCheck size={15} className="text-violet-400 shrink-0" />
                  <span>Production-tested architecture adhering to accessibility, responsive ergonomics, and high-performance execution.</span>
                </motion.div>

              </div>

            </motion.div>
          </div>
        </motion.div>

        {/* ── HIGH-RESOLUTION FULLSCREEN IMAGE LIGHTBOX ── */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-8"
              onClick={() => setIsZoomed(false)}
            >
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="absolute top-6 right-6 z-30 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all cursor-pointer flex items-center justify-center shadow-2xl"
                title="Close Lightbox (Esc)"
              >
                <X size={22} />
              </button>

              <motion.img
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                src={project.image}
                alt={`${project.title} High Resolution Preview`}
                className="max-w-full max-h-[90vh] object-contain rounded-2xl border border-white/20 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
