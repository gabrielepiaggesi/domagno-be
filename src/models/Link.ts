import { Model } from "../../utils/Model";
import { LinkStatus } from "../enums/LinkStatus.enum";

export class Link extends Model {
    uuid: string;
    status: LinkStatus;
    text: string;
    assignmentId: number;
}