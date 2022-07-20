import { styled } from '../../../stitches.config';
import { Icon } from '../../icons';
import { SkeletonBox } from '../skeleton';

export const ItemDetails = styled('div', {
  // base styles
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
});

export const ThumbnailSkeleton = styled(SkeletonBox, {
  width: '48px',
  height: '48px',
  borderRadius: '10px',
  marginRight: '12px',
});

export const ItemLogo = styled('img', {
  width: '48px',
  height: '48px',
  borderRadius: '10px',
  marginRight: '12px',
});

export const ItemName = styled('div', {
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '20px',
  color: '$mainTextColor',

  '@sm': {
    fontWeight: '600',
  },
});

export const ItemTokenId = styled('div', {
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '20px',
  color: '$mainTextColor',

  '@sm': {
    fontWeight: '600',
  },
});

export const TypeDetails = styled('div', {
  color: '$mainTextColor',
  display: 'flex',
  alignItems: 'center',

  '@sm': {
    paddingRight: '25px',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'end',
  },
});

export const StyledIcon = styled(Icon, {
  '@sm': {
    display: 'none',
  },
});

export const TypeLogo = styled('img', {
  width: '18px',
  height: '18px',
  color: '$mainTextColor',
  marginRight: '8px',
});

export const TypeName = styled('div', {
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '20px',
  color: '$mainTextColor',
  textTransform: 'capitalize',

  variants: {
    tableType: {
      nftActivity: {
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '22px',

        color: '$mainTextColor',
      },

      offers: {
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '19px',

        color: '$mainTextColor',
      },
    },
  },

  '@sm': {
    color: '$textNeutralColor',
    fontWeight: '600',
  },
});

export const PriceDetails = styled('div', {
  // base styles
  display: 'flex',
  flexDirection: 'column',

  variants: {
    tableType: {
      myOffers: {
        '@sm': {
          paddingRight: '0px',
          alignItems: 'unset',
        },
      },
    },
  },

  '@sm': {
    paddingRight: '25px',
    alignItems: 'end',
  },
});

export const WICPContainer = styled('div', {
  // base styles
  display: 'flex',
  alignItems: 'center',

  variants: {
    tableType: {
      nftActivity: {
        marginBottom: '2px',
      },

      offers: {
        marginBottom: '3px',
      },
    },
  },
});

export const WICPText = styled('div', {
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '20px',
  color: '$mainTextColor',
  marginRight: '4px',

  variants: {
    tableType: {
      nftActivity: {
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '22px',

        color: '$mainTextColor',
      },

      offers: {
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '19px',

        color: '$mainTextColor',
      },
    },
  },

  '@sm': {
    order: '1',
    fontWeight: '600',
  },
});

export const WICPLogo = styled('img', {
  width: '15px',
  height: '15px',

  '@sm': {
    paddingRight: '5px',
  },
});

export const PriceText = styled('div', {
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '20px',
  color: '#777E90',

  variants: {
    tableType: {
      nftActivity: {
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '17px',
        color: '#767D8E',
      },

      offers: {
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '17px',
        color: '#767D8E',
      },
    },
  },
});

export const TextDetails = styled('div', {
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '20px',
  color: '$mainTextColor',

  variants: {
    type: {
      activityTime: {
        color: '$primary',
      },

      myOffersActivityTime: {
        color: '$primary',
        
        '@sm': {
          paddingRight: '0px',
          justifyContent: 'center',
        },
      },

      nftActivityDate: {
        lineHeight: '22px',
        color: '$primary',
      },

      offers: {
        lineHeight: '19px',
        color: '$tableTextColor',
      },
    },
    tableType: {
      myOffers: {
        lineHeight: '19px',
        color: '$tableTextColor',

        '@sm': {
          paddingRight: '0px',
          justifyContent: 'center',
        },
      },
    },
  },

  '@sm': {
    paddingRight: '25px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

export const TextLinkDetails = styled('a', {
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '20px',
  color: '$primary',
  textDecoration: 'none',
  cursor: 'pointer',

  variants: {
    type: {
      nftActivity: {
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '22px',
        color: '$primary',
      },

      offers: {
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '19px',
        color: '$primary',
      },
    },
  },
});
