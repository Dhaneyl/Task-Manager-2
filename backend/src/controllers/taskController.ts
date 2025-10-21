import { Response } from 'express';
import Task from '../models/Task';
import Notification from '../models/Notification';
import { AuthRequest } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';
import { calculateNextOccurrence } from '../utils/recurrence';

/**
 * @desc    Get all tasks for current user
 * @route   GET /api/tasks
 * @access  Private
 */
export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find({ userId: req.user._id })
      .populate('categoryId')
      .populate('priorityId')
      .populate('tags')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

/**
 * @desc    Get single task
 * @route   GET /api/tasks/:id
 * @access  Private
 */
export const getTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('categoryId')
      .populate('priorityId')
      .populate('tags');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Make sure user owns task
    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this task',
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

/**
 * @desc    Create new task
 * @route   POST /api/tasks
 * @access  Private
 */
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const taskData = {
      ...req.body,
      userId: req.user._id,
    };

    const task = await Task.create(taskData);

    // Populate references
    await task.populate(['categoryId', 'priorityId', 'tags']);

    // Create notification
    await Notification.create({
      userId: req.user._id,
      type: 'system',
      title: 'Task Created',
      message: `Task "${task.title}" has been created`,
      taskId: task._id,
    });

    // Emit socket event for real-time updates (will be implemented later)
    const io = req.app.get('io');
    if (io) {
      io.to(req.user._id.toString()).emit('task:created', task);
    }

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

/**
 * @desc    Update task
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Make sure user owns task
    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this task',
      });
    }

    // Check if task was just completed and has recurrence
    if (req.body.completed && !task.completed && task.recurrence) {
      // Generate next occurrence
      const nextDate = calculateNextOccurrence(task.dueDate, task.recurrence);

      if (nextDate) {
        // Create new task instance
        await Task.create({
          userId: task.userId,
          title: task.title,
          description: task.description,
          categoryId: task.categoryId,
          priorityId: task.priorityId,
          status: 'pending',
          dueDate: nextDate,
          completed: false,
          image: task.image,
          subtasks: task.subtasks.map(st => ({ ...st, completed: false, id: uuidv4() })),
          tags: task.tags,
          recurrence: task.recurrence,
          parentTaskId: task._id,
        });
      }
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate(['categoryId', 'priorityId', 'tags']);

    // Emit socket event for real-time updates
    const io = req.app.get('io');
    if (io) {
      io.to(req.user._id.toString()).emit('task:updated', task);
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

/**
 * @desc    Delete task
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Make sure user owns task
    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this task',
      });
    }

    await task.deleteOne();

    // Emit socket event for real-time updates
    const io = req.app.get('io');
    if (io) {
      io.to(req.user._id.toString()).emit('task:deleted', { id: req.params.id });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

/**
 * @desc    Add subtask to task
 * @route   POST /api/tasks/:id/subtasks
 * @access  Private
 */
export const addSubtask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    const subtask = {
      id: uuidv4(),
      title: req.body.title,
      completed: false,
      order: task.subtasks.length,
      createdAt: new Date(),
    };

    task.subtasks.push(subtask);
    await task.save();

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

/**
 * @desc    Update subtask
 * @route   PUT /api/tasks/:id/subtasks/:subtaskId
 * @access  Private
 */
export const updateSubtask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    const subtaskIndex = task.subtasks.findIndex(st => st.id === req.params.subtaskId);

    if (subtaskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Subtask not found',
      });
    }

    task.subtasks[subtaskIndex] = {
      ...task.subtasks[subtaskIndex],
      ...req.body,
    };

    await task.save();

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

/**
 * @desc    Delete subtask
 * @route   DELETE /api/tasks/:id/subtasks/:subtaskId
 * @access  Private
 */
export const deleteSubtask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    task.subtasks = task.subtasks.filter(st => st.id !== req.params.subtaskId);
    await task.save();

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};
