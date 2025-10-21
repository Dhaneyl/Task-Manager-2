import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';

/**
 * @desc    Upload file
 * @route   POST /api/upload
 * @access  Private
 */
export const uploadFile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file',
      });
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      data: {
        id: req.file.filename,
        name: req.file.originalname,
        url: fileUrl,
        size: req.file.size,
        type: req.file.mimetype,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};
