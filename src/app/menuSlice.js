import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    isOpen: false,
  },
  reducers: {
    menuOpen: (state) => {
      state.isOpen = true;
    },
    menuClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { menuOpen, menuClose } = menuSlice.actions;

export const menuIsOpen = (state) => state.menu.isOpen;

export default menuSlice.reducer;
