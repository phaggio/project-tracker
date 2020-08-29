import mongoose, { Schema, Document } from 'mongoose';

export interface IFeature extends Document {
  status: string;
  type: string;
  name: string;
  description: string;
  tags: string[];
  parentId: string;
  parentName: string;
  assigneeID: string;
  assignee: string;
  workItems: string[];
}

const FeatureSchema: Schema = new Schema({
  status: {
    type: String,
    default: 'Open'
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

  parentId: {
    type: String,
    default: null
  },

  parentName: {
    type: String,
    default: 'Unassigned'
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