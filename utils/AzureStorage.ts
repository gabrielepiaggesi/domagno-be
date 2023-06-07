import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import { LOG } from "./Log";
import { MulterFile } from "../src/types/MulterFile";
import config from 'config';

export class AzureStorage {

    public static STORAGE_ACCOUNT_NAME = "insoore";
    public static ACCOUNT_ACCESS_KEY = config.get('AZURE_STORAGE_ACCOUNT_ACCESS_KEY');;
    public static containerName = "publicmediacatalog";
    public static credentials = new StorageSharedKeyCredential(this.STORAGE_ACCOUNT_NAME, this.ACCOUNT_ACCESS_KEY);
    public static blobServiceClient = new BlobServiceClient(`https://${this.STORAGE_ACCOUNT_NAME}.blob.core.windows.net`, this.credentials);

    public static async uploadFileBuffer(multerFile: MulterFile, fileName: string, platformInternalId: number): Promise<string> {
        const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);
        await blockBlobClient.uploadData(multerFile.buffer);
        LOG.success("NEW FILE UPLOADED ON AZURE", blockBlobClient.url);
        return blockBlobClient.url;
    }

}