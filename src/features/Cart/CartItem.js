import React from "react";
import styles from "./CartItem.module.css";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { calculatePriceWithCoupon } from "../../utils/calcPrice";
import { decrementItemAmount, incrementItemAmount } from "./cartSlice";
import CouponSelect from "./CouponSelect";

const cx = classNames.bind(styles);

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const onClickDecrementBtn = (item) => {
    if (item.amount <= 1) {
      alert("수량은 하나 이상이어야 합니다.");
      return;
    }
    dispatch(decrementItemAmount(item.product.id));
  };

  const onClickIncrementBtn = (item) => {
    dispatch(incrementItemAmount(item.product.id));
  };

  return (
    <div className={cx("ProductItem")}>
      <div>
        <div className={cx("ProductTitle")}>상품명: {item.product.title}</div>
        <div className={cx("ProductPrice")}>가격: {item.product.price}원</div>
      </div>

      <div>
        <div className={cx("CounterBtnArea")}>
          <div>
            <button
              onClick={() => {
                onClickDecrementBtn(item);
              }}
            >
              -
            </button>
            <span className={cx("Amount")}>{item.amount}</span>
            <button
              onClick={() => {
                onClickIncrementBtn(item);
              }}
            >
              +
            </button>
          </div>
          <span>가격: {calculatePriceWithCoupon(item)}원</span>
        </div>
        {item.coupon && (
          <div className={cx("CouponApplied")}>{item.coupon.name} 적용중</div>
        )}
        <CouponSelect item={item} />
      </div>
    </div>
  );
};

export default CartItem;
