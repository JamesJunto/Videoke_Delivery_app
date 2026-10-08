import express from 'express'
import { getOrders , createOrder} from '../services/ordersServices.js';
const router = express.Router()

router.post("/", (req, res) => {
  const { order_id, customer_id, items, total } = req.body;

  createOrder(order_id, customer_id, items, total, () => {
    res.status(201).send("Order created successfully");
  });
});

router.get("/", (req, res) => {
  getOrders((err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching orders");
    }
    res.json(result);
  });
});

export default router
