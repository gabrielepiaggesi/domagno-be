"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRepository = void 0;
const Repository_1 = require("../../utils/Repository");
class FileRepository extends Repository_1.Repository {
    constructor() {
        super(...arguments);
        this.collection = "Documenti";
        this.modelName = 'File';
    }
}
exports.FileRepository = FileRepository;
//# sourceMappingURL=FileRepository.js.map