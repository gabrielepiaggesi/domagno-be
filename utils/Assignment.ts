import { Axios } from "./Axios";
import FormData from 'form-data';
import moment from 'moment';

export class Assignment {
    private static readonly ASSIGNMENT_URL = 'http://whoosnapinsurancetest2.westeurope.cloudapp.azure.com:8254/api/v1/';

    static async uploadAttachment(assignmentId: number, file: any, token: string): Promise<any> {
        const formData = new FormData();
        const fileName = file.originalname.replaceAll(/\s/g,'').split('.')[0];
        const fileExtension = file.originalname.replaceAll(/\s/g,'').split('.')[1];
        const uniqueFileName = fileName + '_' + assignmentId + '_' + moment().valueOf() + '.' + fileExtension;
        formData.append("fileData", file.buffer, uniqueFileName);
        formData.append("Type", '22');
        formData.append("Name", uniqueFileName);
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

    static async removeAttachment(assignmentId: number, fileId: number, token: string): Promise<any> {
        return await Axios.delete(token, this.ASSIGNMENT_URL + `assignments/${assignmentId}/attachments/${fileId}`);
    }

}