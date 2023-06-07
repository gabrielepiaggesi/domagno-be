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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureStorage = void 0;
const storage_blob_1 = require("@azure/storage-blob");
const Log_1 = require("./Log");
const config_1 = __importDefault(require("config"));
class AzureStorage {
    ;
    static uploadFileBuffer(multerFile, fileName, platformInternalId) {
        return __awaiter(this, void 0, void 0, function* () {
            const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
            const blockBlobClient = containerClient.getBlockBlobClient(fileName);
            yield blockBlobClient.uploadData(multerFile.buffer);
            Log_1.LOG.success("NEW FILE UPLOADED ON AZURE", blockBlobClient.url);
            return blockBlobClient.url;
        });
    }
}
_a = AzureStorage;
AzureStorage.STORAGE_ACCOUNT_NAME = "insoore";
AzureStorage.ACCOUNT_ACCESS_KEY = config_1.default.get('AZURE_STORAGE_ACCOUNT_ACCESS_KEY');
AzureStorage.containerName = "publicmediacatalog";
AzureStorage.credentials = new storage_blob_1.StorageSharedKeyCredential(_a.STORAGE_ACCOUNT_NAME, _a.ACCOUNT_ACCESS_KEY);
AzureStorage.blobServiceClient = new storage_blob_1.BlobServiceClient(`https://${_a.STORAGE_ACCOUNT_NAME}.blob.core.windows.net`, _a.credentials);
exports.AzureStorage = AzureStorage;
//# sourceMappingURL=AzureStorage.js.map