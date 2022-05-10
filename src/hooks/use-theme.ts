import { useMemo } from 'react';
import { useThemeStore } from '../store';
import { darkTheme, theme as defaultTheme } from '../stitches.config';

export type Theme = typeof darkTheme | typeof defaultTheme;

export const useTheme = (): [string, Theme] => {
  const { theme } = useThemeStore();

  const currentThemeObject = useMemo<Theme>(
    () => (theme === 'darkTheme' ? darkTheme : defaultTheme),
    [theme],
  );

  return [theme as string, currentThemeObject];
};
