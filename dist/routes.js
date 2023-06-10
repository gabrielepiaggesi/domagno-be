"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Helpers_1 = require("./utils/Helpers");
const PlaceController_1 = require("./src/controllers/PlaceController");
const routes = express_1.default.Router();
routes.use("/place", (0, Helpers_1.routeFromController)(new PlaceController_1.PlaceController()));
exports.default = routes;
//# sourceMappingURL=routes.js.map