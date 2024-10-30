import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Getting All category of single lab
export const getAllCategory = createAsyncThunk(
  "category/getAllCategory",
  async ({ adminId, page = 1 } = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL_BASEURL}/category`,
        {
          headers: { "Content-Type": "application/json" },
          params: {
            page,
            limit: 12,
          },
        }
      );

      //   console.log("response:", response.data.data);

      let singleLabCategory = response?.data?.data?.categoryInfo?.filter(
        (data) => data.owner === adminId
      );

      //   console.log("singleLabCategory:", singleLabCategory);

      return singleLabCategory;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Getting All category of lab
export const getAllLabCategory = createAsyncThunk(
  "category/getAllLabCategory",
  async ({ page = 1 } = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL_BASEURL}/category`,
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
  categories: [],
  allLabCategory: [],
  loading: false,
  isLoading: false,
  error: null,
  SuccessMsg: null,
};

export const categorySlice = createSlice({
  name: "test",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Getting All category of single lab
      .addCase(getAllCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories = action.payload;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllLabCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllLabCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.allLabCategory = action.payload.data.categoryInfo;
      })
      .addCase(getAllLabCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
