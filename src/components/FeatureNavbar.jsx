import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ArrowLeft, Globe, Sparkles } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

const featureLinks = [
  { name: 'Home', to: '/' },
  { name: 'Artifacts', to: '/artifacts' },
  { name: 'Credentials', to: '/achievements' },
  { name: 'Contact', to: '/contact' }
];

/* Custom Animated Hamburger Button - Modern Asymmetrical Design matching main Navbar */
const MenuButton = ({ isOpen, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover="hover"
      whileTap="tap"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={{
        tap: { scale: 0.9 }
      }}
      className="lg:hidden relative z-[120] w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-500 overflow-hidden group cursor-pointer"
      aria-label="Toggle menu"
    >
      {/* Liquid Inner Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />

      <div className="relative w-5 h-3.5 flex flex-col justify-between items-center">
        <motion.span
          variants={{
            closed: { rotate: 0, y: 0, width: "60%", alignSelf: "flex-end" },
            hover: { width: "100%", alignSelf: "center" },
            open: { rotate: 45, y: 6, width: "100%", alignSelf: "center" }
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-[2px] bg-white rounded-full"
          style={{ originX: 0.5, originY: 0.5 }}
        />
        <motion.span
          variants={{
            closed: { opacity: 1, scale: 1 },
            hover: { scale: 1.05 },
            open: { opacity: 0, scale: 0.5 }
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full h-[2px] bg-white rounded-full"
        />
        <motion.span
          variants={{
            closed: { rotate: 0, y: 0, width: "80%", alignSelf: "flex-start" },
            hover: { width: "100%", alignSelf: "center" },
            open: { rotate: -45, y: -6, width: "100%", alignSelf: "center" }
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-[2px] bg-white rounded-full"
          style={{ originX: 0.5, originY: 0.5 }}
        />
      </div>
    </motion.button>
  );
};

/* Premium Desktop Nav Item with Magnetic, Glass Capsule, Underline, and Staggered Text */
const DesktopNavItem = ({ link, hoveredNav, setHoveredNav }) => {
  const location = useLocation();
  const isActive = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
  const isHovered = hoveredNav === link.name;

  return (
    <RouterLink to={link.to} className="block group">
      <MagneticButton>
        <div
          className="relative px-5 py-2.5 rounded-full cursor-pointer z-10 flex items-center justify-center"
          onMouseEnter={() => setHoveredNav(link.name)}
        >
          {/* Active or Hovered Glass Capsule */}
          {(isHovered || (isActive && !hoveredNav)) && (
            <motion.div
              layoutId="featureNavHoverCapsule"
              className="absolute inset-0 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.2)] z-0"
              initial={false}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}

          {/* Dynamic Underline */}
          {(isHovered || (isActive && !hoveredNav)) && (
            <motion.div
              layoutId="featureNavHoverUnderline"
              className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent z-0"
              initial={false}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}

          <span className={`relative z-10 flex font-display text-sm font-bold tracking-wide transition-colors ${
            isActive ? 'text-white font-extrabold' : 'text-white/70 group-hover:text-white'
          }`}>
            {link.name.split('').map((char, i) => (
              <motion.span
                key={i}
                animate={{ y: isHovered ? [0, -3, 0] : 0, color: (isHovered || isActive) ? '#fff' : '' }}
                transition={{ duration: 0.3, delay: i * 0.03, ease: "easeInOut" }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        </div>
      </MagneticButton>
    </RouterLink>
  );
};

export default function FeatureNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed z-[110] left-0 right-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex justify-center px-4 md:px-8 ${
          isScrolled ? 'top-3 md:top-4' : 'top-4 lg:top-5'
        }`}
      >
        <div
          onMouseLeave={() => setHoveredNav(null)}
          className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between gap-4 w-full relative overflow-hidden ${
            isScrolled
              ? 'max-w-6xl py-2.5 px-4 md:px-6 bg-[#040510]/75 backdrop-blur-[36px] border border-white/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.2)]'
              : 'max-w-7xl py-2.5 px-5 lg:px-6 bg-[#040510]/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg'
          }`}
        >
          {/* Liquid Ambient Glowing Orbs */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none -z-10">
            <motion.div
              animate={{
                x: ['-30%', '90%', '-30%'],
                y: ['-40%', '40%', '-40%'],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-10 left-0 w-44 h-44 bg-gradient-to-r from-purple-600/30 via-indigo-500/20 to-pink-500/30 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
              animate={{
                x: ['90%', '-30%', '90%'],
                y: ['40%', '-40%', '40%'],
                scale: [1.2, 0.9, 1.2],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-10 right-0 w-48 h-48 bg-gradient-to-r from-cyan-500/20 via-blue-600/30 to-violet-600/25 rounded-full blur-3xl pointer-events-none"
            />
          </div>

          {/* Logo Branding */}
          <RouterLink
            to="/"
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); close(); }}
            className="flex items-center gap-3 shrink-0 z-10 relative group"
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center gap-3"
            >
              {/* Avatar Icon Box with Glowing Ring */}
              <div className="relative shrink-0">
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl p-1 flex items-center justify-center transition-all duration-300 overflow-hidden bg-white/[0.04] border border-white/10 group-hover:border-indigo-400/40">
                  <img
                    src="/images/navbar-avatar.webp"
                    alt="Rudra Patel"
                    className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#040510] shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              </div>

              {/* Brand Text */}
              <div className="flex flex-col">
                <span className="font-bricolage font-black text-lg md:text-xl text-white tracking-tight leading-none group-hover:text-indigo-300 transition-colors duration-300">
                  Rudra<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 font-extrabold ml-0.5">.</span>
                </span>
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest mt-0.5">
                  Portfolio Vault
                </span>
              </div>
            </motion.div>
          </RouterLink>

          {/* Desktop Links / Total Blur & Liquid Pill Capsule Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full relative z-10 bg-white/[0.02] border border-white/[0.06]">
            {featureLinks.map((link) => (
              <DesktopNavItem
                key={link.name}
                link={link}
                hoveredNav={hoveredNav}
                setHoveredNav={setHoveredNav}
              />
            ))}
          </nav>

          {/* Right Area: Availability + Contact CTA + Mobile Menu Button */}
          <div className="flex items-center gap-3 z-10">
            {/* Live Availability Badge on Desktop */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Work</span>
            </div>

            {/* Desktop Contact CTA */}
            <div className="hidden sm:block">
              <MagneticButton>
                <RouterLink to="/contact">
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-bold text-white text-xs tracking-widest uppercase transition-all backdrop-blur-md border border-white/20 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:shadow-[0_0_30px_rgba(99,102,241,0.55)] cursor-pointer">
                    <span>Contact</span>
                    <ArrowRight size={13} />
                  </button>
                </RouterLink>
              </MagneticButton>
            </div>

            {/* Mobile Hamburger Button */}
            <MenuButton isOpen={isMobileMenuOpen} onClick={() => setMenuOpen((v) => !v)} />
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={close}
              className="fixed inset-0 z-[112] lg:hidden"
              style={{
                background: 'rgba(2, 2, 10, 0.82)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                pointerEvents: 'all',
                touchAction: 'none',
              }}
            />

            {/* Modal Liquid Panel */}
            <div className="fixed inset-0 z-[115] flex items-center justify-center p-4 lg:hidden pointer-events-none">
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="w-full max-w-md bg-[#050612]/85 backdrop-blur-[36px] border border-white/15 rounded-[2rem] overflow-hidden flex flex-col shadow-[0_32px_80px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.2)] relative pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Liquid Ambient Orbs inside Mobile Drawer */}
                <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none -z-10">
                  <motion.div
                    animate={{
                      x: ['-40%', '80%', '-40%'],
                      y: ['-40%', '60%', '-40%'],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute -top-10 -left-10 w-56 h-56 bg-gradient-to-r from-purple-600/35 via-indigo-500/25 to-pink-500/30 rounded-full blur-3xl pointer-events-none"
                  />
                  <motion.div
                    animate={{
                      x: ['80%', '-40%', '80%'],
                      y: ['60%', '-40%', '60%'],
                      scale: [1.3, 0.9, 1.3],
                    }}
                    transition={{
                      duration: 14,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute -bottom-10 -right-10 w-60 h-60 bg-gradient-to-r from-cyan-500/25 via-blue-600/30 to-violet-600/35 rounded-full blur-3xl pointer-events-none"
                  />
                </div>

                {/* Header */}
                <div className="px-7 pt-7 pb-4 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-b from-white/15 to-white/5 border border-white/20 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
                      <img
                        src="/images/navbar-avatar.webp"
                        alt="Avatar"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bricolage font-black text-white text-base tracking-wider uppercase">Navigation</span>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Available for Work
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={close}
                    className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all hover:bg-white/20 cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Links */}
                <nav className="px-6 py-4 flex flex-col gap-2 relative z-10">
                  {featureLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.04 }}
                    >
                      <RouterLink
                        to={link.to}
                        onClick={close}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-display font-bold text-white/80 hover:text-white hover:bg-white/[0.08] transition-all text-base cursor-pointer"
                      >
                        <span>{link.name}</span>
                        <ArrowRight size={15} className="opacity-40" />
                      </RouterLink>
                    </motion.div>
                  ))}
                </nav>

                {/* Footer Liquid CTA */}
                <div className="p-6 relative z-10 bg-white/[0.02] border-t border-white/10 flex flex-col gap-3">
                  <RouterLink to="/contact" onClick={close}>
                    <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-bold text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(99,102,241,0.4)] border border-white/20 flex items-center justify-center gap-2 cursor-pointer">
                      <span>Get In Touch</span>
                      <ArrowRight size={16} />
                    </button>
                  </RouterLink>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
