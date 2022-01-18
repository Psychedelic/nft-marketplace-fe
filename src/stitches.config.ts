/* eslint-disable */
import { createStitches } from '@stitches/react';

export const { styled, css, globalCss, keyframes, theme, createTheme, config } =
  createStitches({
    theme: {
      colors: {
        defaultTxtColor: '#000000',
        backgroundColor: '#FFFFFF',
      },
      space: {},
      fonts: {},
    },
    media: {},
    utils: {},
  });

export const darkTheme = createTheme('dark-theme', {
  colors: {
    defaultTxtColor: '#FFFFFF',
    backgroundColor: '#000000',
  },
  space: {},
  fonts: {},
});
