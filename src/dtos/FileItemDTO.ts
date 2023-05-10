import { FileStatus } from "../enums/FileStatus.enum";

export class FileItemDTO {
    public id: number;
    public status: FileStatus;
    public type: string;
    public name: string;
    public size: number;

    constructor(
        id: number,
        status: FileStatus,
        type: string,
        name: string,
        size: number,
    ) {
        this.status = status;
        this.type = type;
        this.name = name;
        this.size = size;
        this.id = id;
    }
}