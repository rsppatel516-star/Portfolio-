import React, { useEffect, useState, useMemo } from 'react';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { featuredArtifacts as fallbackArtifacts } from '../data/featuredArtifacts'; 
import { caseStudies } from '../data/caseStudies';
import {
  ArrowUpRight, Briefcase, Search, X, Sparkles, ExternalLink,
  Github, Layers, CheckCircle2, Eye, Filter, Zap, ArrowRight,
  ShieldCheck, Terminal, Target
} from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';

// Quick lookup for case studies
const caseStudyIds = new Set(caseStudies.map((cs) => cs.id));

export default function Artifacts() {
  const [projects, setProjects] = useState(() => fallbackArtifacts);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProject, setQuickViewProject] = useState(null);

  // Lock body scroll when quick view modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setQuickViewProject(null);
      }
    };

    if (quickViewProject) {
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
  }, [quickViewProject]);

  // Load projects from API while maintaining rich case study mappings
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          const apiMap = new Map(data.data.map((p) => [p.id, p]));
          const merged = fallbackArtifacts.map((fa) => {
            const match = apiMap.get(fa.id);
            return match ? { ...fa, ...match, id: fa.id } : fa;
          });
          setProjects(merged);
        } else {
          setProjects(fallbackArtifacts);
        }
      } catch (_error) {
        setProjects(fallbackArtifacts);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['All', 'Full-Stack', 'Web Apps', 'Mobile Apps', 'UI/UX Design'];

  // Filtered projects list based on search and category
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const cat = (p.category || '').toLowerCase();
      const target = activeCategory.toLowerCase();

      let matchesCategory = activeCategory === 'All';
      if (!matchesCategory) {
        if (target.includes('full-stack') || target.includes('fullstack')) {
          matchesCategory = cat.includes('full-stack') || cat.includes('fullstack');
        } else if (target.includes('web')) {
          matchesCategory = cat.includes('web') || cat.includes('react') || cat.includes('javascript') || cat.includes('html');
        } else if (target.includes('mobile')) {
          matchesCategory = cat.includes('mobile') || cat.includes('ios') || cat.includes('swift');
        } else if (target.includes('design')) {
          matchesCategory = cat.includes('design') || cat.includes('ui') || cat.includes('figma');
        } else {
          matchesCategory = cat === target;
        }
      }

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        p.title?.toLowerCase().includes(query) ||
        p.subtitle?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query) ||
        p.tags?.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg text-dark-textMain">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const artifactsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://patelrudra.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Artifacts",
            "item": "https://patelrudra.in/artifacts"
          }
        ]
      },
      {
        "@type": "CollectionPage",
        "name": "Featured Artifacts & Case Studies by Rudra Patel",
        "url": "https://patelrudra.in/artifacts",
        "description": "A curated digital vault of high-performance web products, full-stack applications, and technical case studies by Rudra Patel.",
        "author": {
          "@type": "Person",
          "name": "Rudra Patel",
          "url": "https://patelrudra.in"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-transparent text-dark-textMain pt-28 md:pt-36 pb-24 relative overflow-hidden">
      <SEO
        title="Featured Artifacts & Case Studies"
        description="A curated digital vault of high-performance web products, native SwiftUI iOS applications, and technical case studies by Rudra Patel."
        keywords="Rudra Patel projects, portfolio case studies, Frontend web apps, SwiftUI iOS apps, React projects, Web development portfolio"
        canonical="https://patelrudra.in/artifacts"
        schema={artifactsSchema}
      />

      {/* Main Background Cyber Grid Animation */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Animated Floating Ambient Aurora Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1.1, 1],
          x: [0, 60, -30, 0],
          y: [0, -40, 50, 0],
          opacity: [0.25, 0.45, 0.25]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-10%] w-[500px] md:w-[750px] h-[500px] md:h-[750px] bg-gradient-to-br from-purple-600/30 via-indigo-600/20 to-transparent rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.3, 1.1],
          x: [0, -50, 40, 0],
          y: [0, 60, -40, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[-10%] w-[450px] md:w-[700px] h-[450px] md:h-[700px] bg-gradient-to-tr from-cyan-500/20 via-violet-600/20 to-transparent rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{
          x: ['-100%', '200%']
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 via-indigo-400 to-transparent opacity-80 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── HEADER SECTION ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.1 }
            }
          }}
          className="mb-12 md:mb-16"
        >
          {/* Tagline Badge */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-code text-xs uppercase tracking-widest">
              <Briefcase size={14} className="text-purple-400" />
              <span>Digital Vault &amp; Technical Case Studies</span>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-white/40">
              • {projects.length} Total Curated Artifacts
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-12">
            <div className="overflow-hidden">
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight leading-[1.1] text-white"
              >
                Featured <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">
                  Artifacts
                </span>.
              </motion.h1>
            </div>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-base text-dark-textMuted max-w-md leading-relaxed font-bricolage"
            >
              Explore engineered digital products, production codebases, and deep-dive technical case studies built with modern web and mobile standards.
            </motion.p>
          </div>

          {/* ── FILTER TABS (With Exact Same Navbar Hover Capsule & Underline Effect) ── */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 md:mt-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-2 sm:p-2.5 rounded-2xl border border-white/10 bg-[#060814]/75 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          >
            {/* Category Pills Container */}
            <div
              onMouseLeave={() => setHoveredCategory(null)}
              className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto custom-scrollbar pb-1 md:pb-0 px-1"
            >
              {categories.map((cat) => {
                const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
                const isHovered = hoveredCategory === cat;
                const catCount =
                  cat === 'All'
                    ? projects.length
                    : projects.filter((p) => {
                        const c = (p.category || '').toLowerCase();
                        const t = cat.toLowerCase();
                        if (t.includes('full-stack')) return c.includes('full-stack') || c.includes('fullstack');
                        if (t.includes('web')) return c.includes('web') || c.includes('react');
                        if (t.includes('mobile')) return c.includes('mobile') || c.includes('ios');
                        if (t.includes('design')) return c.includes('design') || c.includes('ui');
                        return c === t;
                      }).length;

                return (
                  <MagneticButton key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      onMouseEnter={() => setHoveredCategory(cat)}
                      className="relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer z-10 flex items-center gap-2 select-none"
                    >
                      {/* Active or Hovered Glass Capsule - Exact Same Effect as Navbar */}
                      {(isHovered || (isActive && !hoveredCategory)) && (
                        <motion.div
                          layoutId="categoryActiveCapsule"
                          className="absolute inset-0 bg-white/[0.08] backdrop-blur-md border border-white/[0.14] rounded-full shadow-[0_4px_24px_rgba(99,102,241,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] z-0"
                          initial={false}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}

                      {/* Dynamic Glowing Underline - Exact Same Effect as Navbar */}
                      {(isHovered || (isActive && !hoveredCategory)) && (
                        <motion.div
                          layoutId="categoryActiveUnderline"
                          className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent z-0"
                          initial={false}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}

                      {/* Character Wave Animation on Hover */}
                      <span className={`relative z-10 flex font-display text-xs font-bold tracking-wide transition-colors ${
                        isActive ? 'text-white font-extrabold' : 'text-white/70 hover:text-white'
                      }`}>
                        {cat.split('').map((char, i) => (
                          <motion.span
                            key={i}
                            animate={{
                              y: isHovered ? [0, -3, 0] : 0,
                              color: (isHovered || isActive) ? '#fff' : ''
                            }}
                            transition={{ duration: 0.3, delay: i * 0.025, ease: "easeInOut" }}
                          >
                            {char === ' ' ? '\u00A0' : char}
                          </motion.span>
                        ))}
                      </span>

                      {/* Counter Badge */}
                      <span
                        className={`relative z-10 px-2 py-0.5 rounded-full text-[10px] font-mono transition-colors ${
                          isActive
                            ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-400/40'
                            : 'bg-white/[0.05] text-white/40 border border-white/[0.08]'
                        }`}
                      >
                        {catCount}
                      </span>
                    </button>
                  </MagneticButton>
                );
              })}
            </div>

            {/* Search Input Box */}
            <div className="relative min-w-[240px] sm:min-w-[280px]">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search artifacts, tech, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2 sm:py-2.5 bg-white/[0.04] border border-white/10 rounded-full text-xs text-white placeholder-white/40 focus:outline-none focus:border-indigo-400/60 focus:bg-white/[0.07] transition-all font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* ── ARTIFACT LIST GRID ── */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 px-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md space-y-4"
          >
            <Filter size={32} className="mx-auto text-indigo-400 opacity-60" />
            <h3 className="text-xl font-bold font-display text-white">No Artifacts Found</h3>
            <p className="text-dark-textMuted text-sm max-w-sm mx-auto font-bricolage">
              No results matching "{searchQuery}" under the "{activeCategory}" category.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] cursor-pointer"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <div className="space-y-20 md:space-y-32">
            {filteredProjects.map((project, idx) => {
              const hasCaseStudy = caseStudyIds.has(project.id);
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={project.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.12, delayChildren: 0.05 }
                    }
                  }}
                  className={`flex flex-col ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-8 md:gap-14 lg:gap-20 items-center`}
                >
                  {/* Image Card Side */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: isEven ? -35 : 35, scale: 0.96 },
                      visible: { opacity: 1, x: 0, scale: 1 }
                    }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full lg:w-[54%] relative group"
                  >
                    <div className="relative aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden backdrop-blur-xl bg-white/[0.03] border border-white/10 group-hover:border-indigo-500/40 shadow-[0_12px_40px_rgba(0,0,0,0.5)] group-hover:shadow-[0_20px_60px_rgba(99,102,241,0.25)] transition-all duration-500">
                      <motion.img
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        src={project.image}
                        alt={`${project.title} - ${project.category} artifact by Rudra Patel`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/85 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                    </div>

                    {/* Category & Status Badges */}
                    <div className="absolute top-3.5 left-3.5 sm:top-5 sm:left-5 flex flex-wrap items-center gap-2 z-20">
                      <div className="px-3.5 py-1.5 bg-[#040510]/85 backdrop-blur-md border border-white/15 rounded-xl shadow-xl">
                        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-white font-mono flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                          {project.category}
                        </span>
                      </div>
                      {project.status && (
                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/15 backdrop-blur-md border border-emerald-500/30 rounded-xl text-emerald-400 text-[10px] font-mono font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                          {project.status}
                        </div>
                      )}
                    </div>

                    {/* Quick View Button on Image */}
                    <button
                      onClick={() => setQuickViewProject(project)}
                      className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 px-4 py-2 sm:px-5 sm:py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full text-white text-xs font-bold tracking-wider uppercase flex items-center gap-2 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-20 cursor-pointer shadow-lg"
                    >
                      <Eye size={15} />
                      <span>Quick View</span>
                    </button>
                  </motion.div>

                  {/* Content Side */}
                  <div className="w-full lg:w-[46%] space-y-5">
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      className="space-y-2.5"
                    >
                      <span className="font-code text-indigo-400 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase opacity-90 flex items-center gap-2">
                        <Sparkles size={14} className="text-cyan-400" />
                        /{String(idx + 1).padStart(2, '0')} ARTIFACT
                      </span>

                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-white leading-tight">
                        {project.title}
                      </h2>

                      {project.subtitle && (
                        <p className="text-xs sm:text-sm font-medium text-indigo-300 font-mono">
                          {project.subtitle}
                        </p>
                      )}
                    </motion.div>

                    {/* Description */}
                    {project.description && (
                      <motion.p
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        className="text-dark-textMuted text-xs sm:text-sm md:text-base leading-relaxed line-clamp-3 font-bricolage"
                      >
                        {project.description}
                      </motion.p>
                    )}

                    {/* Tech Tags Pills */}
                    {project.tags && project.tags.length > 0 && (
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        className="flex flex-wrap gap-1.5 sm:gap-2 pt-1"
                      >
                        {project.tags.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-lg border border-white/10 bg-white/[0.03] text-dark-textMuted text-[11px] font-mono hover:border-indigo-400/40 hover:text-white transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 5 && (
                          <span className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/[0.02] text-indigo-300 text-[10px] font-mono">
                            +{project.tags.length - 5}
                          </span>
                        )}
                      </motion.div>
                    )}

                    {/* Actions Row */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4"
                    >
                      {hasCaseStudy ? (
                        <Link to={`/artifacts/${project.id}`} className="inline-block">
                          <MagneticButton>
                            <button className="flex items-center gap-2.5 px-6 sm:px-8 py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white font-black rounded-full hover:shadow-[0_0_30px_rgba(99,102,241,0.55)] transition-all duration-300 group uppercase text-xs tracking-[0.16em] shadow-lg cursor-pointer">
                              <span>Open Case Study</span>
                              <ArrowUpRight
                                size={17}
                                className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform stroke-[2.5px]"
                              />
                            </button>
                          </MagneticButton>
                        </Link>
                      ) : null}

                      <button
                        onClick={() => setQuickViewProject(project)}
                        className="flex items-center gap-2 px-5 py-3.5 border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] text-white font-bold rounded-full transition-all uppercase text-xs tracking-[0.14em] cursor-pointer"
                      >
                        <Eye size={15} />
                        <span>Specs &amp; View</span>
                      </button>

                      {project.liveUrl && project.liveUrl !== '#' && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3.5 border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] text-white rounded-full transition-all hover:scale-105 cursor-pointer"
                          title="Open Live Preview"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3.5 border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] text-white rounded-full transition-all hover:scale-105 cursor-pointer"
                          title="View Source on GitHub"
                        >
                          <Github size={16} />
                        </a>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ── BOTTOM CALLOUT BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 sm:mt-32 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent border border-white/10 backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="space-y-2 text-center md:text-left relative z-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400">
              Architectural Consulting &amp; Development
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
              Have a technical project or complex product in mind?
            </h3>
            <p className="text-sm text-dark-textMuted max-w-xl font-bricolage">
              Let's engineer a high-speed, SEO-dominant web platform or a native SwiftUI mobile application tailored for your brand.
            </p>
          </div>

          <MagneticButton>
            <Link to="/contact" className="relative z-10 shrink-0">
              <button className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-display font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(99,102,241,0.5)] cursor-pointer">
                <span>Start a Project</span>
                <ArrowRight size={16} />
              </button>
            </Link>
          </MagneticButton>
        </motion.div>

      </div>

      {/* ── QUICK VIEW INTERACTIVE DRAWER MODAL ── */}
      <AnimatePresence>
        {quickViewProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl cursor-zoom-out"
            onClick={() => setQuickViewProject(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-[#0a0b14] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_40px_100px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto custom-scrollbar cursor-default"
            >
              {/* Dynamic top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400">
                    {quickViewProject.category} • {quickViewProject.status || 'Active'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-white mt-1">
                    {quickViewProject.title}
                  </h3>
                  {quickViewProject.subtitle && (
                    <p className="text-xs text-indigo-300 font-mono mt-0.5">{quickViewProject.subtitle}</p>
                  )}
                </div>

                <button
                  onClick={() => setQuickViewProject(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Preview image */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 mb-6">
                <img
                  src={quickViewProject.image}
                  alt={quickViewProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <p className="text-sm text-dark-textMuted font-bricolage leading-relaxed mb-6">
                {quickViewProject.description}
              </p>

              {/* Key Features */}
              {quickViewProject.keyFeatures && (
                <div className="mb-6 space-y-2.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/50 block">
                    Core Specifications
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {quickViewProject.keyFeatures.map((kf, i) => (
                      <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-white/80 font-bricolage">
                        <CheckCircle2 size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                        <span>{kf}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech stack */}
              {quickViewProject.tags && (
                <div className="mb-8">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/50 block mb-2">
                    Technology Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickViewProject.tags.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-indigo-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-white/10">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {quickViewProject.liveUrl && quickViewProject.liveUrl !== '#' && (
                    <a
                      href={quickViewProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      <ExternalLink size={14} />
                      <span>Live App</span>
                    </a>
                  )}
                  {quickViewProject.githubUrl && (
                    <a
                      href={quickViewProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      <Github size={14} />
                      <span>Source</span>
                    </a>
                  )}
                </div>

                {caseStudyIds.has(quickViewProject.id) && (
                  <Link
                    to={`/artifacts/${quickViewProject.id}`}
                    onClick={() => setQuickViewProject(null)}
                    className="w-full sm:w-auto"
                  >
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_24px_rgba(99,102,241,0.5)] cursor-pointer">
                      <span>Full Case Study</span>
                      <ArrowRight size={14} />
                    </button>
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
