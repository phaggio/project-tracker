import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
}

const UserSchema: Schema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})

export default mongoose.model<IUser>('User', UserSchema);