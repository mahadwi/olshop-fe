import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../config/api'


export const store = configureStore({
  reducer: {
    auth: authReducer
  },
});