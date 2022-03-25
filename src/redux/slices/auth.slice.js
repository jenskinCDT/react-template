import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';
import { decodeJwt } from '../utils/jwt';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.post('/api/auth/sign-in', {
          email,
          password,
        })
      ).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: {},
  accessToken: null,
  refreshToken: null,
};

const initReducer = (state) => {
  state.isLoading = true;
  state.isAuthenticated = false;
  state.user = {};
  state.accessToken = null;
  state.refreshToken = null;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const authSuccess = (state, action) => {
  const { accessToken, refreshToken } = action.payload;
  state.isAuthenticated = true;
  state.isLoading = false;
  state.accessToken = accessToken;
  state.refreshToken = refreshToken;
  state.user = decodeJwt(accessToken);

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    verifiedAuth: authSuccess,
    logout: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.user = {};
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: {
    [login.pending]: initReducer,
    [login.rejected]: (state) => {
      state.isLoading = false;
    },
    [login.fulfilled]: authSuccess,
  },
});

export const authActions = authSlice.actions;
export default authSlice;
