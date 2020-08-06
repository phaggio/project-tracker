import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  id: string;
  name: string;
  description: string;
}

const ProjectSchema: Schema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    minlength: 1
  },
  description: {
    type: String
  }
})

export default mongoose.model<IProject>('Project', ProjectSchema);