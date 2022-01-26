import * as Accordion from '@radix-ui/react-accordion';
import { styled } from '../../../stitches.config';

export const AccordionStyle = styled(Accordion.Root, {
  border: '2px solid #E5E8EB',
  borderRadius: '14px',
  background: '#FAFBFD',
  variants: {
    backgroundColor: {
      open: {
        backgroundColor: '#FAFBFD',
      },
      notopen: {
        backgroundColor: 'white',
      },
    },
  },
  width: '300px',
});

export const AccordionTrigger = styled(Accordion.Trigger, {
  backgroundColor: 'transparent',
  height: '44px',
  padding: '0 15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  fontSize: '16px',
  lineHeight: '19px',
  border: 'none',
  cursor: 'pointer',
  boxSizing: 'border-box',

  '& p': {
    margin: '0',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '19px',
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
  backgroundColor: 'transparent',
  padding: '0 15px',
  fontSize: '16px',
  lineHeight: '19px',
  border: 'none',

  '& div': {
    padding: '8px 0',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',

    '&:last-child': {
      paddingBottom: '15px',
    },

    '& label': {
      display: 'flex',
      alignItems: 'center',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '20px',
      color: '#23262F',

      '& input[type="checkbox"]': {
        marginRight: '8px',
        marginLeft: '0px',
        border: '1px solid #777E8F',
        boxSizing: 'border-box',
        borderRadius: '4px',
        width: '22px',
        height: '17px',
        cursor: 'pointer',
      },
    },

    '& span': {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '13px',
      lineHeight: '20px',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'right',
      color: '#777E8F',
    },
  },
});
