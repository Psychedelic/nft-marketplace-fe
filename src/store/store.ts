import { configureStore } from '@reduxjs/toolkit';

import plugReducer from './features/plug/plug-slice';

export const store = configureStore({
  reducer: {
    plug: plugReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
