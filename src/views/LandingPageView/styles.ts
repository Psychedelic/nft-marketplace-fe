import { styled } from '../../stitches.config';
import greenJellyIcon from '../../assets/landingpage/green-jelly.png';
import pinkJellyIcon from '../../assets/landingpage/pink-jelly.png';
import blueJellyIcon from '../../assets/landingpage/blue-jelly.png';
import yellowJellyIcon from '../../assets/landingpage/yellow-jelly.png';

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
});

export const IntroDetailsWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  maxWidth: '700px',
  margin: 'auto',
});

export const IntroDetailsTitle = styled('h1', {
  fontSize: '52px',
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
  textAlign: 'center',
  margin: '0px',
  color: '$secondaryTextColor',

  '@md': {
    fontSize: '18px',
  },
});

export const ViewCollectionButtonWrapper = styled('div', {
  width: '155px',
  height: '50px',
  marginLeft: '10px',
});

export const IntroImageContainer = styled('div', {
  position: 'relative',
  maxWidth: '800px',
  width: '80%',
  margin: 'auto',
  top: '8px',
  borderRadius: '10px 10px 0px 0px',
  boxShadow: 'rgb(61 61 61 / 20%) 0px -5px 20px 10px',
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
  fontSize: '42px',
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
  gap: '30px 50px',
  width: '100%',
  margin: 'auto',
});

export const FeaturesListItem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '455px',
  gap: '18px',
  padding: '20px 20px 20px 20px',
  border: '4px solid $primaryTextColor',
  borderRadius: '30px',

  // variants
  variants: {
    borderTheme: {
      green: {
        borderColor: '$lightGreen',
      },
      pink: {
        borderColor: '$lightPink',
      },
      blue: {
        borderColor: '$lightBlue',
      },
      yellow: {
        borderColor: '$yellow',
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

  // variants
  variants: {
    iconTheme: {
      green: {
        backgroundImage: `url(${greenJellyIcon})`,
      },
      pink: {
        backgroundImage: `url(${pinkJellyIcon})`,
      },
      blue: {
        backgroundImage: `url(${blueJellyIcon})`,
      },
      yellow: {
        backgroundImage: `url(${yellowJellyIcon})`,
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
});

export const FeatureDescription = styled('p', {
  fontSize: '18px',
  lineHeight: '1.6em',
  fontWeight: '400',
  letterSpacing: '-0.4px',
  margin: '0px',
  textAlign: 'left',
  color: '$secondaryTextColor',
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
  fontSize: '42px',
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
  fontSize: '22px',
  lineHeight: '1.5em',
  fontWeight: '400',
  maxWidth: '700px',
  margin: '0px',
  textAlign: 'center',
  color: '$secondaryTextColor',

  '@md': {
    fontSize: '18px',
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
  maxWidth: '205px',
});