import express from "express";
import { getCustomer } from "../services/customerServices.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const customers = await getCustomer();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching customers");
  }
});

export default router;
