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
  '&:hover': {
    boxShadow: '0px 0px 8px 3px $navBackgroundColor',
    transform: 'scale(1.015)',
  },
});

export const CardWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  background: '$backgroundColor',
  border: '1.5px solid $borderColor',
  boxSizing: 'border-box',
  boxShadow: '0px 0px 8px $navBackgroundColor',
  borderTopRightRadius: '14px',
  borderTopLeftRadius: '14px',
  width: '100%',
  // height: '100%',
  padding: '10px 10px 3px',
  cursor: 'pointer',
  transition: 'all 0.5s ease-in-out',
});

export const PreviewDetails = styled('div', {
  minHeight: '175px',
});

export const PreviewImage = styled('img', {
  width: '100%',
  objectFit: 'cover',
  borderRadius: '14px',
});

export const VideoPlayer = styled(HoverVideoPlayer, {
  marginBottom: '10px',
  video: {
    minHeight: '175px',
    borderRadius: '14px',
  },
});

export const VideoLoader = styled('div', {
  position: 'absolute',
  left: '40%',
  top: '40%',
  transform: 'translate(-60%, -60%)',
  width: '2em',
  height: '2em',
  border: '2px solid white',
  borderRadius: '50%',
  borderColor: 'white white transparent transparent',
  animation: `${overlaySpinner} 1s linear infinite`,
});

export const Flex = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '&:nth-child(1)': {
    padding: '5px 0 10px',
  },

  '& p': {
    margin: '4px 0',
  },
});

export const OwnedCardText = styled('p', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '12px',
  lineHeight: '15px',
  color: '#777E90',
  margin: '0',
});

export const Dfinity = styled('p', {
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '20px',
  color: '$mainTextColor',
  display: 'flex',
  alignItems: 'center',

  '& img': {
    marginRight: '3px',
    width: '15px',
  },
});

export const NftText = styled('p', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '20px',
  color: '$nftCardName',
});

export const NftId = styled('p', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '20px',
  color: '$nftCardId',
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

export const ActionText = styled('p', {
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '20px',
  color: '#2253FF',
  cursor: 'pointer',
});

export const OuterFlex = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '$nftCardSubSection',
  borderRight: '1.5px solid $borderColor',
  borderLeft: '1.5px solid $borderColor',
  borderBottom: '1.5px solid $borderColor',
  borderBottomRightRadius: '14px',
  borderBottomLeftRadius: '14px',
  padding: '3px 10px',

  '& p': {
    margin: '4px 0',
  },
});
