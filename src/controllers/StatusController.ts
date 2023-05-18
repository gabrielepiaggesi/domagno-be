import { Delete, Get, Multer, Path, Post, Put } from "../../utils/HttpMehtodDecorators";
import { LOG } from "../../utils/Log";
import {Response} from 'express';


export class StatusController {

    @Get()
    @Path("/check")
    public async check(res: Response, req) {
        try {
            return res.status(200).json({});
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Status.check.Error'});
        }
    }

}

