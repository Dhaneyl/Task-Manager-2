import mongoose, { Document, Schema } from 'mongoose';

export type PriorityLevel = 'low' | 'medium' | 'high';

export interface IPriority extends Document {
  name: string;
  level: PriorityLevel;
  color: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const prioritySchema = new Schema<IPriority>(
  {
    name: {
      type: String,
      required: [true, 'Priority name is required'],
      trim: true,
    },
    level: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: [true, 'Priority level is required'],
    },
    color: {
      type: String,
      required: [true, 'Priority color is required'],
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

export default mongoose.model<IPriority>('Priority', prioritySchema);
