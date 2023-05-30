import { db } from "../../utils/Db";
import { Repository } from "../../utils/Repository";
import { Sms } from "../models/Sms";

export class SmsRepository extends Repository<Sms> {
    public override collection: string = "Documenti";
    public override modelName: string = 'Sms';
}