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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceService = void 0;
const SmsRepository_1 = require("../repositories/SmsRepository");
const Axios_1 = require("../../utils/Axios");
// https://stackoverflow.com/questions/41481723/convert-google-map-zoom-level-into-km
const smsRepository = new SmsRepository_1.SmsRepository();
class PlaceService {
    getNearByRestaurants(queryString, radius, count, lat, long) {
        return __awaiter(this, void 0, void 0, function* () {
            const zl = Math.log2(38000 * Math.cos(41.861597 * Math.PI / 180) / radius) + 3;
            console.log('zoom level', zl);
            console.log('km radius', radius);
            return yield Axios_1.Axios.get(`https://serpapi.com/search.json?engine=google_maps&q=${encodeURI(queryString)}&ll=@${lat},${long},${zl}z&type=search&api_key=ff9b7f25b03611bd201574335b3ae0334890097cf4ae1b5c9a43e60bbb7f0309`);
        });
    }
}
exports.PlaceService = PlaceService;
//# sourceMappingURL=PlaceService.js.map