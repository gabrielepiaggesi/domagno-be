import { Model } from "../../utils/Model";
import { InsoorePlatform } from "../types/InsoorePlatform";

export class File extends Model {
    name: string;
    size: number;
    extension: string;
    url: string;
    originalName: string;
    assignmentId?: number;
}