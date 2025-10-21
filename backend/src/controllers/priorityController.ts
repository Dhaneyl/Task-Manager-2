import { Response } from 'express';
import Priority from '../models/Priority';
import { AuthRequest } from '../middleware/auth';

export const getPriorities = async (req: AuthRequest, res: Response) => {
  try {
    const priorities = await Priority.find({ userId: req.user._id }).sort({ level: 1 });

    res.status(200).json({
      success: true,
      count: priorities.length,
      data: priorities,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

export const getPriority = async (req: AuthRequest, res: Response) => {
  try {
    const priority = await Priority.findById(req.params.id);

    if (!priority) {
      return res.status(404).json({
        success: false,
        message: 'Priority not found',
      });
    }

    if (priority.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    res.status(200).json({
      success: true,
      data: priority,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

export const createPriority = async (req: AuthRequest, res: Response) => {
  try {
    const priorityData = {
      ...req.body,
      userId: req.user._id,
    };

    const priority = await Priority.create(priorityData);

    res.status(201).json({
      success: true,
      data: priority,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

export const updatePriority = async (req: AuthRequest, res: Response) => {
  try {
    let priority = await Priority.findById(req.params.id);

    if (!priority) {
      return res.status(404).json({
        success: false,
        message: 'Priority not found',
      });
    }

    if (priority.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    priority = await Priority.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: priority,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

export const deletePriority = async (req: AuthRequest, res: Response) => {
  try {
    const priority = await Priority.findById(req.params.id);

    if (!priority) {
      return res.status(404).json({
        success: false,
        message: 'Priority not found',
      });
    }

    if (priority.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    await priority.deleteOne();

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
