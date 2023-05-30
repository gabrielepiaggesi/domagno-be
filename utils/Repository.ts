import { Model } from './Model';
import { ObjectID } from 'mongodb';
import { db } from "./Db";

export class Repository<Model> {
    public collection: string;
    public modelName: string;

    public async save(model: Model): Promise<Model & any> {
        return await db.collection(this.collection).insertOne(this.modelName ? {...model, app: 'self-shooting', model: this.modelName} : {...model, app: 'self-shooting'});
    }

    public async delete(id: number|string) {
        return await db.collection(this.collection).deleteOne({ _id: new ObjectID(id) });
    }

    public async update(id: number|string, model: Model) {
        return await db.collection(this.collection).updateOne({ _id: new ObjectID(id) }, { $set: model });
    }

    public async findById(id: number|string): Promise<Model> {
        return await db.collection(this.collection).findOne({ _id: new ObjectID(id) });
    }

    public async findAnyByKeyValue(key: number|string, value: any): Promise<Model[]> {
        return await db.collection(this.collection).find(this.modelName ? { [key]: value, model: this.modelName } : { [key]: value }).toArray();
    }

    public async findOneByKeyValue(key: number|string, value: any): Promise<Model> {
        return await db.collection(this.collection).findOne(this.modelName ? { [key]: value, model: this.modelName } : { [key]: value });
    }
}