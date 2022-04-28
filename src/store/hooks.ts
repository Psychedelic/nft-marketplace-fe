import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
// eslint-disable-next-line
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;
