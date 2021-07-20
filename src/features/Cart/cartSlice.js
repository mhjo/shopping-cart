import { createSelector, createSlice } from "@reduxjs/toolkit";
import { calculatePriceWithCoupon } from "../../utils/calcPrice";
import mockCoupons from "../../utils/mocks/mockCoupons.json";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
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
      const cartItem = state.carts.find((item) => item.product.id === id);
      const couponSelected = state.coupons.find((c) => c.name === couponName);
      const existedItem = state.carts.find(
        (item) => item.coupon && item.coupon.name === couponName
      );
      if (!couponName) {
        cartItem.coupon = null;
      }
      if (existedItem) {
        existedItem.coupon = null;
      }
      cartItem.coupon = couponSelected;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementItemAmount,
  decrementItemAmount,
  applyCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;

export const cartSelector = (state) => state.cart.carts;
export const couponsSelector = (state) => state.cart.coupons;
export const totalPriceSelector = createSelector(cartSelector, (carts) =>
  carts.reduce((acc, item) => {
    return acc + calculatePriceWithCoupon(item);
  }, 0)
);
