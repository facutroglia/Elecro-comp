import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "./category.controller.js";

const router = express.Router();

router.post("/", createCategory);

router.get("/", getAllCategories);

router.get("/:id", getCategoryById);

router.put("/", updateCategory);

router.delete("/", deleteCategory);

export default router;
