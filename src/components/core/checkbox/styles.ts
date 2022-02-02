import { styled } from '../../../stitches.config';

export const Wrapper = styled('div', {
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
});
