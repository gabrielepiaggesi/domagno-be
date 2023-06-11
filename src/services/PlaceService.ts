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
        return await Axios.get(`https://serpapi.com/search.json?engine=google_maps&q=${encodeURI(queryString)}&ll=@${lat},${long},${21}z&type=search&api_key=ff9b7f25b03611bd201574335b3ae0334890097cf4ae1b5c9a43e60bbb7f0309`);
    }

    public async searchCeleb(celebName: string) {
        return await Axios.get(`https://api.api-ninjas.com/v1/celebrity?name=${celebName}`, null, { 'X-Api-Key': 'QuF/nePha7beqY5TUF2qpA==4LNTg4CTfZVubblr' });
    }

    public async sendPromptAndGetAnswer(messages: any[], maxTokens: number|null = null) {
        const body: any = {
            "model": "gpt-3.5-turbo",
            "messages": messages,
            "stop": "[DO]"
        };
        if (maxTokens) body['max_tokens'] = maxTokens;
        return await Axios.post(`https://api.openai.com/v1/chat/completions`, body, null, { "Authorization": "Bearer " + process.env.OPEN_AI_KEY });
    }

}