import { styled } from '../../../stitches.config';

export const Wrapper = styled('div', {
  padding: '8px 0',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',

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
    color: '$mainTextColor',
    width: '60%',
    cursor: 'pointer',

    '& input[type="checkbox"]': {
      display: 'none',
    },

    '& input[type="checkbox"] + span:before': {
      content: "\\00a0",
      marginRight: '8px',
      marginLeft: '0px',
      border: '1px solid #777E8F',
      boxSizing: 'border-box',
      borderRadius: '4px',
      width: '18px',
      height: '17px',
      cursor: 'pointer',
      display: 'inline-block',
    },

    '& input[type="checkbox"]:checked + span:before': {
      background: '#5542CF',
      borderColor: '#5542CF',
      color: '#ffffff',
      content: '\\2713',
      width: '18px',
      height: '17px',
      cursor: 'pointer',
      boxSizing: 'border-box',
      borderRadius: '4px',
      marginRight: '8px',
      marginLeft: '0px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    '& input[type="checkbox"]:checked + span:after': {
      fontWeight: 'bold',
      color: 'white'
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
