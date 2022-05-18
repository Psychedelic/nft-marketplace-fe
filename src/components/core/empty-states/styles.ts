import { styled } from '../../../stitches.config';

export const EmptyStateWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
});

export const EmptyStateMessage = styled('p', {
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '32px',
  lineHeight: '39px',
  color: '$mainTextColor',
  marginBottom: '12px',
});

export const ButtonWrapper = styled('div', {
  height: '50px',
  margin: '10px',

  '.plug-button': {
    marginLeft: '0px',
  },
});
