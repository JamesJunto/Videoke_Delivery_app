import { useEffect, useState } from 'react';
import { getOrders} from '../services/orderServices';
import { addOrder } from '../services/orderServices';
const useOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            const data = await getOrders();
            setOrders(data);
        };

        fetchCustomers();
    }, []);

  const handleAddOrder = async (order) => {
    const data = await addOrder(order)

    setItem((prevItems) => [...prevItems, data]);

    return data
  }

  return{orders, handleAddOrder}

};

export default useOrders;
