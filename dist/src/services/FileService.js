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
exports.FileService = void 0;
const Axios_1 = require("../../utils/Axios");
const form_data_1 = __importDefault(require("form-data"));
class FileService {
    constructor() {
        this.ASS_BASE_URL = 'http://whoosnapinsurancetest2.westeurope.cloudapp.azure.com:8254/api/v1/assignments/';
    }
    uploadFile(assignmentId, file, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!file)
                throw new Error('Missing file');
            const formData = new form_data_1.default();
            formData.append("fileData", Buffer.from(file.buffer), file.originalname);
            formData.append("Type", '0');
            formData.append("Name", file.originalname);
            formData.append("Description", "");
            const uploadEndpoint = this.ASS_BASE_URL + `${assignmentId}/attachments`;
            return yield Axios_1.Axios.post(token, uploadEndpoint, formData, 'multipart/form-data', formData.getHeaders());
        });
    }
    deleteFile(assignmentId, fileId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Axios_1.Axios.delete(token, this.ASS_BASE_URL + `${assignmentId}/attachments/${fileId}`);
        });
    }
    getFiles(assignmentId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield Axios_1.Axios.get(token, this.ASS_BASE_URL + `${assignmentId}/attachments`);
            return files;
        });
    }
}
exports.FileService = FileService;
//# sourceMappingURL=FileService.js.map