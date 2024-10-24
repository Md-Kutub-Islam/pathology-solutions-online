import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// addOrUpdateCart
export const addOrUpdateCart = createAsyncThunk(
  "cart/addOrUpdateCart",
  async ({ testId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL_BASEURL}/cart/addorupdatetocart`,
        { testId },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      const cartInfo = error.response?.data?.orderInfo || null;
      return rejectWithValue({ message, cartInfo });
    }
  }
);

// fetchUserCart
export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL_BASEURL}/cart`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      const cartInfo = error.response?.data?.cartInfo || null;
      return rejectWithValue({ message, cartInfo });
    }
  }
);

// removeFromCart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ testId }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_URL_BASEURL
        }/cart/removeitemfromcart/${testId}`,
        {},
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

// Clear cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL_BASEURL}/cart/clearcart`,
        {}, // Body should be an empty object if no data is sent
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

// Initial state for the product slice
const initialState = {
  carts: [],
  singleCart: null,
  updateCart: 0,
  loading: false,
  isLoading: false,
  error: null,
  SuccessMsg: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // addOrUpdateCart
      .addCase(addOrUpdateCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addOrUpdateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.carts = action.payload.data.cartInfo;
      })
      .addCase(addOrUpdateCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // fetchUserCart
      .addCase(fetchUserCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.singleCart = action.payload.data;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // removeFromCart
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.updateCart += 1;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Clear cart
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.singleCart = action.payload.data;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
