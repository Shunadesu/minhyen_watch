import api from './axios';

export const uploadAPI = {
  // Upload single image
  uploadSingle: async (file, folder = 'minh-yen-watch') => {
    const formData = new FormData();
    formData.append('image', file);
    if (folder) {
      formData.append('folder', folder);
    }

    const response = await api.post('/upload/single', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Upload multiple images
  uploadMultiple: async (files, folder = 'minh-yen-watch') => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });
    if (folder) {
      formData.append('folder', folder);
    }

    const response = await api.post('/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete single image
  deleteSingle: async (publicId) => {
    const response = await api.delete('/upload/single', {
      data: { publicId },
    });
    return response.data;
  },

  // Delete multiple images
  deleteMultiple: async (publicIds) => {
    const response = await api.delete('/upload/multiple', {
      data: { publicIds },
    });
    return response.data;
  },
};

