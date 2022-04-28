import { useAppSelector } from '../../hooks';
import { selectFilterState } from './filter-slice';

export const useFilterStore = () => useAppSelector(selectFilterState);
