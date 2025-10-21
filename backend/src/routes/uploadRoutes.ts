import express from 'express';
import { uploadFile } from '../controllers/uploadController';
import { protect } from '../middleware/auth';
import upload from '../middleware/upload';

const router = express.Router();

router.post('/', protect, upload.single('file'), uploadFile);

export default router;
