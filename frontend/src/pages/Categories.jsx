import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const skeletons = useMemo(() => Array.from({ length: 6 }), []);

  useEffect(() => {
    document.title = 'Danh mục | Minh Yên Watch';
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError('');
        const baseUrl = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${baseUrl}/api/categories?limit=100`);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const json = await res.json();

        if (!json.success) {
          throw new Error(json.message || 'Không thể lấy danh mục');
        }

        setCategories(json.data || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err.message || 'Đã có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="min-h-screen bg-white pt-24">
      <div className="mx-auto max-w-6xl px-4 py-4 lg:px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Danh mục</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-primary">
          Danh mục đồng hồ Minh Yên
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Danh sách danh mục được đồng bộ trực tiếp từ hệ thống admin, bao gồm số lượng sản phẩm và
          mô tả ngắn gọn cho từng nhóm.
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
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                to={`/products?category=${cat._id}`}
                key={cat._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex-1 px-4 pb-4 pt-3">
                  <h2 className="font-display text-lg font-semibold text-primary line-clamp-1">
                    {cat.name}
                  </h2>
                  <p className="mt-1 text-xs text-muted line-clamp-2">
                    {cat.productCount ?? 0} sản phẩm
                    {cat.description ? ` • ${cat.description}` : ' • Chưa có mô tả'}
                  </p>
                </div>
              </Link>
            ))}

            {categories.length === 0 && (
              <p className="mt-4 text-sm text-muted">Hiện chưa có danh mục nào trong hệ thống.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesPage;


