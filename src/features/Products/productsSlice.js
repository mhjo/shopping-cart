import { createSelector, createSlice } from "@reduxjs/toolkit";
import mockProducts from "../../utils/mocks/mockProducts.json";
import mockCoupons from "../../utils/mocks/mockCoupons.json";
import { calculatePriceWithCoupon } from "../../utils/calcPrice";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: mockProducts,
    carts: [],
    coupons: mockCoupons,
  },
  reducers: {
    addToCart: (state, action) => {
      state.carts.push({ product: action.payload, amount: 1, coupon: null });
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
    applyCoupon: (state, action) => {
      const { couponName, id } = action.payload;
      let cartItem = state.carts.find((item) => item.product.id === id);
      cartItem.coupon = state.coupons.find((c) => c.name === couponName);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementItemAmount,
  decrementItemAmount,
  applyCoupon,
} = productsSlice.actions;

export default productsSlice.reducer;

export const productsSelector = (state) => state.products.products;
export const cartSelector = (state) => state.products.carts;
export const couponsSelector = (state) => state.products.coupons;
export const totalPriceSelector = createSelector(cartSelector, (carts) =>
  carts.reduce((acc, item) => {
    return acc + calculatePriceWithCoupon(item);
  }, 0)
);
