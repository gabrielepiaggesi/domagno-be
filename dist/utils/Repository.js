"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const mongodb_1 = require("mongodb");
const Db_1 = require("./Db");
class Repository {
    save(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Db_1.db.collection(this.collection).insertOne(this.modelName ? Object.assign(Object.assign({}, model), { app: 'self-shooting', model: this.modelName }) : Object.assign(Object.assign({}, model), { app: 'self-shooting' }));
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Db_1.db.collection(this.collection).deleteOne({ _id: new mongodb_1.ObjectID(id) });
        });
    }
    update(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Db_1.db.collection(this.collection).updateOne({ _id: new mongodb_1.ObjectID(id) }, { $set: model });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Db_1.db.collection(this.collection).findOne({ _id: new mongodb_1.ObjectID(id) });
        });
    }
    findAnyByKeyValue(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Db_1.db.collection(this.collection).find(this.modelName ? { [key]: value, model: this.modelName } : { [key]: value }).toArray();
        });
    }
    findOneByKeyValue(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Db_1.db.collection(this.collection).findOne(this.modelName ? { [key]: value, model: this.modelName } : { [key]: value });
        });
    }
}
exports.Repository = Repository;
//# sourceMappingURL=Repository.js.map