import { Repository } from "../../utils/Repository";
import { Link } from "../models/Link";

export class LinkRepository extends Repository<Link> {
    public override collection: string = "Documenti";
}