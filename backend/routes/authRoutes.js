import express from "express";
import { AddAccount, getCustomerAccount } from "../services/authService.js";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  getCustomerAccount(email, (err, account) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (!account) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      message: "Login successful",
      account: {
        customer_id: account.customer_id,
        email: account.email,
      },
    });
  });
});

router.post("/register", async (req, res) => {
   console.log("REGISTER REQUEST RECEIVED");

  const { first_name, last_name, phone, address, email, password } = req.body;

  try {
    await AddAccount(first_name, last_name, phone, address, email, password);

    return res.status(201).json({
      message: "Registration successful",
    });
  } catch (error) {
    console.log("Register Error:", error);

    return res.status(500).json({
      message: "Registration failed",
    });
  }
})

export default router;
