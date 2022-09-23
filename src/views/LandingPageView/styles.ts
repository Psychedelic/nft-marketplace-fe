import { styled } from '../../stitches.config';
import greenJellyIcon from '../../assets/landingpage/green-jelly.svg';
import greenJellyIconDark from '../../assets/landingpage/green-jelly-dark-mode.svg';
import pinkJellyIcon from '../../assets/landingpage/pink-jelly.svg';
import pinkJellyIconDark from '../../assets/landingpage/pink-jelly-dark-mode.svg';
import blueJellyIcon from '../../assets/landingpage/blue-jelly.svg';
import blueJellyIconDark from '../../assets/landingpage/blue-jelly-dark-mode.svg';
import yellowJellyIcon from '../../assets/landingpage/yellow-jelly.svg';
import yellowJellyIconDark from '../../assets/landingpage/yellow-jelly-dark-mode.svg';
import { Icon } from '../../components';

export const Container = styled('div', {
  backgroundColor: '$primaryBackgroundColor',
  paddingTop: '76px',
  overflow: 'hidden',
});

export const IntroContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
});

export const IntroBackgroundContainer = styled('div', {
  position: 'absolute',
  pointerEvents: 'none',
  userSelect: 'none',
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px',
});

export const IntroBackgroundImageWrapper = styled('div', {
  display: 'contents',
});

export const IntroBackgroundImage = styled('img', {
  width: '100%',
  height: '100%',
  objectPosition: 'center',
  objectFit: 'cover',
});

export const IntroDetailsContainer = styled('div', {
  padding: '80px 10px 60px 10px',
  position: 'relative',
  display: 'flex',

  '@md': {
    flexWrap: 'wrap',
  },
});

export const IntroDetailsWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '20px',
  maxWidth: '700px',
  margin: 'auto',

  '@md': {
    flexWrap: 'wrap',
    padding: '0px 10px',
  },
});

export const IntroDetailsTitle = styled('h1', {
  fontSize: '45px',
  lineHeight: '52px',
  fontWeight: '600',
  margin: '0px',
  textAlign: 'center',
  color: '$primaryTextColor',

  '@md': {
    fontSize: '42px',
    lineHeight: '42px',
  },

  '@sm': {
    fontSize: '26px',
    lineHeight: '26px',
  },
});

export const IntroDetailsDescription = styled('p', {
  fontSize: '22px',
  lineHeight: '1.5em',
  fontWeight: '400',
  textAlign: 'start',
  margin: '0px',
  color: '$secondaryTextColor',
  maxWidth: '560px',

  '@md': {
    fontSize: '18px',
  },
});

export const ViewCollectionButtonWrapper = styled('div', {
  height: '50px',
  marginTop: '25px',
  display: 'flex',

  '@md': {
    margin: '0px 0 20px',
  },

  '@sm': {
    width: '100%',
    justifyContent: 'center',
  },
});

export const ButtonWrapper = styled('div', {
  width: '200px',

  '&:nth-child(1)': {
    marginRight: '15px',
  },

  '@md': {
    width: '180px',
  },
});

export const ButtonSpan = styled('span', {
  marginRight: '5px',

  variants: {
    icns: {
      darkMode: {
        color: '$primaryTextColor',
      },
    },
  },
});

export const IntroImageContainer = styled('div', {
  position: 'relative',
  margin: 'auto',
  top: '8px',
});

export const IntroImage = styled('img', {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
  objectPosition: 'center',
  objectFit: 'cover',
});

export const FeaturesContainer = styled('div', {
  padding: '120px 10px 0px 10px',
  position: 'relative',
});

export const FeaturesWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '30px',
  maxWidth: '1200px',
  margin: 'auto',
});

export const FeaturesTitle = styled('h1', {
  fontSize: '38px',
  lineHeight: '1.1em',
  letterSpacing: '-2px',
  fontWeight: '600',
  margin: '0px',
  textAlign: 'center',
  color: '$primaryTextColor',

  '@md': {
    fontSize: '28px',
  },

  '@sm': {
    fontSize: '26px',
  },
});

export const FeaturesList = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '30px',
  width: '100%',
  margin: '30px 0px 0px',

  '&:nth-child(3)': {
    margin: 'auto',
    position: 'relative',
    left: '50px',

    '@md': {
      left: 'unset',
    },
  },
});

export const FeaturesListItem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '455px',
  gap: '12px',
  padding: '30px 40px 20px',
  boxShadow: '0px 1px 24px 1px rgba(0, 0, 0, 0.24)',
  borderRadius: '16px',
  position: 'relative',
  boxSizing: 'border-box',

  // variants
  variants: {
    backgroundTheme: {
      green: {
        background: '$greenGradient',
      },
      pink: {
        background: '$pinkGradient',
      },
      blue: {
        background: '$blueGradient',
      },
      yellow: {
        background: '$yellowGradient',
      },
    },
  },
});

export const FeatureIcon = styled('div', {
  width: '50px',
  height: '50px',
  backgroundImage: `url(${greenJellyIcon})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  position: 'absolute',
  top: '11px',
  left: '18px',

  // variants
  variants: {
    iconTheme: {
      green: {
        backgroundImage: `url(${greenJellyIcon})`,
      },
      greenDark: {
        backgroundImage: `url(${greenJellyIconDark})`,
      },
      pink: {
        backgroundImage: `url(${pinkJellyIcon})`,
      },
      pinkDark: {
        backgroundImage: `url(${pinkJellyIconDark})`,
      },
      blue: {
        backgroundImage: `url(${blueJellyIcon})`,
      },
      blueDark: {
        backgroundImage: `url(${blueJellyIconDark})`,
      },
      yellow: {
        backgroundImage: `url(${yellowJellyIcon})`,
      },
      yellowDark: {
        backgroundImage: `url(${yellowJellyIconDark})`,
      },
    },
  },
});

export const FeatureTitle = styled('h1', {
  fontSize: '22px',
  lineHeight: '1.1em',
  fontWeight: '700',
  letterSpacing: '-0.5px',
  margin: '0px',
  textAlign: 'left',
  color: '$primaryTextColor',
  position: 'relative',
});

export const FeatureDescription = styled('p', {
  fontSize: '16px',
  lineHeight: '1.6em',
  fontWeight: '400',
  letterSpacing: '-0.4px',
  margin: '0px',
  textAlign: 'left',
  color: '$grayAzure',
});

export const MultichainContainer = styled('div', {
  padding: '120px 10px',
  position: 'relative',
});

export const MultichainWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  maxWidth: '1200px',
  margin: 'auto',
});

export const MultichainTitle = styled('h1', {
  fontSize: '38px',
  lineHeight: '1em',
  fontWeight: '600',
  margin: '0px',
  textAlign: 'center',
  color: '$primaryTextColor',

  '@md': {
    fontSize: '28px',
  },

  '@sm': {
    fontSize: '26px',
  },
});

export const MultichainDescription = styled('p', {
  fontSize: '18px',
  lineHeight: '1.5em',
  fontWeight: '400',
  maxWidth: '700px',
  margin: '0px',
  textAlign: 'center',
  color: '$secondaryTextColor',

  '@md': {
    fontSize: '16px',
  },
});

export const MultichainDescriptionLink = styled('a', {
  fontWeight: 'bold',
  margin: '0px 5px',
  color: '$tableLinkTextColor',
});

export const MultichainHubList = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '60px',
  paddingTop: '20px',
});

export const MultichainHubListItem = styled('img', {
  width: '100%',
  maxWidth: '180px',
});

export const RecentActivity = styled('div', {
  width: '100%',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  padding: '0px 85px',
  background: '$whiteSmoke',
  color: '$mainTextColor',

  '@md': {
    padding: '0px 15px',
  },
});

export const RecentActivityText = styled('p', {
  margin: '0',
  fontSize: '14px',
  color: '$steel',
  marginLeft: '8px',
});

export const RecentActivityCrownName = styled('span', {
  fontSize: '16px',
  color: '$primary',
  textDecoration: 'underline',
  fontWeight: '600',
  margin: '0px 8px 0px 0px',
});

export const RecentActivityAmountSold = styled('span', {
  fontSize: '16px',
  color: '$primaryTextColor',
  fontWeight: '600',
  margin: '0px 8px',
});

export const Footer = styled('div', {
  background: '$whiteSmoke',
  width: '100%',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0px 85px',
  boxSizing: 'border-box',

  '@md': {
    padding: '0px 15px',
  },
});

export const Flex = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const FooterText = styled('div', {
  fontSize: '14px',
  color: '$mainTextColor',
  lineHeight: '18px',
  margin: '0 8px',

  '&:nth-child(1)': {
    '@sm': {
      display: 'none',
    },
  },

  variants: {
    themeColor: {
      steel: {
        color: '$steel',
      },
      primary: {
        color: '$mainTextColor',
      },
    },
  },
});

export const SocialIcons = styled(Icon, {
  border: '1px solid $steel',
  borderRadius: '12px',
  padding: '8px',
  color: '$mainTextColor',
  cursor: 'pointer',

  '&:nth-child(2)': {
    margin: '0px 5px',
  },
});
