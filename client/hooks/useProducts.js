import { useEffect, useState } from 'react';
import { getProducts} from '../services/productsServices';

const useProducts = () => {
    const [item, setItem] = useState([]);

    useEffect(() => {
        const fetchInventory = async () => {
            const data = await getProducts();
            setItem(data);
        };

        fetchInventory();
    }, []);

    return item;
};

export default useProducts;
