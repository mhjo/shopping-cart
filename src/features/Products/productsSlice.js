import { createSelector, createSlice } from "@reduxjs/toolkit";
import mockProducts from "../../utils/mockProducts.json";

const coupons = [
  {
    type: "rate",
    name: "첫 가입 10% 쿠폰",
    amount: 10,
  },
  {
    type: "amount",
    name: "모두에게 주는 2,000원 할인 쿠폰",
    amount: 2000,
  },
];

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: mockProducts,
    carts: [],
    coupons,
  },
  reducers: {
    addToCart: (state, action) => {
      state.carts.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.carts = state.carts.filter((c) => c.product.id !== action.payload);
    },
    incrementItemAmount: (state, action) => {
      let cartItem = state.carts.find(
        (item) => item.product.id === action.payload
      );
      cartItem.amount += 1;
    },
    decrementItemAmount: (state, action) => {
      let cartItem = state.carts.find(
        (item) => item.product.id === action.payload
      );
      cartItem.amount -= 1;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementItemAmount,
  decrementItemAmount,
} = productsSlice.actions;

export default productsSlice.reducer;

export const productsSelector = (state) => state.products.products;
export const cartSelector = (state) => state.products.carts;
export const totalPriceSelector = createSelector(cartSelector, (carts) =>
  carts.reduce((acc, item) => {
    return acc + item.product.price * item.amount;
  }, 0)
);
