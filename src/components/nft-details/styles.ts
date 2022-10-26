import { styled } from '../../stitches.config';
import { SkeletonBox } from '../core';
import { VideoPreload } from '../video-preload';
import gradientBg from '../../assets/gradient-card-bg.svg';

export const Container = styled('div', {
  width: '100%',
  marginBottom: '20px',

  '@md': {
    overflowX: 'hidden',
  },
});

export const Wrapper = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',

  // variants
  variants: {
    centered: {
      true: {
        justifyContent: 'center',
      },
    },
  },

  '@md': {
    flexWrap: 'wrap',
  },
});

export const PreviewContainer = styled('div', {
  width: '100%',
  maxWidth: '489px',

  '@md': {
    order: 2,
    padding: '0px 14px',
    maxWidth: 'unset',
    overflowX: 'hidden',
  },
});

export const Video = styled(VideoPreload, {
  width: '100%',
  height: 'auto',
  borderRadius: '14px',
  maxWidth: '100%',
  maxHeight: '100%',
  minHeight: '470px',
  marginBottom: '10px',

  '@md': {
    minHeight: 'unset',
    maxHeight: 'unset',
    marginTop: '10px',
  },
});

export const NFTPreview = styled('img', {
  width: '100%',
  maxWidth: '489px',
  marginBottom: '25px',
});

export const NFTTraitsContainer = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',

  '@md': {
    flexWrap: 'unset',
    overflowX: 'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',

    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const DetailsContainer = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  padding: '0px 0px 0px 30px',

  '@md': {
    order: '1',
    padding: '0px 14px',
  },
});

export const TraitsListLoaderSkeletonWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',

  '@md': {
    flexWrap: 'unset',
  },
});

export const NFTTraitsChipSkeleton = styled(SkeletonBox, {
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  padding: '12px 10px',
  borderRadius: '14px',
  minWidth: '150px',
  border: '1.5px solid $borderColor',
  margin: '0px 15px 15px 0px',
  height: '85px',

  '&:nth-child(3)': {
    marginRight: '0px',

    '@md': {
      marginRight: '15px',
    },
  },
});

export const PreviewImageSkeleton = styled(SkeletonBox, {
  width: '100%',
  maxWidth: '480px',
  height: '425px',
  marginBottom: '10px',
});

export const AccordionSkeletion = styled(SkeletonBox, {
  width: '100%',
  maxWidth: '670px',
  height: '214px',
  marginBottom: '25px',
});

export const Divider = styled('div', {
  height: '1px',
  background: '$borderColor',
  width: '100%',
  margin: '5px 0px 20px',
});

export const OfferAccordionDetails = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0px',
  flexWrap: 'wrap',

  // variants
  variants: {
    flexDirection: {
      column: {
        flexDirection: 'column',
      },
    },
  },
});

export const AboutAccordionDetails = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0px',
  flexWrap: 'wrap',

  '@md': {
    flexWrap: 'unset',
    overflowX: 'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',

    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const NameCardBg = styled('div', {
  position: 'relative',
  width: '100%',
  height: 'auto',
  backgroundImage: `url(${gradientBg})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  borderRadius: '30px',
  maxWidth: '100%',
  maxHeight: '100%',
  minHeight: '489px',
  marginBottom: '10px',

  '@md': {
    minHeight: 'unset',
    maxHeight: 'unset',
    marginTop: '10px',
  },
});

export const NameCardContainer = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',

  '@md': {
    minHeight: '400px',
  },
});

export const NameCardCollection = styled('img', {
  padding: '46px',
  minWidth: '170px',

  '@md': {
    padding: '26px',
    minWidth: '100px',
  },
});

export const NameCardTitle = styled('div', {
  position: 'absolute',
  bottom: '46px',
  left: '46px',
  fontSize: '50px',
  fontWeight: '600',
  textAlign: 'left',
  padding: '70px 0px 0px',
  color: '#000',
  width: 'calc(100% - 46px)',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',

  '@md': {
    width: 'calc(100% - 26px)',
    bottom: '26px',
    left: '26px',
    fontSize: '30px',
  },
});
