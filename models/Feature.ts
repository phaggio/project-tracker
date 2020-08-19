import mongoose, { Schema, Document } from 'mongoose';

export interface IFeature extends Document {
  status: string;
  name: string;
  description: string;
  tags: string[];
  projectId: string;
  assigneeID: string;
  workItems: string[];
}

const FeatureSchema: Schema = new Schema({
  status: {
    type: String,
    default: 'open'
  },
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
  projectId: {
    type: String,
    default: null
  },
  assigneeId: {
    type: String,
    default: null
  },
  workItems: {
    type: [String],
    default: []
  }
})

export default mongoose.model<IFeature>('Feature', FeatureSchema);