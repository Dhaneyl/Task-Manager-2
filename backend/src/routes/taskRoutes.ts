import express from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  addSubtask,
  updateSubtask,
  deleteSubtask,
} from '../controllers/taskController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/').get(protect, getTasks).post(protect, createTask);
router.route('/:id').get(protect, getTask).put(protect, updateTask).delete(protect, deleteTask);

// Subtask routes
router.post('/:id/subtasks', protect, addSubtask);
router.put('/:id/subtasks/:subtaskId', protect, updateSubtask);
router.delete('/:id/subtasks/:subtaskId', protect, deleteSubtask);

export default router;
