import { ServerError } from "../../utils/ServerError";
import { FileApi } from "../apis/FileApi";
import { FileItemDTO } from "../dtos/FileItemDTO";
import { FileStatus } from "../enums/FileStatus.enum";
import { Assignment } from "../../utils/Assignment";

export class FileService implements FileApi {

    public async getFiles(assignmentId: number, token: string): Promise<FileItemDTO[]> {
        const phaseId = await Assignment.getPhase(assignmentId, token);
        if (phaseId != 2) throw new ServerError('WRONG_ASS_PHASE', null, 403);

        const attachments = await Assignment.getAttachments(assignmentId, token) || [];
        return attachments.filter(att => !att.isDeleted && [32,33].includes(att.type.id)).map(att => this.transformObjToFileItem(att));
    }
    
    public async uploadFile(assignmentId: number, file: any|null, token: string): Promise<FileItemDTO> {
        if (!file) throw new ServerError('MISSING_FILE');
        
        const newAttachment = await Assignment.uploadAttachment(assignmentId, file, token);
        return this.transformObjToFileItem(newAttachment);
    }
    
    public async deleteFile(assignmentId: number, fileId: number, token: string) {
        return await Assignment.removeAttachment(assignmentId, fileId, token);
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