import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const skeletons = useMemo(() => Array.from({ length: 6 }), []);

  useEffect(() => {
    document.title = 'Thương hiệu | Minh Yên Watch';
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        setError('');
        const baseUrl = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${baseUrl}/api/brands?limit=100`);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const json = await res.json();
        if (!json.success) {
          throw new Error(json.message || 'Không thể lấy thương hiệu');
        }
        setBrands(json.data || []);
      } catch (err) {
        console.error('Error fetching brands:', err);
        setError(err.message || 'Đã có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  return (
    <section className="min-h-screen bg-white pt-24">
      <div className="mx-auto max-w-6xl px-4 py-4 lg:px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Thương hiệu</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-primary">
          Thương hiệu đồng hồ độc lập
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Danh sách thương hiệu được đồng bộ từ hệ thống, kèm số lượng sản phẩm và mô tả ngắn.
        </p>

        {loading && (
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skeletons.map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft"
              >
                <div className="aspect-[4/3] w-full animate-pulse bg-gray-100" />
                <div className="space-y-2 px-4 pb-4 pt-3">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
                  <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        )}
        {error && !loading && <p className="mt-8 text-sm text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {brands.map((brand) => (
              <Link
                to={`/products?brand=${brand._id}`}
                key={brand._id}
                className="group flex flex-col overflow-hidden rounded-2xl  bg-white"
              >
                <div className="aspect-[3/3] w-full overflow-hidden">
                  {brand.logo || brand.image ? (
                    <img
                      src={brand.logo || brand.image}
                      alt={brand.name}
                      className="h-full w-full object-contain transition duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                      No image
                    </div>
                  )}
                </div>
                {/* <div className="flex-1 px-4 pb-4 pt-3">
                  <h2 className="font-display text-lg font-semibold text-primary line-clamp-1">
                    {brand.name}
                  </h2>
                  <p className="mt-1 text-xs text-muted line-clamp-2">
                    {brand.productCount ?? 0} sản phẩm
                    {brand.description ? ` • ${brand.description}` : ' • Chưa có mô tả'}
                  </p>
                </div> */}
              </Link>
            ))}
            {brands.length === 0 && (
              <p className="mt-4 text-sm text-muted">Hiện chưa có thương hiệu nào trong hệ thống.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default BrandsPage;


