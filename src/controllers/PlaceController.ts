import { Get, Path, Post } from "../../utils/HttpMehtodDecorators";
import { LOG } from "../../utils/Log";
import {Response} from 'express';
import { PlaceApi } from "../apis/SmsApi";
import { PlaceService } from "../services/PlaceService";

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

}

