import { api } from "./api";

export const addOrderItem = async (item) => {
  try {
    const response = await api.post("/orders", item);
    return response.data;
  } catch (error) {
    alert("Error creating order", error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await api.get('/orders')
    return response.data
  } catch(error) {
    alert("Error fetching orders:", error);
    throw error
  }
}

export const updateOrder = async (order_id, updatedOrder) => {
  try {
    const response = await api.put(`/orders/${order_id}`, updatedOrder)
    return response.data
  } catch (error) {
    alert("Error updating order", error);
    throw error
  }
}
