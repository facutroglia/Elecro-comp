import { Router } from "express";
import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from "./brand.controller.js";
const router = Router();

router.get("/", getBrands);
router.post("/", createBrand);
router.put("/", updateBrand);
router.delete("/", deleteBrand);

export default router;
