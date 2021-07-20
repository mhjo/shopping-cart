import React from "react";
import styles from "./Cart.module.css";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import { cartSelector, totalPriceSelector } from "./cartSlice";
import CartItem from "./CartItem";

const cx = classNames.bind(styles);

const Cart = () => {
  const carts = useSelector(cartSelector);
  const totalPrice = useSelector(totalPriceSelector);

  return (
    <div className={cx("Container")}>
      <Header title="장바구니" />
      <div className={cx("ListWrapper")}>
        {carts.map((item) => {
          return <CartItem item={item} key={item.product.id} />;
        })}
      </div>
      <div className={cx("Total")}>최종결제금액: {totalPrice}원</div>
    </div>
  );
};

export default Cart;
