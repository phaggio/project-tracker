import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  createDate: Date;
  parentId: string | null;
  parentType: string | null;
  projectId: string | null;
  status: string;
  name: string;
  description: string;
  type: string;
  tags: string[];
  assigneeId: string | null;
}

const ItemSchema: Schema = new Schema({

  createDate: {
    type: Date,
    default: Date.now
  },

  parentId: {
    type: String,
    default: null,
    index: true
  },

  parentType: {
    type: String,
    default: null,
    enum: ['project', 'feature', 'work', null]
  },

  projectId: {
    type: String,
    default: null,
    index: true
  },

  status: {
    type: String,
    default: 'Open',
    required: true,
    index: true,
    enum: ['Open', 'Active', 'Completed', 'In-review', 'Closed', 'Archived']
  },

  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    default: ''
  },

  type: {
    type: String,
    required: true,
    default: 'work',
    index: true,
    enum: ['feature', 'work', 'bug']
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

export default mongoose.model<IItem>('Item', ItemSchema);