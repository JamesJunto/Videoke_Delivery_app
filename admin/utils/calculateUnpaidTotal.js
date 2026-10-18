const calculateUnpaidTotal = (orders) => {
  return orders.reduce(
    (sum, order) =>
      order.payment_status === "Unpaid" &&
      order.status !== "closed"
        ? Number(order.total || 0) + sum
        : sum,
    0
  );
};

export default calculateUnpaidTotal;
