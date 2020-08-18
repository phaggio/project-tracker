import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkItem extends Document {
  name: string;
  description: string;
  tags: string[];
  parentId: string;
  parentType: string;
  assigneeID: string;
}

const WorkItemSchema: Schema = new Schema({
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
  parentId: {
    type: String,
    default: null
  },
  parentType: {
    type: String,
    default: null
  },
  assigneeID: {
    type: String,
    default: null
  }
})

export default mongoose.model<IWorkItem>('WorkItem', WorkItemSchema);