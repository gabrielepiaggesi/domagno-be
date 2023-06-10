import moment from "moment";
import { PlaceApi } from '../apis/SmsApi';
import { SmsRepository } from '../repositories/SmsRepository';
import { Axios } from "../../utils/Axios";

// https://stackoverflow.com/questions/41481723/convert-google-map-zoom-level-into-km
const smsRepository = new SmsRepository();

export class PlaceService implements PlaceApi {
    
    public async getNearByRestaurants(queryString: string, radius: number, count: number, lat: number, long: number) {
        const zl = Math.log2(38000 * Math.cos ( 41.861597 * Math.PI / 180) / radius) + 3;
        console.log('zoom level', zl);
        console.log('km radius', radius);
        return await Axios.get(`https://serpapi.com/search.json?engine=google_maps&q=${encodeURI(queryString)}&ll=@${lat},${long},${zl}z&type=search&api_key=ff9b7f25b03611bd201574335b3ae0334890097cf4ae1b5c9a43e60bbb7f0309`);
    }

}