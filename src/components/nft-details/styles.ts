import { styled } from '../../stitches.config';

export const Container = styled('div', {
  width: '100%',
  marginBottom: '20px',
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
});

export const PreviewContainer = styled('div', {
  width: '100%',
  maxWidth: '480px',
});

export const Video = styled('video', {
  width: '100%',
  height: 'auto',
  borderRadius: '14px',
  maxWidth: '100%',
  maxHeight: '100%',
  minHeight: '470px',
  marginBottom: '10px',
});

export const NFTPreview = styled('img', {
  width: '100%',
  maxWidth: '480px',
  marginBottom: '25px',
});

export const NFTTraitsContainer = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
});

export const DetailsContainer = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  padding: '0px 0px 0px 30px',
});

export const NftDetailTraitSkeleton = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
});

export const NFTTraitsChipSkeleton = styled('div', {
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  padding: '12px 15px',
  borderRadius: '14px',
  background: '$skeletonBackground',
  minWidth: '150px',
  border: '1.5px solid $borderColor',
  margin: '0px 15px 15px 0px',
  height: '85px',

  '&:nth-child(3)': {
    marginRight: '0px',
  },
});

