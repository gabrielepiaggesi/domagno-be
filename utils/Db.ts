// import config from 'config';
import { MongoClient, Db } from 'mongodb';
import { LOG } from './Log';
// const dbConfig = config.get('MONGODB_URI');
// const dbName = config.get('MONGODB_NAME');

const DB_URI = "mongodb://insoore-test:K5F96f6G9ZLO1tNEn9ix5xQb088Gw9jTS6KZ23BaA3HNklBXlsakTku3kx9MoeWyJ81AP24TU6rwXo7yP9GfWg==@insoore-test.documents.azure.com:10255/?ssl=true&replicaSet=events-dev";

export let db: Db;

export async function connectToDatabase() {
    try {
        const client: MongoClient = new MongoClient(DB_URI, { useUnifiedTopology: true });
        await client.connect();
        db = client.db("insoore");
        LOG.success('DB CONNECTION READY');
    } catch(e) {
        console.error('CANNOT CONNECT DB', e);
    }
}