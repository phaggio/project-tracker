import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkItem extends Document {
  parentId: string | null;
  status: string;
  name: string;
  description: string;
  type: string;
  tags: string[];
  assigneeId: string | null;
}

const WorkItemSchema: Schema = new Schema({
  parentId: {
    type: String,
    default: null,
    index: true
  },

  status: {
    type: String,
    default: 'Open',
    required: true,
    index: true,
    enum: ['Open', 'Active', 'Completed', 'In-review', 'Closed']
  },

  name: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  type: {
    type: String,
    required: true,
    default: 'workItem',
    index: true,
    enum: ['feature', 'workItem', 'bug']
  },

  tags: {
    type: [String],
    index: true
  },

  assigneeId: {
    type: String,
    default: null
  }

})

export default mongoose.model<IWorkItem>('WorkItem', WorkItemSchema);