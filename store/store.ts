import { configureStore } from '@reduxjs/toolkit'
import { AuthReducer } from './auth/AuthSlice';
import { messageReducer } from './message/MessageSlice';


export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    message: messageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch; // Type to access dispatch