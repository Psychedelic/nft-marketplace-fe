import { styled } from '../../stitches.config';
import { Icon } from '../icons';

export const Container = styled('div', {
  width: '100%',
});

export const CollectionMetadataWrapper = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '670px',
  marginBottom: '25px',

  '@sm': {
    marginBottom: '0px',
  },
});

export const Heading = styled('h3', {
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '32px',
  lineHeight: '39px',
  display: 'flex',
  alignItems: 'center',
  color: '$mainTextColor',
  margin: '0 0 10px',
});

export const Subtext = styled('p', {
  display: 'flex',
  alignItems: 'center',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '18px',
  lineHeight: '20px',
  color: '#767D8E',
  margin: '0',
});

export const VerifiedIcon = styled(Icon, {
  color: '$primary',
  width: '16px',
});

export const Divider = styled('div', {
  height: '1px',
  background: '$borderColor',
  width: '100%',
  marginTop: '20px',
});
