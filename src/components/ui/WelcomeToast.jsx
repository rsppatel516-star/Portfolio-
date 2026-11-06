import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Laptop } from 'lucide-react';

const DURATION = 6000;

export default function WelcomeToast() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const remainingTimeRef = useRef(DURATION);
  const startTimeRef = useRef(null);
  const timerIdRef = useRef(null);

  // Mount after a smooth initial delay so the hero finishes entrance
  useEffect(() => {
    const appearTimer = setTimeout(() => {
      setMounted(true);
    }, 600);

    return () => clearTimeout(appearTimer);
  }, []);

  // Handle countdown dismiss
  useEffect(() => {
    if (!mounted || !isVisible) return;

    startTimeRef.current = Date.now();
    timerIdRef.current = setTimeout(() => {
      setIsVisible(false);
    }, remainingTimeRef.current);

    return () => {
      if (timerIdRef.current) clearTimeout(timerIdRef.current);
    };
  }, [mounted, isVisible]);

  const handleMouseEnter = () => {
    if (!isVisible) return;
    setIsPaused(true);
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
    const elapsed = Date.now() - (startTimeRef.current || Date.now());
    remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
  };

  const handleMouseLeave = () => {
    if (!isVisible || remainingTimeRef.current <= 0) return;
    setIsPaused(false);
    startTimeRef.current = Date.now();
    timerIdRef.current = setTimeout(() => {
      setIsVisible(false);
    }, remainingTimeRef.current);
  };

  const handleDismiss = (e) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  return (
    <>
      <style>{`
        @keyframes welcomeToastProgress {
          0% { transform: scaleX(1); }
          100% { transform: scaleX(0); }
        }
      `}</style>

      <AnimatePresence>
        {mounted && isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95, transition: { duration: 0.22, ease: 'easeIn' } }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 24
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="fixed bottom-5 sm:bottom-7 md:bottom-8 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[calc(100vw-1.5rem)] sm:max-w-md select-none pointer-events-auto"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Pill Container with Dual Mode Styling */}
            <div
              id="homeWelcomeBadge"
              className="relative flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white/95 dark:bg-[#0c0f1d]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-[0_12px_40px_rgba(15,23,42,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] overflow-hidden transition-colors duration-300"
              aria-live="polite"
              role="status"
            >
              {/* Top Shimmer Accent */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 via-purple-400 to-transparent opacity-90 animate-shimmer" />

              {/* Message Content */}
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-1">
                <span className="text-slate-800 dark:text-white/90 font-display text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide whitespace-nowrap truncate">
                  Welcome to{' '}
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.35)]">
                    Rudra Patel&apos;s
                  </span>{' '}
                  Portfolio
                </span>
                <Laptop className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              </div>

              {/* Dismiss Button */}
              <button
                type="button"
                onClick={handleDismiss}
                className="p-1 -mr-1 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0 ml-1"
                aria-label="Dismiss notification"
              >
                <X size={14} className="sm:w-3.5 sm:h-3.5" />
              </button>

              {/* Countdown Progress Bar */}
              <div className="absolute bottom-0 left-0 h-[2px] w-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-600 to-purple-500 dark:from-indigo-400 dark:to-purple-400 origin-left"
                  style={{
                    animation: `welcomeToastProgress ${DURATION}ms linear forwards`,
                    animationPlayState: isPaused ? 'paused' : 'running'
                  }}
                />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
