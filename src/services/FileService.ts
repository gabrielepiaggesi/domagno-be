import { ServerError } from "../../utils/ServerError";
import { FileApi } from "../apis/FileApi";
import { FileItemDTO } from "../dtos/FileItemDTO";
import { FileStatus } from "../enums/FileStatus.enum";
import { Assignment } from "../../utils/Assignment";
import { LinkService } from "./LinkService";
import { LOG } from "../../utils/Log";
import { File } from "../models/File";
import { getMulterFileNameAndExtension } from "../../utils/Helpers";
import { FileRepository } from "../repositories/FileRepository";
import { AzureStorage } from "../../utils/AzureStorage";
import { MulterFile } from "../types/MulterFile";

const linkService = new LinkService();
const fileRepository = new FileRepository();

export class FileService implements FileApi {

    public async getFiles(linkID: string, token: string): Promise<FileItemDTO[]> {
        const link = await linkService.getLinkByID(linkID, true);
        if (!link) throw new ServerError('LINK_NOT_FOUND');

        const phaseId = await Assignment.getPhase(link.assignmentId, token);
        if (![5, 6].includes(phaseId)) throw new ServerError('WRONG_ASSIGNMENT_PHASE', null, 403);

        const attachments = await Assignment.getAttachments(link.assignmentId, token) || [];
        return attachments.filter(att => !att.isDeleted && [32,33].includes(att.type.id)).map(att => this.transformObjToFileItem(att));
    }
    
    public async uploadFile(linkID: string, multerFile: MulterFile|null, token: string): Promise<FileItemDTO> {
        const link = await linkService.getLinkByID(linkID, true);
        if (!link) throw new ServerError('LINK_NOT_FOUND');
        if (!multerFile) throw new ServerError('MISSING_FILE');

        await this.saveFile(multerFile, link.assignmentId);
        const newAttachment = await Assignment.uploadAttachment(link.assignmentId, multerFile, token);
        return this.transformObjToFileItem(newAttachment);
    }

    public async deleteFile(linkID: string, fileId: number, token: string) {
        const link = await linkService.getLinkByID(linkID, true);
        if (!link) throw new ServerError('LINK_NOT_FOUND');
    
        LOG.success("DELETING FILE", linkID);
        return await Assignment.removeAttachment(link.assignmentId, fileId, token);
    }

    public async saveFile(multerFile: MulterFile, assignmentId: number): Promise<File> {
        if (!multerFile) throw new ServerError('MISSING_FILE');
        const { fileName, fileExtension } = getMulterFileNameAndExtension(multerFile, assignmentId);
        const azureBlobUrl = await AzureStorage.uploadFileBuffer(multerFile, fileName, assignmentId);

        const file = new File();
        file.originalName = multerFile.originalname;
        file.mimeType = multerFile.mimetype;
        file.extension = fileExtension;
        file.size = multerFile.size;
        file.name = fileName;
        file.url = azureBlobUrl;
        file.assignmentId = assignmentId;
        const fileSaved = await fileRepository.save(file);
        
        file._id = fileSaved.insertedId;
        LOG.success("NEW FILE SAVED", file._id);
        return file;
    }

    private transformObjToFileItem(fileObj: any): FileItemDTO {
        return new FileItemDTO(
            fileObj.id, 
            fileObj.isDeleted ? FileStatus.Deleted : FileStatus.Uploaded, 
            fileObj.fileType, 
            fileObj.fileName, 
            (fileObj.fileSize || 0)
        );
    }

}