import express from "express";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, (req, res) => {
  res.json({
    message: "Middleware passed!",
  });
});

export default router;
