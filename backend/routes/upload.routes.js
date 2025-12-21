const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const { uploadSingle, uploadMultiple } = require('../middleware/upload.middleware');

// Admin only routes
router.post('/single', protect, authorize('admin'), uploadSingle('image'), uploadController.uploadSingle);
router.post('/multiple', protect, authorize('admin'), uploadMultiple('images', 10), uploadController.uploadMultiple);
router.delete('/single', protect, authorize('admin'), uploadController.deleteImage);
router.delete('/multiple', protect, authorize('admin'), uploadController.deleteMultiple);

module.exports = router;

