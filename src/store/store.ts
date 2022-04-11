/* eslint-disable */
import { configureStore } from '@reduxjs/toolkit';

import plugReducer from './features/plug/plug-slice';
import filterReducer from './features/filters/filter-slice';
import themeReducer from './features/theme/theme-slice';
import nftsReducer from './features/nfts/nfts-slice';
import errorsReducer from './features/errors/errors-slice';
import settingsReducer from './features/settings/settings-slice';
import marketplaceReducer from './features/marketplace';
import tableReducer from './features/tables/table-slice';

export const store = configureStore({
  reducer: {
    plug: plugReducer,
    filter: filterReducer,
    theme: themeReducer,
    nfts: nftsReducer,
    errors: errorsReducer,
    settings: settingsReducer,
    marketplace: marketplaceReducer,
    table: tableReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
