import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addImage,
  removeImage,
} from "./product.controller.js";

const router = express.Router();

router.post("/", createProduct);

router.post("/agregar/imagen", addImage);
router.delete("/quitar/imagen", removeImage);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.put("/", updateProduct);

router.delete("/", deleteProduct);

export default router;
