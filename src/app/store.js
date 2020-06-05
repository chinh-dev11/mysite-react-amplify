import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import navReducer from './navSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    nav: navReducer,
  },
});
