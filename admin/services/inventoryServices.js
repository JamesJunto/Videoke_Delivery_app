import { api } from './api';

export const getInventory = async () => {
  try {
    const response = await api.get('/inventory');
    return response.data;
  }
    catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
};

export const addInventoryItem = async (item) => {
  try {
    const response = await api.post('/inventory', item);
    return response.data;
  } catch (error) {
    console.error('Error adding inventory item:', error);
    throw error;
  }
};
