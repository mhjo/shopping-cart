import React from "react";
import styles from "./Cart.module.css";
import classNames from "classnames/bind";
import Header from "../../components/Header";
import {
  cartSelector,
  couponsSelector,
  decrementItemAmount,
  incrementItemAmount,
  totalPriceSelector,
} from "../Products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import CouponSelect from "./CouponSelect";
import { calculatePriceWithCoupon } from "../../utils/calcPrice";

const cx = classNames.bind(styles);

const Cart = () => {
  const dispatch = useDispatch();
  const carts = useSelector(cartSelector);
  const coupons = useSelector(couponsSelector);
  const totalPrice = useSelector(totalPriceSelector);

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

  // const onChangeCouponSelect = (value, item) => {
  //   console.log(value, item);
  // };

  console.log("totalPrice", totalPrice);

  return (
    <div className={cx("Container")}>
      <Header title="장바구니" to="/products" btnText="쇼핑하기" />
      <div className={cx("ListWrapper")}>
        {carts.map((item) => {
          console.log("item", item);
          return (
            <div key={item.product.id} className={cx("ProductItem")}>
              <div>
                <div className={cx("ProductTitle")}>
                  상품명: {item.product.title}
                </div>
                <div className={cx("ProductPrice")}>
                  가격: {item.product.price}
                </div>
              </div>
              <div>
                <div>
                  <button
                    onClick={() => {
                      onClickDecrementBtn(item);
                    }}
                  >
                    -
                  </button>
                  {item.amount}
                  <button
                    onClick={() => {
                      onClickIncrementBtn(item);
                    }}
                  >
                    +
                  </button>
                  <span>가격: {calculatePriceWithCoupon(item)}</span>
                </div>
                <CouponSelect item={item} />
              </div>
            </div>
          );
        })}
      </div>
      <div>최종결제금액: {totalPrice}</div>
    </div>
  );
};

export default Cart;
