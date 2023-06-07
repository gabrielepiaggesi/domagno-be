import { memoryStorage } from "multer";
import { Delete, Get, Multer, Path, Post } from "../../utils/HttpMehtodDecorators";
import { LOG } from "../../utils/Log";
import { FileApi } from "../apis/FileApi";
import { FileService } from "../services/FileService";
import {Response} from 'express';

const fileService = new FileService();
const multerConfig = {
    storage: memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024 // not heavier than 10MB
    }
};

export class FileController implements FileApi {

    @Get()
    @Path("/list/:linkID")
    public async getFiles(res: Response, req) {
        try {
            const token = req.header('Authorization');
            const response = await fileService.getFiles(req.params.linkID, token);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'File.getFiles.Error'});
        }
    }
    
    @Post()
    @Multer({ multerConfig, type: 'single', path: 'file' })
    @Path("/upload/:linkID")
    public async uploadFile(res: Response, req) {
        try {
            const token = req.header('Authorization');
            const response = await fileService.uploadFile(req.params.linkID, req.file, token);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'File.uploadFile.Error'});
        }
    }

    @Post()
    @Multer({ multerConfig, type: 'single', path: 'file' })
    @Path("/save/:assignmentId")
    public async saveFile(res: Response, req) {
        try {
            console.log(req.file);
            const response = await fileService.saveFile(req.file, +req.params.assignmentId);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'File.saveFile.Error'});
        }
    }

    @Delete()
    @Path("/delete/:linkID/:fileId")
    public async deleteFile(res: Response, req) {
        try {
            const token = req.header('Authorization');
            const response = await fileService.deleteFile(req.params.linkID, +req.params.fileId, token);
            return res.status(200).json(response);
        } catch(e) {
            LOG.error(e);
            return res.status(e.status || 500).json({ ...e, message: e.message || e.msg, code: e.code || 'File.deleteFile.Error'});
        }
    }

}