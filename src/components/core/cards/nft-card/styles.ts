import { styled, keyframes } from '../../../../stitches.config';
import { Link } from 'react-router-dom';
import { ImagePreload } from '../../../image-preload';
import { NumberTooltip } from '../../../number-tooltip';
import { VideoPreload } from '../../../video-preload';

const overlaySpinner = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
});

export const CardContainer = styled('div', {
  transition: 'all 0.2s ease-in-out',
});

export const CardWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  background: '$backgroundColor',
  border: '1.5px solid $borderColor',
  boxSizing: 'border-box',
  borderRadius: '14px',
  width: '100%',
  padding: '10px 15px',
  overflow: 'hidden',
  minWidth: '210px',

  transition: 'all 0.2s ease-in-out',
  boxShadow: '$default',
  '&:hover': {
    boxShadow: '$active',
  },
});

export const MediaWrapper = styled('div', {
  position: 'relative',
  minHeight: '175px',
  height: '175px',
  margin: '10px -15px',
});

export const PreviewDetails = styled('div', {
  minHeight: '175px',
  width: '100%',
  height: '100%',
});

export const PreviewImage = styled(ImagePreload, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '0px',
});

export const PreviewCardVideo = styled(VideoPreload, {
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  borderRadius: '0px',
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

export const ActionDetails = styled('span', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '14px',
  color: '$nftCardName',

  '& b': {
    color: '$mainTextColor',
  },
});

export const ActionText = styled('span', {
  marginRight: '5px',
});

export const NFTCardOptions = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '$nftCardSubSection',
  padding: '5px 15px',

  minHeight: '28px',
  margin: '10px -15px -10px -15px',

  '& p': {
    margin: '0',
  },
});

export const PriceInActionSheet = styled(NumberTooltip, {
  fontSize: '14px',
  fontWeight: '700',
  color: '$mainTextColor',
});

export const HoverMessageContainer = styled('span', {
  position: 'absolute',
  bottom: '2px',
  left: '2px',
  right: '2px',
  borderRadius: '4px',

  textAlign: 'center',
  fontSize: '10px',

  backgroundColor: '$backgroundColor',
  color: '$mainTextColor',
});

export const RouterLink = styled(Link, {
  variants: {
    previewCard: {
      true: {
        pointerEvents: 'none',
      },
    },
  },
});
