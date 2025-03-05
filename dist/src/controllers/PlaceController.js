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
exports.PlaceController = void 0;
const Log_1 = require("../../utils/Log");
const PlaceService_1 = require("../services/PlaceService");
const HttpMehtodDecorators_1 = require("../../utils/HttpMehtodDecorators");
const placeService = new PlaceService_1.PlaceService();
class PlaceController {
    getNearByRestaurants(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield placeService.getNearByRestaurants(req.query.q, +req.query.radius || 1, +req.query.count || 3, req.query.lat, req.query.long);
                return res.status(200).json(response);
            }
            catch (e) {
                Log_1.LOG.error(e);
                return res.status(e.status || 500).json(Object.assign(Object.assign({}, e), { message: e.message || e.msg, code: e.code || 'Place.getNearByRestaurants.Error' }));
            }
        });
    }
    searchCeleb(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield placeService.searchCeleb(req.query.celebName);
                return res.status(200).json(response);
            }
            catch (e) {
                Log_1.LOG.error(e);
                return res.status(e.status || 500).json(Object.assign(Object.assign({}, e), { message: e.message || e.msg, code: e.code || 'Place.searchCeleb.Error' }));
            }
        });
    }
    sendPromptAndGetAnswer(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield placeService.sendPromptAndGetAnswer(req.body, +req.params.maxTokens || null);
                return res.status(200).json(response);
            }
            catch (e) {
                Log_1.LOG.error(e);
                return res.status(e.status || 500).json(Object.assign(Object.assign({}, e), { message: e.message || e.msg, code: e.code || 'Place.sendPromptAndGetAnswer.Error' }));
            }
        });
    }
    loadBoobs(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield placeService.loadBoobs(req.body);
                return res.status(200).json(response);
            }
            catch (e) {
                Log_1.LOG.error(e);
                return res.status(e.status || 500).json(Object.assign(Object.assign({}, e), { message: e.message || e.msg, code: e.code || 'Place.loadBoobs.Error' }));
            }
        });
    }
    sendMeal(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield placeService.sendMeal(req.body);
                return res.status(200).json(response);
            }
            catch (e) {
                Log_1.LOG.error(e);
                return res.status(e.status || 500).json(Object.assign(Object.assign({}, e), { message: e.message || e.msg, code: e.code || 'Place.sendMeal.Error' }));
            }
        });
    }
    searchCustomer(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield placeService.searchCustomer(req.query.email, req.query.customer, req.query.deviceId);
                return res.status(200).json(response);
            }
            catch (e) {
                Log_1.LOG.error(e);
                return res.status(e.status || 500).json(Object.assign(Object.assign({}, e), { message: e.message || e.msg, code: e.code || 'Place.searchCustomer.Error' }));
            }
        });
    }
    getPaymentLink(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield placeService.getPaymentLink(req.query.email, req.query.customer);
                return res.status(200).json(response);
            }
            catch (e) {
                Log_1.LOG.error(e);
                return res.status(e.status || 500).json(Object.assign(Object.assign({}, e), { message: e.message || e.msg, code: e.code || 'Place.getPaymentLink.Error' }));
            }
        });
    }
    getSubInfo(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield placeService.getSubInfo();
                return res.status(200).json(response);
            }
            catch (e) {
                Log_1.LOG.error(e);
                return res.status(e.status || 500).json(Object.assign(Object.assign({}, e), { message: e.message || e.msg, code: e.code || 'Place.getSubInfo.Error' }));
            }
        });
    }
    openStripeDashForCustomer(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield placeService.openStripeDashForCustomer(req.query.customer);
                return res.status(200).json(response);
            }
            catch (e) {
                Log_1.LOG.error(e);
                return res.status(e.status || 500).json(Object.assign(Object.assign({}, e), { message: e.message || e.msg, code: e.code || 'Place.openStripeDashForCustomer.Error' }));
            }
        });
    }
    setNewDeviceForCustomer(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield placeService.setNewDeviceForCustomer(req.query.customer, req.query.deviceId);
                return res.status(200).json(response);
            }
            catch (e) {
                Log_1.LOG.error(e);
                return res.status(e.status || 500).json(Object.assign(Object.assign({}, e), { message: e.message || e.msg, code: e.code || 'Place.setNewDeviceForCustomer.Error' }));
            }
        });
    }
    verifyWB(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield placeService.verifyWB(req);
                return res.status(200).json(response);
            }
            catch (e) {
                Log_1.LOG.error(e);
                return res.status(e.status || 500).json(Object.assign(Object.assign({}, e), { message: e.message || e.msg, code: e.code || 'Place.setNewDeviceForCustomer.Error' }));
            }
        });
    }
    logWB(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield placeService.logWB(req.body);
                return res.status(200).json(response);
            }
            catch (e) {
                Log_1.LOG.error(e);
                return res.status(e.status || 500).json(Object.assign(Object.assign({}, e), { message: e.message || e.msg, code: e.code || 'Place.setNewDeviceForCustomer.Error' }));
            }
        });
    }
}
__decorate([
    (0, HttpMehtodDecorators_1.Get)(),
    (0, HttpMehtodDecorators_1.Path)("/getNearByRestaurants")
], PlaceController.prototype, "getNearByRestaurants", null);
__decorate([
    (0, HttpMehtodDecorators_1.Get)(),
    (0, HttpMehtodDecorators_1.Path)("/searchCeleb")
], PlaceController.prototype, "searchCeleb", null);
__decorate([
    (0, HttpMehtodDecorators_1.Post)(),
    (0, HttpMehtodDecorators_1.Path)("/sendPromptAndGetAnswer/:maxTokens?")
], PlaceController.prototype, "sendPromptAndGetAnswer", null);
__decorate([
    (0, HttpMehtodDecorators_1.Post)(),
    (0, HttpMehtodDecorators_1.Path)("/loadBoobs")
], PlaceController.prototype, "loadBoobs", null);
__decorate([
    (0, HttpMehtodDecorators_1.Post)(),
    (0, HttpMehtodDecorators_1.Path)("/sendMeal")
], PlaceController.prototype, "sendMeal", null);
__decorate([
    (0, HttpMehtodDecorators_1.Get)(),
    (0, HttpMehtodDecorators_1.Path)("/searchCustomer")
], PlaceController.prototype, "searchCustomer", null);
__decorate([
    (0, HttpMehtodDecorators_1.Get)(),
    (0, HttpMehtodDecorators_1.Path)("/getPaymentLink")
], PlaceController.prototype, "getPaymentLink", null);
__decorate([
    (0, HttpMehtodDecorators_1.Get)(),
    (0, HttpMehtodDecorators_1.Path)("/getSubInfo")
], PlaceController.prototype, "getSubInfo", null);
__decorate([
    (0, HttpMehtodDecorators_1.Post)(),
    (0, HttpMehtodDecorators_1.Path)("/openStripeDashForCustomer")
], PlaceController.prototype, "openStripeDashForCustomer", null);
__decorate([
    (0, HttpMehtodDecorators_1.Post)(),
    (0, HttpMehtodDecorators_1.Path)("/setNewDeviceForCustomer")
], PlaceController.prototype, "setNewDeviceForCustomer", null);
__decorate([
    (0, HttpMehtodDecorators_1.Get)(),
    (0, HttpMehtodDecorators_1.Path)("/verify/wb")
], PlaceController.prototype, "verifyWB", null);
__decorate([
    (0, HttpMehtodDecorators_1.Post)(),
    (0, HttpMehtodDecorators_1.Path)("/log/wb")
], PlaceController.prototype, "logWB", null);
exports.PlaceController = PlaceController;
//# sourceMappingURL=PlaceController.js.map