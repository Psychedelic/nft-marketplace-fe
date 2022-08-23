import { styled } from '../../stitches.config';

export const Container = styled('div', {
  backgroundColor: '$primaryBackgroundColor',
  paddingTop: '120px',
  overflow: 'hidden',
});

export const NotFoundWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '28px auto',
});

export const NotFoundIcon = styled('div', {
  fontSize: '200px',
  fontWeight: '700',
  lineHeight: '1',
  marginBottom: '24px',
});

export const NotFoundText = styled('p', {
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '24px',
  lineHeight: '1',
  color: '$mainTextColor',
  marginBottom: '24px',

  '@md': {
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: '600',
  },
});

export const ButtonWrapper = styled('div', {
  height: '50px',
  margin: '10px',
  minWidth: '180px',

  '@md': {
    width: '250px',
  },
});
