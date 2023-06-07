import { Model } from "../../utils/Model";

export class File extends Model {
    name: string;
    size: number;
    extension: string;
    url: string;
    originalName: string;
    forPlatform?: string;
    platformInternalId?: number;
}