import { Axios } from "../../utils/Axios";
import { FileApi } from "../apis.ts/FileApi";
import FormData from 'form-data';

export class FileService implements FileApi {
    private readonly ASSIGNMENT_URL = 'http://whoosnapinsurancetest2.westeurope.cloudapp.azure.com:8254/api/v1/assignments/';
    
    public async uploadFile(assignmentId: number, file: any|null, token: string) {
        if (!file) throw new Error('Missing file');
        
        const formData = new FormData();
        formData.append("fileData", Buffer.from(file.buffer), file.originalname);
        formData.append("Type", '0');
        formData.append("Name", file.originalname);
        formData.append("Description", "");

        const uploadEndpoint = this.ASSIGNMENT_URL + `${assignmentId}/attachments`;
        return await Axios.post(token, uploadEndpoint, formData, 'multipart/form-data', formData.getHeaders());
    }
    
    public async deleteFile(assignmentId: number, fileId: number, token: string) {
        return await Axios.delete(token, this.ASSIGNMENT_URL + `${assignmentId}/attachments/${fileId}`);
    }

    public async getFiles(assignmentId: number, token: string) {
        const files = await Axios.get(token, this.ASSIGNMENT_URL + `${assignmentId}/attachments`);
        return files;
    }

}