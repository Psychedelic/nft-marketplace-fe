import { styled } from '../../stitches.config';
import background from '../../assets/nft-background.png';
import { Icon } from '../icons';

export const NftMetadataWrapper = styled('div', {
  display: 'block',
  fontFamily: 'proxima-nova, sans-serif',
  backgroundColor: '$backgroundColor',
});

export const NftMetadataBackground = styled('div', {
  height: '200px',
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
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
  },
});

export const NftMetadataContentWrapper = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: '25px',
  position: 'relative',
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
});

export const Subtext = styled('p', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '19px',
  color: '#777E90',
  maxWidth: '600px',
  marginBottom: '0px',
});

export const ButtonsWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '25px',
});

export const HeaderWrapper = styled('div', {
  marginLeft: '140px',
});

export const VerifiedIcon = styled(Icon, {
  color: '$primary',
});
