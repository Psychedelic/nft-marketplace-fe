import { styled } from '../../stitches.config';

export const CollectionMetadataWrapper = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '670px',
  marginBottom: '25px',
});

export const Heading = styled('h3', {
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '32px',
  lineHeight: '39px',
  display: 'flex',
  alignItems: 'center',
  color: '#23262F',
  margin: '0 0 10px',
});

export const Subtext = styled('p', {
  display: 'flex',
  alignItems: 'center',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '18px',
  lineHeight: '20px',
  color: '#767D8E',
  margin: '0',

  '& img': {
    marginLeft: '5px',
  },
});
