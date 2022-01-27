import { styled } from '../../../stitches.config';

export const ItemDetails = styled('div', {
  // base styles
  display: 'flex',
  alignItems: 'center',
});

export const ItemLogo = styled('img', {
  width: '48px',
  height: '48px',
  borderRadius: '10px',
  marginRight: '12px',
});

export const ItemName = styled('div', {
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '20px',
  color: '#23262F',
});

export const TypeDetails = styled('div', {
  // base styles
  display: 'flex',
  alignItems: 'center',
});

export const TypeLogo = styled('img', {
  width: '18px',
  height: '18px',
  color: '#23262F',
  marginRight: '8px',
});

export const TypeName = styled('div', {
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '20px',
  color: '#23262F',
  textTransform: 'capitalize',
});
