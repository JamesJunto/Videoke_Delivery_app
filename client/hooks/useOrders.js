import { useEffect, useState } from 'react';
import { getOrders} from '../services/orderServices';

const useOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            const data = await getOrders();
            setOrders(data);
        };

        fetchCustomers();
    }, []);

    return orders;
};

export default useOrders;
