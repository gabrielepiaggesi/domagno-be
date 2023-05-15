"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkRepository = void 0;
const Repository_1 = require("../../utils/Repository");
class LinkRepository extends Repository_1.Repository {
    constructor() {
        super(...arguments);
        this.collection = "Documenti";
    }
}
exports.LinkRepository = LinkRepository;
//# sourceMappingURL=LinkRepository.js.map