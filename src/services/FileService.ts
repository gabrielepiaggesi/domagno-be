import { ServerError } from "../../utils/ServerError";
import { FileApi } from "../apis/FileApi";
import { FileItemDTO } from "../dtos/FileItemDTO";
import { FileStatus } from "../enums/FileStatus.enum";
import { Assignment } from "../../utils/Assignment";
import { LinkService } from "./LinkService";
import { LOG } from "../../utils/Log";
import { File } from "../models/File";
import { getFileNameAndExtension } from "../../utils/Helpers";
import { FileRepository } from "../repositories/FileRepository";
import { AzureStorage } from "../../utils/AzureStorage";

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
    
    public async uploadFile(linkID: string, multerFile: any|null, token: string): Promise<FileItemDTO> {
        const link = await linkService.getLinkByID(linkID, true);
        if (!link) throw new ServerError('LINK_NOT_FOUND');
        if (!multerFile) throw new ServerError('MISSING_FILE');

        const { name, extension } = getFileNameAndExtension(multerFile, link.assignmentId);
        const file = new File();
        file.originalName = multerFile.originalName;
        file.size = multerFile.size;
        file.name = name;
        file.extension = extension;
        file.forPlatform = 'assignment';
        file.platformInternalId = link.assignmentId;
        const fileSaved = await fileRepository.save(file);
        file._id = fileSaved.insertedId;

        const fileUploaded = await AzureStorage.uploadFileOnAzure(multerFile, link.assignmentId);
        const newAttachment = await Assignment.uploadAttachment(link.assignmentId, multerFile, token);
        return this.transformObjToFileItem(newAttachment);
    }
    
    public async deleteFile(linkID: string, fileId: number, token: string) {
        const link = await linkService.getLinkByID(linkID, true);
        if (!link) throw new ServerError('LINK_NOT_FOUND');
    
        LOG.success("DELETING FILE", linkID);
        return await Assignment.removeAttachment(link.assignmentId, fileId, token);
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