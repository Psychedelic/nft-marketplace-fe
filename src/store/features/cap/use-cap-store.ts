import { useAppSelector } from '../../hooks';
import { RootState } from '../../store';

export const selectCapState = (state: RootState) => state.cap;

export const useCapStore = () => useAppSelector(selectCapState);
