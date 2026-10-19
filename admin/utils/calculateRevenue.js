const calculateRevenue = (orders) => {
  return orders.reduce(
    (sum, order) =>
      order.status === "delivered"
        ? sum + Number(order.total)
        : sum,
    0
  );
};

export default calculateRevenue;
