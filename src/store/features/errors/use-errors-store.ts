import { useAppSelector } from '../../hooks';
import { selectErrorState } from './errors-slice';

export const useErrorsStore = () => useAppSelector(selectErrorState);
