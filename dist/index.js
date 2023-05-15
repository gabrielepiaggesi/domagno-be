"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const Db_1 = require("./utils/Db");
const Log_1 = require("./utils/Log");
(0, Db_1.connectToDatabase)();
const app = (0, express_1.default)();
const port = process.env.PORT || 4200;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(routes_1.default);
app.listen(port, () => Log_1.LOG.success(`SERVER READY ON PORT ${port}`));
//# sourceMappingURL=index.js.map