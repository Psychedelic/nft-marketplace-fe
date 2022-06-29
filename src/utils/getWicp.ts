import config from '../config/env';

export const getWicp = () => {
  window.open(config.getWicp, '_blank');
};
