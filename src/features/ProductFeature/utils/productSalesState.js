const productSalesState = (stock = 0, reservations = []) => {
  const sold = reservations.reduce((prevValue, currentObject) => {
    return prevValue + currentObject.quantity;
  }, 0);

  const remaining = stock - sold;

  const status = remaining > 0 ? 'còn hàng' : 'hết hàng';

  return { sold, remaining, status };
};

export default productSalesState;
