import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  tags: string[];
  features: string[];
  workItems: string[];
}

const ProjectSchema: Schema = new Schema({
  name: {
    type: String,
    minlength: 1
  },
  description: {
    type: String
  },
  type: {
    type: String,
    default: 'project'
  },
  tags: {
    type: [String],
    index: true
  },
  features: {
    type: [String],
    default: []
  },
  workItems: {
    type: [String],
    default: []
  }
})

export default mongoose.model<IProject>('Project', ProjectSchema);