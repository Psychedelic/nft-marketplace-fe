import { styled } from '../../../../stitches.config';

export const CardWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  background: '#FFFFFF',
  border: '1.5px solid #E5E8EB',
  boxSizing: 'border-box',
  boxShadow: '0px 0px 8px #E6E9EF',
  borderRadius: '14px',
  width: '100%',
  height: '100%',
  padding: '10px',
  cursor: 'pointer',
  transition: 'all 0.5s ease-in-out',

  '&:hover': {
    boxShadow: '0px 0px 8px 3px #E6E9EF',
    transform: 'scale(1.015)',
  },
});

export const Image = styled('div', {
  marginBottom: '10px',

  '& img': {
    width: '100%',
  },
});

export const Flex = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '&:nth-child(1)': {
    padding: '5px 0 10px',
  },

  '& p': {
    margin: '4px 0',
  },
});

export const OwnedCardText = styled('p', {
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '11px',
  lineHeight: '15px',
  color: '#777E90',
  margin: '0',
});

export const Dfinity = styled('p', {
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '20px',
  color: '#23262F',
  display: 'flex',
  alignItems: 'center',

  '& img': {
    marginLeft: '3px',
  },
});

export const NftName = styled('p', {
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '20px',
  color: '#767D8E',
});

export const NftId = styled('p', {
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '20px',
  color: '#23262F',
});

export const LastOffer = styled('span', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '12px',
  lineHeight: '15px',
  color: '#777E90',

  '& b': {
    color: '#23262F',
  },
});
