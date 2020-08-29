import mongoose, { Schema, Document } from 'mongoose';

interface IProject extends Document {
  name: string;
  description: string;
  status: string;
  type: string;
  tags: string[];
  features: string[];
  workItems: string[];
  bugs: string[];
}

const ProjectSchema: Schema = new Schema({
  name: {
    type: String,
    minlength: 1
  },

  description: {
    type: String
  },

  status: {
    type: String,
    default: 'Open'
  },

  type: {
    type: String,
    default: 'Project'
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
  },

  bugs: {
    type: [String],
    default: []
  }
})

export default mongoose.model<IProject>('Project', ProjectSchema);