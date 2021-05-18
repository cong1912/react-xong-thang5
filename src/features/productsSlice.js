import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.productList.push(action.payload);
    },
  },
});

export const { getProducts } = productsSlice.actions;
export const selectProducts = (state) => state.products.productList;
export default productsSlice.reducer;
