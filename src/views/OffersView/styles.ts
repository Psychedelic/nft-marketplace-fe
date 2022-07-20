import { Icon } from '../../components';
import { styled } from '../../stitches.config';

export const Container = styled('div', {
  width: '100%',
  paddingTop: '72px',
  backgroundColor: '$backgroundColor',

  // variants
  variants: {
    showAlerts: {
      true: {
        paddingTop: '110px',
      },
    },
  },

  '@sm': {
    overflow: 'hidden',
  },
});

export const TitleWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '32px 80px',

  '@sm': {
    margin: '32px 0px',
    paddingLeft: '15px',
  },
});

export const Title = styled('h2', {
  fontSize: '32px',
  fontWeight: '700',
  color: '$mainTextColor',
  margin: '0px',

  '@sm': {
    fontSize: '24px',
    lineHeight: '29px',
  },
});

export const ButtonListWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const ButtonDetailsWrapper = styled('div', {
  height: '44px',
  marginLeft: '15px',
});

export const StyledIcons = styled(Icon, {
  marginRight: '10px',
});
