import express from "express";
import todoRoutes from "./routes/todo.routes.js";

const app = express();

app.use(express.json());

app.use("/todos", todoRoutes);

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
