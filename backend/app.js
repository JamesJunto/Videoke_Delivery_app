import 'dotenv/config';
import express from "express";
import inventoryRoute from "./routes/inventoryRoute.js";
import ordersRoute from "./routes/ordersRoute.js"
import authRoutes from "./routes/authRoutes.js"
import { rateLimiter } from "./middleware/rateLimit.js";
import { authMiddleware } from './middleware/auth.js';
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", rateLimiter, authRoutes);
app.use("/api/inventory", authMiddleware, inventoryRoute);
app.use("/api/orders", authMiddleware, ordersRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
