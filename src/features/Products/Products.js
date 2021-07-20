import React, { useState } from "react";
import styles from "./Products.module.css";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { productsSelector } from "./productsSlice";
import Header from "../../components/Header";
import ProductItem from "./ProductItem";

const cx = classNames.bind(styles);
const count = 3;

const Products = () => {
  const products = useSelector(productsSelector);

  const [pagenation, setPagenation] = useState({
    page: 1,
    start: 0,
    end: count,
  });

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

  return (
    <div className={cx("Container")}>
      <Header title="상품목록" to="/cart" btnText="장바구니" />

      <div className={cx("ListWrapper")}>
        {products
          .concat()
          .sort((a, b) => b.score - a.score)
          .slice(pagenation.start, pagenation.end)
          .map((p) => {
            return <ProductItem key={p.id} product={p} />;
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
