/* eslint-disable */
import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      hiContrast: '#000000',
      loContrast: '#FFFFFF',
    },
    space: {},
    fonts: {},
  },
  media: {},
  utils: {},
});

export const darkTheme = createTheme({
  colors: {
    hiContrast: '#FFFFFF',
    loContrast: '#000000',
  },
});
