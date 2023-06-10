import express from "express";
import { routeFromController } from "./utils/Helpers";
import { PlaceController } from "./src/controllers/PlaceController";
const routes = express.Router();

routes.use("/place", routeFromController(new PlaceController()));

export default routes;