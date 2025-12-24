const baseUrl = import.meta.env.VITE_API_URL || '';

export const ordersAPI = {
  create: async (payload) => {
    const res = await fetch(`${baseUrl}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }
};

