import { Model } from "../../utils/Model";

export class Sms extends Model {
    assignment_id: number;
    contact_id: number;
    contact_name: string;
    phone_number: string;
    sent_at: string;
}