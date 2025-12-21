const uploadService = require('../services/upload.service');

// Upload single image
exports.uploadSingle = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng chọn file hình ảnh'
      });
    }

    const folder = req.body.folder || 'minh-yen-watch';
    const result = await uploadService.uploadImage(req.file, folder);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Lỗi khi upload hình ảnh'
    });
  }
};

// Upload multiple images
exports.uploadMultiple = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng chọn ít nhất một file hình ảnh'
      });
    }

    const folder = req.body.folder || 'minh-yen-watch';
    const results = await uploadService.uploadMultipleImages(req.files, folder);

    res.json({
      success: true,
      data: results,
      count: results.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Lỗi khi upload hình ảnh'
    });
  }
};

// Delete image
exports.deleteImage = async (req, res) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: 'Public ID là bắt buộc'
      });
    }

    const result = await uploadService.deleteImage(publicId);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Lỗi khi xóa hình ảnh'
    });
  }
};

// Delete multiple images
exports.deleteMultiple = async (req, res) => {
  try {
    const { publicIds } = req.body;

    if (!publicIds || !Array.isArray(publicIds) || publicIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Danh sách Public IDs là bắt buộc'
      });
    }

    const result = await uploadService.deleteMultipleImages(publicIds);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Lỗi khi xóa hình ảnh'
    });
  }
};

