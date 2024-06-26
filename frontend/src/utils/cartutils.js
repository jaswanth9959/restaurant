export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // const itemsPrice = state.cartItems.reduce(
  //   (acc, item) =>
  //     acc +
  //     (item.size === "Medium"
  //       ? item.price[1] * 100 * item.qty
  //       : item.size === "Large"
  //       ? item.price[2] * 100 * item.qty
  //       : item.price[0] * 100 * item.qty) /
  //       100,
  //   0
  // );
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price[item.selectedId] * item.qty,
    0
  );
  state.itemsPrice = addDecimals(itemsPrice);

  //shipping price
  const shippingPrice = itemsPrice > 50 ? 0 : 10;
  state.shippingPrice = addDecimals(shippingPrice);

  // tax price
  const taxPrice = 0.1 * itemsPrice;
  state.taxPrice = addDecimals(taxPrice);

  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  // total price
  state.totalPrice = addDecimals(totalPrice);

  // Save the cart to localStorage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
