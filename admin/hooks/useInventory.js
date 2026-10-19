import { useState, useEffect, useCallback } from "react";
import {
  getInventory,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from "../services/inventoryServices";

const useInventory = () => {
  const [items, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInventory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getInventory();
      setItem(data);
    } catch (err) {
      setError(err?.message || "Failed to fetch inventory.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const handleAddInventory = async (inventory) => {
    return await addInventoryItem(inventory);
  };

  const handleUpdateInventory = async (product_id, updatedInventory) => {
    return await updateInventoryItem(product_id, updatedInventory);
  };

  const handleDeleteInventory = async (product_id) => {
    const response = await deleteInventoryItem(product_id);

    setItem((prev) =>
      prev.filter((item) => item.product_id !== product_id)
    );

    return response;
  };

  return {
    items,
    loading,
    error,
    fetchInventory,
    handleAddInventory,
    handleUpdateInventory,
    handleDeleteInventory,
  };
};

export default useInventory;
