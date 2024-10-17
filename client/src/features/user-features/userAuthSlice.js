import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Register
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

// Login
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
      const { token } = response.data;
      // Store the token in localStorage
      localStorage.setItem("authToken", token); // Save token in localStorage
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      const userInfo = error.response?.data?.userInfo || null;
      return rejectWithValue({ message, userInfo });
    }
  }
);

// User
export const user = createAsyncThunk(
  "auth/User",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL_BASEURL}/auth/user`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
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
      })
      // User
      .addCase(user.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(user.fulfilled, (state, action) => {
        state.userData = action.payload.data.userInfo;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(user.rejected, (state, action) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default userAuthSlice.reducer;
