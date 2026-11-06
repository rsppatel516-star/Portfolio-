import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../data/services';
import {
  Zap, Terminal, Cpu, X, CheckCircle2, ArrowRight,
  ArrowUpRight, ChevronRight, Sparkles, ShieldCheck,
  PackageCheck, Target, CornerDownLeft
} from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import SectionHeading from './ui/SectionHeading';

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
      className="group relative surface-panel surface-panel-hover rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 flex flex-col justify-between overflow-hidden cursor-pointer min-h-[310px] transition-all duration-400"
    >
      {/* Animated corner glow */}
      <motion.div
        className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Top row: badge & number */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          {service.badge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/90 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-300 shadow-sm dark:shadow-none">
              <Sparkles size={11} className="text-indigo-600 dark:text-indigo-400" />
              {service.badge}
            </span>
          )}
        </div>
        <span className="font-mono text-xs font-bold text-slate-400 dark:text-dark-textMuted/40 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 select-none">
          {num}
        </span>
      </div>

      {/* Main card content */}
      <div className="flex-1">
        {/* Icon with orbit ring */}
        <div className="relative w-fit mb-4">
          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/90 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-500/20 dark:group-hover:text-indigo-300 group-hover:scale-110 group-hover:shadow-[0_4px_20px_rgba(99,102,241,0.35)] transition-all duration-400">
            <service.icon size={22} strokeWidth={2.2} />
          </div>
          <span className="absolute inset-0 rounded-2xl border border-indigo-500/30 dark:border-indigo-400/20 opacity-0 group-hover:opacity-100 group-hover:scale-[1.4] transition-all duration-700 pointer-events-none" />
        </div>

        <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 dark:text-dark-textMain group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 mb-2 leading-snug">
          {service.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-dark-textMuted leading-relaxed line-clamp-3 font-bricolage mb-4">
          {service.description}
        </p>

        {/* Quick highlight metric pill */}
        {mainMetric && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/90 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[11px] font-mono font-medium mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span>{mainMetric.label}:</span>
            <strong className="text-slate-900 dark:text-dark-textMain font-bold">{mainMetric.value}</strong>
          </div>
        )}
      </div>

      {/* Tech pills strip */}
      <div className="mt-2 flex flex-wrap gap-1.5">
        {service.techStack?.slice(0, 3).map((t) => (
          <span
            key={t}
            className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-dark-textMain/[0.04] border border-slate-200/90 dark:border-dark-border text-slate-700 dark:text-dark-textMuted font-medium group-hover:border-indigo-500/30 group-hover:text-slate-900 dark:group-hover:text-dark-textMain transition-colors duration-300"
          >
            {t}
          </span>
        ))}
        {service.techStack?.length > 3 && (
          <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/90 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-400 font-bold">
            +{service.techStack.length - 3}
          </span>
        )}
      </div>

      {/* Card interactive footer */}
      <div className="mt-5 pt-4 border-t border-slate-200 dark:border-dark-border flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-code font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 group-hover:translate-x-1 transition-all duration-300">
          <ChevronRight size={14} strokeWidth={2.5} />
          View Details &amp; Process
        </span>
        <ArrowUpRight
          size={16}
          strokeWidth={2.2}
          className="text-slate-400 dark:text-dark-textMuted/40 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
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
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 modal-backdrop cursor-zoom-out"
    >
      {/* Ambient Pulsing Aurora Behind Modal */}
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-purple-600/20 to-indigo-500/15 rounded-full blur-[160px] pointer-events-none animate-pulse" />

      <motion.div
        variants={morphBlur}
        initial="hidden"
        animate="show"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-[92dvh] sm:h-[88vh] max-h-[920px] surface-panel border border-dark-border rounded-2xl sm:rounded-3xl md:rounded-[32px] flex flex-col overflow-hidden cursor-default shadow-2xl group/modal"
      >
        {/* Dynamic top gradient line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#6366f1] via-[#8b5cf6] to-transparent opacity-90 animate-shimmer z-30" />

        {/* Ambient liquid atmospheric glows */}
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-purple-600/15 blur-[120px] pointer-events-none -translate-x-1/3 -translate-y-1/3 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-pink-500/15 blur-[120px] pointer-events-none translate-x-1/4 translate-y-1/4 animate-float" />

        {/* ── PROFESSIONAL WINDOW HEADER CHROME (Parity with ProjectModal) ── */}
        <div className="px-5 sm:px-7 py-3.5 sm:py-4 flex items-center justify-between border-b border-dark-border relative z-30 shrink-0 select-none">
          {/* Left: Category & Title Summary */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-500 dark:text-indigo-400 shrink-0">
              <service.icon size={16} />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-500 dark:text-indigo-300 font-semibold truncate">
              {service.badge || "Service Specification"}
            </span>
            {service.idealFor && (
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono text-dark-textMuted/70 truncate">
                • {service.idealFor.split(',')[0]}
              </span>
            )}
          </div>

          {/* Right: Actions & Keyboard Shortcut Indicator */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-dark-textMain/[0.05] border border-dark-border text-[10px] font-mono text-dark-textMuted shadow-inner">
              <span>ESC</span>
              <CornerDownLeft size={10} className="text-dark-textMuted/60" />
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 bg-dark-textMain/[0.06] hover:bg-rose-500/20 hover:text-rose-500 border border-dark-border hover:border-rose-500/40 rounded-xl text-dark-textMuted transition-all duration-300 shadow-sm flex items-center justify-center cursor-pointer group/close"
              aria-label="Close modal"
              title="Close Modal (Esc)"
            >
              <X size={16} className="group-hover/close:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-5 sm:px-7 md:px-9 py-6 sm:py-8 space-y-7 sm:space-y-9 relative z-10">

          {/* Service Header Info */}
          <motion.div variants={slideLeft} initial="hidden" animate="show" className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              {service.badge && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase bg-indigo-500/15 border border-indigo-500/30 text-indigo-500 dark:text-indigo-300">
                  <Sparkles size={10} className="text-indigo-500 dark:text-indigo-400" />
                  {service.badge}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-dark-textMain tracking-tight leading-tight">
              {service.title}
            </h2>

            <p className="text-sm sm:text-base text-dark-textMuted leading-relaxed font-bricolage max-w-3xl">
              {service.tagline || service.description}
            </p>
          </motion.div>

          {/* 1. Quantitative Metrics Bar */}
          {service.metrics?.length > 0 && (
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
            >
              {service.metrics.map((m, idx) => (
                <motion.div
                  key={idx}
                  variants={popIn}
                  className="p-4 rounded-2xl surface-panel border border-dark-border hover:border-indigo-500/30 flex flex-col justify-center transition-colors shadow-sm"
                >
                  <span className="text-[10px] font-code font-bold uppercase tracking-wider text-dark-textMuted">
                    {m.label}
                  </span>
                  <span className="text-xl sm:text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-dark-textMain via-purple-600 to-pink-600 dark:from-white dark:via-purple-200 dark:to-indigo-300 mt-1">
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
              <motion.div variants={slideLeft} initial="hidden" animate="show" className="space-y-3">
                <p className="text-[11px] font-code font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400/90 flex items-center gap-2">
                  <Terminal size={13} className="text-indigo-500 dark:text-indigo-500" />
                  What's Included &amp; Core Capabilities
                </p>
                <motion.ul variants={stagger} initial="hidden" animate="show" className="space-y-2.5">
                  {service.features.map((f, i) => (
                    <motion.li
                      key={i}
                      variants={shimmerBullet}
                      className="flex items-start gap-3 p-3 rounded-xl bg-dark-textMain/[0.03] border border-dark-border hover:border-indigo-500/30 group transition-colors"
                    >
                      <CheckCircle2 size={16} className="text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors" />
                      <span className="text-xs sm:text-sm text-dark-textMain/80 group-hover:text-dark-textMain transition-colors duration-200 leading-relaxed font-bricolage">
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
                <motion.div variants={slideLeft} initial="hidden" animate="show" className="space-y-3">
                  <p className="text-[11px] font-code font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300/90 flex items-center gap-2">
                    <Zap size={13} className="text-indigo-500 dark:text-indigo-500" />
                    Key Business Benefits
                  </p>
                  <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-2.5">
                    {service.keyBenefits.map((b, i) => (
                      <motion.div
                        key={i}
                        variants={popIn}
                        whileHover={{ x: 3 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-dark-textMain/[0.03] border border-dark-border transition-all duration-300 hover:border-indigo-500/30"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 shrink-0" />
                        <p className="text-xs sm:text-sm text-dark-textMain/80 leading-relaxed font-bricolage">
                          {b}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* Deliverables */}
              {service.deliverables?.length > 0 && (
                <motion.div variants={slideLeft} initial="hidden" animate="show" className="space-y-3">
                  <p className="text-[11px] font-code font-bold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400/90 flex items-center gap-2">
                    <PackageCheck size={13} className="text-purple-500 dark:text-purple-400" />
                    Client Deliverables
                  </p>
                  <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.deliverables.map((d, i) => (
                      <motion.div
                        key={i}
                        variants={popIn}
                        className="flex items-center gap-2.5 p-2.5 rounded-xl bg-dark-textMain/[0.03] border border-dark-border text-xs text-dark-textMain/80 hover:text-dark-textMain transition-colors hover:border-purple-500/30"
                      >
                        <ShieldCheck size={14} className="text-purple-500 dark:text-purple-400 shrink-0" />
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
              <div className="h-px bg-dark-border mb-6" />
              <p className="text-[11px] font-code font-bold uppercase tracking-[0.2em] text-dark-textMuted flex items-center gap-2 mb-4">
                <Target size={13} className="text-purple-500 dark:text-purple-400" />
                Execution Workflow &amp; Process
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {service.workflow.map((item) => (
                  <motion.div
                    key={item.step}
                    variants={popIn}
                    whileHover={{ y: -3 }}
                    className="p-4 rounded-xl  bg-dark-textMain/[0.03] border border-dark-border hover:border-purple-400/30 transition-all duration-300 relative group flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">
                        {item.step}
                      </span>
                      <h4 className="text-xs sm:text-sm font-display font-bold text-dark-textMain mt-1.5 mb-1">
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
            <div className="h-px bg-dark-border mb-6" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              {/* Tech Stack */}
              {service.techStack?.length > 0 && (
                <div className="flex-1">
                  <p className="text-[11px] font-code font-bold uppercase tracking-[0.2em] text-dark-textMuted flex items-center gap-2 mb-3">
                    <Cpu size={13} className="text-indigo-500 dark:text-indigo-400" />
                    Technology Stack &amp; Tools
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.techStack.map((tech) => (
                      <motion.span
                        key={tech}
                        variants={techPill}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="text-[11px] font-mono text-violet-700 dark:text-violet-400 bg-dark-textMain/[0.03] px-3 py-1 rounded-lg border border-violet-500/20 hover:border-violet-400/50 hover:bg-hover-panel/20 transition-all duration-200 cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* Ideal for */}
              {service.idealFor && (
                <div className="sm:max-w-xs shrink-0 p-3.5 rounded-xl bg-dark-textMain/[0.03] border border-dark-border">
                  <p className="text-[10px] font-code uppercase tracking-wider text-dark-textMuted mb-1 font-semibold">
                    Best Suited For
                  </p>
                  <p className="text-xs font-bricolage text-dark-textMain/80 leading-snug">
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
          className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 px-5 sm:px-7 md:px-9 py-4 relative z-20  bg-dark-textMain/[0.03]"
        >
          <div className="hidden sm:block">
            <p className="text-xs font-display font-bold text-dark-textMain">
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
              className="relative group w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 rounded-xl sm:rounded-2xl font-display font-bold text-black text-xs tracking-[0.14em] uppercase overflow-hidden cursor-pointer transition-shadow duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-400" />
              <span className="absolute inset-[1px] bg-dark-bg/10 backdrop-blur-md rounded-[11px] sm:rounded-[15px] z-0 transition-all duration-300" />
              <motion.span
                className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"
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

        {/* ── Section Header with Signature Typography & Sparkles ── */}
        <SectionHeading
          badge="SERVICES & CAPABILITIES"
          badgeIcon={Zap}
          prefix="Solving "
          highlight="Complex"
          suffix=" Problems with Code"
          description="End-to-end digital craftsmanship — from pixel-perfect interfaces to resilient cloud-connected native iOS and web systems."
          size="medium"
        />

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
          className="mt-14 sm:mt-20 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-white/[0.08] bg-indigo-600/6 dark:bg-indigo-600/6 backdrop-blur-xl p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl dark:shadow-none"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none"/>
          <div className="relative z-10 text-center sm:text-left">
            <p className="text-xs font-code uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1.5 sm:mb-2 font-bold">
              Open to Work &amp; Collaborations
            </p>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-black mb-1">
              Have a project or idea in mind?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-dark-textMuted font-bricolage">
              Let's discuss how I can help bring your vision to life with precision and speed.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleInquire}
            className="relative z-10 shrink-0 w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 to-pink-400 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_8px_30px_rgba(168,85,247,0.55)] cursor-pointer"
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
