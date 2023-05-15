import { Model } from "../../utils/Model";

export class Link extends Model {
    uuid: string;
    status: string;
    assignmentId: number;
}