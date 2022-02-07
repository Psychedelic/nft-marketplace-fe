import { styled } from '../../stitches.config';

export const Container = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
});

export const PreviewContainer = styled('div', {
  width: '100%',
  maxWidth: '480px',
  display: 'flex',
  flexDirection: 'column',
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
});
