import { useEffect, useState } from 'react';
import { getInventory } from '../services/inventoryServices';

const useInventory = () => {
    const [item, setItem] = useState([]);

    useEffect(() => {
        const fetchInventory = async () => {
            const data = await getInventory();
            setItem(data);
        };

        fetchInventory();
    }, []);

    return item;
};

export default useInventory;
