import { styled } from '../../stitches.config';

export const Container = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
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
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const Video = styled('video', {
  width: '100%',
  height: 'auto',
  borderRadius: '14px',
  maxWidth: '100%',
  maxHeight: '100%',
  minHeight: '125px',
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
