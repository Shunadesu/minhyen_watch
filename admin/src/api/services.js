import api from './axios';

export const servicesAPI = {
  getAll: async () => {
    const response = await api.get('/services');
    return response.data;
  },
  getBySlug: async (slug) => {
    const response = await api.get(`/services/${slug}`);
    return response.data;
  }
};


