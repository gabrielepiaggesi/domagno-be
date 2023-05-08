"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.FileController = void 0;
const multer_1 = require("multer");
const HttpMehtodDecorators_1 = require("../../utils/HttpMehtodDecorators");
const Log_1 = require("../../utils/Log");
const FileService_1 = require("../services/FileService");
const fileService = new FileService_1.FileService();
const multerConfig = {
    storage: (0, multer_1.memoryStorage)(),
    limits: {
        fileSize: 10 * 1024 * 1024 // not heavier than 10MB
    }
};
class FileController {
    uploadFile(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.header('Authorization');
                const response = yield fileService.uploadFile(+req.params.assignmentId, req.file, token);
                return res.status(200).json(response);
            }
            catch (e) {
                Log_1.LOG.error(e);
                return res.status(e.status || 500).json(Object.assign(Object.assign({}, e), { message: e.message, code: e.code || 'File.uploadFile.Error' }));
            }
        });
    }
    deleteFile(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.header('Authorization');
                const response = yield fileService.deleteFile(+req.params.assignmentId, +req.params.fileId, token);
                return res.status(200).json(response);
            }
            catch (e) {
                Log_1.LOG.error(e);
                return res.status(e.status || 500).json(Object.assign(Object.assign({}, e), { message: e.message, code: e.code || 'File.deleteFile.Error' }));
            }
        });
    }
    getFiles(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.header('Authorization');
                const response = yield fileService.getFiles(+req.params.assignmentId, token);
                return res.status(200).json(response);
            }
            catch (e) {
                Log_1.LOG.error(e);
                return res.status(e.status || 500).json(Object.assign(Object.assign({}, e), { message: e.message, code: e.code || 'File.getFiles.Error' }));
            }
        });
    }
}
__decorate([
    (0, HttpMehtodDecorators_1.Post)(),
    (0, HttpMehtodDecorators_1.Multer)({ multerConfig, type: 'single', path: 'file' }),
    (0, HttpMehtodDecorators_1.Path)("/upload/:assignmentId")
], FileController.prototype, "uploadFile", null);
__decorate([
    (0, HttpMehtodDecorators_1.Delete)(),
    (0, HttpMehtodDecorators_1.Path)("/delete/:assignmentId/:fileId")
], FileController.prototype, "deleteFile", null);
__decorate([
    (0, HttpMehtodDecorators_1.Get)(),
    (0, HttpMehtodDecorators_1.Path)("/list/:assignmentId")
], FileController.prototype, "getFiles", null);
exports.FileController = FileController;
//# sourceMappingURL=FileController.js.map