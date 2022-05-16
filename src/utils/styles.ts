import { globalCss } from '../stitches.config';

export default {};

export const darkThemeGlobals = globalCss({
  'html, body': {
    backgroundColor: '#000',
  },
});

export const isDarkTheme = (theme: string) => theme === 'darkTheme'