import { Router } from "express";
import {
  register,
  getAllUsers,
  getUser,
  updateUser,
  verifyUser,
  userAddFavorite,
  userRemoveFavorite,
} from "./user.controller.js";
import hash from "../../middleware/hash.js";
const router = Router();

router.get("/", getAllUsers);
router.post("/perfil", getUser);
router.put("/perfil", getUser);
router.post("/registrar", [hash], register);
router.post("/verificar", verifyUser);
router.put("/actualizar", [hash], updateUser);
router.put("/agregar/favorito", userAddFavorite);
router.put("/quitar/favorito", userRemoveFavorite);

export default router;
