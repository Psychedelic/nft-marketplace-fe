import { useAppSelector } from '../../hooks';
import { selectNotificationState } from './notifications-slice';

export const useErrorsStore = () =>
  useAppSelector(selectNotificationState);
