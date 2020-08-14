import { Schema, Document, model } from 'mongoose';

export interface IUserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
};

export interface IUser extends IUserDocument {
  getFullName(): string;
}

const UserSchema: Schema = new Schema({
  firstName: String,

  lastName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, `Please enter a valid e-mail address`]
  }

});

UserSchema.methods.getFullName = function (): string {
  return `${this.firstName} ${this.lastName}`;
};


export default model<IUser>('User', UserSchema);