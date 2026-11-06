import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { Github, Linkedin, Instagram, Youtube, Facebook, ArrowRight, Sparkles } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import WelcomeToast from './ui/WelcomeToast';

// Animated styles injected once
const shimmerStyle = `
  @keyframes gradientShimmer {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes sweep {
    0% { left: -100%; }
    100% { left: 125%; }
  }
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes spinCounterSlow {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  @keyframes gridPulse {
    0%, 100% { opacity: 0.12; }
    50% { opacity: 0.28; }
  }
  .hero-gradient-text {
    background: linear-gradient(135deg, #a855f7, #ec4899, #6366f1, #8b5cf6, #2300ff);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShimmer 5s ease infinite;
  }
  .hero-title-name {
    background: linear-gradient(135deg, #818cf8, #c084fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .animate-spin-slow {
    animation: spinSlow 28s linear infinite;
  }
  .animate-spin-counter-slow {
    animation: spinCounterSlow 38s linear infinite;
  }
  .hero-grid-bg {
    background-size: 40px 40px;
    background-image: 
      linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
    animation: gridPulse 8s ease-in-out infinite alternate;
  }
`;

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100082469136911', color: '#1877f2' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/rudraa_ptll/', color: '#B72B5F' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/Rudraptl16', color: '#6366f1' },
  { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@rudrapatel4172', color: '#ff0000' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/rudrapatel816/', color: '#0077b5' },
];

export default function Hero() {
  const [decorativeElements, setDecorativeElements] = useState([]);

  useEffect(() => {
    // Scatter decorative floaters
    setTimeout(() => {
      setDecorativeElements([...Array(10)].map(() => ({
        x: Math.random() * 100 + "%",
        y: Math.random() * 100 + "%",
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 5
      })));
    }, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const blobVariants = {
    animate: {
      scale: [1, 1.18, 1],
      opacity: [0.12, 0.22, 0.12],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center overflow-hidden py-20 lg:py-24"
    >
      <style>{shimmerStyle}</style>

      {/* Glowing ambient aurora highlights */}
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-purple-600/15 dark:bg-purple-600/20 bg-indigo-500/10 blur-[160px] pointer-events-none z-0"
      />
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/15 dark:bg-indigo-600/20 bg-purple-500/10 blur-[150px] pointer-events-none z-0"
      />

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {decorativeElements.map((el, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-purple-400/30 rounded-full"
            initial={{
              x: el.x,
              y: el.y,
              opacity: 0
            }}
            animate={{
              y: [null, "-25%"],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              ease: "linear",
              delay: el.delay
            }}
          />
        ))}
      </div>

      {/* Screen-reader optimized SEO support */}
      <p className="sr-only">
        Welcome to the official portfolio of Rudra Patel, an expert Frontend & Native iOS Developer based in Vadodara, Gujarat, India. Specializing in high-performance Swift, SwiftUI iOS apps, React web solutions, Next.js applications, and Tailwind CSS user interfaces.
      </p>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-20 lg:pt-12">

        {/* ── LEFT COLUMN: Bio, Social, SEO Content & CTA (7 Cols) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 space-y-6 order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          {/* Social Icons Row */}
          <motion.div
            variants={containerVariants}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1"
          >
            {socialLinks.map(({ name, icon: Icon, href, color }, i) => (
              <motion.div key={i} variants={itemVariants}>
                <MagneticButton>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow on ${name}`}
                    className="group relative block"
                  >
                    <motion.div
                      whileHover={{ y: -4, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-dark-textMain/5 border border-dark-textMain/10 flex items-center justify-center transition-all duration-300 overflow-hidden shadow-lg hover:border-dark-textMain/20"
                    >
                      <Icon
                        className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110"
                        style={{ color }}
                        strokeWidth={2}
                      />
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle 45px at center, ${color}33, transparent)`,
                        }}
                      />
                      <div
                        className="absolute bottom-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
                        style={{ backgroundColor: color }}
                      />
                    </motion.div>
                  </a>
                </MagneticButton>
              </motion.div>
            ))}
          </motion.div>

          {/* H1 Headline */}
          <motion.div variants={itemVariants} className="space-y-1 pt-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-dark-textMain leading-[1.1]">
              Hi, I'm{' '}
              <span className="hero-title-name inline-block hover:scale-[1.02] transition-transform duration-300">
                Rudra Patel
              </span>
            </h1>
          </motion.div>

          {/* Subtitle Role Showcase */}
          <motion.div variants={itemVariants} className="min-h-[36px] flex items-center justify-center lg:justify-start">
            <TypeAnimation
              sequence={[
                'Frontend Developer', 2800,
                'iOS Developer', 2800,
                'SwiftUI Developer', 2800,
                'React & Next.js Developer', 2800,
                'UI/UX-Focused Developer', 2800,
                'Problem Solver & Avid Learner', 2800
              ]}
              wrapper="p"
              speed={50}
              repeat={Infinity}
              className="text-xl sm:text-2xl font-bold font-display tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:to-purple-400"
            />
          </motion.div>

          {/* SEO-Rich Text Bio */}
          <motion.p
            variants={itemVariants}
            className="font-display text-dark-textMain/75 text-base sm:text-lg max-w-xl leading-relaxed tracking-normal"
          >
            I'm a <strong className="text-dark-textMain font-semibold">Frontend & Native iOS Developer</strong> based in <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Vadodara, Gujarat</span>. I engineer high-performance mobile apps with <span className="text-purple-400 dark:text-purple-500 font-semibold">SwiftUI</span> and responsive web platforms using <span className="text-indigo-500 dark:text-indigo-500 font-semibold">React & Next.js</span> — focused on speed optimization and clean architecture.
          </motion.p>

          {/* Action CTAs */}
          <motion.div variants={itemVariants} className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <MagneticButton>
              <ScrollLink to="contact" smooth duration={1000} className="cursor-pointer block">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative group font-display flex items-center gap-3 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl font-bold text-white text-xs sm:text-sm tracking-[0.12em] uppercase transition-all duration-500 overflow-hidden cursor-pointer"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500  group-hover:opacity-95 transition-opacity duration-500" />
                  <span className="absolute inset-[1px] bg-dark-bg/30 backdrop-blur-md rounded-[11px] z-0 transition-all duration-500 group-hover:bg-dark-bg/40" />
                  <span className="absolute top-0 -left-[100%] h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:animate-[sweep_1.5s_ease-in-out_infinite]" />
                  <span className="relative z-10 flex items-center gap-2.5 text-white">
                    Connect With Me
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight size={17} className="text-indigo-200 group-hover:text-white" />
                    </motion.div>
                  </span>
                </motion.button>
              </ScrollLink>
            </MagneticButton>

          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN: Portrait Photo (5 Cols) ── */}
        <motion.div
          initial={{ opacity: 0.9, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 relative z-10"
        >
          {/* Ambient Rotating Vector Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 scale-75 md:scale-95 lg:scale-100 overflow-hidden">
            <div className="absolute w-[440px] h-[440px] max-w-full max-h-full rounded-full border border-dashed border-violet-500/15 animate-spin-slow" />
            <div className="absolute w-[380px] h-[380px] max-w-full max-h-full rounded-full border border-double border-indigo-500/20 animate-spin-counter-slow" />
          </div>


          {/* Image Frame */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.01 }}
            className="relative cursor-pointer group z-10 max-w-full"
          >
            {/* Ambient Backglow */}
            <motion.div
              className="absolute inset-0 rounded-2xl blur-3xl scale-105 bg-gradient-to-tr from-violet-600/30 to-indigo-500/30 opacity-75 group-hover:opacity-100 transition-opacity duration-700"
              animate={{
                scale: [1, 1.06, 1]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Photo Card */}
            <div className="relative w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] max-w-[calc(100vw-3rem)] aspect-[3/4] rounded-2xl overflow-hidden border border-dark-textMain/15 bg-dark-bg/40 backdrop-blur-md shadow-2xl">
              <img
                src="/images/DSC06139.webp"
                alt="Rudra Patel - Frontend & iOS Developer portrait"
                fetchPriority="high"
                decoding="async"
                width="400"
                height="533"
                className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Glass Gradient Shimmer Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* Welcome Toast Notification */}
      <WelcomeToast />
    </section>
  );
}


