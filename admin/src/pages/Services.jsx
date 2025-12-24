import { useEffect, useState } from 'react';
import { servicesAPI } from '../api/services';
import { Loader2, ExternalLink } from 'lucide-react';

const Services = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await servicesAPI.getAll();
        if (!res.success) throw new Error(res.message || 'Không thể tải danh sách dịch vụ');
        setItems(res.data || []);
      } catch (err) {
        setError(err.message || 'Đã có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Dịch vụ</h1>
        <p className="text-sm text-gray-500">
          4 dịch vụ tĩnh (thu mua, ký gửi, đấu giá, certificate) được lấy từ backend.
        </p>
      </div>

      {loading && (
        <div className="flex items-center space-x-2 text-gray-500">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Đang tải...</span>
        </div>
      )}

      {error && !loading && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((svc) => (
            <div
              key={svc.slug}
              className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex-1">
                <h2 className="font-semibold text-lg text-gray-900 line-clamp-2">{svc.title}</h2>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{svc.description}</p>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                <span>Slug: {svc.slug}</span>
                <a
                  href={svc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1 text-primary-600 hover:underline"
                >
                  <span>Xem</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;


