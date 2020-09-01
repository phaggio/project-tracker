import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  createDate: Date;
  parentId: string | null;
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
    type: String,
    default: ''
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

export default mongoose.model<IItem>('Item', ItemSchema);