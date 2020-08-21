import { Schema, Document, model } from 'mongoose';

interface IUserDocument extends Document {
  type: string;
  firstName: string;
  lastName: string;
  email: string;
};

interface IUserBase extends IUserDocument {
  fullName: string;
}

const UserSchema: Schema = new Schema({
  type: {
    type: String,
    default: 'User'
  },

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

},
  {
    toJSON: { virtuals: true }
  });


UserSchema.virtual('fullName').get(function (this: IUserBase) {
  return (`${this.firstName} ${this.lastName}`);
});


export default model<IUserBase>('User', UserSchema);