import { styled } from '../../stitches.config';

export const Container = styled('div', {
  // base styles
  position: 'fixed',
  top: '0px',
  left: '0px',
  right: '0px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '14px 20px',
  background: '#FFFFFF',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.08)',
});

export const LogoContainer = styled('div', {
  // base styles
  display: 'flex',
});

export const LogoIcon = styled('img', {
  width: '48px',
  marginRight: '7px',
});

export const LogoName = styled('img', {
  width: '68px',
  marginRight: '7px',
  marginTop: '5px',
});

export const ActionButtonsContainer = styled('div', {
  // base styles
  display: 'flex',
});
