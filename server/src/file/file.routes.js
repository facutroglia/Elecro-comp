import { Router } from "express";
import upload from "../../middleware/upload.js";
import { uploadFile, deleteFile } from "./file.controller.js";
const router = Router();

router.post("/", upload.any(), uploadFile);
router.delete("/", deleteFile);

export default router;
