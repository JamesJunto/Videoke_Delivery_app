import { api } from './api';

export const getProducts = async () => {
  try {
    const response = await api.get('/inventory');
    return response.data;
  }
    catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
};
