import { useState, useEffect } from "react";
import { addOrderItem, getOrders, updateOrder } from "../services/orderService";

const useOrder = () => {
  const [orders, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getOrders();
      setOrder(data);
    } catch (err) {
      setError(err?.message || "Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCreateOrder = async (order) => {
    const response = await addOrderItem(order);
    return response;
  };

  const handleUpdateOrder = async (order_id, updatedOrder) => {
    const response = await updateOrder(order_id, updatedOrder);
    setOrder((prev) =>
      prev.map((o) => (o.order_id === order_id ? { ...o, ...updatedOrder } : o))
    );
    return response;
  };

  return {
    orders,
    loading,
    error,
    fetchOrders,
    handleCreateOrder,
    handleUpdateOrder,
  };
};

export default useOrder;
