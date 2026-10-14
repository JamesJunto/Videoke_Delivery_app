import { api } from './api';
export const addOrder = async (order) => {
  try {
    const response = await api.post('/orders', order);
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
}

export const getOrders = async () => {
  try {
    const response = await api.get('/orders');

    console.log('Orders response:', response.data);
    console.log('Is array:', Array.isArray(response.data));

    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};
