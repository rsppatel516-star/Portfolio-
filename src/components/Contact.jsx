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
import { SparkleStar } from './ui/SectionHeading';

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
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
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
            <div className="relative mb-6">
              {/* Decorative Floating Sparkle Stars */}
              <div className="absolute -top-6 -left-4 pointer-events-none">
                <SparkleStar className="w-3.5 h-3.5 text-purple-500 dark:text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.7)] animate-pulse" />
              </div>
              <div className="absolute -top-3 left-48 pointer-events-none hidden sm:block">
                <SparkleStar className="w-2.5 h-2.5 text-indigo-500 dark:text-indigo-300 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)] animate-pulse" />
              </div>

              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-indigo-800 dark:text-indigo-300 mb-5 bg-indigo-50/90 dark:bg-indigo-500/10 border border-indigo-200/80 dark:border-indigo-500/20 backdrop-blur-md shadow-sm dark:shadow-[0_0_20px_rgba(99,102,241,0.15)] group/badge"
              >
                <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400 transition-transform duration-300 group-hover/badge:scale-110" />
                <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-indigo-800 dark:text-indigo-300">
                  GET IN TOUCH
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping ml-0.5" />
              </motion.div>

              <HeadingTag
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-black font-display leading-[0.98] sm:leading-[0.94] mb-4 tracking-tight text-dark-textMain"
              >
                Let’s Build <br />
                <span className="relative inline-block heading-gradient-highlight">
                  Something Epic.
                </span>
              </HeadingTag>

              <motion.p
                variants={itemVariants}
                className="text-dark-textMuted text-xs sm:text-sm md:text-base font-bricolage leading-relaxed max-w-md mb-6"
              >
                Have an innovative project in mind, need full-stack or iOS engineering power, or want to explore collaboration? Reach out anytime.
              </motion.p>
            </div>                {/* Interactive Contact Cards */}
            <div className="space-y-3.5 sm:space-y-4 mb-8 sm:mb-10">
              {/* Email Card with Direct mailto: and Copy */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-center justify-between p-4 sm:p-5 surface-panel surface-panel-hover border border-dark-border shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-2xl hover:border-indigo-500/40 transition-all duration-300 group"
              >
                <a
                  href="mailto:patelrudra99098@gmail.com"
                  className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1"
                >
                  <div className="p-3 sm:p-3.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-all shrink-0">
                    <Mail size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-dark-textMuted mb-0.5">Direct Email</p>
                    <span className="text-xs sm:text-sm md:text-base font-bold text-dark-textMain transition-colors font-bricolage group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate block">
                      patelrudra99098@gmail.com
                    </span>
                  </div>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 sm:p-2.5 rounded-xl bg-dark-textMain/5 border border-dark-border hover:bg-dark-textMain/10 text-dark-textMuted hover:text-dark-textMain transition-all shrink-0 ml-2 cursor-pointer"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check size={16} className="text-emerald-500 dark:text-emerald-400" /> : <Copy size={16} />}
                </button>
              </motion.div>

              {/* Phone Card with Direct Dial tel: and Copy */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-center justify-between p-4 sm:p-5 surface-panel surface-panel-hover border border-dark-border shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-2xl hover:border-purple-500/40 transition-all duration-300 group"
              >
                <a
                  href="tel:+916354825621"
                  className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1"
                >
                  <div className="p-3 sm:p-3.5 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-600 dark:text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-all shrink-0">
                    <Phone size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-dark-textMuted mb-0.5">Direct Phone / Call</p>
                    <span className="text-xs sm:text-sm md:text-base font-bold text-dark-textMain transition-colors font-bricolage group-hover:text-purple-600 dark:group-hover:text-purple-400 truncate block">
                      +91 63548 25621
                    </span>
                  </div>
                </a>
                <button
                  onClick={handleCopyPhone}
                  className="p-2 sm:p-2.5 rounded-xl bg-dark-textMain/5 border border-dark-border hover:bg-dark-textMain/10 text-dark-textMuted hover:text-dark-textMain transition-all shrink-0 ml-2 cursor-pointer"
                  title="Copy Phone Number"
                >
                  {copiedPhone ? <Check size={16} className="text-emerald-500 dark:text-emerald-400" /> : <Copy size={16} />}
                </button>
              </motion.div>

              {/* Location Card */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 surface-panel surface-panel-hover border border-dark-border shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-2xl hover:border-indigo-500/40 transition-all duration-300 group"
              >
                <div className="p-3 sm:p-3.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-600 dark:text-indigo-600 group-hover:bg-indigo-500/20 group-hover:text-indigo-700 dark:group-hover:text-indigo-500 transition-all shrink-0">
                  <MapPin size={18} className="sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-dark-textMuted mb-0.5">Location</p>
                  <p className="text-xs sm:text-sm md:text-base font-bold text-dark-textMain font-bricolage">Vadodara, Gujarat, India</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Contact Form Lab */}
          <div className="lg:w-7/12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="surface-panel border border-dark-border shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 relative overflow-hidden"
            >
              <form ref={formRef} onSubmit={submitForm} className="space-y-6 sm:space-y-8 relative z-10">
                <input type="hidden" name="project_type" value="General Inquiry" />

                {/* User Name & Email */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* Name Input */}
                  <div className="space-y-2 group/input">
                    <label htmlFor="user_name" className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-dark-textMuted flex items-center gap-2">
                      <User size={13} className="text-indigo-500 dark:text-indigo-400" />
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="user_name"
                        id="user_name"
                        required
                        className="w-full bg-dark-textMain/[0.03] border border-dark-border focus:border-indigo-500 dark:focus:border-indigo-400 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-dark-textMain placeholder:text-dark-textMuted/40 focus:outline-none focus:bg-dark-surface focus:shadow-[0_0_25px_rgba(99,102,241,0.18)] transition-all duration-300 font-display text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2 group/input">
                    <label htmlFor="user_email" className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-dark-textMuted flex items-center gap-2">
                      <Mail size={13} className="text-indigo-500 dark:text-indigo-400" />
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="user_email"
                        id="user_email"
                        required
                        className="w-full bg-dark-textMain/[0.03] border border-dark-border focus:border-indigo-500 dark:focus:border-indigo-400 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-dark-textMain placeholder:text-dark-textMuted/40 focus:outline-none focus:bg-dark-surface focus:shadow-[0_0_25px_rgba(99,102,241,0.18)] transition-all duration-300 font-display text-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Subject Input */}
                <motion.div variants={itemVariants} className="space-y-2 group/input">
                  <label htmlFor="subject" className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-dark-textMuted flex items-center gap-2">
                    <Globe size={13} className="text-purple-500 dark:text-purple-400" />
                    Subject / Objective
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      className="w-full bg-dark-textMain/[0.03] border border-dark-border focus:border-purple-500 dark:focus:border-purple-400 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-dark-textMain placeholder:text-dark-textMuted/40 focus:outline-none focus:bg-dark-surface focus:shadow-[0_0_25px_rgba(168,85,247,0.18)] transition-all duration-300 font-display text-sm"
                      placeholder="Project Inquiry / Job Opportunity / Hello"
                    />
                  </div>
                </motion.div>

                {/* Message Brief */}
                <motion.div variants={itemVariants} className="space-y-2 group/input">
                  <label htmlFor="message" className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-dark-textMuted flex items-center gap-2">
                    <MessageSquare size={13} className="text-pink-500 dark:text-pink-400" />
                    Project Details / Message
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      id="message"
                      rows="4"
                      required
                      className="w-full bg-dark-textMain/[0.03] border border-dark-border focus:border-pink-500 dark:focus:border-pink-400 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-dark-textMain placeholder:text-dark-textMuted/40 focus:outline-none focus:bg-dark-surface focus:shadow-[0_0_25px_rgba(236,72,153,0.18)] transition-all duration-300 resize-none font-display text-sm"
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
                        ? 'bg-dark-textMain/10 text-dark-textMuted cursor-not-allowed border border-dark-border'
                        : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg hover:shadow-[0_0_35px_rgba(168,85,247,0.45)] hover:scale-[1.01]'
                        }`}
                    >

                      <div className="relative z-10 flex items-center justify-center gap-2.5 sm:gap-3 whitespace-nowrap">
                        {isSubmitting ? (
                          <span className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold tracking-wider text-white">
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                            <span>TRANSMITTING MESSAGE...</span>
                          </span>
                        ) : (
                          <>
                            <span className="font-bricolage font-bold tracking-wider text-white" style={{ fontFamily: 'var(--font-bricolage)' }}>SEND TRANSMISSION</span>
                            <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:translate-x-1.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
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
