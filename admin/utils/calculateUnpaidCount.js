const calculateUnpaidCount = (orders) => {
  return orders.reduce(
    (sum, order) =>
      order.payment_status === "Unpaid" ? sum + 1 : sum,
    0
  );
};

export default calculateUnpaidCount;
