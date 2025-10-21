import mongoose, { Document, Schema } from 'mongoose';

export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type RecurrenceFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface ISubtask {
  id: string;
  title: string;
  completed: boolean;
  order: number;
  createdAt: Date;
}

export interface IAttachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

export interface IRecurrencePattern {
  frequency: RecurrenceFrequency;
  interval: number;
  daysOfWeek?: number[]; // 0-6 (Sunday to Saturday)
  dayOfMonth?: number; // 1-31
  endDate?: Date;
}

export interface ITask extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  categoryId: mongoose.Types.ObjectId;
  priorityId: mongoose.Types.ObjectId;
  status: TaskStatus;
  dueDate: Date;
  completed: boolean;
  image?: string;

  // New features
  subtasks: ISubtask[];
  tags: mongoose.Types.ObjectId[];
  attachments: IAttachment[];
  recurrence?: IRecurrencePattern;
  parentTaskId?: mongoose.Types.ObjectId; // For recurring task instances

  createdAt: Date;
  updatedAt: Date;
}

const subtaskSchema = new Schema<ISubtask>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  order: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
}, { _id: false });

const attachmentSchema = new Schema<IAttachment>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  size: { type: Number, required: true },
  type: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
}, { _id: false });

const recurrencePatternSchema = new Schema<IRecurrencePattern>({
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
    required: true,
  },
  interval: {
    type: Number,
    required: true,
    min: 1,
  },
  daysOfWeek: [{
    type: Number,
    min: 0,
    max: 6,
  }],
  dayOfMonth: {
    type: Number,
    min: 1,
    max: 31,
  },
  endDate: {
    type: Date,
  },
}, { _id: false });

const taskSchema = new Schema<ITask>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    priorityId: {
      type: Schema.Types.ObjectId,
      ref: 'Priority',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: '',
    },

    // New features
    subtasks: {
      type: [subtaskSchema],
      default: [],
    },
    tags: [{
      type: Schema.Types.ObjectId,
      ref: 'Tag',
    }],
    attachments: {
      type: [attachmentSchema],
      default: [],
    },
    recurrence: {
      type: recurrencePatternSchema,
      default: undefined,
    },
    parentTaskId: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ userId: 1, dueDate: 1 });
taskSchema.index({ userId: 1, categoryId: 1 });

export default mongoose.model<ITask>('Task', taskSchema);
