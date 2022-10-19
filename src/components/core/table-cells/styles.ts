import { styled } from '../../../stitches.config';
import { Icon } from '../../icons';
import { SkeletonBox } from '../skeleton';
import gradientBg from '../../../assets/gradient-bg.png';

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

  variants: {
    tableType: {
      myOffers: {
        '@sm': {
          paddingRight: '0px',
          alignItems: 'center',
        },
      },
      activity: {
        '@sm': {
          paddingRight: '25px',
          alignItems: 'end',
        },
      },
      nftActivity: {
        '@sm': {
          paddingRight: '25px',
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

export const StyledIcon = styled(Icon, {
  '@sm': {
    display: 'none',
  },

  variants: {
    showIcon: {
      true: {
        display: 'flex',
      },
    },
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
          alignItems: 'start',
        },
      },
      offers: {
        '@sm': {
          paddingRight: '10px',
          alignItems: 'start',
        },
      },
      activity: {
        '@sm': {
          paddingRight: '25px',
          alignItems: 'end',
        },
      },
      nftActivity: {
        '@sm': {
          paddingRight: '25px',
          alignItems: 'end',
        },
      },
    },
  },

  '@sm': {
    paddingRight: '25px',
    alignItems: 'start',
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

        '@sm': {
          fontSize: '12px',
        },
      },
      myOffers: {
        order: 'unset',
      },
    },
  },

  '@sm': {
    order: '1',
    fontWeight: '600',
    marginRight: '0px',
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

        '@sm': {
          paddingRight: '25px',
          justifyContent: 'center',
        },
      },

      myOffersActivityTime: {
        color: '$primary',

        '@sm': {
          paddingRight: '0px',
          justifyContent: 'center',
        },
      },

      offersActivityTime: {
        color: '$primary',

        '@sm': {
          paddingRight: '10px',
          justifyContent: 'center',
          fontSize: '12px',
        },
      },

      nftActivityDate: {
        lineHeight: '22px',
        color: '$primary',
      },

      offers: {
        lineHeight: '19px',
        color: '$tableTextColor',

        '@sm': {
          fontSize: '12px',
        },
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

        '@sm': {
          fontSize: '12px',
        },
      },
    },

    center: {
      true: {
        display: 'flex',
        justifyContent: 'center',
      },
    },
  },
});

export const MobileItemDetailsWrapper = styled('div', {
  display: 'flex',

  '@sm': {
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'end',
  },
});

export const MobileItemDetailsContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  width: '310px',
  justifyContent: 'space-between',
});

export const MediaWrapper = styled('div', {
  position: 'relative',
  height: '48px',
  marginRight: '12px',
});

export const PreviewDetails = styled('div', {
  minHeight: '48px',
  width: '48px',
  height: '48px',
});

export const NameCardBg = styled('div', {
  width: '48px',
  height: '48px',
  borderRadius: '5px',
  backgroundImage: `url(${gradientBg})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
});

export const NameCardContainer = styled('div', {
  width: '48px',
  height: '48px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

export const NameCardCollection = styled('img', {
  width: '100%',
  maxWidth: '24px',
  padding: '5px',
});

export const NameCardTitle = styled('div', {
  fontSize: '6px',
  fontWeight: '700',
  textAlign: 'left',
  padding: '5px 5px 5px',
  color: '#000',
});
