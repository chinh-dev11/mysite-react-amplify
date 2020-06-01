import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogged: false,
    username: '',
  },
  reducers: {
    logIn: (state) => {
      state.isLogged = true;
    },
    logOut: (state) => {
      state.isLogged = false;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { logIn, logOut, setUsername } = authSlice.actions;

export const authIsLogged = (state) => state.auth.isLogged;
export const authUsername = (state) => state.auth.username;

export default authSlice.reducer;
