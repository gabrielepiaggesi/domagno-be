import { LOG } from "../../utils/Log";
import {Response} from 'express';
import { PlaceApi } from "../apis/SmsApi";
import { PlaceService } from "../services/PlaceService";
import { Get, Path, Post } from "../../utils/HttpMehtodDecorators";

const placeService = new PlaceService();

export class PlaceController implements PlaceApi {

    @Get()
    @Path("/getNearByRestaurants")
    public async getNearByRestaurants(res: Response, req) {
        try {
            const response = await placeService.getNearByRestaurants(req.query.q, +req.query.radius || 1, +req.query.count || 3, req.query.lat, req.query.long);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Place.getNearByRestaurants.Error'});
        }
    }

    @Get()
    @Path("/searchCeleb")
    public async searchCeleb(res: Response, req) {
        try {
            const response = await placeService.searchCeleb(req.query.celebName);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Place.searchCeleb.Error'});
        }
    }

    @Post()
    @Path("/sendPromptAndGetAnswer/:maxTokens?")
    public async sendPromptAndGetAnswer(res: Response, req) {
        try {
            const response = await placeService.sendPromptAndGetAnswer(req.body, +req.params.maxTokens || null);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Place.sendPromptAndGetAnswer.Error'});
        }
    }

    @Post()
    @Path("/loadBoobs")
    public async loadBoobs(res: Response, req) {
        try {
            const response = await placeService.loadBoobs(req.body);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Place.loadBoobs.Error'});
        }
    }

    @Post()
    @Path("/sendMeal")
    public async sendMeal(res: Response, req) {
        try {
            const response = await placeService.sendMeal(req.body);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Place.sendMeal.Error'});
        }
    }

    @Get()
    @Path("/searchCustomer")
    public async searchCustomer(res: Response, req) {
        try {
            const response = await placeService.searchCustomer(req.query.email, req.query.customer, req.query.deviceId);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Place.searchCustomer.Error'});
        }
    }

    @Get()
    @Path("/getPaymentLink")
    public async getPaymentLink(res: Response, req) {
        try {
            const response = await placeService.getPaymentLink(req.query.email, req.query.customer);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Place.getPaymentLink.Error'});
        }
    }

    @Get()
    @Path("/getSubInfo")
    public async getSubInfo(res: Response, req) {
        try {
            const response = await placeService.getSubInfo();
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Place.getSubInfo.Error'});
        }
    }

    @Post()
    @Path("/openStripeDashForCustomer")
    public async openStripeDashForCustomer(res: Response, req) {
        try {
            const response = await placeService.openStripeDashForCustomer(req.query.customer);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Place.openStripeDashForCustomer.Error'});
        }
    }

    @Post()
    @Path("/setNewDeviceForCustomer")
    public async setNewDeviceForCustomer(res: Response, req) {
        try {
            const response = await placeService.setNewDeviceForCustomer(req.query.customer, req.query.deviceId);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Place.setNewDeviceForCustomer.Error'});
        }
    }

    @Get()
    @Path("/verify/wb")
    public async verifyWB(res: Response, req) {
        try {
            const response = await placeService.verifyWB(req);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Place.setNewDeviceForCustomer.Error'});
        }
    }

    @Post()
    @Path("/log/wb")
    public async logWB(res: Response, req) {
        try {
            const response = await placeService.logWB(req.body);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'Place.setNewDeviceForCustomer.Error'});
        }
    }

}
