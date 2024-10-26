import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Getting All Test
export const getAllorders = createAsyncThunk(
  "order/getAllorders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL_BASEURL}/order`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async ({ orderItems, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        // Include the userId in the URL path
        `${import.meta.env.VITE_API_URL_BASEURL}/order/${userId}`,
        {
          orderItems,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
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
  orders: [],
  singleOrder: null,
  loading: false,
  isLoading: false,
  error: null,
  SuccessMsg: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllOrder
      .addCase(getAllorders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllorders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orders = action.payload.data.orderInfo;
      })
      .addCase(getAllorders.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      //   addorder
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orders = action.payload.data.orderInfo;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
