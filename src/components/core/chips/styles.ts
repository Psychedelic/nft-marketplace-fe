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

export const TraitChipContainer = styled('div', {
  // base styles
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  padding: '12px 15px',
  borderRadius: '14px',
  background: '#F4F5F6',

  // variants
  variants: {
    type: {
      filtered: {
        background: 'rgba(34, 83, 255, 0.1)',
        border: '1.5px solid #87A1FF',
        margin: '0px 10px 10px 0px',
      },

      nft: {
        minWidth: '150px',
        background: '#F4F5F6',
        margin: '0px 15px 15px 0px',
      },
    },
  },
});

export const TraitSpecsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginRight: '20px',
});

export const TraitName = styled('div', {
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '19px',
  color: '#23262F',
  marginBottom: '2px',

  // variants
  variants: {
    type: {
      nft: {
        marginBottom: '4px',
      },
    },
  },
});

export const TraitRim = styled('div', {
  // base styles
  fontSize: '12px',
  fontWeight: '500',
  lineHeight: '15px',
  color: '#767D8E',

  // variants
  variants: {
    type: {
      nft: {
        marginBottom: '3px',
      },
    },
  },
});

export const Traitvalue = styled('div', {
  fontSize: '14px',
  fontWeight: 'normal',
  lineHeight: '17px',
  color: '#23262F',
});

export const TraitActionContainer = styled('div', {
  display: 'flex',
  padding: '7px',
});

export const TraitClear = styled('img', {
  maxWidth: '12px',

  '&:hover': {
    cursor: 'pointer',
  },
});
