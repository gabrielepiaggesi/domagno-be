import { Axios } from "./Axios";
import FormData from 'form-data';
import config from 'config';
import { getMulterFileNameAndExtension } from "./Helpers";
import { MulterFile } from "../src/types/MulterFile";

export class Assignment {
    private static readonly ASSIGNMENT_URL = config.get('ASSIGNMENT_URL');

    static async uploadAttachment(assignmentId: number, multerFile: MulterFile, token: string): Promise<any> {
        const formData = new FormData();
        const { fileName } = getMulterFileNameAndExtension(multerFile, assignmentId);
        formData.append("fileData", multerFile.buffer, fileName);
        formData.append("Type", multerFile.mimetype.includes('image') ? '33' : '32');
        formData.append("Name", fileName);
        formData.append("Description", "");

        const uploadEndpoint = this.ASSIGNMENT_URL + `assignments/${assignmentId}/attachments`;
        const res = await Axios.post(token, uploadEndpoint, formData, 'multipart/form-data', formData.getHeaders());
        const resData = res.data;
        const uploadedFile = resData?.createdAttachment;
        return uploadedFile;
    }

    static async getAttachments(assignmentId: number, token: string): Promise<any[]> {
        const filesRes = await Axios.get(token, this.ASSIGNMENT_URL + `assignments/${assignmentId}/attachments`);
        return filesRes?.data;
    }

    static async getPhase(assignmentId: number, token: string): Promise<number> {
        const assignmentData = await Axios.get(token, this.ASSIGNMENT_URL + `Assignments/${assignmentId}`);
        const workFlowInfo = assignmentData.workflowInfo;
        const phaseId = workFlowInfo?.phase?.id;
        return phaseId;
    }

    static async firePerizia(assignmentId: number, token: string): Promise<any> {
        return await Axios.post(token, this.ASSIGNMENT_URL + `Assignments/${assignmentId}/fire`, { trigger: 15 });
    }

    static async toggleAttesa(assignmentId: number, inAttesa: boolean, token: string): Promise<any> {
        return await Axios.put(token, this.ASSIGNMENT_URL + `assignments/${assignmentId}/${inAttesa ? 'inattesa' : 'inlavorazione'}`, { motivazioneAttesaId: 12, notes: "In attesa di integrazione fotografica/documentale" });
    }

    static async removeAttachment(assignmentId: number, fileId: number, token: string): Promise<any> {
        return await Axios.delete(token, this.ASSIGNMENT_URL + `assignments/${assignmentId}/attachments/${fileId}`);
    }

}