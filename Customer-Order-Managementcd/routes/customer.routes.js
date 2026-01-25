import express from "express";
import { registerCustomer, getAllCustomers, getCustomerById } from "../controllers/customer.controller.js";
import { validateCustomer } from "../validations/customer.validations.js";

const router = express.Router();

router.post("/register", validateCustomer, registerCustomer);

router.get("/", getAllCustomers);

router.get("/:customerId", getCustomerById);

export default router;
