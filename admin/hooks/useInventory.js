import { useState, useEffect, useCallback  } from "react";
import { getInventory, addInventoryItem, updateInventoryItem } from"../services/inventoryServices";

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
    const response = await addInventoryItem(inventory);
    return response;
  };

  const handleUpdateInventory = async (product_id, updatedInventory) => {
    const response = await updateInventoryItem(product_id, updatedInventory);
    return response;
  };

  return {
    items,
    loading,
    error,
    fetchInventory,
    handleAddInventory,
    handleUpdateInventory,
  };
};

export default useInventory;
