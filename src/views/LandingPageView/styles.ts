import { styled } from '../../stitches.config';

export const Container = styled('div', {
  backgroundColor: '$backgroundColor',
  paddingTop: '76px',
});

export const IntroContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
});

export const IntroBackgroundContainer = styled('div', {
  position: 'absolute',
  pointerEvents: 'none',
  userSelect: 'none',
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px',
});

export const IntroBackgroundImageWrapper = styled('div', {
  display: 'contents',
});

export const IntroBackgroundImage = styled('img', {
  width: '100%',
  height: '100%',
  objectPosition: 'center',
  objectFit: 'cover',
});

export const IntroDetailsContainer = styled('div', {
  padding: '80px 0px 60px 0px',
  position: 'relative',
  width: '100%',
});

export const IntroDetailsWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  maxWidth: '700px',
  margin: 'auto',
});

export const IntroDetailsTitle = styled('h1', {
  fontSize: '62px',
  lineHeight: '62px',
  fontWeight: '600',
  margin: '0px',
  textAlign: 'center',
  color: '$primaryTextColor',
});

export const IntroDetailsDescription = styled('p', {
  fontSize: '22px',
  lineHeight: '1.5em',
  fontWeight: '400',
  textAlign: 'center',
  margin: '0px',
  color: '$secondaryTextColor',
});

export const ViewCollectionButtonWrapper = styled('div', {
  width: '155px',
  height: '50px',
  marginLeft: '10px',
});

export const IntroImageContainer = styled('div', {
  position: 'relative',
  maxWidth: '800px',
  width: '80%',
  margin: 'auto',
  borderRadius: '10px 10px 0px 0px',
  boxShadow: 'rgb(61 61 61 / 20%) 0px -5px 20px 10px',
});

export const IntroImage = styled('img', {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
  objectPosition: 'center',
  objectFit: 'cover',
});
