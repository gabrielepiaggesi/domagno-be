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
exports.Assignment = void 0;
const Axios_1 = require("./Axios");
const form_data_1 = __importDefault(require("form-data"));
const moment_1 = __importDefault(require("moment"));
class Assignment {
    static uploadAttachment(assignmentId, file, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = new form_data_1.default();
            const fileName = file.originalname.replaceAll(/\s/g, '').split('.')[0];
            const fileExtension = file.originalname.replaceAll(/\s/g, '').split('.')[1];
            const uniqueFileName = fileName + '_' + assignmentId + '_' + (0, moment_1.default)().valueOf() + '.' + fileExtension;
            formData.append("fileData", file.buffer, uniqueFileName);
            formData.append("Type", '22');
            formData.append("Name", uniqueFileName);
            formData.append("Description", "");
            const uploadEndpoint = this.ASSIGNMENT_URL + `assignments/${assignmentId}/attachments`;
            const res = yield Axios_1.Axios.post(token, uploadEndpoint, formData, 'multipart/form-data', formData.getHeaders());
            const resData = res.data;
            const uploadedFile = resData === null || resData === void 0 ? void 0 : resData.createdAttachment;
            return uploadedFile;
        });
    }
    static getAttachments(assignmentId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const filesRes = yield Axios_1.Axios.get(token, this.ASSIGNMENT_URL + `assignments/${assignmentId}/attachments`);
            return filesRes === null || filesRes === void 0 ? void 0 : filesRes.data;
        });
    }
    static getPhase(assignmentId, token) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const assignmentData = yield Axios_1.Axios.get(token, this.ASSIGNMENT_URL + `Assignments/${assignmentId}`);
            const workFlowInfo = assignmentData.workflowInfo;
            const phaseId = (_a = workFlowInfo === null || workFlowInfo === void 0 ? void 0 : workFlowInfo.phase) === null || _a === void 0 ? void 0 : _a.id;
            return phaseId;
        });
    }
    static firePerizia(assignmentId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Axios_1.Axios.post(token, this.ASSIGNMENT_URL + `Assignments/${assignmentId}/fire`, { trigger: 15 });
        });
    }
    static toggleAttesa(assignmentId, inAttesa, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Axios_1.Axios.put(token, this.ASSIGNMENT_URL + `assignments/${assignmentId}/${inAttesa ? 'inattesa' : 'inlavorazione'}`, { motivazioneAttesaId: 12, notes: "Self-Shooting LINK" });
        });
    }
    static removeAttachment(assignmentId, fileId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Axios_1.Axios.delete(token, this.ASSIGNMENT_URL + `assignments/${assignmentId}/attachments/${fileId}`);
        });
    }
}
Assignment.ASSIGNMENT_URL = 'http://whoosnapinsurancetest2.westeurope.cloudapp.azure.com:8254/api/v1/';
exports.Assignment = Assignment;
//# sourceMappingURL=Assignment.js.map