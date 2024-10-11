import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// getAllAdmins
export const getAllAdmins = createAsyncThunk(
  "auth/admin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL_BASEURL}/auth-admin/admins`,
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

export const getOneAdmin = createAsyncThunk(
  "auth/getOneAdmin",
  async ({ adminId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL_BASEURL}/auth-admin/${adminId}`,
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
  userInfo: null, // we use userInfo in admin because in many cantroller of admin auth return data using userInfo.
  adminInfo: null, // we use adminInfo bacause in one controller of admin auth i am return data using adminInfo
  adminData: null,
  allAdminData: null,
  error: null,
  isUserVerified: null,
  isUserLogin: false,
  refreshToken: null,
  token: null,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  extraReducers: (builder) => {
    builder
      // GetAllAdmins
      .addCase(getAllAdmins.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        state.allAdminData = action.payload.data.userInfo;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getAllAdmins.rejected, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      // GetOneAdmin
      .addCase(getOneAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOneAdmin.fulfilled, (state, action) => {
        state.adminData = action.payload.data.adminInfo;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getOneAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default adminAuthSlice.reducer;
