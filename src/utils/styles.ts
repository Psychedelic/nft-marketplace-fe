import { globalCss } from '../stitches.config';

export default {};

export const darkThemeGlobals = globalCss({
  'html, body': {
    backgroundColor: '#000',
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

export const calculateGridGap = (clientWidth: number) => {
  if (clientWidth < 525) {
    return '35px 100px';
  }

  if (clientWidth < 544) {
    return '35px 120px';
  }

  if (clientWidth < 690) {
    return '35px 30px';
  }

  if (clientWidth < 756) {
    return '35px 60px';
  }

  if (clientWidth < 940) {
    return '35px 32px';
  }

  if (clientWidth < 957) {
    return '35px 40px';
  }

  if (clientWidth < 1046) {
    return '35px 66px';
  }

  if (clientWidth < 1169) {
    return '35px 25px';
  }

  if (clientWidth < 1189) {
    return '35px 32px';
  }

  if (clientWidth < 1280) {
    return '35px 57px';
  }

  if (clientWidth < 1385) {
    return '35px 25px';
  }

  if (clientWidth < 1420) {
    return '35px 30px';
  }

  if (clientWidth < 2000) {
    return '35px 48px';
  }

  return '35px 57px';
};
