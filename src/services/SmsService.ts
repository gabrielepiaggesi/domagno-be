import moment from "moment";
import { LOG } from "../../utils/Log";
import { ServerError } from "../../utils/ServerError";
import { SmsApi } from '../apis/SmsApi';
import { SmsDTO } from '../dtos/SmsDTO';
import { Sms } from "../models/Sms";
import { SmsRepository } from '../repositories/SmsRepository';

const smsRepository = new SmsRepository();

export class SmsService implements SmsApi {
    
    public async sendSms(smsDto: SmsDTO) {
        if (!smsDto.numeroCellulare) throw new ServerError('PHONE_NUMBER_MISSING');

        const sms = new Sms();
        sms.assignment_id = smsDto.idAssignment;
        sms.contact_id = smsDto.idContatto;
        sms.contact_name = smsDto.nomeContatto;
        sms.phone_number = smsDto.numeroCellulare;
        sms.sent_at = moment().format("YYYY-MM-DD HH:mm:ss");
        const smsInserted = await smsRepository.save(sms);
        sms._id = smsInserted.insertedId;

        LOG.success("NEW SMS SAVED", sms._id);
        return this.trasformSmsToSmsDTO(sms);
    }
    
    public async getSmsSentByAssignmentId(assignmentId: number) {
        const smsListFound = await smsRepository.findAnyByKeyValue("assignment_id", assignmentId);
        return smsListFound.map(this.trasformSmsToSmsDTO);
    }

    private trasformSmsToSmsDTO(sms: Sms): SmsDTO {
        return new SmsDTO(sms.assignment_id, sms.contact_id, sms.contact_name, sms.phone_number, sms.sent_at, sms._id);
    }

}