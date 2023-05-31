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
exports.Axios = void 0;
const axios_1 = __importDefault(require("axios"));
const ServerError_1 = require("./ServerError");
function getHeaders(token, contentType = 'application/json', extraHeaders = null) {
    let h = { 'Content-Type': contentType };
    h["Accept-Language"] = "IT-IT";
    h["Authorization"] = token;
    return { 'headers': extraHeaders ? Object.assign(Object.assign({}, h), extraHeaders) : h, maxContentLength: 10000000, maxBodyLength: 10000000 };
}
function throwError(e) {
    var _a, _b;
    throw new ServerError_1.ServerError('AXIOS_ERR', (_a = e.response) === null || _a === void 0 ? void 0 : _a.statusText, (_b = e.response) === null || _b === void 0 ? void 0 : _b.status, e);
}
class Axios {
    static get(token, endpoint, contentType = 'application/json') {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield axios_1.default.get(endpoint, getHeaders(token, contentType)).catch(e => throwError(e))).data;
        });
    }
    static post(token, endpoint, body, contentType = 'application/json', extraHeaders = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield axios_1.default.post(endpoint, body, getHeaders(token, contentType, extraHeaders)).catch(e => throwError(e))).data;
        });
    }
    static delete(token, endpoint, contentType = 'application/json') {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield axios_1.default.delete(endpoint, getHeaders(token, contentType)).catch(e => throwError(e))).data;
        });
    }
    static put(token, endpoint, body, contentType = 'application/json') {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield axios_1.default.put(endpoint, body, getHeaders(token, contentType)).catch(e => throwError(e))).data;
        });
    }
}
exports.Axios = Axios;
//# sourceMappingURL=Axios.js.map