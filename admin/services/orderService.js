import { api } from "./api";

export const addOrderItem = async (item) => {
  try {
    const response = await api.post("/orders", item);
    return response.data;
  } catch (error) {
    alert("Error creating order");
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await api.get("/orders");
    return response.data;
  } catch (error) {
    alert("Error fetching orders");
    throw error;
  }
};

export const updateOrder = async (order_id, updatedOrder) => {
  try {
    const response = await api.put(`/orders/${order_id}`, updatedOrder);
    return response.data;
  } catch (error) {
    alert("Error updating order");
    throw error;
  }
};

export const deleteOrder = async (order_id) => {
  try {
    const response = await api.delete(`/orders/${order_id}`);
    return response.data;
  } catch (error) {
    alert("Error deleting order");
    throw error;
  }
};
