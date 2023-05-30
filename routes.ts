import express from "express";
import { routeFromController } from "./utils/Helpers";
import { FileController } from "./src/controllers/FileController";
import { LinkController } from "./src/controllers/LinkController";
import { StatusController } from "./src/controllers/StatusController";
import { SmsController } from "./src/controllers/SmsController";
const routes = express.Router();

routes.use("/file", routeFromController(new FileController()));
routes.use("/link", routeFromController(new LinkController()));
routes.use("/sms", routeFromController(new SmsController()));
routes.use("/status", routeFromController(new StatusController()));

export default routes;