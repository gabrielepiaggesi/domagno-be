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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceService = void 0;
const SmsRepository_1 = require("../repositories/SmsRepository");
const Axios_1 = require("../../utils/Axios");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_KEY || 'wertyuiojhgfdsdfghjkl');
// https://stackoverflow.com/questions/41481723/convert-google-map-zoom-level-into-km
const smsRepository = new SmsRepository_1.SmsRepository();
class PlaceService {
    getNearByRestaurants(queryString, radius, count, lat, long) {
        return __awaiter(this, void 0, void 0, function* () {
            const zl = Math.log2(38000 * Math.cos(41.861597 * Math.PI / 180) / radius) + 3;
            console.log('zoom level', zl);
            console.log('km radius', radius);
            return yield Axios_1.Axios.get(`https://serpapi.com/search.json?engine=google_maps&q=${encodeURI(queryString)}&ll=@${lat},${long},${21}z&type=search&api_key=ff9b7f25b03611bd201574335b3ae0334890097cf4ae1b5c9a43e60bbb7f0309`);
        });
    }
    searchCeleb(celebName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Axios_1.Axios.get(`https://api.api-ninjas.com/v1/celebrity?name=${celebName}`, null, { 'X-Api-Key': process.env.CELEB_KEY });
        });
    }
    verifyWB(req) {
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];
        const VERIFY_TOKEN = 'test';
        // Check if a token and mode were sent
        if (mode && token) {
            // Check the mode and token
            if (mode === 'subscribe' && token === VERIFY_TOKEN) {
                // Respond with the challenge token from the request
                return +challenge;
            }
            else {
                // Respond with '403 Forbidden' if verify tokens do not match
                throw new Error('403 Forbidden');
            }
        }
    }
    logWB(wb) {
        console.log('Received webhook:', JSON.stringify(wb, null, 2));
        return true;
    }
    sendPromptAndGetAnswer(messages, maxTokens = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                "model": "gpt-4o-mini",
                "messages": messages,
                "stop": "[DO]"
            };
            if (maxTokens)
                body['max_tokens'] = maxTokens;
            return yield Axios_1.Axios.post(`https://api.openai.com/v1/chat/completions`, body, null, { "Authorization": "Bearer " + process.env.OPEN_AI_KEY });
        });
    }
    sendMeal(body) {
        return __awaiter(this, void 0, void 0, function* () {
            body.model = "gpt-4o-mini";
            return yield Axios_1.Axios.post(`https://api.openai.com/v1/chat/completions`, body, null, { "Authorization": "Bearer " + process.env.OPEN_AI_KEY });
        });
    }
    loadBoobs(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Axios_1.Axios.post(body.dreambooth ? `https://stablediffusionapi.com/api/v3/dreambooth` : `https://stablediffusionapi.com/api/v3/text2img`, body, null);
        });
    }
    getPaymentLink(email = null, customerId = null) {
        const link = new URL("https://buy.stripe.com/7sI9BM9AbbRPgRGeUU");
        email && link.searchParams.append('prefilled_email', email);
        customerId && link.searchParams.append('client_reference_id', customerId);
        link.searchParams.append('locale', 'it');
        return { url: link.toString() };
    }
    getSubInfo() {
        return {
            titles: [`Per usare DietGPT`, `devi avere un'abbonamento attivo`],
            price: 7,
            taxIncluded: false,
            cta: 'Abbonati a 7€/mese',
            ps: '7 giorni GRATIS, annulli quando vuoi',
            free: false
        };
    }
    searchCustomer(email = null, customerId = null, deviceId = null) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let customer = null;
            if (!customerId && email) {
                const query = deviceId ? `email:'${email}' AND metadata['deviceId']:'${deviceId}'` : `email:'${email}'`;
                const customers = yield stripe.customers.search({ query });
                if (!!customers.data.length)
                    customer = customers.data[0];
            }
            else if (!!customerId) {
                customer = yield stripe.customers.retrieve(customerId);
            }
            if (customer && deviceId && ((_a = customer.metadata) === null || _a === void 0 ? void 0 : _a.deviceId) != deviceId)
                customer = null;
            let subscription = null;
            if (customer) {
                const subscriptions = yield stripe.subscriptions.list({ customer: customer.id });
                subscription = subscriptions.data.filter((sub) => ['trialing', 'active'].includes(sub.status))[0];
            }
            const res = {
                customer,
                subscription,
                enabled: !!customer && !!subscription
            };
            return res;
        });
    }
    setNewDeviceForCustomer(customerId, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield stripe.customers.update(customerId, { metadata: { deviceId } });
            const customer = yield stripe.customers.retrieve(customerId);
            let subscription = null;
            if (customer) {
                const subscriptions = yield stripe.subscriptions.list({ customer: customer.id });
                subscription = subscriptions.data.filter((sub) => ['trialing', 'active'].includes(sub.status))[0];
            }
            const res = {
                customer,
                subscription,
                enabled: !!customer && !!subscription
            };
            return res;
        });
    }
    openStripeDashForCustomer(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield stripe.billingPortal.sessions.create({ customer: customerId });
            return session;
        });
    }
}
exports.PlaceService = PlaceService;
//# sourceMappingURL=PlaceService.js.map