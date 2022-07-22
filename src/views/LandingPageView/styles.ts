import { styled } from '../../stitches.config';

export const Container = styled('div', {
  backgroundColor: '$backgroundColor',
  paddingTop: '76px',
});

export const IntroContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

export const IntroBackgroundContainer = styled('div', {
  position: 'absolute',
  pointerEvents: 'none',
  userSelect: 'none',
  top: '72px',
  right: '0px',
  bottom: '0px',
  left: '0px',
});

export const BackgroundImageWrapper = styled('div', {
  display: 'contents',
});

export const BackgroundImage = styled('img', {
  width: '100%',
  height: '100%',
  objectPosition: 'center',
  objectFit: 'cover',
});
