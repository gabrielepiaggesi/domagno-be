import { ObjectID } from 'mongodb';
import { db } from "./Db";

export class Repository<T> {
    public collection: string; 

    public async save(model: T): Promise<T & any> {
        return await db.collection(this.collection).insertOne({...model, app: 'self-shooting'});
    }

    public async delete(id: number|string) {
        return await db.collection(this.collection).deleteOne({ _id: new ObjectID(id) });
    }

    public async update(id: number|string, model: T) {
        return await db.collection(this.collection).updateOne({ _id: new ObjectID(id) }, { $set: model });
    }

    public async findById(id: number|string): Promise<T> {
        return await db.collection(this.collection).findOne({ _id: new ObjectID(id) });
    }

    public async findAnyByKeyValue(key: number|string, value: any): Promise<T[]> {
        return await db.collection(this.collection).find({ [key]: value }).toArray();
    }

    public async findOneByKeyValue(key: number|string, value: any): Promise<T> {
        return await db.collection(this.collection).findOne({ [key]: value });
    }
}