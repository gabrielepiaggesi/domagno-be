import { MongoClient, Db } from 'mongodb';
import { LOG } from './Log';
import config from 'config';

const DB_URI = 'DB_URI';

export let db: Db;

export async function connectToDatabase() {
    try {
        const client: MongoClient = new MongoClient(DB_URI, { useUnifiedTopology: true });
        await client.connect();
        db = client.db('DB_NAME');
        LOG.success('DB CONNECTION READY');
    } catch(e) {
        console.error('CANNOT CONNECT DB', e);
    }
}