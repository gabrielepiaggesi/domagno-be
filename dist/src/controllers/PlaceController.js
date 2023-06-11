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
exports.PlaceController = PlaceController;
//# sourceMappingURL=PlaceController.js.map