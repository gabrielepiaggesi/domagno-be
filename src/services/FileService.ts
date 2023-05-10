import { ServerError } from "../../utils/ServerError";
import { FileApi } from "../apis.ts/FileApi";
import { FileItem } from "../dtos/FileItemDTO";
import { FileStatus } from "../enums/FileStatus.enum";
import { Assignment } from "../../utils/Assignment";

export class FileService implements FileApi {

    public async getFiles(assignmentId: number, token: string): Promise<FileItem[]> {
        const phaseId = await Assignment.getPhase(assignmentId, token);
        if (phaseId != 2) throw new ServerError('LINK_PROCESSED', null, 403);

        const attachments = await Assignment.getAttachments(assignmentId, token) || [];
        return attachments.filter(att => !att.isDeleted).map(att => this.transformObjToFileItem(att));
    }
    
    public async uploadFile(assignmentId: number, file: any|null, token: string): Promise<FileItem> {
        if (!file) throw new ServerError('MISSING_FILE');
        
        const newAttachment = await Assignment.uploadAttachment(assignmentId, file, token);
        return this.transformObjToFileItem(newAttachment);
    }

    public async sendFiles(assignmentId: number, token: string) {
        return await Assignment.firePerizia(assignmentId, token);
    }
    
    public async deleteFile(assignmentId: number, fileId: number, token: string) {
        return await Assignment.removeAttachment(assignmentId, fileId, token);
    }

    private transformObjToFileItem(fileObj: any): FileItem {
        return new FileItem(
            fileObj.id, 
            fileObj.isDeleted ? FileStatus.Deleted : FileStatus.Uploaded, 
            fileObj.fileType, 
            fileObj.fileName, 
            (fileObj.fileSize || 0)
        );
    }

}