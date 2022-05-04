import HoverVideoPlayer from 'react-hover-video-player';
import { styled, keyframes } from '../../../../stitches.config';

const overlaySpinner = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
});

export const CardContainer = styled('div', {
  variants: {
    type: {
      true: {
        '&:hover': {
          transform: 'unset',
        },
      },
      false: {
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)',
        },
      },
    },
  },
});

export const CardWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  background: '$backgroundColor',
  border: '1.5px solid $borderColor',
  boxSizing: 'border-box',
  borderRadius: '14px',
  width: '100%',
  padding: '15px',
  overflow: 'hidden',

  transition: 'all 0.2s ease-in-out',
  boxShadow: '$default',
  '&:hover': {
    boxShadow: '$active',
  },
});

export const MediaWrapper = styled('div', {
  minHeight: '175px',
  height: '175px',
  margin: '10px -15px',

  '@lg': {
    height: '270px',
  },
});

export const PreviewDetails = styled('div', {
  minHeight: '175px',
  width: '100%',
  height: '100%',
});

export const PreviewImage = styled('img', {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const VideoPlayer = styled(HoverVideoPlayer, {
  height: '100%',
  width: '100%',
  video: {
    height: '100%',
  },
});

export const VideoLoader = styled('div', {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '2em',
  height: '2em',
  border: '2px solid white',
  borderRadius: '50%',
  borderColor: 'white white transparent transparent',
  animation: `${overlaySpinner} 1s linear infinite`,
  margin: '-15px',
});

export const Flex = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const OwnedCardText = styled('span', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '12px',
  lineHeight: '15px',
  color: '#777E90',
  margin: '0',
  height: '15px',
});

export const NftDataText = styled('span', {
  fontStyle: 'normal',
  fontWeight: 'bolder',
  fontSize: '18px',
  lineHeight: '24px',
  color: '$mainTextColor',
  display: 'flex',
  alignItems: 'center',

  '& img': {
    marginRight: '3px',
    width: '15px',
  },
});

export const NftDataHeader = styled('span', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '14px',
  color: '$nftCardName',
});

export const LastOffer = styled('span', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '12px',
  lineHeight: '15px',
  color: '#777E90',

  '& b': {
    color: '$mainTextColor',
  },
});

export const ActionText = styled('span', {
  fontStyle: 'normal',
  fontSize: '14px',
  color: '#2253FF',
  cursor: 'pointer',
});

export const NFTCardOptions = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '$nftCardSubSection',
  borderTop: '1.5px solid $borderColor',
  padding: '7.5px 15px',

  minHeight: '28px',
  margin: '10px -15px -15px -15px',

  '& p': {
    margin: '4px 0',
  },
});
