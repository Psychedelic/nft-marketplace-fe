import { styled } from '../../stitches.config';
import background from '../../assets/nft-background.png';

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
});

export const NftMetadataContentWrapper = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: '25px',
});

export const NftProfilePictureWrapper = styled('div', {
  position: 'absolute',
  border: 'transparent',
  marginRight: '10px',

  '& img': {
    borderRadius: '100%',
    objectFit: 'cover',
    width: '125px',
    height: '125px',
    position: 'relative',
    top: '-65px',
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
