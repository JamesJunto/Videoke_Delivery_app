import { api } from "./api";

export const getInventory = async () => {
  try {

    const response = await api.get("/inventory");
    return response.data;

  } catch (error) {
    console.error("Error fetching inventory:", error);
    throw error;
  }
};

export const addInventoryItem = async (item) => {
  try {
    const response = await api.post("/inventory", item);
    return response.data;
  } catch (error) {
    console.error("Error adding inventory item:", error);
    throw error;
  }
};

export const updateInventoryItem = async (product_id, updatedInventory) => {
  try {
    const response = await api.put(`/inventory/${product_id}`, updatedInventory)
    return response.data
  } catch (error) {
    alert("Error updating order", error);
    throw error
  }
}

export const deleteInventoryItem = async (product_id) => {
  try {
    const response = await api.delete(`/inventory/${product_id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    throw error;
  }
};
