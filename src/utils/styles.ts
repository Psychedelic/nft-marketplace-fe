import { globalCss } from '../stitches.config';

export default {};

export const darkThemeGlobals = globalCss({
  'html, body': {
    background: '#141416',
    height: '100%'
  },
});

export const isDarkTheme = (theme: string) => theme === 'darkTheme';

// Prevents the protaled elements to be above the navbar
export const portalZIndexGlobals = globalCss({
  body: {
    '& [data-radix-portal]': {
      zIndex: '1 !important',
    },
    '& [data-radix-portal].above-nav': {
      zIndex: '4 !important',
    },
  },
});

