import { api } from "./api";

export const addOrderItem = async (item) => {
  try {
    const response = await api.post("/orders", item);
    return response.data;
  } catch (error) {
    alert("Error adding inventory item:", error);
    throw error;
  }
};
