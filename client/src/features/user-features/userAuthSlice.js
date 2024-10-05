import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, username, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_BASEURL}/auth/register`,
        {
          name,
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      const userInfo = error.response?.data?.userInfo || null;
      return rejectWithValue({ message, userInfo });
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_BASEURL}/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      const userInfo = error.response?.data?.userInfo || null;
      return rejectWithValue({ message, userInfo });
    }
  }
);

const initialState = {
  isLoading: false,
  userInfo: null,
  userData: null,
  error: null,
  isUserVerified: null,
  isUserLogin: false,
  refreshToken: null,
  token: null,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isUserVerified = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userInfo = action.payload.data.userInfo;
        state.userData = action.payload.data.userInfo;
        state.error = null;
        state.isLoading = false;
        state.isUserLogin = true;
        // token: action.payload.data.token;
        state.isUserVerified = action.payload.data.userInfo.isEmailVerified;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export default userAuthSlice.reducer;
