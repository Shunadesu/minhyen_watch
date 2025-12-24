export const servicesAPI = {
  async getAll() {
    const baseUrl = import.meta.env.VITE_API_URL || '';
    try {
      const res = await fetch(`${baseUrl}/api/services`);
      if (res.status === 429) {
        // Rate limit - trả về fallback thay vì lỗi
        return { success: false, message: 'Rate limit exceeded', isRateLimit: true };
      }
      if (!res.ok) {
        return { success: false, message: `HTTP ${res.status}` };
      }
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Không đọc được dữ liệu dịch vụ' };
    }
  },
  async getBySlug(slug) {
    const baseUrl = import.meta.env.VITE_API_URL || '';
    try {
      const res = await fetch(`${baseUrl}/api/services/${slug}`);
      if (res.status === 429) {
        // Rate limit - trả về fallback
        return { success: false, message: 'Rate limit exceeded', isRateLimit: true };
      }
      if (!res.ok) {
        return { success: false, message: `HTTP ${res.status}` };
      }
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Không đọc được dữ liệu dịch vụ' };
    }
  }
};

