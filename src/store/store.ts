/* eslint-disable */
import { configureStore } from '@reduxjs/toolkit';

import plugReducer from './features/plug/plug-slice';
import filterReducer from './features/filters/filter-slice';
import themeReducer from './features/theme/theme-slice';

export const store = configureStore({
  reducer: {
    plug: plugReducer,
    filter: filterReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
