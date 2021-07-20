export const calculatePriceWithCoupon = (item) => {
  const { product, amount, coupon } = item;

  if (!coupon) {
    return product.price * amount;
  }

  switch (coupon.type) {
    case "rate":
      return (
        product.price * ((100 - coupon.amount) / 100) +
        product.price * (amount - 1)
      );
    case "amount":
      return product.price - coupon.amount + product.price * (amount - 1);
    default:
      return product.price * amount;
  }
};
