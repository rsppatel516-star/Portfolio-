import React from 'react';
import { motion } from 'framer-motion';

// 4-pointed sparkle star SVG icon matching the exact visual style in the screenshot
export function SparkleStar({ className = 'w-3 h-3 text-purple-300/70', style }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`select-none pointer-events-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      <path d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z" />
    </svg>
  );
}

/**
 * Ultra-Premium Section Heading Component
 * Recreates the exact signature design:
 * - High-impact, heavy geometric display typography (Syne font-black)
 * - Radiant violet-to-pink gradient on emphasis keywords with soft neon aura
 * - Futuristic glassmorphic badge pill with category icon and mono letterspacing
 * - Floating ambient sparkle stars (✦) and soft atmospheric glow
 * - Fluid responsive layout with optional right-side action/showcase graphic
 */
export default function SectionHeading({
  badge,
  badgeIcon: BadgeIcon,
  prefix,
  highlight,
  suffix,
  title, // Optional: direct title string or custom JSX
  description,
  align = 'left', // 'left' | 'center'
  as: Component = 'h2', // 'h2' | 'h1' | 'h3'
  className = '',
  rightContent = null,
  showSparkles = true,
  size = 'default', // 'default' | 'large'
}) {
  const isCentered = align === 'center';

  const headingSizeClasses = size === 'large'
    ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
    : 'text-3xl sm:text-4xl md:text-5xl lg:text-5xl';

  return (
    <div className={`relative mb-8 sm:mb-12 md:mb-14 ${className}`}>
      {/* Ambient background soft glow behind title */}
      <div
        className={`absolute -top-12 ${isCentered ? 'left-1/2 -translate-x-1/2' : 'left-0'} w-72 sm:w-96 h-36  blur-[90px] rounded-full pointer-events-none -z-10`}
      />

      {/* Main Header Container with Responsive Flex Layout */}
      <div
        className={`flex flex-col ${rightContent ? 'lg:flex-row lg:items-end justify-between' : ''} ${isCentered ? 'items-center text-center' : 'items-start text-left'} gap-6 md:gap-8`}
      >
        <div className={rightContent ? 'max-w-2xl lg:max-w-3xl' : isCentered ? 'max-w-3xl mx-auto' : 'max-w-3xl'}>
          {/* Top Badge Pill */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, x: isCentered ? 0 : -20, y: isCentered ? -10 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full mb-3.5 sm:mb-4 bg-indigo-50/90 dark:bg-indigo-500/10 border border-indigo-200/80 dark:border-indigo-500/20 backdrop-blur-md shadow-sm dark:shadow-none`}
            >
              {BadgeIcon && (
                <BadgeIcon
                  size={15}
                  className="text-indigo-600 dark:text-indigo-600 transition-transform duration-300 group-hover/badge:scale-110"
                />
              )}
              <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-indigo-800 dark:text-indigo-600">
                {badge}
              </span>
            </motion.div>
          )}

          {/* Grand Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Component
              className={`${headingSizeClasses} font-display font-black tracking-tight leading-[1.14] text-dark-textMain`}
            >
              {title ? (
                typeof title === 'string' ? (
                  title
                ) : (
                  title
                )
              ) : (
                <>
                  {prefix && <span className="inline">{prefix}</span>}
                  {highlight && (
                    <span className="relative inline-block heading-gradient-highlight transition-all duration-300">
                      {highlight}
                    </span>
                  )}
                  {suffix && <span className="inline">{suffix}</span>}
                </>
              )}
            </Component>
          </motion.div>

          {/* Descriptive Subtitle / Narrative Lead */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
              className="mt-3.5 sm:mt-4 text-xs sm:text-sm md:text-base text-dark-textMuted font-bricolage leading-relaxed max-w-2xl opacity-90"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Optional Right Showcase Graphic or Action */}
        {rightContent && (
          <div className="shrink-0 self-center lg:self-auto w-full lg:w-auto flex justify-center lg:justify-end">
            {rightContent}
          </div>
        )}
      </div>
    </div>
  );
}
