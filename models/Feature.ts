import mongoose, { Schema, Document } from 'mongoose';

export interface IFeature extends Document {
  name: string;
  description: string;
  tags: string[];
  project: string;
  projectId: number;
  assignee: string;
  assigneeID: number;
}

const FeatureSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  tags: {
    type: [String],
    index: true
  },
  project: {
    type: String,
    default: null
  },
  projectId: {
    type: String,
    default: null
  },
  assignee: {
    type: String,
    default: 'Unassigned'
  },
  assigneeId: {
    type: Number,
    default: null
  }
})

export default mongoose.model<IFeature>('Feature', FeatureSchema);