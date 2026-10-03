import React, { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  Mail, MapPin, Github, Linkedin,
  Send, MessageSquare, Globe,
  User, Copy, Check, Clock, Sparkles,
  Smartphone, Layout, Briefcase, Coffee, ArrowUpRight, Phone
} from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

// Framer Motion staggered orchestration variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 16
    }
  }
};

export default function Contact({ isPage = false }) {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const HeadingTag = isPage ? motion.h1 : motion.h2;

  // Copy Email to Clipboard
  const handleCopyEmail = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText('patelrudra99098@gmail.com');
    setCopiedEmail(true);
    toast.success('Email copied to clipboard!');
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  // Copy Phone to Clipboard
  const handleCopyPhone = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText('+916354825621');
    setCopiedPhone(true);
    toast.success('Phone number copied to clipboard!');
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    const loadingToast = toast.loading('Establishing secure transmission...');

    try {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());
      const payload = {
        user_name: data.user_name || data.name || '',
        user_email: data.user_email || data.email || '',
        subject: data.subject || '',
        message: data.message || '',
        project_type: data.project_type || 'General Inquiry'
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success !== false) {
        toast.dismiss(loadingToast);
        toast.success(result.message || 'Transmission successful. Message stored in Database!');
        formRef.current.reset();
      } else {
        toast.dismiss(loadingToast);
        toast.error(result.message || 'Transmission failed. Please try again.');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Network failure. Transmission aborted.');
      console.error('API call failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
      <Toaster
        toastOptions={{
          style: {
            background: '#070814',
            color: '#f8fafc',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(16px)',
          },
        }}
      />

      {/* Dynamic Ambient Liquid Glow Backgrounds */}
      <div className="absolute top-1/4 -left-48 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-14 lg:gap-20">

          {/* Left Column: Briefing & Real-Time Status */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-5/12 flex flex-col justify-between"
          >
            <div>
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-purple-400 mb-6 "
              >
                <MessageSquare className="w-4 h-4 text-purple-400" />
                <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-purple-300">
                  GET IN TOUCH
                </span>
              </motion.div>

              <HeadingTag
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-black font-display leading-[0.95] sm:leading-[0.9] mb-5 sm:mb-6 tracking-tighter text-dark-textMain"
              >
                Let ’s Build <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">
                  Something Epic.
                </span>
              </HeadingTag>

              {/* Interactive Contact Cards */}
              <div className="space-y-3.5 sm:space-y-4 mb-8 sm:mb-10">
                {/* Email Card with Direct mailto: and Copy */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center justify-between p-4 sm:p-5 backdrop-blur-xl bg-gradient-to-br from-white/[0.08] to-transparent border border-dark-textMain/10 border-t-dark-textMain/20 border-l-dark-textMain/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-2xl hover:border-[var(--accent-primary)]/40 hover:bg-dark-textMain/[0.12] transition-all duration-300 group"
                >
                  <a
                    href="mailto:patelrudra99098@gmail.com"
                    className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1"
                  >
                    <div className="p-3 sm:p-3.5 bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 rounded-xl text-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)]/30 group-hover:text-dark-textMain transition-all shrink-0">
                      <Mail size={18} className="sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-dark-textMain/40 mb-0.5">Direct Email</p>
                      <span className="text-xs sm:text-sm md:text-base font-bold text-dark-textMain transition-colors font-bricolage group-hover:text-[var(--accent-primary)] truncate block">
                        patelrudra99098@gmail.com
                      </span>
                    </div>
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 sm:p-2.5 rounded-xl bg-dark-textMain/5 border border-dark-textMain/10 hover:bg-dark-textMain/15 text-dark-textMain/60 hover:text-dark-textMain transition-all shrink-0 ml-2 cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                </motion.div>

                {/* Phone Card with Direct Dial tel: and Copy */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center justify-between p-4 sm:p-5 backdrop-blur-xl bg-gradient-to-br from-white/[0.08] to-transparent border border-dark-textMain/10 border-t-dark-textMain/20 border-l-dark-textMain/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-2xl hover:border-[var(--accent-primary)]/40 hover:bg-dark-textMain/[0.12] transition-all duration-300 group"
                >
                  <a
                    href="tel:+916354825621"
                    className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1"
                  >
                    <div className="p-3 sm:p-3.5 bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 rounded-xl text-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)]/30 group-hover:text-dark-textMain transition-all shrink-0">
                      <Phone size={18} className="sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-dark-textMain/40 mb-0.5">Direct Phone / Call</p>
                      <span className="text-xs sm:text-sm md:text-base font-bold text-dark-textMain transition-colors font-bricolage group-hover:text-[var(--accent-primary)] truncate block">
                        +91 63548 25621
                      </span>
                    </div>
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    className="p-2 sm:p-2.5 rounded-xl bg-dark-textMain/5 border border-dark-textMain/10 hover:bg-dark-textMain/15 text-dark-textMain/60 hover:text-dark-textMain transition-all shrink-0 ml-2 cursor-pointer"
                    title="Copy Phone Number"
                  >
                    {copiedPhone ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                </motion.div>

                {/* Location Card */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 backdrop-blur-xl bg-gradient-to-br from-white/[0.08] to-transparent border border-dark-textMain/10 border-t-dark-textMain/20 border-l-dark-textMain/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-2xl hover:border-[var(--accent-primary)]/40 hover:bg-dark-textMain/[0.12] transition-all duration-300 group"
                >
                  <div className="p-3 sm:p-3.5 bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 rounded-xl text-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)]/30 group-hover:text-dark-textMain transition-all shrink-0">
                    <MapPin size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-dark-textMain/40 mb-0.5">Location</p>
                    <p className="text-xs sm:text-sm md:text-base font-bold text-dark-textMain font-bricolage">Vadodara, Gujarat, India</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Contact Form Lab */}
          <div className="lg:w-7/12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="backdrop-blur-xl bg-gradient-to-br from-white/[0.08] to-transparent border border-dark-textMain/10 border-t-dark-textMain/20 border-l-dark-textMain/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-2xl sm:rounded-xl p-5 sm:p-8 md:p-12 relative overflow-hidden"
            >
              {/* High-Tech HUD Ambient Header
              <div className="flex items-center justify-between mb-6 sm:mb-8 pb-3.5 sm:pb-4 border-b border-dark-textMain/10">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-indigo-400" />
                  <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-dark-textMain/80 uppercase">Project Inquiry Portal</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>256-Bit Encrypted Channel</span>
                </div>
              </div>*/}

              <form ref={formRef} onSubmit={submitForm} className="space-y-6 sm:space-y-8 relative z-10">
                <input type="hidden" name="project_type" value="General Inquiry" />

                {/* User Name & Email */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* Name Input */}
                  <div className="space-y-2 group/input">
                    <label htmlFor="user_name" className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-dark-textMain/60 flex items-center gap-2">
                      <User size={13} className="text-indigo-400" />
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="user_name"
                        id="user_name"
                        required
                        className="w-full bg-dark-textMain/[0.03] border border-dark-textMain/10 focus:border-indigo-400/60 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-dark-textMain placeholder:text-dark-textMain/30 focus:outline-none focus:bg-dark-textMain/[0.06] focus:shadow-[0_0_25px_rgba(99,102,241,0.15)] transition-all duration-300 font-display text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2 group/input">
                    <label htmlFor="user_email" className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-dark-textMain/60 flex items-center gap-2">
                      <Mail size={13} className="text-indigo-400" />
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="user_email"
                        id="user_email"
                        required
                        className="w-full bg-dark-textMain/[0.03] border border-dark-textMain/10 focus:border-indigo-400/60 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-dark-textMain placeholder:text-dark-textMain/30 focus:outline-none focus:bg-dark-textMain/[0.06] focus:shadow-[0_0_25px_rgba(99,102,241,0.15)] transition-all duration-300 font-display text-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Subject Input */}
                <motion.div variants={itemVariants} className="space-y-2 group/input">
                  <label htmlFor="subject" className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-dark-textMain/60 flex items-center gap-2">
                    <Globe size={13} className="text-indigo-400" />
                    Subject / Objective
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      className="w-full bg-dark-textMain/[0.03] border border-dark-textMain/10 focus:border-indigo-400/60 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-dark-textMain placeholder:text-dark-textMain/30 focus:outline-none focus:bg-dark-textMain/[0.06] focus:shadow-[0_0_25px_rgba(99,102,241,0.15)] transition-all duration-300 font-display text-sm"
                      placeholder="Project Inquiry / Job Opportunity / Hello"
                    />
                  </div>
                </motion.div>

                {/* Message Brief */}
                <motion.div variants={itemVariants} className="space-y-2 group/input">
                  <label htmlFor="message" className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-dark-textMain/60 flex items-center gap-2">
                    <MessageSquare size={13} className="text-indigo-400" />
                    Project Details / Message
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      id="message"
                      rows="4"
                      required
                      className="w-full bg-dark-textMain/[0.03] border border-dark-textMain/10 focus:border-indigo-400/60 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-dark-textMain placeholder:text-dark-textMain/30 focus:outline-none focus:bg-dark-textMain/[0.06] focus:shadow-[0_0_25px_rgba(99,102,241,0.15)] transition-all duration-300 resize-none font-display text-sm"
                      placeholder="Share your goals, scope, Timeline, or questions..."
                    ></textarea>
                  </div>
                </motion.div>

                {/* Submit Action */}
                <motion.div variants={itemVariants} className="pt-1 sm:pt-2 flex justify-center">
                  <MagneticButton disabled={isSubmitting} className="w-full max-w-md cursor-pointer flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 sm:py-4.5 rounded-xl sm:rounded-2xl font-bricolage font-bold text-sm sm:text-base tracking-wider uppercase transition-all duration-500 relative overflow-hidden group cursor-pointer ${isSubmitting
                        ? 'bg-dark-textMain/10 text-dark-textMain/40 cursor-not-allowed border border-dark-textMain/10'
                        : 'bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-dark-textMain border border-dark-textMain/20 hover:shadow-[0_0_30px_rgba(99,102,241,0.35)]'
                        }`}
                    >

                      <div className="relative z-10 flex items-center justify-center gap-2.5 sm:gap-3 whitespace-nowrap">
                        {isSubmitting ? (
                          <span className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold tracking-wider">
                            <div className="w-2 h-2 bg-dark-textMain rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <div className="w-2 h-2 bg-dark-textMain rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <div className="w-2 h-2 bg-dark-textMain rounded-full animate-bounce" />
                            <span>TRANSMITTING MESSAGE...</span>
                          </span>
                        ) : (
                          <>
                            <span className="font-bricolage font-bold tracking-wider" style={{ fontFamily: 'var(--font-bricolage)' }}>SEND TRANSMISSION</span>
                            <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                          </>
                        )}
                      </div>
                    </button>
                  </MagneticButton>
                </motion.div>

              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
