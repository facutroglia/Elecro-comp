import { Router } from "express";
import upload from "../../middleware/upload.js";
import { uploadFile, deleteFile, changeFile } from "./file.controller.js";
const router = Router();

router.post("/", upload.any(), uploadFile);
router.put("/", upload.any(), changeFile);
router.delete("/", deleteFile);

export default router;
