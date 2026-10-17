import express from 'express'
import {  createOrder, getOrders, updateOrder} from '../services/ordersServices.js';
const router = express.Router()

router.post("/", async (req, res) => {
  try {
    console.log("Request body:", req.body);

    await createOrder(req.body);

    res.status(201).json({
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("Error creating order:", error);

    res.status(500).json({
      message: "Error creating order",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await getOrders();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching inventory");
  }
});

router.put("/:order_id", async (req, res) => {
  try {
    const { order_id } = req.params;
    const updatedOrder = req.body;

    const result = await updateOrder(order_id, updatedOrder);

    res.status(200).json({
      message: "Order updated successfully",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating order",
    });
  }
})
export default router
