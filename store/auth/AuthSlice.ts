import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from '@aws-amplify/auth';


export const getUserAuhthenticationData = createAsyncThunk('auth/authentication-user',
  async (params, thunkApi) => {
    const authenticationDataUser = await Auth.currentAuthenticatedUser();
    return authenticationDataUser;
  }
)

const initState: any = {
  authUserInfo: null,
  loading: false,
  error: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    login: (state, payload: PayloadAction<any>) => {},
    register: (state, payload: PayloadAction<any>) => {}
  },
  extraReducers: (builder) =>{
    builder.addCase(getUserAuhthenticationData.pending, (state, action) =>{
      state.loading = true;
    });
    builder.addCase(getUserAuhthenticationData.rejected, (state, action) =>{
      state.loading = false;
      state.error = true;
    });
    builder.addCase(getUserAuhthenticationData.fulfilled, (state, action) =>{
      state.loading = false;
      state.error = false;
      state.authUserInfo = action.payload;
    });
  }
});

const { reducer, actions } = authSlice;
export const { login, register } = actions;
export const AuthReducer = reducer;

