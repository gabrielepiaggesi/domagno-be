import { Get, Path, Post } from "../../utils/HttpMehtodDecorators";
import { LOG } from "../../utils/Log";
import {Response} from 'express';
import { SmsApi } from "../apis/SmsApi";
import { SmsService } from "../services/SmsService";

const smsService = new SmsService();

export class SmsController implements SmsApi {

    @Get()
    @Path("/list/:assignmentId")
    public async getSmsSentByAssignmentId(res: Response, req) {
        try {
            const response = await smsService.getSmsSentByAssignmentId(+req.params.assignmentId);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Sms.getSmsSentByAssignmentId.Error'});
        }
    }

    @Post()
    @Path("/send")
    public async sendSms(res: Response, req) {
        try {
            const response = await smsService.sendSms(req.body);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Sms.sendSms.Error'});
        }
    }

}

