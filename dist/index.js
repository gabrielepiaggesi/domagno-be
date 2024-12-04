"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
// import { connectToDatabase } from './utils/Db';
const Log_1 = require("./utils/Log");
// connectToDatabase();
process.env.OPEN_AI_KEY = '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';
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb' }));
app.use(routes_1.default);
app.listen(port, () => Log_1.LOG.success(`SERVER READY ON PORT ${port}`));
//# sourceMappingURL=index.js.map