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
    default: 'open'
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
    default: 'workitem'
  },

  tags: {
    type: [String],
    index: true
  },

  parentId: {
    type: String,
    default: null
  },

  parentType: {
    type: String,
    default: null
  },
  
  assigneeId: {
    type: String,
    default: null
  }
})

export default mongoose.model<IWorkItem>('WorkItem', WorkItemSchema);