import { Delete, Get, Multer, Path, Post, Put } from "../../utils/HttpMehtodDecorators";
import { LOG } from "../../utils/Log";
import {Response} from 'express';
import { LinkApi } from "../apis/LinkApi";
import { LinkService } from "../services/LinkService";

const linkService = new LinkService();

export class LinkController implements LinkApi {

    @Get()
    @Path("/id/:linkID")
    public async getLinkByID(res: Response, req) {
        try {
            const response = await linkService.getLinkByID(req.params.linkID);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Link.getLinkByID.Error'});
        }
    }

    @Get()
    @Path("/uuid/:linkUUID")
    public async getLinkByUUID(res: Response, req) {
        try {
            const response = await linkService.getLinkByUUID(req.params.linkUUID);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Link.getLinkByUUID.Error'});
        }
    }

    @Get()
    @Path("/assignmentId/:assignmentId")
    public async getLinkByAssignmentID(res: Response, req) {
        try {
            const response = await linkService.getLinkByAssignmentID(+req.params.assignmentId);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Link.getLinkByAssignmentID.Error'});
        }
    }

    @Post()
    @Path("/save/:assignmentId")
    public async saveLink(res: Response, req) {
        try {
            const response = await linkService.saveLink(+req.params.assignmentId);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Link.saveLink.Error'});
        }
    }

    @Post()
    @Path("/sendFiles/:linkID")
    public async sendFiles(res: Response, req) {
        try {
            const token = req.header('Authorization');
            const response = await linkService.sendFiles(req.params.linkID, token);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Link.sendFiles.Error'});
        }
    }

    @Put()
    @Path("/changeStatus/:linkID/:status")
    public async changeLinkStatus(res: Response, req) {
        try {
            const response = await linkService.changeLinkStatus(req.params.linkID, req.params.status);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Link.changeLinkStatus.Error'});
        }
    }

    @Delete()
    @Path("/remove/:linkID")
    public async removeLink(res: Response, req) {
        try {
            const response = await linkService.removeLink(req.params.linkID);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Link.removeLink.Error'});
        }
    }

}

