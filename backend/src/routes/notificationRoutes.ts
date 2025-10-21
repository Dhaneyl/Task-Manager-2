import express from 'express';
import {
  getNotifications,
  markAsRead,
  deleteNotification,
  clearAllNotifications,
} from '../controllers/notificationController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.get('/', protect, getNotifications);
router.put('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteNotification);
router.delete('/', protect, clearAllNotifications);

export default router;
