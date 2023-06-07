import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";

export class AzureStorage {

    public static STORAGE_ACCOUNT_NAME = "insoore";
    public static ACCOUNT_ACCESS_KEY = "exFoN9OPc1LnkLTM0ckD9cz3VIoVxZnNQQ2owF39C6kUXoZjUEyOBa1xr6an00Of5j7+1ki/ql73hyOQ7TfDMw==";
    public static containerName = "documenti/";
    public static credentials = new StorageSharedKeyCredential(this.STORAGE_ACCOUNT_NAME, this.ACCOUNT_ACCESS_KEY);
    public static blobServiceClient = new BlobServiceClient(`https://${this.STORAGE_ACCOUNT_NAME}.blob.core.windows.net`, this.credentials);

    public static async uploadFileOnAzure(localFileName: string, insooreInternalId: number) {
        const containerClient = this.blobServiceClient.getContainerClient(this.containerName + insooreInternalId);
        const blobClient = containerClient.getBlobClient(localFileName);
        const blockBlobClient = blobClient.getBlockBlobClient();
        const fileUploadedRes = await blockBlobClient.uploadFile(localFileName);
        console.log(fileUploadedRes);
        return fileUploadedRes;
    }

}