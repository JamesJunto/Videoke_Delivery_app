import express from 'express'
import {  createOrder} from '../services/ordersServices.js';
const router = express.Router()


router.post("/", async (req, res) => {
  console.log("Request body:", req.body);
  const orderData = {
    order_id: req.body.order_id,
    name: req.body.name,
    contact_num: req.body.contact_num,
    address: req.body.address,
    product_name: req.body.product_name,
    description: req.body.description,
    delivery_schedule: req.body.delivery_schedule,
    delivery_fee: req.body.delivery_fee,
    total: req.body.total,
    payment_status: req.body.payment_status,
  };
  try {
    await createOrder(orderData);
    res.status(201).send("Order created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating order");
  }
});
export default router
