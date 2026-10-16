export const addOrderItem = async (item) => {
  try {
    const response = await api.post("/inventory", item);
    return response.data;
  } catch (error) {
    console.error("Error adding inventory item:", error);
    throw error;
  }
};
