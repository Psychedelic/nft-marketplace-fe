import { styled } from '../../stitches.config';

export const Container = styled('div', {
  width: '100%',
  paddingTop: '72px',
});

export const TitleWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '32px 80px',
});

export const Title = styled('h2', {
  fontSize: '32px',
  fontWeight: '700',
  color: '$mainTextColor',
  margin: '0px',
});
