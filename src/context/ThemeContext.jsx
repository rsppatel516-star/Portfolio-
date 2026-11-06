import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './ThemeContextCore';
import {
  THEMES,
  applyTheme,
  getInitialThemeState,
  getStoredTheme,
  getSystemTheme,
  persistTheme,
  resolveTheme,
} from '../utils/theme';

export function ThemeProvider({ children }) {
  const [{ theme, resolvedTheme, isDark }, setThemeState] = useState(getInitialThemeState);

  useEffect(() => {
    applyTheme(resolveTheme(getStoredTheme()));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || theme !== THEMES.SYSTEM) return undefined;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemThemeChange = () => {
      const nextResolved = getSystemTheme();
      applyTheme(nextResolved);
      setThemeState((current) => ({
        ...current,
        resolvedTheme: nextResolved,
        isDark: nextResolved === THEMES.DARK,
      }));
    };

    mediaQuery.addEventListener('change', onSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', onSystemThemeChange);
  }, [theme]);

  const syncTheme = useCallback((nextTheme) => {
    persistTheme(nextTheme);
    const nextResolved = resolveTheme(nextTheme);
    applyTheme(nextResolved);
    setThemeState({
      theme: nextTheme,
      resolvedTheme: nextResolved,
      isDark: nextResolved === THEMES.DARK,
    });
  }, []);

  const setTheme = useCallback((nextTheme) => {
    syncTheme(nextTheme);
  }, [syncTheme]);

  const toggleTheme = useCallback(() => {
    syncTheme(resolvedTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
  }, [resolvedTheme, syncTheme]);

  const setIsDark = useCallback((value) => {
    syncTheme(value ? THEMES.DARK : THEMES.LIGHT);
  }, [syncTheme]);

  const value = useMemo(() => ({
    theme,
    resolvedTheme,
    isDark,
    isLight: resolvedTheme === THEMES.LIGHT,
    setTheme,
    toggleTheme,
    setIsDark,
  }), [theme, resolvedTheme, isDark, setTheme, toggleTheme, setIsDark]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
