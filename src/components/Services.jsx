import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../data/services';
import {
  Zap, Terminal, Cpu, X, CheckCircle2, ArrowRight,
  ArrowUpRight, ChevronRight, Sparkles, ShieldCheck,
  PackageCheck, Target
} from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

// ════════════════════════════════════════════════════════════
//  Custom animation variants
// ════════════════════════════════════════════════════════════

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

const cardEntrance = {
  hidden: { opacity: 0, y: 35, scale: 0.98 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  }),
};

const morphBlur = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 240, damping: 24 },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    filter: 'blur(8px)',
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const revealBar = {
  hidden: { scaleX: 0, originX: 0 },
  show: { scaleX: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 } },
};

const shimmerBullet = {
  hidden: { opacity: 0, x: -14, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

const popIn = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 380, damping: 22 },
  },
};

const techPill = {
  hidden: { opacity: 0, scale: 0.65, y: 6 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 450, damping: 22 },
  },
};

// ════════════════════════════════════════════════════════════
//  Service Card (Fully responsive for mobile, tablet, 4K)
// ════════════════════════════════════════════════════════════

function ServiceCard({ service, index, onClick }) {
  const num = String(index + 1).padStart(2, '0');
  const mainMetric = service.metrics?.[0];

  return (
    <motion.div
      custom={index}
      variants={cardEntrance}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-30px' }}
      whileHover={{ y: -6, scale: 1.012 }}
      onClick={onClick}
      className="group relative backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/40 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 flex flex-col justify-between overflow-hidden cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_60px_-10px_rgba(99,102,241,0.25)] min-h-[310px] transition-all duration-400"
    >
      {/* Animated corner glow */}
      <motion.div
        className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Top row: badge & number */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          {service.badge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wide uppercase bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
              <Sparkles size={10} className="text-indigo-400" />
              {service.badge}
            </span>
          )}
        </div>
        <span className="font-mono text-xs font-bold text-white/20 group-hover:text-indigo-400/50 transition-colors duration-400 select-none">
          {num}
        </span>
      </div>

      {/* Main card content */}
      <div className="flex-1">
        {/* Icon with orbit ring */}
        <div className="relative w-fit mb-4">
          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 group-hover:border-indigo-400/40 group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(99,102,241,0.4)] transition-all duration-400">
            <service.icon size={22} />
          </div>
          <span className="absolute inset-0 rounded-xl border border-indigo-400/20 opacity-0 group-hover:opacity-100 group-hover:scale-[1.5] transition-all duration-700 pointer-events-none" />
        </div>

        <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-indigo-300 transition-colors duration-300 mb-2 leading-snug">
          {service.title}
        </h3>

        <p className="text-xs sm:text-sm text-dark-textMuted leading-relaxed line-clamp-3 font-bricolage mb-4">
          {service.description}
        </p>

        {/* Quick highlight metric pill */}
        {mainMetric && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-mono font-medium mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span>{mainMetric.label}:</span>
            <strong className="text-white font-bold">{mainMetric.value}</strong>
          </div>
        )}
      </div>

      {/* Tech pills strip */}
      <div className="mt-2 flex flex-wrap gap-1.5">
        {service.techStack?.slice(0, 3).map((t) => (
          <span
            key={t}
            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.07] text-dark-textMuted group-hover:border-indigo-500/20 group-hover:text-white transition-colors duration-300"
          >
            {t}
          </span>
        ))}
        {service.techStack?.length > 3 && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold">
            +{service.techStack.length - 3}
          </span>
        )}
      </div>

      {/* Card interactive footer */}
      <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-code font-bold uppercase tracking-wider text-indigo-400/60 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all duration-300">
          <ChevronRight size={13} />
          View Details &amp; Process
        </span>
        <ArrowUpRight
          size={15}
          className="text-white/20 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
        />
      </div>
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════
//  Service Modal (Clean, responsive across all screen sizes)
// ════════════════════════════════════════════════════════════

function ServiceModal({ service, onClose, onInquire }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 bg-[#03040b]/85 backdrop-blur-2xl cursor-zoom-out"
    >
      <motion.div
        variants={morphBlur}
        initial="hidden"
        animate="show"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-[92dvh] sm:h-[88vh] max-h-[920px] liquid-glass rounded-2xl sm:rounded-3xl flex flex-col overflow-hidden cursor-default"
      >
        {/* Dynamic top gradient line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          variants={revealBar}
          initial="hidden"
          animate="show"
        />

        {/* Ambient liquid atmospheric glows */}
        <div className="absolute top-0 left-0 w-80 h-80 rounded-sm bg-indigo-600/20 blur-[120px] pointer-events-none -translate-x-1/3 -translate-y-1/3 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-sm bg-purple-600/20 blur-[100px] pointer-events-none translate-x-1/4 translate-y-1/4 animate-float" />

        {/* ── Sticky Header (Liquid Glass) ── */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          animate="show"
          className="shrink-0 flex items-start sm:items-center gap-3.5 sm:gap-5 px-4 sm:px-6 md:px-8 pt-5 sm:pt-6 md:pt-7 pb-4 sm:pb-5 relative z-10"
        >
          {/* Icon */}
          <div className="shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-indigo-400">
            <service.icon size={24} className="sm:w-7 sm:h-7" />
          </div>

          {/* Title & Tagline */}
          <div className="flex-1 min-w-0 pr-8 sm:pr-12">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              {service.badge && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                  <Sparkles size={10} className="text-indigo-400" />
                  {service.badge}
                </span>
              )}
              {service.idealFor && (
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono text-dark-textMuted/70">
                  • {service.idealFor.split(',')[0]}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight leading-tight">
              {service.title}
            </h2>

            <p className="mt-1 text-xs sm:text-sm text-dark-textMuted leading-relaxed font-bricolage line-clamp-2">
              {service.tagline || service.description}
            </p>
          </div>

          {/* Close button - comfortable touch size, non-overlapping */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3.5 right-3.5 sm:top-5 sm:right-6 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.12] transition-all shrink-0 cursor-pointer"
          >
            <motion.span whileHover={{ rotate: 90 }} transition={{ duration: 0.18 }}>
              <X size={16} />
            </motion.span>
          </button>
        </motion.div>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-6 md:px-8 py-5 sm:py-7 space-y-6 sm:space-y-8 relative z-10">

          {/* 1. Quantitative Metrics Bar */}
          {service.metrics?.length > 0 && (
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3"
            >
              {service.metrics.map((m, idx) => (
                <motion.div
                  key={idx}
                  variants={popIn}
                  className="p-3 sm:p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-indigo-500/20 flex flex-col justify-center transition-colors"
                >
                  <span className="text-[10px] font-code font-bold uppercase tracking-wider text-dark-textMuted">
                    {m.label}
                  </span>
                  <span className="text-lg sm:text-xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400 mt-0.5">
                    {m.value}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* 2. Two-Column Grid: Features + Deliverables/Benefits */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

            {/* Left: What's Included */}
            {service.features?.length > 0 && (
              <motion.div variants={slideLeft} initial="hidden" animate="show">
                <p className="text-[11px] font-code font-bold uppercase tracking-[0.2em] text-indigo-300/80 flex items-center gap-2 mb-3.5">
                  <Terminal size={12} className="text-indigo-400" />
                  What's Included &amp; Core Capabilities
                </p>
                <motion.ul variants={stagger} initial="hidden" animate="show" className="space-y-2.5">
                  {service.features.map((f, i) => (
                    <motion.li
                      key={i}
                      variants={shimmerBullet}
                      className="flex items-start gap-2.5 p-2 sm:p-2.5 rounded-xl bg-white/[0.015] border border-white/[0.04] hover:border-indigo-500/20 group transition-colors"
                    >
                      <CheckCircle2 size={15} className="text-indigo-400 shrink-0 mt-0.5 group-hover:text-indigo-300 transition-colors" />
                      <span className="text-xs sm:text-sm text-dark-textMuted group-hover:text-white transition-colors duration-200 leading-relaxed font-bricolage">
                        {f}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}

            {/* Right: Key Benefits & Deliverables */}
            <div className="space-y-6">
              {/* Key Benefits */}
              {service.keyBenefits?.length > 0 && (
                <motion.div variants={slideLeft} initial="hidden" animate="show">
                  <p className="text-[11px] font-code font-bold uppercase tracking-[0.2em] text-emerald-300/80 flex items-center gap-2 mb-3.5">
                    <Zap size={12} className="text-emerald-400" />
                    Key Business Benefits
                  </p>
                  <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-2.5">
                    {service.keyBenefits.map((b, i) => (
                      <motion.div
                        key={i}
                        variants={popIn}
                        whileHover={{ x: 3 }}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-emerald-500/20 transition-all duration-300"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                        <p className="text-xs sm:text-sm text-dark-textMuted leading-relaxed font-bricolage">
                          {b}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* Deliverables */}
              {service.deliverables?.length > 0 && (
                <motion.div variants={slideLeft} initial="hidden" animate="show">
                  <p className="text-[11px] font-code font-bold uppercase tracking-[0.2em] text-cyan-300/80 flex items-center gap-2 mb-3.5">
                    <PackageCheck size={12} className="text-cyan-400" />
                    Client Deliverables
                  </p>
                  <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.deliverables.map((d, i) => (
                      <motion.div
                        key={i}
                        variants={popIn}
                        className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.015] border border-white/[0.04] text-[11px] sm:text-xs text-dark-textMuted hover:text-white transition-colors"
                      >
                        <ShieldCheck size={13} className="text-cyan-400 shrink-0" />
                        <span className="truncate">{d}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </div>

          </div>

          {/* 3. 4-Step Engineering Workflow */}
          {service.workflow?.length > 0 && (
            <motion.div variants={slideLeft} initial="hidden" animate="show" className="pt-2">
              <div className="h-px bg-white/[0.06] mb-5" />
              <p className="text-[11px] font-code font-bold uppercase tracking-[0.2em] text-white/40 flex items-center gap-2 mb-4">
                <Target size={12} className="text-purple-400" />
                Execution Workflow &amp; Process
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {service.workflow.map((item) => (
                  <motion.div
                    key={item.step}
                    variants={popIn}
                    whileHover={{ y: -3 }}
                    className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/30 transition-all duration-300 relative group flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-xs font-bold text-purple-400/80 group-hover:text-purple-300">
                        {item.step}
                      </span>
                      <h4 className="text-xs sm:text-sm font-display font-bold text-white mt-1 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-dark-textMuted leading-relaxed font-bricolage">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 4. Tech Stack & Ideal For */}
          <div className="pt-2">
            <div className="h-px bg-white/[0.06] mb-5" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Tech Stack */}
              {service.techStack?.length > 0 && (
                <div className="flex-1">
                  <p className="text-[11px] font-code font-bold uppercase tracking-[0.2em] text-white/35 flex items-center gap-2 mb-3">
                    <Cpu size={12} className="text-purple-400" />
                    Technology Stack &amp; Tools
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {service.techStack.map((tech) => (
                      <motion.span
                        key={tech}
                        variants={techPill}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="text-[11px] font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20 hover:border-purple-400/50 hover:bg-purple-500/20 transition-all duration-200 cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* Ideal for */}
              {service.idealFor && (
                <div className="sm:max-w-xs shrink-0 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <p className="text-[10px] font-code uppercase tracking-wider text-dark-textMuted mb-1">
                    Best Suited For
                  </p>
                  <p className="text-xs font-bricolage text-white/80 leading-snug">
                    {service.idealFor}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* ── Sticky Footer CTA ── */}
        <motion.div
          variants={popIn}
          initial="hidden"
          animate="show"
          className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-4 sm:px-6 md:px-8 py-3.5 sm:py-4 backdrop-blur-md relative z-10"
        >
          <div className="hidden sm:block">
            <p className="text-xs font-display font-bold text-white">
              Ready to elevate your project with this service?
            </p>
            <p className="text-[11px] text-dark-textMuted font-bricolage">
              Let's build a fast, reliable, and production-grade solution.
            </p>
          </div>

          <MagneticButton className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onInquire}
              className="relative group w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 rounded-xl sm:rounded-2xl font-display font-bold text-white text-xs tracking-[0.14em] uppercase overflow-hidden cursor-pointer shadow-[0_0_24px_rgba(147,51,234,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.55)] transition-shadow duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600" />
              <span className="absolute inset-[1px] bg-[#0a0b14]/40 backdrop-blur-md rounded-[11px] sm:rounded-[15px] z-0 group-hover:bg-[#0a0b14]/10 transition-all duration-300" />
              <motion.span
                className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent z-0"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'linear', repeatDelay: 1 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Inquire About This Service
                <ArrowRight size={14} />
              </span>
            </motion.button>
          </MagneticButton>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════
//  Main Section Component
// ════════════════════════════════════════════════════════════

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  const close = useCallback(() => setSelectedService(null), []);

  const handleInquire = useCallback(() => {
    close();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [close]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    if (selectedService) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      window.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedService, close]);

  return (
    <section id="services" className="py-20 sm:py-24 md:py-32 relative overflow-hidden">

      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-indigo-600/6 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 md:mb-20 gap-6 sm:gap-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4 sm:mb-5"
            >
              <Zap size={13} className="text-purple-400 animate-pulse" />
              <span className="font-mono text-[10px] font-bold tracking-[0.24em] uppercase text-purple-300">
                Services &amp; Capabilities
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.15] text-white"
            >
              Solving{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">
                Complex
              </span>{' '}
              Problems with Code
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-3 sm:mt-4 text-xs sm:text-base text-dark-textMuted leading-relaxed max-w-xl font-bricolage"
            >
              End-to-end digital craftsmanship — from pixel-perfect interfaces to resilient cloud-connected systems.
            </motion.p>
          </div>

          {/* Stats block - responsive grid on mobile, flex on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="grid grid-cols-3 gap-3 sm:flex sm:gap-8 shrink-0 w-full sm:w-auto"
          >
            {[
              ['6', 'Core Services'],
              ['2+', 'Years Active'],
              ['∞', 'Passion'],
            ].map(([v, l]) => (
              <div
                key={l}
                className="flex flex-col items-center sm:items-start p-3 sm:p-0 rounded-xl bg-white/[0.02] sm:bg-transparent border border-white/[0.04] sm:border-0"
              >
                <span className="text-2xl sm:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                  {v}
                </span>
                <span className="text-[10px] font-code uppercase tracking-wider text-dark-textMuted mt-0.5">
                  {l}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Cards Grid (1 col on mobile, 2 cols on tablet, 3 cols on desktop) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, idx) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={idx}
              onClick={() => setSelectedService(service)}
            />
          ))}
        </div>

        {/* ── Bottom CTA Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 sm:mt-20 rounded-2xl sm:rounded-3xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-md p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/3 to-transparent pointer-events-none" />
          <div className="relative z-10 text-center sm:text-left">
            <p className="text-xs font-code uppercase tracking-widest text-indigo-400 mb-1.5 sm:mb-2 font-semibold">
              Open to Work &amp; Collaborations
            </p>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-1">
              Have a project or idea in mind?
            </h3>
            <p className="text-xs sm:text-sm text-dark-textMuted font-bricolage">
              Let's discuss how I can help bring your vision to life with precision and speed.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleInquire}
            className="relative z-10 shrink-0 w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl sm:rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors duration-300 shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_50px_rgba(99,102,241,0.6)] cursor-pointer"
          >
            Get in Touch
            <ArrowRight size={15} />
          </motion.button>
        </motion.div>

      </div>

      {/* ── Responsive Centered Modal ── */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={close}
            onInquire={handleInquire}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
