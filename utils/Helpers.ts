import express, { Router } from "express";
import multer from "multer";

export function routeFromController(object: any): Router {
    const route = express.Router();
    const targetController = object.constructor.prototype;
    const functionKeys = Object.getOwnPropertyNames(targetController);
  
    functionKeys.filter(key => key !== 'constructor' && Reflect.getMetadata('METHOD', targetController, key) && Reflect.getMetadata('PATH', targetController, key)).forEach(fn => {
        const method = Reflect.getMetadata('METHOD', targetController, fn);
        const path = Reflect.getMetadata('PATH', targetController, fn);

        const multerConfig: { config: any, path?: string, type?: 'single'|'multiple'  } = Reflect.getMetadata('MULTER', targetController, fn) || null;

        if (method === "POST") multerConfig ? 
            route.post(path, 
                (!multerConfig.type || multerConfig.type === 'single') ? 
                    multer(multerConfig.config).single(multerConfig.path || 'file') : 
                    multer(multerConfig.config).any(), 
                async (req, res) => await object[fn](res, req)) : 
            route.post(path, async (req, res) => await object[fn](res, req));
        if (method === "GET") route.get(path, async (req, res) => await object[fn](res, req));
        if (method === "PUT") route.put(path, async (req, res) => await object[fn](res, req));
        if (method === "DELETE") route.delete(path, async (req, res) => await object[fn](res, req));
        if (method === "PATCH") route.patch(path, async (req, res) => await object[fn](res, req));
    });
    return route;
}