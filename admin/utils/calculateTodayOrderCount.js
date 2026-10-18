const calculateTodayOrderCount = (orders, dateNow) => {
  return orders.reduce(
    (sum, order) =>
      order.delivery_schedule?.slice(0, 10) === dateNow
        ? sum + 1
        : sum,
    0
  );
};

export default calculateTodayOrderCount;
