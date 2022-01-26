import * as Accordion from '@radix-ui/react-accordion';
import { styled } from '../../../stitches.config';

export const AccordionStyle = styled(Accordion.Root, {
  border: '2px solid #E5E8EB',
  borderRadius: '15px',
  variants: {
    backgroundColor: {
      open: {
        backgroundColor: '#FAFBFD',
      },
      notopen: {
        backgroundColor: 'white',
      },
    },
    width: {
      small: {
        width: '300px',
      },
      medium: {
        width: '650px',
      },
    },
  },
});

export const AccordionHead = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '35px 25px',
});

export const AccordionHeadContent = styled('div', {
  display: 'flex',

  '& img': {
    marginRight: '12px',
  },

  '& span': {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '17px',
    display: 'flex',
    alignitems: 'center',
    color: '#767D8E',
  },

  '& p': {
    margin: '5px 0 0',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '22px',
    display: 'flex',
    alignitems: 'center',
    color: '#23262F',
  },
});

export const AccordionTrigger = styled(Accordion.Trigger, {
  variants: {
    backgroundColor: {
      open: {
        backgroundColor: '#FAFBFD',
      },
      notopen: {
        backgroundColor: 'white',
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
        borderTop: '1.5px solid #E5E8EB',
        borderRight: 'none',
        borderLeft: 'none',
        borderBottom: 'none',
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
    color: '#23262F',

    '& span': {
      margin: '0',
      fontStyle: 'normal',
      fontWeight: '800',
      fontSize: '16px',
      lineHeight: '19px',
      display: 'flex',
      alignItems: 'center',
      color: '#2253FF',
    },
  },
});

export const AccordionContent = styled(Accordion.Content, {
  backroundColor: 'transparent',
  variants: {
    padding: {
      small: {
        padding: '0 15px',
      },
      medium: {
        padding: '0 25px',
      },
    },
  },
  fontSize: '16px',
  lineHeight: '19px',
  border: 'none',
});

export const Description = styled('p', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '19px',
  color: '#777E90',
  margin: '0 0 25px',
});

export const MetaDataWrapper = styled('div', {
  '& div': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& p': {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '19px',
      color: '#777E90',
      margin: '10px 0px',

      '&:last-child': {
        fontWeight: 'bold',
        color: '#23262F',
      },
    },
  },
});

export const ButtonWrapper = styled('div', {
  width: '30%',
  margin: '25px 0',
});
