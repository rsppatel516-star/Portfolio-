import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { caseStudies } from '../data/caseStudies';
import {
  ArrowLeft, CheckCircle2, Cpu, Zap, ExternalLink, ChevronRight, ChevronLeft, ChevronDown,
  Tag, User, Layers, Target, Lightbulb, TrendingUp, ZoomIn, X,
  Sparkles, ShieldCheck, Code2, AlertTriangle, Github, Calendar, Monitor, ArrowUpRight
} from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';

const SectionLabel = ({ icon: IconComponent, label, color = "text-indigo-400" }) => (
  <div className={`flex items-center gap-2.5 ${color}`}>
    <div className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0">
      <IconComponent size={14} />
    </div>
    <span className="text-xs font-black uppercase tracking-[0.25em] font-code">{label}</span>
  </div>
);

export default function CaseStudy() {
  const { id } = useParams();
  const currentId = parseInt(id, 10);
  const studyIndex = caseStudies.findIndex((s) => s.id === currentId || String(s.id) === id);
  const study = studyIndex !== -1 ? caseStudies[studyIndex] : null;

  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const contentRef = useRef(null);

  const handleScrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Compute Previous and Next case studies for seamless looping pagination
  const prevStudy = studyIndex > 0 ? caseStudies[studyIndex - 1] : caseStudies[caseStudies.length - 1];
  const nextStudy = studyIndex < caseStudies.length - 1 ? caseStudies[studyIndex + 1] : caseStudies[0];

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [0.45, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.12]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 70]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Lock scroll when zoomed
  useEffect(() => {
    if (isImageZoomed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isImageZoomed]);

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg text-dark-textMain px-4">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="text-3xl font-display font-bold text-white">Case Study Not Found</h2>
          <p className="text-dark-textMuted text-sm">
            The requested artifact deep-dive could not be located in our repository.
          </p>
          <Link
            to="/artifacts"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-xs uppercase font-bold tracking-widest"
          >
            <ArrowLeft size={16} /> Back to Artifacts Vault
          </Link>
        </div>
      </div>
    );
  }

  const sv = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.09, delayChildren: 0.1 }
    }
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `https://patelrudra.in/artifacts/${study.id}#artifact`,
    "mainEntityOfPage": `https://patelrudra.in/artifacts/${study.id}`,
    "name": study.title,
    "headline": study.title,
    "alternativeHeadline": study.subtitle,
    "description": study.description,
    "image": study.image?.startsWith('http') ? study.image : `https://patelrudra.in${study.image}`,
    "url": `https://patelrudra.in/artifacts/${study.id}`,
    "creator": {
      "@type": "Person",
      "name": "Rudra Patel",
      "jobTitle": "Digital Architect, Frontend & iOS Developer",
      "url": "https://patelrudra.in"
    },
    "genre": study.category,
    "keywords": study.tags?.join(', '),
    "abstract": study.problem,
    "hasPart": study.keyFeatures?.map(feature => ({
      "@type": "CreativeWork",
      "name": feature
    }))
  };

  return (
    <div className="min-h-screen bg-transparent text-dark-textMain overflow-x-hidden pt-6 md:pt-10 pb-20 relative">
      <SEO
        title={`${study.title} | Technical Case Study`}
        description={study.description}
        keywords={study.tags?.join(', ') || study.category}
        ogTitle={`${study.title} — Technical Case Study by Rudra Patel`}
        ogDescription={study.subtitle || study.description}
        ogImage={study.image}
        canonical={`https://patelrudra.in/artifacts/${study.id}`}
        schema={schema}
      />

      {/* Ambient background glowing orbs */}
      <div className="absolute top-[8%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-5%] w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* ── HERO BANNER SECTION ── */}
      <section className="relative h-[78vh] min-h-[520px] flex items-center justify-center overflow-hidden mb-12">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="absolute inset-0 z-0 cursor-zoom-in group"
          onClick={() => setIsImageZoomed(true)}
        >
          <img
            src={study.image}
            alt={`${study.title} case study banner - ${study.category} by Rudra Patel`}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-dark-bg/40 z-10" />
          <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-dark-bg/80 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-white text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5 shadow-xl">
            <ZoomIn size={14} /> Zoom Image
          </div>
        </motion.div>

        {/* Back Navigation Button */}
        <Link
          to="/artifacts"
          className="absolute top-6 left-4 sm:top-8 sm:left-8 z-30 group"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5 text-white/80 hover:text-white transition-all text-xs font-bold uppercase tracking-[0.2em] bg-white/[0.07] hover:bg-white/[0.14] backdrop-blur-xl px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-white/15 hover:border-indigo-400/40 shadow-2xl"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>Artifacts Vault</span>
          </motion.div>
        </Link>

        {/* Hero Title & Subtitle */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 w-full text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className="space-y-4 sm:space-y-6"
          >
            <motion.div variants={sv} className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/40 bg-indigo-500/10 text-indigo-300 text-[10px] font-black uppercase tracking-[0.28em] backdrop-blur-md shadow-lg shadow-indigo-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Deep-Dive Technical Case Study
              </span>
              {study.category && (
                <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white/70 text-[10px] font-mono uppercase tracking-wider">
                  {study.category}
                </span>
              )}
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 60 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white tracking-tight leading-[1.1]"
              >
                {study.title}
              </motion.h1>
            </div>

            <motion.p
              variants={sv}
              className="text-sm sm:text-lg md:text-xl font-light text-dark-textMuted max-w-3xl mx-auto leading-relaxed font-bricolage"
            >
              {study.subtitle}
            </motion.p>

            {/* Quick Hero Actions */}
            <motion.div variants={sv} className="pt-2 flex flex-wrap items-center justify-center gap-3">
              {study.liveUrl && study.liveUrl !== '#' && (
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-display text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_24px_rgba(99,102,241,0.4)]"
                >
                  <ExternalLink size={14} />
                  <span>Launch Live App</span>
                </a>
              )}
              {study.githubUrl && (
                <a
                  href={study.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-display text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <Github size={14} />
                  <span>View Source</span>
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Hint */}
        <motion.button
          onClick={handleScrollToContent}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 group cursor-pointer"
          aria-label="Scroll to architecture details"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 group-hover:text-indigo-400 font-code transition-colors">
            Explore Architecture
          </span>
          <ChevronDown size={14} className="text-indigo-400 animate-bounce group-hover:scale-125 transition-transform" />
        </motion.button>
      </section>

      {/* ── METADATA SPECS BAR ── */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-14 mb-16 sm:mb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
          className="grid grid-cols-2 md:grid-cols-4 p-2.5 sm:p-3.5 bg-[#080a14]/90 backdrop-blur-2xl border border-white/10 rounded-2xl gap-2.5 sm:gap-3.5 shadow-2xl"
        >
          {[
            {
              label: "Category",
              value: study.category,
              Icon: Tag,
              accent: "from-indigo-500/20 to-purple-500/20 text-indigo-400 border-indigo-500/30",
            },
            {
              label: "Role",
              value: study.role || "Lead Architect",
              Icon: User,
              accent: "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30",
            },
            {
              label: "Platform",
              value: study.platform || "Web / Modern Stack",
              Icon: Monitor,
              accent: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30",
            },
            {
              label: "Architecture",
              value: `${study.keyFeatures?.length || 0} Core Modules`,
              Icon: Target,
              accent: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
            },
          ].map(({ label, value, Icon: IconComponent, accent }) => (
            <motion.div
              key={label}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 }
              }}
              className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-white/15 transition-all duration-300 flex flex-col justify-between gap-2.5 overflow-hidden group hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${accent} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent size={15} />
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-indigo-400 transition-colors" />
              </div>

              <div className="space-y-0.5">
                <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold font-code">
                  {label}
                </p>
                <p className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                  {value}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── MAIN BODY CONTENT ── */}
      <div id="case-study-content" ref={contentRef} className="max-w-5xl mx-auto px-4 sm:px-6 space-y-14 sm:space-y-20 scroll-mt-24">

        {/* Quantitative Proof Stats Banner (if present) */}
        {study.stats && study.stats.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={container}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
          >
            {study.stats.map((st, i) => (
              <motion.div
                key={i}
                variants={sv}
                className="p-4 sm:p-5 rounded-2xl bg-white/[0.025] border border-white/[0.07] hover:border-indigo-500/30 transition-all flex flex-col justify-center text-center sm:text-left"
              >
                <span className="text-[10px] font-code font-bold uppercase tracking-wider text-dark-textMuted">
                  {st.label}
                </span>
                <span className="text-xl sm:text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400 mt-1">
                  {st.value}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* 1. Overview & Context Card */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sv}
          className="relative overflow-hidden p-6 sm:p-10 md:p-12 rounded-2xl md:rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-[#0c0e1a]/95 via-[#070913]/95 to-[#0c0e1a]/95 backdrop-blur-2xl shadow-2xl space-y-4"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex items-center justify-between">
            <SectionLabel icon={Lightbulb} label="Overview & Architectural Narrative" color="text-indigo-400" />
            <span className="px-3 py-1 border border-indigo-500/30 text-indigo-300 font-code text-[10px] font-bold uppercase tracking-widest rounded-md bg-indigo-500/10">
              System Context
            </span>
          </div>

          <div className="relative z-10 pt-2">
            <p className="text-sm sm:text-lg md:text-xl font-light text-white/90 leading-relaxed font-bricolage">
              {study.description}
            </p>
          </div>
        </motion.section>

        {/* 2. Challenge vs Engineered Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
          {/* The Challenge Card */}
          <motion.section
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden p-6 sm:p-8 rounded-2xl border border-amber-500/25 bg-gradient-to-br from-amber-500/[0.06] via-amber-500/[0.02] to-transparent backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-5 group hover:border-amber-500/40 transition-all duration-300"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <SectionLabel icon={AlertTriangle} label="The Challenge" color="text-amber-400" />
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Zap size={14} />
                </div>
              </div>
              <p className="text-xs sm:text-sm md:text-base leading-relaxed text-white/80 font-bricolage">
                {study.problem}
              </p>
            </div>
            <div className="pt-2 text-[10px] font-black uppercase tracking-[0.25em] text-amber-400/70 font-code flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Primary Technical Bottleneck
            </div>
          </motion.section>

          {/* Engineered Solution Card */}
          <motion.section
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden p-6 sm:p-8 rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/[0.06] via-emerald-500/[0.02] to-transparent backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-5 group hover:border-emerald-500/40 transition-all duration-300"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <SectionLabel icon={Cpu} label="Engineered Solution" color="text-emerald-400" />
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Sparkles size={14} />
                </div>
              </div>
              <p className="text-xs sm:text-sm md:text-base leading-relaxed text-white/80 font-bricolage">
                {study.solution}
              </p>
            </div>
            <div className="pt-2 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400/70 font-code flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Implemented Architecture
            </div>
          </motion.section>
        </div>

        {/* 3. Key Architectural Features */}
        {study.keyFeatures && study.keyFeatures.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sv}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <SectionLabel icon={Target} label="Key Architectural Features" color="text-purple-400" />
              <span className="text-xs font-code text-white/40">
                {study.keyFeatures.length} Core Modules
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {study.keyFeatures.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  className="flex items-start gap-3.5 p-4 sm:p-5 bg-[#080a14]/60 border border-white/[0.08] hover:border-purple-500/40 rounded-xl transition-all duration-300 group hover:bg-purple-500/[0.03] hover:-translate-y-0.5 shadow-lg"
                >
                  <div className="w-8 h-8 rounded-lg border border-purple-500/30 text-purple-300 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300 bg-purple-500/10">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-code text-purple-400/70 font-bold uppercase tracking-widest block">
                      Module /{String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white/90 group-hover:text-white transition-colors leading-relaxed font-bricolage">
                      {feature}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* 4. Technical Architecture Decisions */}
        {study.techDetails && study.techDetails.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sv}
            className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4"
          >
            <SectionLabel icon={ShieldCheck} label="Technical Deep-Dive Decisions" color="text-indigo-400" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {study.techDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  <span className="text-xs text-white/80 font-mono leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* 5. Technologies Used */}
        {study.tags && study.tags.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sv}
            className="space-y-4"
          >
            <SectionLabel icon={Code2} label="Technologies Used & Stack" color="text-cyan-400" />
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 sm:px-4 py-2 bg-cyan-500/10 border border-cyan-500/25 rounded-xl text-cyan-300 font-bold font-code text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-105 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* 6. Results & Live Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 items-stretch pt-2">
          {/* Outcome Card */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sv}
            className="relative overflow-hidden p-6 sm:p-8 rounded-2xl border border-indigo-500/25 bg-gradient-to-br from-indigo-500/[0.08] via-purple-500/[0.03] to-transparent backdrop-blur-2xl shadow-2xl flex flex-col justify-between space-y-6"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="space-y-3">
              <SectionLabel icon={TrendingUp} label="Impact & Business Outcome" color="text-indigo-400" />
              <p className="text-base sm:text-xl font-display font-medium text-white italic leading-relaxed">
                &quot;{study.results}&quot;
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2 text-[10px] font-black uppercase tracking-[0.25em] text-indigo-300 font-code">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Verified Metrics Resolution
            </div>
          </motion.section>

          {/* Action Callout */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sv}
            className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0c0e1a] to-[#060812] border border-white/10 shadow-2xl space-y-6"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-code font-bold uppercase tracking-wider text-indigo-400">
                Action / Live Inspect
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                Inspect Production Build
              </h3>
              <p className="text-dark-textMuted text-xs sm:text-sm leading-relaxed font-bricolage">
                Test the live application deployment or reach out for technical architecture collaboration.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {study.liveUrl && study.liveUrl !== '#' && (
                <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <button className="w-full px-5 py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-bold text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(99,102,241,0.4)] hover:opacity-95 transition-opacity cursor-pointer">
                    <ExternalLink size={15} />
                    <span>Launch App</span>
                  </button>
                </a>
              )}
              <Link to="/contact" className="flex-1">
                <button className="w-full px-5 py-3.5 bg-white/[0.05] border border-white/15 hover:bg-white/[0.1] text-white font-bold text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer">
                  <span>Discuss Project</span>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* 7. Case Study Pagination (Prev / Next with Thumbnails) */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevStudy && (
            <Link
              to={`/artifacts/${prevStudy.id}`}
              className="w-full sm:w-1/2 p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-indigo-500/30 transition-all duration-300 flex items-center gap-3.5 group"
            >
              <div className="p-2.5 rounded-xl bg-white/[0.05] group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors shrink-0">
                <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <div className="text-left min-w-0">
                <span className="text-[10px] text-dark-textMuted uppercase font-bold tracking-wider block font-code">
                  Previous Artifact • {prevStudy.category}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white font-display group-hover:text-indigo-300 transition-colors truncate block">
                  {prevStudy.title}
                </span>
              </div>
            </Link>
          )}

          {nextStudy && (
            <Link
              to={`/artifacts/${nextStudy.id}`}
              className="w-full sm:w-1/2 p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-indigo-500/30 transition-all duration-300 flex items-center justify-end gap-3.5 group text-right"
            >
              <div className="text-right min-w-0">
                <span className="text-[10px] text-dark-textMuted uppercase font-bold tracking-wider block font-code">
                  Next Artifact • {nextStudy.category}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white font-display group-hover:text-indigo-300 transition-colors truncate block">
                  {nextStudy.title}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.05] group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors shrink-0">
                <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          )}
        </div>

      </div>

      {/* ── IMAGE ZOOM LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {isImageZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageZoomed(false)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 cursor-zoom-out"
          >
            <button
              onClick={() => setIsImageZoomed(false)}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10 cursor-pointer"
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={study.image}
              alt={study.title}
              className="max-w-full max-h-[88vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}