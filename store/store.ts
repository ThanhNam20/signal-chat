import { configureStore } from '@reduxjs/toolkit'
import { AuthReducer } from './auth/AuthSlice';


export const store = configureStore({
  reducer: {
    auth: AuthReducer
  },
});

export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch; // Type to access dispatch