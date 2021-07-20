import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyCoupon, couponsSelector } from "../Products/productsSlice";

const CouponSelect = ({ item }) => {
  const dispatch = useDispatch();
  const coupons = useSelector(couponsSelector);
  const [value, setValue] = useState("");

  const onChangeCouponSelect = (e) => {
    const couponName = e.target.value;
    setValue(couponName);
    dispatch(applyCoupon({ couponName, id: item.product.id }));
  };

  return (
    <select value={value} onChange={onChangeCouponSelect}>
      <option value="">쿠폰선택</option>
      {coupons.map((coupon) => {
        return (
          <option key={coupon.name} value={coupon.name}>
            {coupon.name}
          </option>
        );
      })}
    </select>
  );
};

export default CouponSelect;
