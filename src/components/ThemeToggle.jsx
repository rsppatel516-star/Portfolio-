import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { THEMES } from '../utils/theme';

const MODES = [
  { id: THEMES.LIGHT, icon: Sun, label: 'Light mode' },
  { id: THEMES.DARK, icon: Moon, label: 'Dark mode' },
  { id: THEMES.SYSTEM, icon: Monitor, label: 'System theme' },
];

export default function ThemeToggle({ compact = false, className = '' }) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const ActiveIcon = resolvedTheme === THEMES.DARK ? Moon : Sun;

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`theme-toggle-btn ${className}`}
        aria-label={`Switch to ${resolvedTheme === THEMES.DARK ? 'light' : 'dark'} mode`}
        title={`Switch to ${resolvedTheme === THEMES.DARK ? 'light' : 'dark'} mode`}
      >
        <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={resolvedTheme}
              initial={{ y: -12, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 12, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center text-dark-primary"
            >
              <ActiveIcon size={18} strokeWidth={2.25} />
            </motion.span>
          </AnimatePresence>
        </div>
      </button>
    );
  }

  return (
    <div className={`theme-toggle-group ${className}`} role="group" aria-label="Theme selection">
      {MODES.map(({ id, icon: Icon, label }) => {
        const isActive = theme === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => setTheme(id)}
            className={`theme-toggle-option ${isActive ? 'theme-toggle-option-active' : ''}`}
            aria-label={label}
            aria-pressed={isActive}
            title={label}
          >
            <Icon size={15} strokeWidth={2.25} />
            <span className="sr-only">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
