import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Getting All Test

export const getAlltests = createAsyncThunk(
  "test/getAllTests",
  async ({ page = 1 } = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL_BASEURL}/test`,
        {
          headers: { "Content-Type": "application/json" },
          params: {
            page,
            limit: 12,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Initial state for the product slice
const initialState = {
  tests: [],
  singleTest: null,
  loading: false,
  isLoading: false,
  error: null,
  SuccessMsg: null,
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GetAllTests
      .addCase(getAlltests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAlltests.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.tests = action.payload.data.testInfo;
      })
      .addCase(getAlltests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default testSlice.reducer;
