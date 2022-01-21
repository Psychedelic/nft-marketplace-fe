import { styled } from '../../../stitches.config';

export const CountContainer = styled('div', {
  // base styles
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '19px',
  color: '#777E90',
  display: 'flex',
  alignItems: 'center',
  margin: '0px 25px 20px 0px',
});

export const CountLabel = styled('div', {
  marginRight: '4px',
});

export const CountInNumbers = styled('div', {
  fontWeight: '600',
  color: '#000000',
});

export const CountLogo = styled('img', {
  width: '15px',
  height: '15px',
  marginLeft: '5px',
});
