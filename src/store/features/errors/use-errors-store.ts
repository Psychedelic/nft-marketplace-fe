import { useAppSelector } from '../../hooks';
import { selectNotificationState } from './errors-slice';

export const useErrorsStore = () =>
  useAppSelector(selectNotificationState);
