"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsRepository = void 0;
const Repository_1 = require("../../utils/Repository");
class SmsRepository extends Repository_1.Repository {
    constructor() {
        super(...arguments);
        this.collection = "Documenti";
        this.modelName = 'Sms';
    }
}
exports.SmsRepository = SmsRepository;
//# sourceMappingURL=SmsRepository.js.map