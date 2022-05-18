import { styled } from '../../stitches.config';

export const Container = styled('div', {
  width: '100%',
  height: '72px',
  // background: '#FAFBFD',
  background: '$backgroundColor',
  paddingBottom: '30px',
});

export const NftActionBarWrapper = styled('div', {
  maxWidth: '1190px',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: 'auto',
});

export const ActionText = styled('p', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '19px',
  color: '#777E90',
  display: 'flex',
  margin: '0',
  textTransform: 'capitalize',

  '& img': {
    marginRight: '5px',
  },
});

export const ButtonListWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const ButtonWrapper = styled('div', {
  marginLeft: '10px',
});
