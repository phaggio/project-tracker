import mongoose, { Schema, Document } from 'mongoose';

interface IProject extends Document {
  name: string;
  description: string;
  status: string;
  type: string;
  tags: string[];
}

const ProjectSchema: Schema = new Schema({
  
  name: {
    type: String,
    minlength: 1
  },

  description: {
    type: String,
    default: ''
  },

  status: {
    type: String,
    default: 'Open',
    enum: ['Open', 'Archived']
  },

  type: {
    type: String,
    default: 'project'
  },

  tags: {
    type: [String],
    index: true
  }
  
})

export default mongoose.model<IProject>('Project', ProjectSchema);