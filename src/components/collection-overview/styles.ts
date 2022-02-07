import { styled } from '../../stitches.config';

export const NftMetadataWrapper = styled('div', {
  display: 'block',
});

export const NftMetadataBackground = styled('img', {
  width: '100%',
  maxHeight: '200px',
});

export const NftMetadataContent = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  margin: '20px 0px 25px',
  padding: '0 50px',
});

export const NftMetadataContentWrapper = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
});

export const NftProfilePictureWrapper = styled('div', {
  position: 'absolute',
  border: '2px solid white',
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
  color: '#23262F',
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
  width: '600px',
  marginBottom: '0px',
});

export const ButtonsWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const HeaderWrapper = styled('div', {
  marginLeft: '140px',
});
