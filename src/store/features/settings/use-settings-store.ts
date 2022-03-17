import { useAppSelector } from '../../hooks';
import { selectSettingsState } from './settings-slice';

export const useSettingsStore = () => useAppSelector(selectSettingsState);
