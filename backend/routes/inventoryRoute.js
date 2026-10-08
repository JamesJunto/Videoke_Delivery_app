import express from "express";
import {
  getInventory,
  createInventory,
} from "../services/inventoryServices.js";
const router = express.Router();

router.get("/", (req, res) => {
  getInventory((err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching orders");
    }
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { productName, category, quantity, price, supplier } = req.body;
  createInventory(productName,category, quantity, price , supplier, () => {
    res.status(201).send("Order created successfully");
  })
});

export default router;
