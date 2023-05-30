import { db } from "../../utils/Db";
import { Repository } from "../../utils/Repository";
import { Link } from "../models/Link";
import { ObjectID } from 'mongodb';

export class LinkRepository extends Repository<Link> {
    public override collection: string = "Documenti";
    public override modelName: string = 'Link';

    public async updateStatus(id: number|string, status: string) {
        return await db.collection(this.collection).updateOne({ _id: new ObjectID(id) }, { $set: { status } });
    }
}