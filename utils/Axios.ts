import axios, { AxiosResponse } from 'axios';
import { ServerError } from './ServerError';

function getHeaders(token: string, contentType = 'application/json', extraHeaders: any = null) {
    let h = { 'Content-Type': contentType };
    h["Accept-Language"] = "IT-IT";
    h["Authorization"] = token;
    return { 'headers': extraHeaders ? { ...h, ...extraHeaders } : h };
}

function throwError(e: any): AxiosResponse {
    throw new ServerError('AXIOS_ERR', e.response?.statusText, e.response?.status, e);
}

export class Axios {
    static async get(token: string, endpoint: string, contentType = 'application/json') {
        return (await axios.get(endpoint, getHeaders(token, contentType)).catch(e => throwError(e))).data;
    }
    
    static async post(token: string, endpoint: string, body: any, contentType = 'application/json', extraHeaders: any = null) {
        return (await axios.post(endpoint, body, getHeaders(token, contentType, extraHeaders)).catch(e => throwError(e))).data;
    }
    
    static async delete(token: string, endpoint: string, body: any = null, contentType = 'application/json') {
        return (await axios.post(endpoint, body, getHeaders(token, contentType)).catch(e => throwError(e))).data;
    }
    
    static async put(token: string, endpoint: string, body: any, contentType = 'application/json') {
        return (await axios.put(endpoint, body, getHeaders(token, contentType)).catch(e => throwError(e))).data;
    }
}
