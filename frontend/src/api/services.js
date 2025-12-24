export const servicesAPI = {
  async getAll() {
    const baseUrl = import.meta.env.VITE_API_URL || '';
    const res = await fetch(`${baseUrl}/api/services`);
    if (!res.ok) {
      return { success: false, message: `HTTP ${res.status}` };
    }
    try {
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Không đọc được dữ liệu dịch vụ' };
    }
  },
  async getBySlug(slug) {
    const baseUrl = import.meta.env.VITE_API_URL || '';
    const res = await fetch(`${baseUrl}/api/services/${slug}`);
    if (!res.ok) {
      return { success: false, message: `HTTP ${res.status}` };
    }
    try {
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Không đọc được dữ liệu dịch vụ' };
    }
  }
};

