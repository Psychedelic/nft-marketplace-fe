import { styled } from '../../stitches.config';

export const NftMetadataWrapper = styled('div', {
  display: 'block',
});

export const NftMetadataBackground = styled('img', {
  width: '100%',
});

export const NftMetadataContent = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginTop: '2%',
  padding: '0 50px',
});

export const NftMetadataContentWrapper = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
});

export const NftProfilePictureWrapper = styled('div', {
  border: '2px solid white',
  marginRight: '10px',

  '& img': {
    borderRadius: '100%',
    objectFit: 'cover',
    width: '180px',
    height: '180px',
    position: 'relative',
    top: '-90px',
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
});

export const ButtonsWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
});
