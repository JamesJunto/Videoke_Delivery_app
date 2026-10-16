import { useState } from "react";
import { addOrderItem } from "../services/orderService";
const useOrder = () => {

  const[orders, setOrders] = useState([])

  const handleCreateOrder = async (order) => {
      const data = await addOrderItem(order)
      setOrders(data)
      return data
  }

  return {handleCreateOrder , orders}

}
export default useOrder
