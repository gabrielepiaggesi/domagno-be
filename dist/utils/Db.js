"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.db = void 0;
const mongodb_1 = require("mongodb");
const Log_1 = require("./Log");
const config_1 = __importDefault(require("config"));
const DB_URI = config_1.default.get('DB_URI');
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = new mongodb_1.MongoClient(DB_URI, { useUnifiedTopology: true });
            yield client.connect();
            exports.db = client.db(config_1.default.get('DB_NAME'));
            Log_1.LOG.success('DB CONNECTION READY');
        }
        catch (e) {
            console.error('CANNOT CONNECT DB', e);
        }
    });
}
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=Db.js.map