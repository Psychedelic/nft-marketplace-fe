import { styled } from '../../../stitches.config';

export const CountContainer = styled('div', {
  // base styles
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '19px',
  color: '#777E90',
  display: 'flex',
  alignItems: 'center',
  margin: '0px 25px 0px 0px',
});

export const CountLabel = styled('div', {
  marginRight: '4px',
});

export const CountInNumbers = styled('div', {
  color: '$mainTextColor',
  fontWeight: '600',
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
  padding: '12px 10px',
  borderRadius: '14px',
  background: '$chipsBackgroundColor',
  color: '$chipsTextColor',

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
        background: '$chipsNftBackgroundColor',
        border: '1.5px solid $borderColor',
        margin: '0px 15px 15px 0px',

        '&:nth-child(3)': {
          marginRight: '0px',
        },
      },
    },
  },

  '&:last-child': {
    marginRight: '0px',
  },
});

export const TraitSpecsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginRight: '20px',
});

export const TraitName = styled('div', {
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '19px',
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

export const TraitLabel = styled('div', {
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
  color: '$mainTextColor',
});

export const TraitActionContainer = styled('div', {
  display: 'flex',
  '&:hover': {
    cursor: 'pointer',
  },
});

export const TraitClear = styled('img', {
  maxWidth: '12px',

  '&:hover': {
    cursor: 'pointer',
  },
});

export const Image = styled('img', {
  width: '20px',
  marginRight: '10px',
});
