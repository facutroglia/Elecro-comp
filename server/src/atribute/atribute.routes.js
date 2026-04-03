import { Router } from "express";
import {
  createAtribute,
  getAllAtributes,
  updateAtribute,
  deleteAtribute,
} from "./atribute.controller.js";

const routes = Router();

routes.get("/", getAllAtributes);
routes.post("/", createAtribute);
routes.put("/", updateAtribute);
routes.delete("/", deleteAtribute);

export default routes;
