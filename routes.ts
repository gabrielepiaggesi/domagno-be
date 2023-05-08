import express from "express";
import { routeFromController } from "./utils/Helpers";
import { FileController } from "./src/controllers/FileController";
const routes = express.Router();

routes.use("/file", routeFromController(new FileController()));

export default routes;