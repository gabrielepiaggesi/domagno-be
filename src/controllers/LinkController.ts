import { Delete, Get, Multer, Path, Post, Put } from "../../utils/HttpMehtodDecorators";
import { LOG } from "../../utils/Log";
import {Response} from 'express';
import { LinkApi } from "../apis/LinkApi";
import { LinkService } from "../services/LinkService";

const linkService = new LinkService();

export class LinkController implements LinkApi {

    @Get()
    @Path("/info/:linkUUID")
    public async getLink(res: Response, req) {
        try {
            const response = await linkService.getLink(req.params.linkUUID);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Link.getLink.Error'});
        }
    }

    @Post()
    @Path("/save")
    public async saveLink(res: Response, req) {
        try {
            const response = await linkService.saveLink(req.body);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Link.saveLink.Error'});
        }
    }

    @Put()
    @Path("/changeStatus/:linkUUID/:status")
    public async changeLinkStatus(res: Response, req) {
        try {
            const response = await linkService.changeLinkStatus(req.params.linkUUID, req.params.status);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Link.changeLinkStatus.Error'});
        }
    }

    @Delete()
    @Path("/remove/:linkUUID")
    public async removeLink(res: Response, req) {
        try {
            const response = await linkService.removeLink(req.params.linkUUID);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Link.removeLink.Error'});
        }
    }

}

