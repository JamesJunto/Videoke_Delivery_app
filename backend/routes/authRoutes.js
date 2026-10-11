import express from "express";
import { getCustomerAccount } from "../services/authService.js";

const router = express.Router();

router.post("/", (req, res) => {
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

export default router;
