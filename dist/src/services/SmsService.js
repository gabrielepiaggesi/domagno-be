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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsService = void 0;
const moment_1 = __importDefault(require("moment"));
const Log_1 = require("../../utils/Log");
const ServerError_1 = require("../../utils/ServerError");
const SmsDTO_1 = require("../dtos/SmsDTO");
const Sms_1 = require("../models/Sms");
const SmsRepository_1 = require("../repositories/SmsRepository");
const smsRepository = new SmsRepository_1.SmsRepository();
class SmsService {
    sendSms(smsDto) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!smsDto.numeroCellulare)
                throw new ServerError_1.ServerError('PHONE_NUMBER_MISSING');
            const sms = new Sms_1.Sms();
            sms.assignment_id = smsDto.idAssignment;
            sms.contact_id = smsDto.idContatto;
            sms.contact_name = smsDto.nomeContatto;
            sms.phone_number = smsDto.numeroCellulare;
            sms.sent_at = (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss");
            const smsInserted = yield smsRepository.save(sms);
            sms._id = smsInserted.insertedId;
            Log_1.LOG.success("NEW SMS SAVED", sms._id);
            return this.trasformSmsToSmsDTO(sms);
        });
    }
    getSmsSentByAssignmentId(assignmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const smsListFound = yield smsRepository.findAnyByKeyValue("assignment_id", assignmentId);
            return smsListFound.map(this.trasformSmsToSmsDTO);
        });
    }
    trasformSmsToSmsDTO(sms) {
        return new SmsDTO_1.SmsDTO(sms.assignment_id, sms.contact_id, sms.contact_name, sms.phone_number, sms.sent_at, sms._id);
    }
}
exports.SmsService = SmsService;
//# sourceMappingURL=SmsService.js.map