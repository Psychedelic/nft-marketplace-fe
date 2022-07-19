import * as Accordion from '@radix-ui/react-accordion';
import { styled, keyframes } from '../../../stitches.config';
import { SkeletonBox } from '../skeleton';

const slideDown = keyframes({
  from: { maxHeight: 0 },
  to: { maxHeight: 'var(--radix-accordion-content-height)' },
});

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
});

export const AccordionStyle = styled(Accordion.Root, {
  border: '2px solid $borderColor',
  borderRadius: '15px',
  marginBottom: '25px',

  variants: {
    backgroundColor: {
      open: {
        backgroundColor: '$openAccordion',
      },
      notopen: {
        backgroundColor: '$closeAccordion',
      },
    },
    width: {
      small: {
        width: '100%',
      },
      medium: {
        width: '100%',
        maxWidth: '670px',
      },
    },
  },
});

export const AccordionHead = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '25px',
  flexWrap: 'wrap',

  // variants
  variants: {
    flexDirection: {
      column: {
        flexDirection: 'column',
      },
    },
  },
});

export const AccordionHeadContent = styled('div', {
  display: 'flex',

  variants: {
    flexProperties: {
      offer: {
        justifyContent: 'space-between',
        width: '100%',
      },
      about: {
        '@sm': {
          justifyContent: 'space-between',
          border: '1.5px solid $borderColor',
          padding: '15px',
          marginRight: '15px',
          marginBottom: '25px',
          borderRadius: '8px',
        },
      },
    },
  },

  '& h3': {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '32px',
    lineHeight: '39px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'right',
    color: '$mainTextColor',
    margin: '0',
  },

  '& h4': {
    margin: '5px 0 0',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '32px',
    lineHeight: '39px',
    display: 'flex',
    alignitems: 'center',
    color: '$mainTextColor',
  },

  '& span': {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '17px',
    display: 'flex',
    alignitems: 'center',
    color: '#767D8E',

    '@sm': {
      fontWeight: '600',
      display: 'block',
    },
  },

  '& p': {
    margin: '5px 0 0',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '22px',
    display: 'flex',
    alignitems: 'center',
    color: '$mainTextColor',

    '@sm': {
      minWidth: '135px',
      fontWeight: '600',
      display: 'block',
    },
  },
});

export const PriceWrapper = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',

  '@sm': {
    alignItems: 'flex-end',
  },
});

export const CurrentPriceWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const OfferLabel = styled('div', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '18px',
  color: '$greyMid',

  '@sm': {
    fontSize: '14px',
    lineHeight: '17px',
  },
});

export const OfferPrice = styled('div', {
  margin: '5px 0 0',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '32px',
  lineHeight: '39px',
  display: 'flex',
  alignItems: 'center',
  color: '$mainTextColor',
});

export const MarketPrice = styled('div', {
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '32px',
  lineHeight: '39px',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'right',
  color: '$mainTextColor',
  margin: '0',

  '@sm': {
    color: '$greyMid',
    fontSize: '20px',
    lineHeight: '24px',
  },
});

export const LogoWrapper = styled('div', {
  marginRight: '12px',
  width: '42px',
  height: '42px',
  borderRadius: '50%',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',

  variants: {
    size: {
      large: {
        width: '60px',
        height: '60px',
      },
      small: {
        width: '30px',
        height: '30px',
      },
    },
  },
});

export const FlexRight = styled('div', {
  display: 'flex',
  width: '50%',
  alignItems: 'center',
});

export const AccordionTrigger = styled(Accordion.Trigger, {
  color: '$mainTextColor',

  variants: {
    backgroundColor: {
      open: {
        background: '$openAccordion',
        borderRadius: '0px',

        '@sm': {
          borderTopLeftRadius: '15px',
          borderTopRightRadius: '15px',
        },
      },
      notopen: {
        background: '$closeAccordion',
      },
      none: {
        backgroundColor: 'unset',
      },
    },
    padding: {
      small: {
        padding: '0 15px',
        height: '44px',
      },
      medium: {
        padding: '25px 25px',
      },
    },
    borderTop: {
      none: {
        border: 'none',
      },
      borderSet: {
        borderRadius: '0px 0px 15px 15px',
        borderTop: '1.5px solid $borderColor',
        borderRight: 'none',
        borderLeft: 'none',
        borderBottom: 'none',
      },
      full: {
        border: 'none',
        borderRadius: '15px',
      },
    },
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  fontSize: '16px',
  lineHeight: '19px',
  cursor: 'pointer',
  boxSizing: 'border-box',
  fontFamily: 'proxima-nova, sans-serif',

  '& div': {
    display: 'flex',

    '& img': {
      marginRight: '10px',
    },
  },

  '& p': {
    margin: '0',
    fontStyle: 'normal',
    fontWeight: '500',
    variants: {
      fontSize: {
        small: {
          fontSize: '16px',
          lineHeight: '19px',
        },
        medium: {
          fontSize: '18px',
          lineHeight: '22px',
        },
      },
    },
    display: 'flex',
    alignItems: 'center',

    '& span': {
      margin: '0 0 0 5px',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '19px',
      display: 'flex',
      alignItems: 'center',
      color: '$primary',
    },
  },

  '&:focus': {
    outline: 'none',
  },
});

export const AccordionContent = styled(Accordion.Content, {
  color: '$mainTextColor',
  overflow: 'scroll',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },

  '&[data-state="open"]': {
    animation: `${slideDown} 700ms cubic-bezier(0.87, 0, 0.13, 1) forwards`,
  },

  '&[data-state="closed"]': {
    animation: `${slideUp} 600ms cubic-bezier(0.87, 0, 0.13, 1) forwards`,
  },

  variants: {
    backgroundColor: {
      open: {
        background: '$openAccordion',
      },
      notopen: {
        backgroundColor: '$closeAccordion',
      },
      none: {
        backgroundColor: 'unset',
      },
    },
    padding: {
      small: {
        padding: '0 15px',
      },
      medium: {
        padding: '0 25px',
      },
      none: {
        padding: '0',
      },
    },
  },
  borderBottomLeftRadius: '15px',
  borderBottomRightRadius: '15px',
  fontSize: '16px',
  lineHeight: '19px',
  border: 'none',
});

export const Form = styled('div', {
  width: '100%',
});

export const Description = styled('p', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '19px',
  color: '#777E90',
  margin: '0',
  padding: '15px 0 25px',

  '@sm': {
    fontSize: '14px',
  },
});

export const Flex = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const Subtext = styled('p', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '19px',
  color: '#777E90',
  margin: '10px 0px',

  '&:last-child': {
    fontWeight: 'bold',
    color: '$mainTextColor',
  },

  '@sm': {
    fontSize: '14px',
  },
});

export const ButtonWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  padding: '25px 0',
});

export const PlugButtonWrapper = styled('div', {
  paddingTop: '30px',

  '.plug-button': {
    marginLeft: '0px',
  },

  '@sm': {
    padding: '20px 0',
  },
});

export const UndefinedPrice = styled('div', {
  fontSize: '32px',
  color: '$greyMid',
});

export const OffersCount = styled('div', {
  marginLeft: '5px',
});

export const ButtonListWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  paddingTop: '30px',

  '@sm': {
    padding: '0px',
    marginLeft: '0px',
    margin: '20px 0px',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export const ButtonDetailsWrapper = styled('div', {
  marginLeft: '0px',

  variants: {
    isTriggerVisible: {
      true: {
        '@sm': {
          flex: '0.5',
          marginLeft: '5px',
        },
      },
      false: {
        display: 'none',
      },
    },
  },
});

export const CheckboxSkeletonWrapper = styled(SkeletonBox, {
  borderRadius: '15px',
  marginBottom: '25px',
  padding: '0 15px',
  height: '44px',
  width: '270px',
});

export const ItemCount = styled('span', {
  margin: '0 0 0 5px',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '19px',
  display: 'flex',
  alignItems: 'center',
  color: '$checkboxSelectedFiltersText',
});
