import { styled } from '../../stitches.config';
import background from '../../assets/nft-background.png';
import defaultBg from '../../assets/default-banner.svg';
import { Icon } from '../icons';
import { SkeletonBox } from '../core';

export const NftMetadataWrapper = styled('div', {
  display: 'block',
  fontFamily: 'proxima-nova, sans-serif',
  backgroundColor: '$backgroundColor',
});

export const NftMetadataBackground = styled('div', {
  height: '200px',
  backgroundImage: `url(${defaultBg})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  display: 'none',

  // variants
  variants: {
    collectionName: {
      crowns: {
        backgroundImage: `url(${background})`,
      },
      default: {
        backgroundImage: `url(${defaultBg})`,
      },
    },
  },
});

export const NftMetadataContent = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  margin: '20px auto 0',
  padding: '0px 80px 0px',

  '@md': {
    justifyContent: 'center',
    padding: '0px 14px 0px',
  },
});

export const NftMetadataContentWrapper = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: '25px',
  position: 'relative',

  '@md': {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const NftProfilePictureWrapper = styled('div', {
  position: 'absolute',
  marginRight: '10px',
  backgroundColor: 'black',
  border: '5px solid $backgroundColor',
  borderRadius: '100%',
  padding: '10px',
  top: '-65px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '96px',
  height: '96px',

  '& img': {
    width: '85%',
    position: 'relative',
  },

  '@md': {
    top: '-85px',
  },
});

export const Heading = styled('h2', {
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '32px',
  lineHeight: '39px',
  display: 'flex',
  alignItems: 'center',
  color: '$mainTextColor',
  margin: '0',

  '& img': {
    marginLeft: '10px',
  },

  '@md': {
    textAlign: 'center',
  },
});

export const Subtext = styled('p', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '19px',
  color: '#777E90',
  maxWidth: '600px',
  marginBottom: '0px',

  '@md': {
    textAlign: 'center',
  },
});

export const ButtonsWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '25px',
});

export const HeaderWrapper = styled('div', {
  marginLeft: '140px',

  '@md': {
    marginLeft: '0px',
    marginTop: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});

export const VerifiedIcon = styled(Icon, {
  color: '$primary',
});

export const FilteredCountChipsWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  margin: '0px 25px 15px',

  '@md': {
    margin: '0px 80px 15px',
  },

  '@sm': {
    margin: '0px 25px 15px',
  },
});

export const Divider = styled('div', {
  height: '1px',
  width: '100%',
  background: '$borderColor',
  margin: '20px 0px 40px',
});

export const FilteredCountChips = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '25px',
});

export const FilterChipSkeleton = styled(SkeletonBox, {
  width: '130px',
  height: '30px',
});
