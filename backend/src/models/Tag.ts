import mongoose, { Document, Schema } from 'mongoose';

export interface ITag extends Document {
  name: string;
  color: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const tagSchema = new Schema<ITag>(
  {
    name: {
      type: String,
      required: [true, 'Tag name is required'],
      trim: true,
    },
    color: {
      type: String,
      required: [true, 'Tag color is required'],
      default: '#6B7280',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITag>('Tag', tagSchema);
