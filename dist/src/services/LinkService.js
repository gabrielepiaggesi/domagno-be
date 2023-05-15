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
exports.LinkService = void 0;
const Log_1 = require("../../utils/Log");
const Link_1 = require("../models/Link");
const LinkRepository_1 = require("../repositories/LinkRepository");
const linkRepository = new LinkRepository_1.LinkRepository();
class LinkService {
    saveLink(linkData) {
        return __awaiter(this, void 0, void 0, function* () {
            const equalLink = yield this.getLink(linkData.uuid);
            if (equalLink)
                return equalLink;
            const newLink = new Link_1.Link();
            newLink.uuid = linkData.uuid;
            newLink.status = 'active';
            newLink.assignmentId = linkData.assignmentId;
            const linkSaved = yield linkRepository.save(newLink);
            newLink._id = linkSaved.insertedId;
            Log_1.LOG.success('New link saved', newLink.uuid, newLink._id);
            return newLink;
        });
    }
    getLink(linkUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield linkRepository.findOneByKeyValue('uuid', linkUUID);
        });
    }
    changeLinkStatus(linkUUID, status) {
        return __awaiter(this, void 0, void 0, function* () {
            Log_1.LOG.info('Changing link status to', status, linkUUID);
            const link = yield linkRepository.findOneByKeyValue('uuid', linkUUID);
            return yield linkRepository.update(link._id, Object.assign(Object.assign({}, link), { status }));
        });
    }
    removeLink(linkUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            Log_1.LOG.info('Removing link', linkUUID);
            const link = yield linkRepository.findOneByKeyValue('uuid', linkUUID);
            return yield linkRepository.delete(link._id);
        });
    }
}
exports.LinkService = LinkService;
//# sourceMappingURL=LinkService.js.map