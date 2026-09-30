import { useEffect, useState } from 'react';
import { getCustomers } from '../services/customerServices';

const useCustomer = () => {
    const [customer, setCustomer] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            const data = await getCustomers();
            setCustomer(data);
        };

        fetchCustomers();
    }, []);

    return customer;
};

export default useCustomer;
