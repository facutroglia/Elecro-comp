import express from "express";
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} from "./order.controller.js";

const router = express.Router();

router.post("/", createOrder);

router.get("/", getOrders);

router.get("/:id", getOrder);

router.put("/", updateOrder);

router.delete("/", deleteOrder);

export default router;
