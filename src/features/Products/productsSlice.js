import { createSlice } from "@reduxjs/toolkit";
import mockProducts from "../../utils/mocks/mockProducts.json";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: mockProducts,
  },
  reducers: {},
});

export default productsSlice.reducer;

export const productsSelector = (state) => state.products.products;
