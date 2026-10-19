const calculateRevenue = (orders) => {
  return orders.reduce(
    (sum, order) =>
      (order.payment_status === "Paid" || order.payment_status === "Paid")
        ? sum + Number(order.total)
        : sum,
    0
  );
};

export default calculateRevenue;
