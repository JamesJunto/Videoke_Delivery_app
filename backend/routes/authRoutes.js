import express from "express";
import jwt from "jsonwebtoken";
import { AddAccount, getCustomerAccount } from "../services/authService.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  //dapat naa ni sa .env file
  const ACCESS_TOKEN_KEY='b4e8d1f7a3c6b9e2d5f8a1c4e7b3d6f9a2c5e8b1d4f7a3c6b9e2d5f8a1c4e7b3'

  const { email, password } = req.body;

  try {
    const account = await getCustomerAccount(email, password);

    if (!account) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const payload = { id: account.customer_id }
    const AccessToken = jwt.sign(payload, ACCESS_TOKEN_KEY)

    return res.status(200).json({
      message: "Login successful",
      accessToken: AccessToken,
    });

  } catch (error) {

    return res.status(500).json({
      message: "Server error",
    });
  }
});


router.post("/register", async (req, res) => {

  const {email, password } = req.body;

  try {
    await AddAccount( email, password);

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
