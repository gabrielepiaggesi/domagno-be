import express, { Router } from "express";
import moment from "moment";
import multer from "multer";
// import { MulterFile } from "../src/types/MulterFile";

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

// export function getMulterFileNameAndExtension(multerFile: MulterFile, externalId = null) {
//     const parsedFileName = multerFile.originalname.replaceAll(/\s/g,'').split('.')[0];
//     const fileExtension = multerFile.originalname.replaceAll(/\s/g,'').split('.')[1];
//     const fileName = parsedFileName + '_' + (externalId ? externalId + '_' : '') + moment().valueOf() + '.' + fileExtension;

//     return { fileName, fileExtension };
// }