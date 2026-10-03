import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experience, certifications } from '../data/experience';
import {
  Briefcase, GraduationCap, Trophy,
  Award, Calendar, ArrowUpRight, ShieldCheck, Building2, X, Star
} from 'lucide-react';
import { FaAws, FaReact, FaNodeJs, FaDatabase, FaShieldAlt, FaGithub } from 'react-icons/fa';

const iconMap = {
  aws: <img src="/certificate img/aws-academy-graduate-cloud-foundations-training-logo.png" alt="AWS Academy" className="w-7 h-7 object-contain" />,
  react: <FaReact className="text-[#61DAFB]" />,
  node: <FaNodeJs className="text-[#339933]" />,
  database: <FaDatabase className="text-[#47A248]" />,
  shield: <FaShieldAlt className="text-[#818CF8]" />,
  github: <FaGithub className="text-dark-textMain" />
};

const certColors = {
  aws: '#FF9900',
  react: '#61DAFB',
  node: '#339933',
  database: '#47A248',
  shield: '#818CF8',
  github: '#ffffff'
};

export default function Experience() {
  const [selectedItem, setSelectedItem] = useState(null);

  React.useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  return (
    <section id="experience" className="py-32 relative overflow-hidden text-dark-textMain min-h-screen">

      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-4 bg-purple-500/10 border border-purple-500/20"
            >
              <Award size={16} className="text-purple-400" />
              <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-purple-300">
                CAREER & GROWTH
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-display font-black tracking-tight text-dark-textMain leading-[1.15]">
              Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">Success</span> One Milestone at a Time
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left Column: Timeline Section (Professional Path) */}
          <div className="lg:col-span-6 space-y-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 backdrop-blur-md rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                <Briefcase size={22} />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-dark-textMain tracking-tight">Professional Path</h3>
                <p className="text-xs font-code text-dark-textMuted uppercase tracking-wider mt-1">Experience & Education Timeline</p>
              </div>
            </div>

            <div className="space-y-6 pt-2">
              {experience.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedItem({ type: 'exp', data: item })}
                >
                  <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-indigo-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_40px_-10px_rgba(99,102,241,0.25)] transition-all duration-500 group-hover:-translate-y-1 relative overflow-hidden">
                    {/* Hover Glow Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10 flex flex-col gap-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-code text-[10px] font-bold uppercase tracking-wider">
                          <Calendar size={12} />
                          {item.duration}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <ArrowUpRight size={14} className="text-dark-textMuted group-hover:text-indigo-400 transition-colors" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-xl font-bold font-display text-dark-textMain group-hover:text-indigo-300 transition-colors duration-300">
                          {item.role}
                        </h4>
                        <p className="text-sm font-semibold text-dark-textMuted group-hover:text-dark-textMain transition-colors flex items-center gap-2">
                          {item.type === 'education' ? <GraduationCap size={14} className="text-purple-400" /> : <Building2 size={14} className="text-indigo-400" />}
                          {item.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Achievements & Badges Grid */}
          <div className="lg:col-span-6 space-y-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 backdrop-blur-md rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                <Trophy size={22} />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-dark-textMain tracking-tight">Badges & Achievements</h3>
                <p className="text-xs font-code text-dark-textMuted uppercase tracking-wider mt-1">Verified Certifications & Credentials</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {certifications.map((cert, idx) => {
                const hexColor = certColors[cert.icon] || '#6366f1';
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.5 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    onClick={() => setSelectedItem({ type: 'cert', data: cert })}
                    className="group relative backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.2] shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl p-6 flex flex-col justify-between overflow-hidden transition-all duration-500 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-6 z-10">
                      <div className="w-12 h-12 rounded-xl bg-dark-textMain/5 border border-dark-textMain/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500 shadow-md">
                        {iconMap[cert.icon] || <Trophy className="text-indigo-400" size={22} />}
                      </div>
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/[0.05] group-hover:bg-indigo-500/20 transition-colors">
                        <ArrowUpRight size={12} className="text-dark-textMuted group-hover:text-indigo-400 transition-colors" />
                      </div>
                    </div>

                    <div className="z-10 flex flex-col flex-1">
                      <h4 className="text-base font-bold font-display text-dark-textMain mb-1.5 group-hover:text-white transition-colors leading-snug">
                        {cert.title}
                      </h4>
                      <p className="text-xs font-code text-dark-textMuted mb-4">
                        {cert.issuer}
                      </p>

                      <div className="mt-auto pt-4 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-code font-bold">
                        <span className="uppercase tracking-widest text-indigo-300">{cert.date}</span>
                        <div className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                          <ShieldCheck size={10} />
                          <span>Verified</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Ambient Glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle 150px at 50% 50%, ${hexColor}15, transparent)`
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* --- Detailed Modal Overlay --- */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-[#03040b]/80 backdrop-blur-2xl cursor-zoom-out overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl liquid-glass rounded-3xl p-6 sm:p-10 cursor-default overflow-hidden my-auto"
            >
              {/* Internal Liquid Aurora Fluid Mesh */}
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-600/25 rounded-full blur-[90px] pointer-events-none animate-pulse" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-600/25 rounded-full blur-[90px] pointer-events-none animate-float" />

              {/* Dynamic top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-90 animate-shimmer" />

              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-dark-textMain/70 hover:text-white hover:bg-white/[0.1] transition-all"
              >
                <X size={20} />
              </button>

              {selectedItem.type === 'exp' && (
                <div className="flex flex-col gap-6 pt-2">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      {selectedItem.data.type === 'education' ? <GraduationCap size={26} /> : <Briefcase size={26} />}
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                        {selectedItem.data.role}
                      </h3>
                      <p className="text-lg font-semibold text-indigo-300 mt-1">
                        {selectedItem.data.company}
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] font-code text-xs font-bold text-dark-textMuted uppercase tracking-wider">
                    <Calendar size={14} className="text-purple-400" />
                    {selectedItem.data.duration}
                  </div>

                  <div className="w-full h-px bg-white/[0.1] my-2" />

                  <div className="space-y-4">
                    <h4 className="text-sm font-code font-bold uppercase tracking-widest text-dark-textMain/50">Key Contributions</h4>
                    <ul className="space-y-4">
                      {selectedItem.data.points.map((point, i) => (
                        <li key={i} className="flex gap-4 text-sm sm:text-base text-dark-textMain/80 leading-relaxed font-bricolage">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {selectedItem.type === 'cert' && (
                <div className="flex flex-col gap-6 pt-2 items-center text-center">

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-tight">
                      {selectedItem.data.title}
                    </h3>
                    <p className="text-lg font-semibold text-indigo-300">
                      Issued by {selectedItem.data.issuer}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] font-code text-xs font-bold text-dark-textMuted uppercase tracking-wider">
                      <Calendar size={14} className="text-purple-400" />
                      Earned: {selectedItem.data.date}
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 font-code text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      <Star size={14} />
                      Verified Credential
                    </div>
                  </div>

                  <div className="w-full h-px bg-white/[0.1] my-4" />

                  <p className="text-sm sm:text-base text-dark-textMain/70 font-bricolage leading-relaxed max-w-lg mx-auto">
                    This certification validates professional competency and technical knowledge in {selectedItem.data.title.toLowerCase()}, highlighting a commitment to continuous learning and industry standards.
                  </p>

                  {/* Glowing background behind modal content */}
                  <div
                    className="absolute inset-0 opacity-10 pointer-events-none -z-10"
                    style={{
                      background: `radial-gradient(circle 250px at 50% 30%, ${certColors[selectedItem.data.icon] || '#6366f1'}, transparent)`
                    }}
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
