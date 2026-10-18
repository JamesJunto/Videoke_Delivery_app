const calculatePendingCount = (orders) => {
  return orders.reduce(
    (sum, order) =>
      order.status === "pending" ? sum + 1 : sum,
    0
  );
};

export default calculatePendingCount;
