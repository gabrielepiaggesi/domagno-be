import axios from 'axios';

function getHeaders(token: string, contentType = 'application/json', extraHeaders: any = null) {
    let h = { 'Content-Type': contentType };
    h["Accept-Language"] = "IT-IT";
    h["Authorization"] = token;
    return { 'headers': extraHeaders ? { ...h, ...extraHeaders } : h };
}

export class Axios {
    static async get(token: string, endpoint: string, contentType = 'application/json') {
        return (await axios.get(endpoint, getHeaders(token, contentType))).data;
    }
    
    static async post(token: string, endpoint: string, body: any, contentType = 'application/json', extraHeaders: any = null) {
        return (await axios.post(endpoint, body, getHeaders(token, contentType, extraHeaders))).data;
    }
    
    static async delete(token: string, endpoint: string, body: any = null, contentType = 'application/json') {
        return (await axios.post(endpoint, body, getHeaders(token, contentType))).data;
    }
    
    static async put(token: string, endpoint: string, body: any, contentType = 'application/json') {
        return (await axios.put(endpoint, body, getHeaders(token, contentType))).data;
    }
}
