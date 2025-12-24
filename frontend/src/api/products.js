const baseUrl = import.meta.env.VITE_API_URL || '';

export const productsAPI = {
  getHot: async (limit = 8) => {
    const res = await fetch(`${baseUrl}/api/products/hot?limit=${limit}`);
    return res.json();
  },
  getExclusive: async (limit = 8) => {
    const res = await fetch(`${baseUrl}/api/products/exclusive?limit=${limit}`);
    return res.json();
  },
  getById: async (id) => {
    const res = await fetch(`${baseUrl}/api/products/${id}`);
    return res.json();
  }
};


