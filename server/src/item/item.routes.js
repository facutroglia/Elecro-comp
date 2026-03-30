import express from "express";
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from "./item.controller.js";

const router = express.Router();

router.post("/", createItem);

router.get("/", getItems);

router.get("/:id", getItemById);

router.put("/", updateItem);

router.delete("/", deleteItem);

export default router;
