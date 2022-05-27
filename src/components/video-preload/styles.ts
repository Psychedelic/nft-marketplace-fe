import { styled } from '../../stitches.config';
import { Icon } from '../icons';

export const VideoPreloadContainer = styled('div', {
  position: 'relative',
});

export const VideoPreloadStyles = styled('video', {});

export const VideoPreloadSpinner = styled(Icon, {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'white',
  zIndex: 10,
});
