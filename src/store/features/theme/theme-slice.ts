import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';

export interface ThemeState {
  theme: string | null;
}

const getTheme = localStorage.getItem('theme');

const initialState: ThemeState = {
  theme: getTheme ? 'lightTheme' : getTheme,
};

console.log(getTheme);

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
      console.log(action.payload);
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const themeActions = themeSlice.actions;

export const selectThemeState = (state: RootState) => state.theme;

export default themeSlice.reducer;
