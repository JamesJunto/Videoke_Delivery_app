const getPaymentFollowUps = (orders = []) => {
  return orders.filter(
    (order) =>
      order.payment_status === "Unpaid" ||
      order.payment_status === "50% paid"
  );
};

export default getPaymentFollowUps;
