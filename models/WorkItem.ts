import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkItem extends Document {
  status: string;
  name: string;
  description: string;
  type: string;
  tags: string[];
  parentId: string;
  parentType: string;
  assigneeId: string;
}

const WorkItemSchema: Schema = new Schema({
  status: {
    type: String,
    default: 'Open'
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
    default: 'workItem'
  },

  tags: {
    type: [String],
    index: true
  },

  parentType: {
    type: String,
    default: null
  },

  parentName: {
    type: String,
    default: 'No parent item'
  },

  parentId: {
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
  }
  
})

export default mongoose.model<IWorkItem>('WorkItem', WorkItemSchema);