import express from "express";
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} from "./order.controller.js";

const router = express.Router();

// Crear orden
router.post("/", createOrder);

// Obtener todas las órdenes
router.get("/", getOrders);

// Obtener orden por ID
router.get("/:id", getOrder);

// Actualizar orden
router.put("/", updateOrder);

// Eliminar orden
router.delete("/", deleteOrder);

export default router;
