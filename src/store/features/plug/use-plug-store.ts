import { useAppSelector } from '../../hooks';
import { selectPlugState } from './plug-slice';

export const usePlugStore = () => useAppSelector(selectPlugState);
