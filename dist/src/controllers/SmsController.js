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
exports.SmsController = void 0;
const HttpMehtodDecorators_1 = require("../../utils/HttpMehtodDecorators");
const Log_1 = require("../../utils/Log");
const SmsService_1 = require("../services/SmsService");
const smsService = new SmsService_1.SmsService();
class SmsController {
    getSmsSentByAssignmentId(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield smsService.getSmsSentByAssignmentId(+req.params.assignmentId);
                return res.status(200).json(response);
            }
            catch (e) {
                Log_1.LOG.error(e);
                return res.status(e.status || 500).json(Object.assign(Object.assign({}, e), { message: e.message || e.msg, code: e.code || 'Sms.getSmsSentByAssignmentId.Error' }));
            }
        });
    }
    sendSms(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield smsService.sendSms(req.body);
                return res.status(200).json(response);
            }
            catch (e) {
                Log_1.LOG.error(e);
                return res.status(e.status || 500).json(Object.assign(Object.assign({}, e), { message: e.message || e.msg, code: e.code || 'Sms.sendSms.Error' }));
            }
        });
    }
}
__decorate([
    (0, HttpMehtodDecorators_1.Get)(),
    (0, HttpMehtodDecorators_1.Path)("/list/:assignmentId")
], SmsController.prototype, "getSmsSentByAssignmentId", null);
__decorate([
    (0, HttpMehtodDecorators_1.Post)(),
    (0, HttpMehtodDecorators_1.Path)("/send")
], SmsController.prototype, "sendSms", null);
exports.SmsController = SmsController;
//# sourceMappingURL=SmsController.js.map