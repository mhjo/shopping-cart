import React from "react";
import styles from "./Header.module.css";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Header = ({ title, to, btnText }) => {
  return (
    <div className={cx("Header")}>
      <h1>{title}</h1>
      {to && (
        <Link to={to}>
          <button className={cx("Btn")}>{btnText}</button>
        </Link>
      )}
    </div>
  );
};

export default Header;
