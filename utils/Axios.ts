import axios, { AxiosResponse } from 'axios';
import { ServerError } from './ServerError';

function getHeaders(contentType = 'application/json', extraHeaders: any = null) {
    let h = { 'Content-Type': contentType ? contentType : 'application/json' };
    return { 'headers': extraHeaders ? { ...h, ...extraHeaders } : h };
}

function throwError(e: any): AxiosResponse {
    throw new ServerError('AXIOS_ERR', e.response?.statusText, e.response?.status, e);
}

export class Axios {
    static async get(endpoint: string, contentType = 'application/json', extraHeaders = null) {
        return (await axios.get(endpoint, getHeaders(contentType, extraHeaders)).catch(e => throwError(e))).data;
    }
    
    static async post(endpoint: string, body: any, contentType = 'application/json', extraHeaders: any = null) {
        console.log(endpoint);
        console.log(extraHeaders);
        console.log(getHeaders(contentType, extraHeaders));
        return (await axios.post(endpoint, body, getHeaders(contentType, extraHeaders)).catch(e => throwError(e))).data;
    }
    
    static async delete(endpoint: string, contentType = 'application/json') {
        return (await axios.delete(endpoint, getHeaders(contentType)).catch(e => throwError(e))).data;
    }
    
    static async put(endpoint: string, body: any, contentType = 'application/json') {
        return (await axios.put(endpoint, body, getHeaders(contentType)).catch(e => throwError(e))).data;
    }
}
