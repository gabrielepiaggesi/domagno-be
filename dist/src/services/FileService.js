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
exports.FileService = void 0;
const ServerError_1 = require("../../utils/ServerError");
const FileItemDTO_1 = require("../dtos/FileItemDTO");
const FileStatus_enum_1 = require("../enums/FileStatus.enum");
const Assignment_1 = require("../../utils/Assignment");
const LinkService_1 = require("./LinkService");
const Log_1 = require("../../utils/Log");
const File_1 = require("../models/File");
const Helpers_1 = require("../../utils/Helpers");
const FileRepository_1 = require("../repositories/FileRepository");
const AzureStorage_1 = require("../../utils/AzureStorage");
const linkService = new LinkService_1.LinkService();
const fileRepository = new FileRepository_1.FileRepository();
class FileService {
    getFiles(linkID, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const link = yield linkService.getLinkByID(linkID, true);
            if (!link)
                throw new ServerError_1.ServerError('LINK_NOT_FOUND');
            const phaseId = yield Assignment_1.Assignment.getPhase(link.assignmentId, token);
            if (![5, 6].includes(phaseId))
                throw new ServerError_1.ServerError('WRONG_ASSIGNMENT_PHASE', null, 403);
            const attachments = (yield Assignment_1.Assignment.getAttachments(link.assignmentId, token)) || [];
            return attachments.filter(att => !att.isDeleted && [32, 33].includes(att.type.id)).map(att => this.transformObjToFileItem(att));
        });
    }
    uploadFile(linkID, multerFile, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const link = yield linkService.getLinkByID(linkID, true);
            if (!link)
                throw new ServerError_1.ServerError('LINK_NOT_FOUND');
            if (!multerFile)
                throw new ServerError_1.ServerError('MISSING_FILE');
            yield this.saveFile(multerFile, link.assignmentId);
            const newAttachment = yield Assignment_1.Assignment.uploadAttachment(link.assignmentId, multerFile, token);
            return this.transformObjToFileItem(newAttachment);
        });
    }
    deleteFile(linkID, fileId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const link = yield linkService.getLinkByID(linkID, true);
            if (!link)
                throw new ServerError_1.ServerError('LINK_NOT_FOUND');
            Log_1.LOG.success("DELETING FILE", linkID);
            return yield Assignment_1.Assignment.removeAttachment(link.assignmentId, fileId, token);
        });
    }
    saveFile(multerFile, assignmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!multerFile)
                throw new ServerError_1.ServerError('MISSING_FILE');
            const { fileName, fileExtension } = (0, Helpers_1.getMulterFileNameAndExtension)(multerFile, assignmentId);
            const azureBlobUrl = yield AzureStorage_1.AzureStorage.uploadFileBuffer(multerFile, fileName, assignmentId);
            const file = new File_1.File();
            file.originalName = multerFile.originalname;
            file.mimeType = multerFile.mimetype;
            file.extension = fileExtension;
            file.size = multerFile.size;
            file.name = fileName;
            file.url = azureBlobUrl;
            file.assignmentId = assignmentId;
            const fileSaved = yield fileRepository.save(file);
            file._id = fileSaved.insertedId;
            Log_1.LOG.success("NEW FILE SAVED", file._id);
            return file;
        });
    }
    transformObjToFileItem(fileObj) {
        return new FileItemDTO_1.FileItemDTO(fileObj.id, fileObj.isDeleted ? FileStatus_enum_1.FileStatus.Deleted : FileStatus_enum_1.FileStatus.Uploaded, fileObj.fileType, fileObj.fileName, (fileObj.fileSize || 0));
    }
}
exports.FileService = FileService;
//# sourceMappingURL=FileService.js.map