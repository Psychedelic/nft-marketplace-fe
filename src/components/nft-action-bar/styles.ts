import { styled } from '../../stitches.config';

export const Container = styled('div', {
  width: '100%',
  height: '72px',
  // background: '#FAFBFD',
  background: '$backgroundColor',
  paddingBottom: '30px',

  '@md': {
    padding: '0px 14px',
    width: 'unset',
    height: 'unset',
    margin: '10px 0px 20px',
  },
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
  cursor: 'pointer',

  '& img': {
    marginRight: '5px',
  },
});

export const ButtonListWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  marginLeft: '10px',

  '@md': {
    marginLeft: '0px',
    margin: '20px 0px',
    justifyContent: 'space-between',
  },
});

export const ButtonWrapper = styled('div', {
  marginLeft: '0px',

  variants: {
    isTriggerVisible: {
      true: {
        '@md': {
          flex: '0.5',
          marginLeft: '20px',

          '&:first-child': {
            marginLeft: 'unset',
          },
        },
      },
      false: {
        display: 'none',
      },
    },
  },
});
