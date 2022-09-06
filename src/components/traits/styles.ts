import { styled } from '../../stitches.config';
import { Icon } from '../icons';

export const TraitsContainer = styled('div', {
  width: '100%',
});

export const SectionWrapper = styled('div', {
  marginTop: '50px',
});

export const HeadingText = styled('p', {
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '18px',
  lineHeight: '26px',
  color: '$textNeutralColor',
  width: '520px',
  margin: '0px',

  '& a': {
    color: '$primary',
    textDecoration: 'underline',
    cursor: 'pointer',
  },

  variants: {
    type: {
      title: {
        color: '$mainTextColor',
        fontWeight: '600',
        fontSize: '16px',
      },
    },
    size: {
      xs: {
        fontSize: '14px',
      },
      sm: {
        fontSize: '15px',
      },
      md: {
        fontSize: '18px',
      },
    },
    width: {
      sm: {
        width: '430px',
      },
      unset: {
        width: 'unset',
      },
    },
    spacing: {
      top: {
        marginTop: '15px',
      },
    },
  },
});

export const Flex = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  variants: {
    width: {
      sm: {
        width: '520px',
      },
      full: {
        width: '100%',
      },
    },
    alignItems: {
      flexStart: {
        alignItems: 'flex-start',
      },
    },
  },
});

export const EditIconWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  background: '$chipsBackgroundColor',
  borderRadius: '14px',
  padding: '10px',
  cursor: 'pointer',
});

export const EditIcon = styled(Icon, {
  color: '$textNeutralColor',
});

export const CarouselContainer = styled('div', {
  display: 'flex',
  position: 'relative',
  marginTop: '15px',
});

export const CarouselArrow = styled('div', {
  background: '$chipsBackgroundColor',
  borderRadius: '14px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '36px',
  cursor: 'pointer',

  variants: {
    direction: {
      left: {
        marginRight: '10px',
      },
      right: {
        marginLeft: '10px',
      },
    },
  },
});

export const CarouselWrapper = styled('div', {
  overflowX: 'hidden',
  width: '420px',
  overflow: 'scroll',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

export const CarouselInnerWrapper = styled('div', {
  display: 'flex',
});

export const CarouselItem = styled('div', {
  background: '$chipsBackgroundColor',
  borderRadius: '14px',
  padding: '10px',
  minWidth: '111px',
  marginRight: '10px',
});

export const CarouselName = styled('span', {
  fontSize: '12px',
  color: '$greyMid',
  lineHeight: '12px',
});

export const CarouselDescription = styled('p', {
  fontSize: '14px',
  color: '$mainTextColor',
  margin: '0',
  fontWeight: '500',
});

export const CarouselRarity = styled('p', {
  fontSize: '13px',
  color: '$mainTextColor',
  margin: '0',
});
