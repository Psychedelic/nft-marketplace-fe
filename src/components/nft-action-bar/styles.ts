import { styled } from '../../stitches.config';

export const NftActionBarWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const ActionText = styled('p', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '19px',
  color: '#777E90',
  display: 'flex',
  margin: '0',

  '& img': {
    marginRight: '5px',
  },
});

export const ButtonWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  width: '25%',

  '& button:first-child': {
    marginRight: '5px',
  },
});
