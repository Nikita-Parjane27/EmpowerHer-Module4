import express from "express";
import dotenv from "dotenv";
import customerRoutes from "./routes/customer.routes.js";
import orderRoutes from "./routes/order.routes.js";

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Customer Order Management API is running ");
});

app.use("/customers", customerRoutes);
app.use("/orders", orderRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
