import { useEffect, useState } from "react";
import {
  getInventory,
  addInventoryItem,
} from "../services/inventoryServices";

const useInventory = () => {
  const [items, setItem] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const data = await getInventory();
      setItem(data);
    };

    fetchInventory();
  }, []);

  const handleAddInventory = async (form) => {
    const data = await addInventoryItem(form);

    setItem((prevItems) => [...prevItems, data]);

    return data;
  };

  return { items, handleAddInventory };
};

export default useInventory;
