import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import productReducer from "../features/productsSlice";
export const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
  },
});
