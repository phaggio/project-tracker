import mongoose, { Schema, Document } from 'mongoose';

export interface IFeature extends Document {
  status: string;
  type: string;
  name: string;
  description: string;
  tags: string[];
  projectId: string;
  assigneeID: string;
  assignee: string;
  workItems: string[];
}

const FeatureSchema: Schema = new Schema({
  status: {
    type: String,
    default: 'open'
  },
  type: {
    type: String,
    default: 'feature'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  tags: {
    type: [String],
    index: true
  },
  projectId: {
    type: String,
    default: null
  },
  assigneeId: {
    type: String,
    default: null
  },
  assignee: {
    type: String,
    default: 'Unassigned'
  },
  workItems: {
    type: [String],
    default: []
  }
})

export default mongoose.model<IFeature>('Feature', FeatureSchema);