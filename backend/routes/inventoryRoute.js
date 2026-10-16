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
  const { product_name, description, price,stock } = req.body;

  try {
    await createInventory( product_name, description,price,stock );
    res.status(201).send("Order created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating inventory");
  }
});

export default router;
