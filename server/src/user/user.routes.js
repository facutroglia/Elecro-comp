import { Router } from "express";
import {
  register,
  getAllUsers,
  getUser,
  updateUser,
  verifyUser,
} from "./user.controller.js";
import hash from "../../middleware/hash.js";
const router = Router();

router.get("/", getAllUsers);
router.get("/perfil", getUser);
router.post("/registrar", [hash], register);
router.post("/verificar", verifyUser);
router.put("/actualizar", [hash], updateUser);

export default router;
