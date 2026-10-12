import express from "express";
import customerRoute from "./routes/customerRoute.js";
import inventoryRoute from "./routes/inventoryRoute.js";
import ordersRoute from "./routes/ordersRoute.js"
import authRoutes from "./routes/authRoutes.js"
import { rateLimiter } from "./middleware/rateLimit.js";
import cors from "cors";
import { WebSocketServer, WebSocket } from "ws";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/customers", customerRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/auth", rateLimiter, authRoutes);

app.listen(3000, () => {
  console.log(" Server running on port 3000");
});




//const wss = new WebSocketServer({ server });

/*
wss.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (message) => {
    console.log(message.toString());

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send("Hello from the server");
      }

    });
  });
});

*/
