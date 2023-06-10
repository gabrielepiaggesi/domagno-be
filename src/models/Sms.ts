import { Model } from "../../utils/Model";

export class Sms extends Model {
    assignmentId: number;
    contactId: number;
    contactName: string;
    phoneNumber: string;
    sentAtt: string;
}