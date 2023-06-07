import { Repository } from "../../utils/Repository";
import { File } from "../models/File";

export class FileRepository extends Repository<File> {
    public override collection: string = "Documenti";
    public override modelName: string = 'File';
}