import { DataStore } from '@aws-amplify/datastore';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from '@aws-amplify/auth';
import { CryptoService } from "../../services/crypto.service";
import { User } from '../../src/models';
import { setMessage } from '../message/MessageSlice';
import { defaultMessage } from '../../constants/Constant';

export const register = createAsyncThunk('auth/register',
  async ({ email, name, password }: any, thunkApi) => {
    const isEmailRegistered = await DataStore.query(User, user => user.email('eq', email));

    if (isEmailRegistered.length !== 0) {
      thunkApi.dispatch(setMessage(defaultMessage.userExist));
      return;
    }
    const hashedPassword = CryptoService.encryptPassWord(password).toString();

    const userRegister = await DataStore.save(
      new User({
        email,
        name,
        password: hashedPassword,
        status: "Hi, there!",
        imageUri: "https://loremflickr.com/200/200"
      })
    )

    if (!userRegister) {
      thunkApi.dispatch(setMessage(defaultMessage.registerNotSuccess));
      return;
    }
    return userRegister;

  })

export const login = createAsyncThunk('auth/login', async ({ email, password }: any, thunkApi) => {
  const isEmailRegistered = await DataStore.query(User, user => user.email('eq', email));
  if (isEmailRegistered.length === 0) {
    thunkApi.dispatch(setMessage(defaultMessage.userNotRegister));
    return;
  }
  const user = isEmailRegistered[0];
  const decryptPassWord = CryptoService.decryptPassWord(user.password);
  if (password != decryptPassWord) {
    thunkApi.dispatch(setMessage(defaultMessage.wrongPassword));
    return;
  }
  return user;
})


const initState: any = {
  authUserInfo: null,
  loading: false,
  error: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    setUserData: (state, action) => {
      state.authUserInfo = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.authUserInfo = action.payload;
    });


    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.authUserInfo = action.payload;
    });

  }
});

const { reducer, actions } = authSlice;
export const { setUserData } = actions;
export const AuthReducer = reducer;

