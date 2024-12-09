import moment from "moment";
import { PlaceApi } from '../apis/SmsApi';
import { SmsRepository } from '../repositories/SmsRepository';
import { Axios } from "../../utils/Axios";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_KEY);

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
        return await Axios.get(`https://api.api-ninjas.com/v1/celebrity?name=${celebName}`, null, { 'X-Api-Key': process.env.CELEB_KEY });
    }

    public async sendPromptAndGetAnswer(messages: any[], maxTokens: number|null = null) {
        const body: any = {
            "model": "gpt-4o-mini",
            "messages": messages,
            "stop": "[DO]"
        };
        if (maxTokens) body['max_tokens'] = maxTokens;
        return await Axios.post(`https://api.openai.com/v1/chat/completions`, body, null, { "Authorization": "Bearer " + process.env.OPEN_AI_KEY });
    }

    public async sendMeal(body) {
        body.model = "gpt-4o-mini";
        return await Axios.post(`https://api.openai.com/v1/chat/completions`, body, null, { "Authorization": "Bearer " + process.env.OPEN_AI_KEY });
    }

    public async loadBoobs(body: any) {
        return await Axios.post(body.dreambooth ? `https://stablediffusionapi.com/api/v3/dreambooth` : `https://stablediffusionapi.com/api/v3/text2img`, body, null);
    }

    public getPaymentLink(email = null, customerId = null) {
        const link = new URL("https://buy.stripe.com/test_bIY4k379fdEabjG7ss");
        email && link.searchParams.append('prefilled_email', email);
        customerId && link.searchParams.append('client_reference_id', customerId);
        link.searchParams.append('locale', 'it');
        return { url: link.toString() }
    }

    public getSubInfo() {
        return {
            titles: [`Per usare DietGPT`, `devi avere un'abbonamento attivo`],
            price: 7,
            taxIncluded: false,
            cta: 'Abbonati a 7€/mese',
            ps: '7 giorni GRATIS, annulli quando vuoi',
            free: true
        }
    }

    public async searchCustomer(email: string = null, customerId: string = null, deviceId: any = null) {
        let customer = null;
        if (!customerId && email) {
            const query = deviceId ? `email:'${email}' AND metadata['deviceId']:'${deviceId}'` : `email:'${email}'`;
            const customers = await stripe.customers.search({ query });
            if (!!customers.data.length) customer = customers.data[0];
        } else if (!!customerId) {
            customer = await stripe.customers.retrieve(customerId);
        }
        if (customer && deviceId && customer.metadata?.deviceId != deviceId) customer = null;
        
        let subscription = null;
        if (customer) {
            const subscriptions = await stripe.subscriptions.list({ customer: customer.id });
            subscription = subscriptions.data.filter((sub) => ['trialing', 'active'].includes(sub.status))[0];
        }
        const res = {
            customer,
            subscription,
            enabled: !!customer && !!subscription
        }
        return res;
    }
    
    public async setNewDeviceForCustomer(customerId: string, deviceId: any) {
        await stripe.customers.update(customerId, { metadata: { deviceId } });
        const customer = await stripe.customers.retrieve(customerId);
        let subscription = null;
        if (customer) {
            const subscriptions = await stripe.subscriptions.list({ customer: customer.id });
            subscription = subscriptions.data.filter((sub) => ['trialing', 'active'].includes(sub.status))[0];
        }
        const res = {
            customer,
            subscription,
            enabled: !!customer && !!subscription
        }
        return res;
    }

    public async openStripeDashForCustomer(customerId: string) {
        const session = await stripe.billingPortal.sessions.create({ customer: customerId });
        return session;
    }

}