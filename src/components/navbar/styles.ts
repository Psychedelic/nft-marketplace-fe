import { styled } from '../../stitches.config';
import { Icon } from '../icons';

export const Container = styled('div', {
  // base styles
  position: 'fixed',
  top: '38px',
  left: '0px',
  right: '0px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '14px 20px',
  backgroundColor: '$navBackgroundColor',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.08)',
  zIndex: 2,
});

export const LogoContainer = styled('div', {
  // base styles
  display: 'flex',
});

export const LogoIcon = styled('img', {
  width: '100px',
  marginRight: '7px',
});

export const LogoName = styled(Icon, {
  width: '68px',
  marginRight: '7px',
  marginTop: '5px',
});

export const ActionButtonsContainer = styled('div', {
  // base styles
  display: 'flex',
  alignItems: 'center',
});
