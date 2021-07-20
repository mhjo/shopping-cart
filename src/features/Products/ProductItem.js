import React from "react";
import styles from "./ProductItem.module.css";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, cartSelector, removeFromCart } from "../Cart/cartSlice";

const cx = classNames.bind(styles);

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const carts = useSelector(cartSelector);

  const onClickAdd = (product) => {
    if (carts.length >= 3) {
      alert("장바구니에는 최대 3개의 상품이 담길 수 있습니다.");
      return;
    }
    dispatch(addToCart(product));
  };

  const onClickRemove = (product) => {
    dispatch(removeFromCart(product.id));
  };

  const isAdded = carts.find((c) => c.product.id === product.id);

  return (
    <div key={product.id} className={cx("ProductItem")}>
      <div>
        <div className={cx("ProductTitle")}>상품명: {product.title}</div>
        <div className={cx("ProductPrice")}>가격: {product.price}</div>
      </div>
      {isAdded ? (
        <button
          className={cx("Btn", "BtnRemove")}
          onClick={() => {
            onClickRemove(product);
          }}
        >
          빼기
        </button>
      ) : (
        <button
          className={cx("Btn", "BtnAdd")}
          onClick={() => {
            onClickAdd(product);
          }}
        >
          넣기
        </button>
      )}
    </div>
  );
};

export default ProductItem;
