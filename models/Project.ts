import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  type: string[];
}

const ProjectSchema: Schema = new Schema({
  name: {
    type: String,
    minlength: 1
  },
  description: {
    type: String
  },
  tags: {
    type: [String],
    index: true
  }
})

export default mongoose.model<IProject>('Project', ProjectSchema);