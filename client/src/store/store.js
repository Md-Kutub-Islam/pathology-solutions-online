import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "../features/user-features/userAuthSlice";
import adminAuthSlice from "../features/admin-features/adminAuthSlice";
import testSlice from "../features/comman-features/testSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import categorySlice from "../features/comman-features/categorySlice";
import cartSlice from "../features/comman-features/cartSlice";
import orderSlice from "../features/comman-features/orderSlice";
import paymentSlice from "../features/comman-features/paymentSlice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, userAuthSlice);

export const store = configureStore({
  reducer: {
    userAuth: persistedAuthReducer,
    adminAuth: adminAuthSlice,
    test: testSlice,
    category: categorySlice,
    cart: cartSlice,
    order: orderSlice,
    payment: paymentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
