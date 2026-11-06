export const THEME_STORAGE_KEY = 'theme';

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

export function getSystemTheme() {
  if (typeof window === 'undefined') return THEMES.DARK;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT;
}

export function getStoredTheme() {
  if (typeof window === 'undefined') return THEMES.SYSTEM;
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === THEMES.LIGHT || stored === THEMES.DARK || stored === THEMES.SYSTEM) {
    return stored;
  }
  return THEMES.SYSTEM;
}

export function resolveTheme(theme) {
  if (theme === THEMES.LIGHT || theme === THEMES.DARK) return theme;
  return getSystemTheme();
}

export function applyTheme(resolvedTheme) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const isDark = resolvedTheme === THEMES.DARK;
  root.setAttribute('data-theme', resolvedTheme);
  root.style.colorScheme = resolvedTheme;
  root.classList.toggle('dark', isDark);
  root.classList.toggle('light', !isDark);

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', isDark ? '#080b12' : '#f8fafc');
  }
}

export function persistTheme(theme) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function getInitialThemeState() {
  const theme = getStoredTheme();
  const resolvedTheme = resolveTheme(theme);
  return {
    theme,
    resolvedTheme,
    isDark: resolvedTheme === THEMES.DARK,
  };
}
