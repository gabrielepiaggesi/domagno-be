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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.db = void 0;
// import config from 'config';
const mongodb_1 = require("mongodb");
const Log_1 = require("./Log");
// const dbConfig = config.get('MONGODB_URI');
// const dbName = config.get('MONGODB_NAME');
const DB_URI = "mongodb://insoore-test:K5F96f6G9ZLO1tNEn9ix5xQb088Gw9jTS6KZ23BaA3HNklBXlsakTku3kx9MoeWyJ81AP24TU6rwXo7yP9GfWg==@insoore-test.documents.azure.com:10255/?ssl=true&replicaSet=events-dev";
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = new mongodb_1.MongoClient(DB_URI, { useUnifiedTopology: true });
            yield client.connect();
            exports.db = client.db("insoore");
            Log_1.LOG.success('DB CONNECTION READY');
        }
        catch (e) {
            console.error('CANNOT CONNECT DB', e);
        }
    });
}
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=Db.js.map