import mongoose, { Schema } from 'mongoose';
import { IUser } from './types';
import 'dotenv/config';

const atlasUser     = process.env.MONGO_ATLAS_USER;
const atlasPassword = process.env.MONGO_ATLAS_PASSWORD;
const atlasDatabase = process.env.MONGO_ATLAS_CLUSTER;

mongoose.connect(`mongodb+srv://${atlasUser}:${atlasPassword}@${atlasDatabase}.xsszva2.mongodb.net/?retryWrites=true&w=majority`);
const connection = mongoose.connection;

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  phone_number: { type: String, required: true }
});

export const User = connection.model<IUser>('User', userSchema);