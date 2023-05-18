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
const Assignment_1 = require("../../utils/Assignment");
const Log_1 = require("../../utils/Log");
const RandomID_1 = require("../../utils/RandomID");
const ServerError_1 = require("../../utils/ServerError");
const LinkStatus_enum_1 = require("../enums/LinkStatus.enum");
const Link_1 = require("../models/Link");
const LinkRepository_1 = require("../repositories/LinkRepository");
const linkRepository = new LinkRepository_1.LinkRepository();
class LinkService {
    getLinkByAssignmentID(assignmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield linkRepository.findOneByKeyValue('assignmentId', assignmentId);
        });
    }
    getLinkByUUID(linkUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield linkRepository.findOneByKeyValue('uuid', linkUUID);
        });
    }
    getLinkByID(linkID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield linkRepository.findById(linkID);
        });
    }
    saveLink(assignmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const equalLink = yield this.getLinkByAssignmentID(assignmentId);
            if (equalLink) {
                Log_1.LOG.warn('Cannot save link, returning equal one', assignmentId, equalLink._id);
                return equalLink;
            }
            const newLink = new Link_1.Link();
            newLink.uuid = RandomID_1.RandomID.generate();
            newLink.status = LinkStatus_enum_1.LinkStatus.InActive;
            newLink.assignmentId = assignmentId;
            const linkSaved = yield linkRepository.save(newLink);
            newLink._id = linkSaved.insertedId;
            Log_1.LOG.success('New link saved', newLink.uuid, newLink._id);
            return newLink;
        });
    }
    sendFiles(linkID, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const link = yield linkRepository.findById(linkID);
            yield this.changeLinkStatus(linkID, 'inactive');
            return yield Assignment_1.Assignment.toggleAttesa(link.assignmentId, false, token);
        });
    }
    activeLink(linkID, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const link = yield linkRepository.findById(linkID);
            yield this.changeLinkStatus(linkID, 'active');
            return yield Assignment_1.Assignment.toggleAttesa(link.assignmentId, true, token);
        });
    }
    changeLinkStatus(linkID, status) {
        return __awaiter(this, void 0, void 0, function* () {
            Log_1.LOG.info('Changing link status to', status, linkID);
            const newStatus = LinkStatus_enum_1.LinkStatus[status];
            if (!newStatus)
                throw new ServerError_1.ServerError('WRONG_LINK_STATUS');
            return yield linkRepository.updateStatus(linkID, newStatus);
        });
    }
    removeLink(linkID) {
        return __awaiter(this, void 0, void 0, function* () {
            Log_1.LOG.info('Removing link', linkID);
            return yield linkRepository.delete(linkID);
        });
    }
}
exports.LinkService = LinkService;
//# sourceMappingURL=LinkService.js.map