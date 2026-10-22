import express from "express";
import jwt from "jsonwebtoken";
import { addAdminAccount, getAdminAccount } from "../services/authService.js";

const router = express.Router();

  router.post("/login", async (req, res) => {
    const ACCESS_TOKEN_KEY= process.env.ACCESS_TOKEN_KEY

    const { email, password } = req.body;

    try {
      const account = await getAdminAccount(email, password);

      if (!account) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      const payload = {
        id: account.admin_id,
        role: "admin",
      };

      const accessToken = jwt.sign(payload, ACCESS_TOKEN_KEY);

      return res.status(200).json({
        message: "Login successful",
        accessToken,
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
    await addAdminAccount(email, password);

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
