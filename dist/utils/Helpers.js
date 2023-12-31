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
exports.routeFromController = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
// import { MulterFile } from "../src/types/MulterFile";
function routeFromController(object) {
    const route = express_1.default.Router();
    const targetController = object.constructor.prototype;
    const functionKeys = Object.getOwnPropertyNames(targetController);
    functionKeys.filter(key => key !== 'constructor' && Reflect.getMetadata('METHOD', targetController, key) && Reflect.getMetadata('PATH', targetController, key)).forEach(fn => {
        const method = Reflect.getMetadata('METHOD', targetController, fn);
        const path = Reflect.getMetadata('PATH', targetController, fn);
        const multerConfig = Reflect.getMetadata('MULTER', targetController, fn) || null;
        if (method === "POST")
            multerConfig ?
                route.post(path, (!multerConfig.type || multerConfig.type === 'single') ?
                    (0, multer_1.default)(multerConfig.config).single(multerConfig.path || 'file') :
                    (0, multer_1.default)(multerConfig.config).any(), (req, res) => __awaiter(this, void 0, void 0, function* () { return yield object[fn](res, req); })) :
                route.post(path, (req, res) => __awaiter(this, void 0, void 0, function* () { return yield object[fn](res, req); }));
        if (method === "GET")
            route.get(path, (req, res) => __awaiter(this, void 0, void 0, function* () { return yield object[fn](res, req); }));
        if (method === "PUT")
            route.put(path, (req, res) => __awaiter(this, void 0, void 0, function* () { return yield object[fn](res, req); }));
        if (method === "DELETE")
            route.delete(path, (req, res) => __awaiter(this, void 0, void 0, function* () { return yield object[fn](res, req); }));
        if (method === "PATCH")
            route.patch(path, (req, res) => __awaiter(this, void 0, void 0, function* () { return yield object[fn](res, req); }));
    });
    return route;
}
exports.routeFromController = routeFromController;
// export function getMulterFileNameAndExtension(multerFile: MulterFile, externalId = null) {
//     const parsedFileName = multerFile.originalname.replaceAll(/\s/g,'').split('.')[0];
//     const fileExtension = multerFile.originalname.replaceAll(/\s/g,'').split('.')[1];
//     const fileName = parsedFileName + '_' + (externalId ? externalId + '_' : '') + moment().valueOf() + '.' + fileExtension;
//     return { fileName, fileExtension };
// }
//# sourceMappingURL=Helpers.js.map