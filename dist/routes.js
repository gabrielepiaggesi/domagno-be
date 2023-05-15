"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Helpers_1 = require("./utils/Helpers");
const FileController_1 = require("./src/controllers/FileController");
const LinkController_1 = require("./src/controllers/LinkController");
const routes = express_1.default.Router();
routes.use("/file", (0, Helpers_1.routeFromController)(new FileController_1.FileController()));
routes.use("/link", (0, Helpers_1.routeFromController)(new LinkController_1.LinkController()));
exports.default = routes;
//# sourceMappingURL=routes.js.map