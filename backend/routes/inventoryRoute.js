import express from "express";
import {
  getInventory,
  createInventory,
} from "../services/inventoryServices.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const inventory = await getInventory();
    res.json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching inventory");
  }
});

router.post("/", async (req, res) => {
   console.log('Request body:', req.body);
  const { productName, category, quantity, price, supplier } = req.body;

  try {
    await createInventory(productName, category, quantity, price, supplier);
    res.status(201).send("Order created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating inventory");
  }
});

export default router;
