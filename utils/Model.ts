export class Model {
    // tslint:disable-next-line:variable-name
    // public created_at: string = new Date(Date.now()).toISOString().substring(0, 19).replace("T", " ");
    public createdAt: string = new Date(Date.now()).toLocaleString('sv', {timeZone: 'Europe/Rome'});
    // tslint:disable-next-line:variable-name
    public updatedAt: string = this.createdAt;
    // tslint:disable-next-line:variable-name
    public deletedAt: string;
    public _id;

    // tslint:disable-next-line:no-empty
    constructor() {}

    public getId() {
        return this._id;
    }
}