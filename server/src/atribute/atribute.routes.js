import { Router } from "express";
import {
  createAtribute,
  getAllAtributes,
  updateAtribute,
  deleteAtribute,
} from "./atribute.controller.js";
import router from "../category/category.routes.js";

const routes = Router();

routes.get("/", getAllAtributes);
routes.post("/", createAtribute);
routes.put("/", updateAtribute);
routes.delete("/", deleteAtribute);

export default routes;
