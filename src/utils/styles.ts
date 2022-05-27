import { globalCss, theme, darkTheme } from '../stitches.config';

export default {};

export const themeGlobals = globalCss({
  'html, body': {
    height: '100%',

    '&.lightTheme': {
      backgroundColor: theme.colors.backgroundColor.value,
    },

    '&.darkTheme': {
      backgroundColor: darkTheme.colors.backgroundColor.value,
    },
  },
});

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

