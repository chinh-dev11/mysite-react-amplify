import { createSlice } from '@reduxjs/toolkit';

export const navSlice = createSlice({
  name: 'nav',
  initialState: {
    isOpen: false,
  },
  reducers: {
    navOpen: (state) => {
      state.isOpen = true;
    },
    navClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { navOpen, navClose } = navSlice.actions;

export const navIsOpen = (state) => state.nav.isOpen;

export default navSlice.reducer;
