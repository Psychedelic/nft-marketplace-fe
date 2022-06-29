import { Routes } from '../constants/routes';

export const openSonicURL = () => {
  window.open(Routes.routeToSonic, '_blank');
};
