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
exports.LinkRepository = void 0;
const Db_1 = require("../../utils/Db");
const Repository_1 = require("../../utils/Repository");
const mongodb_1 = require("mongodb");
class LinkRepository extends Repository_1.Repository {
    constructor() {
        super(...arguments);
        this.collection = "Documenti";
    }
    updateStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Db_1.db.collection(this.collection).updateOne({ _id: new mongodb_1.ObjectID(id) }, { $set: { status } });
        });
    }
}
exports.LinkRepository = LinkRepository;
//# sourceMappingURL=LinkRepository.js.map