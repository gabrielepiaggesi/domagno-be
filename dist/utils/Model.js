"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
class Model {
    // tslint:disable-next-line:no-empty
    constructor() {
        // tslint:disable-next-line:variable-name
        // public created_at: string = new Date(Date.now()).toISOString().substring(0, 19).replace("T", " ");
        this.createdAt = new Date(Date.now()).toLocaleString('sv', { timeZone: 'Europe/Rome' });
        // tslint:disable-next-line:variable-name
        this.updatedAt = this.createdAt;
    }
    getId() {
        return this._id;
    }
}
exports.Model = Model;
//# sourceMappingURL=Model.js.map