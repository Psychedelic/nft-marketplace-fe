import { useAppSelector } from '../../hooks';
import { selectTableState } from './table-slice';

export const useTableStore = () => useAppSelector(selectTableState);
