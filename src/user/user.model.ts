import { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface User extends Document {
  pseudo: string;
}
const UserSchema = new Schema({
  pseudo: { type: String, required: true, unique: true },
});

const UserModel = model<User>('User', UserSchema);

export default UserModel;
