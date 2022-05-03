import { useAppSelector } from '../../hooks';
import { selectThemeState } from './theme-slice';

export const useThemeStore = () => useAppSelector(selectThemeState);
