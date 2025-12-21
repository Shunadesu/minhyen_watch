const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');

class UploadService {
  // Upload single image
  async uploadImage(file, folder = 'zuna-watch') {
    return new Promise((resolve, reject) => {
      if (!file) {
        return reject(new Error('No file provided'));
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'image',
          transformation: [
            { quality: 'auto' },
            { fetch_format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes
          });
        }
      );

      // Convert buffer to stream
      const bufferStream = new Readable();
      bufferStream.push(file.buffer);
      bufferStream.push(null);
      bufferStream.pipe(uploadStream);
    });
  }

  // Upload multiple images
  async uploadMultipleImages(files, folder = 'zuna-watch') {
    try {
      const uploadPromises = files.map(file => this.uploadImage(file, folder));
      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      throw error;
    }
  }

  // Delete image by public_id
  async deleteImage(publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Delete multiple images
  async deleteMultipleImages(publicIds) {
    try {
      const result = await cloudinary.api.delete_resources(publicIds);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Upload image with specific transformations
  async uploadImageWithTransformations(file, folder = 'zuna-watch', transformations = {}) {
    return new Promise((resolve, reject) => {
      if (!file) {
        return reject(new Error('No file provided'));
      }

      const defaultTransformations = [
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ];

      // Add custom transformations
      if (transformations.width) {
        defaultTransformations.push({ width: transformations.width });
      }
      if (transformations.height) {
        defaultTransformations.push({ height: transformations.height });
      }
      if (transformations.crop) {
        defaultTransformations.push({ crop: transformations.crop });
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'image',
          transformation: defaultTransformations
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes
          });
        }
      );

      const bufferStream = new Readable();
      bufferStream.push(file.buffer);
      bufferStream.push(null);
      bufferStream.pipe(uploadStream);
    });
  }
}

module.exports = new UploadService();

