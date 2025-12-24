import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fixImage = (url) => {
  if (!url) return '';
  if (url.startsWith('//')) return `https:${url}`;
  return url;
};

const Collections = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const skeletons = useMemo(() => Array.from({ length: 4 }), []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_API_URL || '';
        const fetchWithFilter = async (url) => {
          const res = await fetch(url);
          return res.json();
        };

        // ưu tiên danh mục được chọn hiển thị Home
        let json = await fetchWithFilter(`${baseUrl}/api/categories?isFeaturedHome=true&limit=4`);
        if (!json.success || (json.data || []).length === 0) {
          // fallback lấy 4 danh mục đầu
          json = await fetchWithFilter(`${baseUrl}/api/categories?limit=4`);
        }
        if (!json.success) throw new Error(json.message || 'Không thể tải danh mục');
        const mapped = (json.data || []).map((c) => ({
          id: c._id,
          title: c.name,
          description: c.description || 'Khám phá bộ sưu tập đồng hồ tuyển chọn.',
          image: fixImage(c.image),
          productCount: c.productCount || 0
        }));
        setItems(mapped);
      } catch (err) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section id="collections" className="-mt-12 bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Danh mục</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-primary">
            Tuyển chọn dành cho nhà sưu tầm
          </h2>
          <p className="mt-3 text-sm text-muted">
            Từ đồng hồ có sẵn, ưu đãi đặc biệt đến đấu giá quốc tế và bộ sưu tập Hermle.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {loading
            ? skeletons.map((_, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-2xl bg-gray-50 shadow-soft"
                >
                  <div className="aspect-[16/9] w-full animate-pulse bg-gray-200" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 space-y-2">
                    <div className="h-5 w-1/2 rounded bg-white/30" />
                    <div className="h-3 w-3/4 rounded bg-white/20" />
                  </div>
                </div>
              ))
            : items.map((item) => (
                <motion.div
                  key={item.id || item.title}
                  className="group relative overflow-hidden rounded-2xl bg-gray-50 shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-200 text-sm font-semibold uppercase tracking-wide text-gray-500">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/85">{item.description}</p>
                    <div className="mt-1 text-xs text-white/75">
                      {item.productCount} sản phẩm
                    </div>
                    <Link
                      to={`/products?category=${item.id}`}
                      className="mt-3 inline-flex text-sm font-semibold text-accent transition hover:text-white"
                    >
                      Xem bộ sưu tập →
                    </Link>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;

