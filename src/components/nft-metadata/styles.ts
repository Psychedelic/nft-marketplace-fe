import { styled } from '../../stitches.config';
import { Icon } from '../icons';

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
