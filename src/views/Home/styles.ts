import { styled } from '../../stitches.config';

export const Container = styled('div', {
  textAlign: 'center',
});

export const Wrapper = styled('div', {
  backgroundColor: '$backgroundColor',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 'calc(10px + 2vmin)',
  color: '$defaultTxtColor',
});

export const Logo = styled('img', {
  height: '100%',
  pointerEvents: 'none',
});
