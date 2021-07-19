import React, { useState } from "react";
import styles from "./Products.module.css";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  cartSelector,
  productsSelector,
  removeFromCart,
} from "./productsSlice";
import Header from "../../components/Header";

const cx = classNames.bind(styles);
const count = 3;

const Products = () => {
  const dispatch = useDispatch();
  const [pagenation, setPagenation] = useState({
    page: 1,
    start: 0,
    end: count,
  });
  const products = useSelector(productsSelector);
  const carts = useSelector(cartSelector);

  const onClickAdd = (product) => {
    if (carts.length >= 3) {
      alert("장바구니에는 최대 3개의 상품이 담길 수 있습니다.");
      return;
    }
    dispatch(addToCart({ product, amount: 1, coupons: [] }));
  };

  const onClickRemove = (product) => {
    dispatch(removeFromCart(product.id));
  };

  const onClickIdxDown = () => {
    const { page, start, end } = pagenation;
    if (start === 0) {
      alert("처음입니다.");
      return;
    }
    setPagenation({
      page: page - 1,
      start: start - count,
      end: end - count,
    });
  };

  const onClickIdxUp = () => {
    const { page, start, end } = pagenation;
    if (Math.ceil(products.length / count) <= page) {
      alert("마지막입니다.");
      return;
    }
    setPagenation({
      page: page + 1,
      start: start + count,
      end: end + count,
    });
  };

  // console.log(carts);

  return (
    <div className={cx("Container")}>
      <Header title="상품목록" to="/cart" btnText="장바구니" />
      <div className={cx("ListWrapper")}>
        {products
          .concat()
          .sort((a, b) => b.score - a.score)
          .slice(pagenation.start, pagenation.end)
          .map((p) => {
            const isAdded = carts.find((c) => c.product.id === p.id);

            return (
              <div key={p.id} className={cx("ProductItem")}>
                <div>
                  <div className={cx("ProductTitle")}>상품명: {p.title}</div>
                  <div className={cx("ProductPrice")}>가격: {p.price}</div>
                </div>
                {isAdded ? (
                  <button
                    className={cx("Btn", "BtnRemove")}
                    onClick={() => {
                      onClickRemove(p);
                    }}
                  >
                    빼기
                  </button>
                ) : (
                  <button
                    className={cx("Btn", "BtnAdd")}
                    onClick={() => {
                      onClickAdd(p);
                    }}
                  >
                    넣기
                  </button>
                )}
              </div>
            );
          })}
      </div>
      <div className={cx("Pagenation")}>
        <button className={cx("Btn")} onClick={onClickIdxDown}>
          &lt;
        </button>
        <button className={cx("Btn")} onClick={onClickIdxUp}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Products;
