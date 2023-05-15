"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.LinkController = void 0;
const HttpMehtodDecorators_1 = require("../../utils/HttpMehtodDecorators");
const Log_1 = require("../../utils/Log");
const LinkService_1 = require("../services/LinkService");
const linkService = new LinkService_1.LinkService();
class LinkController {
    getLink(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield linkService.getLink(req.params.linkUUID);
                return res.status(200).json(response);
            }
            catch (e) {
                Log_1.LOG.error(e);
                return res.status(e.status || 500).json(Object.assign(Object.assign({}, e), { message: e.message || e.msg, code: e.code || 'Link.getLink.Error' }));
            }
        });
    }
    saveLink(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield linkService.saveLink(req.body);
                return res.status(200).json(response);
            }
            catch (e) {
                Log_1.LOG.error(e);
                return res.status(e.status || 500).json(Object.assign(Object.assign({}, e), { message: e.message || e.msg, code: e.code || 'Link.saveLink.Error' }));
            }
        });
    }
    changeLinkStatus(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield linkService.changeLinkStatus(req.params.linkUUID, req.params.status);
                return res.status(200).json(response);
            }
            catch (e) {
                Log_1.LOG.error(e);
                return res.status(e.status || 500).json(Object.assign(Object.assign({}, e), { message: e.message || e.msg, code: e.code || 'Link.changeLinkStatus.Error' }));
            }
        });
    }
    removeLink(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield linkService.removeLink(req.params.linkUUID);
                return res.status(200).json(response);
            }
            catch (e) {
                Log_1.LOG.error(e);
                return res.status(e.status || 500).json(Object.assign(Object.assign({}, e), { message: e.message || e.msg, code: e.code || 'Link.removeLink.Error' }));
            }
        });
    }
}
__decorate([
    (0, HttpMehtodDecorators_1.Get)(),
    (0, HttpMehtodDecorators_1.Path)("/info/:linkUUID")
], LinkController.prototype, "getLink", null);
__decorate([
    (0, HttpMehtodDecorators_1.Post)(),
    (0, HttpMehtodDecorators_1.Path)("/save")
], LinkController.prototype, "saveLink", null);
__decorate([
    (0, HttpMehtodDecorators_1.Put)(),
    (0, HttpMehtodDecorators_1.Path)("/changeStatus/:linkUUID/:status")
], LinkController.prototype, "changeLinkStatus", null);
__decorate([
    (0, HttpMehtodDecorators_1.Delete)(),
    (0, HttpMehtodDecorators_1.Path)("/remove/:linkUUID")
], LinkController.prototype, "removeLink", null);
exports.LinkController = LinkController;
//# sourceMappingURL=LinkController.js.map