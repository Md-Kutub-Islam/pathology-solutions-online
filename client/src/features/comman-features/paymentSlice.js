import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// checkout
export const checkout = createAsyncThunk(
  "payment/checkout",
  async ({ amount }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_BASEURL}/payment/checkout`,
        { amount },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          //   params: {
          //     orderId,
          //   },
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "payment/verify",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_BASEURL}/payment/payment-varification`,
        { paymentData },
        {
          headers: {
            "Content-Type": "application/json",
          },
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
  orderData: null,
  verifyData: null,
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderData = action.payload;
      })
      .addCase(checkout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle verify payment
      .addCase(verifyPayment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.verifyData = action.payload.data.paymentInfo;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
