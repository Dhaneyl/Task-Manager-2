import express from 'express';
import {
  getPriorities,
  getPriority,
  createPriority,
  updatePriority,
  deletePriority,
} from '../controllers/priorityController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/').get(protect, getPriorities).post(protect, createPriority);
router
  .route('/:id')
  .get(protect, getPriority)
  .put(protect, updatePriority)
  .delete(protect, deletePriority);

export default router;
