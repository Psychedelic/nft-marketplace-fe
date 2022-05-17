import { styled } from '../../../stitches.config';
import { SkeletonBox } from '../skeleton';

export const ItemDetails = styled('div', {
  // base styles
  display: 'flex',
  alignItems: 'center',
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
  fontWeight: '600',
  lineHeight: '20px',
  color: '$mainTextColor',
});

export const TypeDetails = styled('div', {
  color: '$mainTextColor',
  display: 'flex',
  alignItems: 'center',
});

export const TypeLogo = styled('img', {
  width: '18px',
  height: '18px',
  color: '$mainTextColor',
  marginRight: '8px',
});

export const TypeName = styled('div', {
  fontSize: '16px',
  fontWeight: '600',
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
});

export const PriceDetails = styled('div', {
  // base styles
  display: 'flex',
  flexDirection: 'column',
});

export const WICPContainer = styled('div', {
  // base styles
  display: 'flex',
  alignItems: 'center',
  marginBottom: '6px',

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
  fontWeight: '600',
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
});

export const WICPLogo = styled('img', {
  width: '15px',
  height: '15px',
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
  fontWeight: '600',
  lineHeight: '20px',
  color: '$mainTextColor',

  variants: {
    type: {
      activityTime: {
        color: '#5542CF',
      },

      nftActivityDate: {
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '22px',
        color: '#5542CF',
      },

      offers: {
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '19px',
        color: '$tableTextColor',
      },
    },
  },
});

export const TextLinkDetails = styled('a', {
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '20px',
  color: '#5542CF',
  textDecoration: 'none',
  cursor: 'pointer',

  variants: {
    type: {
      nftActivity: {
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '22px',
        color: '#5542CF',
      },

      offers: {
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '19px',
        color: '$tableLinkTextColor',
      },
    },
  },
});
