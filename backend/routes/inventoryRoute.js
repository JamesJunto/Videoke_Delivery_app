import express from "express";
import {
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory
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

router.put("/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;
    const updatedProduct = req.body;

    const result = await updateInventory(product_id, updatedProduct);

    res.status(200).json({
      message: "Inventory updated successfully",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating inventory",
    });
  }
})

router.delete("/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;

    await deleteInventory(product_id);

    res.status(200).json({
      message: "Inventory item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting inventory:", error);

    res.status(500).json({
      message: "Error deleting inventory item",
    });
  }
});

export default router;
