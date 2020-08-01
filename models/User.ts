import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  name: string;
  role: string;
}

const UserSchema: Schema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    minlength: 1
  },
  role: {
    type: String,
    required: true
  }
})

export default mongoose.model<IUser>('User', UserSchema);