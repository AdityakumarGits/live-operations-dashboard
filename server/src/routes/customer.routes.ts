import express from "express";
import { getCustomerById, getCustomers } from "../controllers/customer.controller";

const router = express.Router();

router.get("/", getCustomers);
router.get("/:id", getCustomerById);

export default router;
