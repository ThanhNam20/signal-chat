import { Auth } from './Auth.model';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initState: Auth = {
  id: '',
  refresh_token: '',
  email: '',
  role: '',
}

const auth = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    login: (state, payload:PayloadAction<any>) => {

    },
    register: (state, payload: PayloadAction<any>) => {

    }
  },
});

const { reducer, actions } = auth;
export const { login, register } = actions;
export const AuthReducer = reducer;

