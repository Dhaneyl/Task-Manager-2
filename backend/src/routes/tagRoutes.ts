import express from 'express';
import { getTags, getTag, createTag, updateTag, deleteTag } from '../controllers/tagController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/').get(protect, getTags).post(protect, createTag);
router.route('/:id').get(protect, getTag).put(protect, updateTag).delete(protect, deleteTag);

export default router;
