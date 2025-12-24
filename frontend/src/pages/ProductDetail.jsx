import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productsAPI } from '../api/products';
import useCartStore from '../store/cartStore';
import useQuickOrderStore from '../store/quickOrderStore';

const formatPrice = (price) => {
  if (price === null || price === undefined) return 'Liên hệ';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(price);
};

const fixImage = (url) => {
  if (!url) return '';
  if (url.startsWith('//')) return `https:${url}`;
  return url;
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.open);
  const openQuickOrder = useQuickOrderStore((s) => s.open);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [hotProducts, setHotProducts] = useState([]);
  const [loadingHot, setLoadingHot] = useState(true);

  const skeletons = useMemo(() => Array.from({ length: 6 }), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await productsAPI.getById(id);
        if (!res.success) throw new Error(res.message || 'Không tìm thấy sản phẩm');
        const product = res.data;
        product.images = (product.images || []).map(fixImage);
        setData(product);
        document.title = `${product.name} | Minh Yên Watch`;
      } catch (err) {
        setError(err.message || 'Đã có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchHot = async () => {
      try {
        setLoadingHot(true);
        const res = await productsAPI.getHot(4);
        if (res.success) {
          setHotProducts(res.data || []);
        }
      } catch {
        setHotProducts([]);
      } finally {
        setLoadingHot(false);
      }
    };
    fetchHot();
  }, []);

  const handleAddToCart = () => {
    if (!data) return;
    addToCart({
      id: data._id,
      name: data.name,
      price: data.price,
      image: data.images?.[0]
    });
    openCart();
  };

  const gallery = data?.images?.length ? data.images : [];

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-6">
        <div className="mb-4 flex items-center space-x-2 text-sm text-muted">
          <Link to="/" className="hover:text-primary flex-shrink-0">Trang chủ</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary flex-shrink-0">Sản phẩm</Link>
          {data?.name && (
            <>
              <span>/</span>
              <span className="text-primary line-clamp-1">{data.name}</span>
            </>
          )}
        </div>

        {loading && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-4 shadow-soft">
              <div className="aspect-[4/3] animate-pulse rounded-2xl bg-gray-200" />
              <div className="mt-3 grid grid-cols-4 gap-3">
                {skeletons.slice(0, 4).map((_, idx) => (
                  <div key={idx} className="aspect-square animate-pulse rounded-xl bg-gray-200" />
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-soft">
              <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />
              <div className="mt-3 h-5 w-1/3 animate-pulse rounded bg-gray-200" />
              <div className="mt-4 space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-4/6 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-600">{error}</div>
        )}

        {data && !loading && !error && (
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Gallery */}
            <div className="rounded-3xl bg-white p-5 shadow-soft">
              <div className="relative overflow-hidden rounded-2xl bg-gray-100">
                {gallery.length > 0 ? (
                  <img
                    src={gallery[activeImage]}
                    alt={data.name}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center text-sm text-gray-500">
                    No image
                  </div>
                )}
              </div>
              {gallery.length > 1 && (
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {gallery.map((img, idx) => (
                    <button
                      key={img}
                      onClick={() => setActiveImage(idx)}
                      className={`relative aspect-square overflow-hidden rounded-xl border transition ${
                        activeImage === idx ? 'border-primary ring-2 ring-primary/20' : 'border-gray-100'
                      }`}
                    >
                      <img src={img} alt={`thumb-${idx}`} className="h-full w-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="rounded-3xl bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">Minh Yên Watch</p>
                  <h1 className="mt-2 font-display text-xl font-semibold text-primary">{data.name}</h1>
                  <div className="mt-2 text-lg font-semibold text-accent">{formatPrice(data.price)}</div>
                  {data.originalPrice > data.price && (
                    <div className="text-sm text-gray-500 line-through">
                      {formatPrice(data.originalPrice)}
                    </div>
                  )}
                </div>
                
              </div>

              <div className="mt-4 space-y-2 text-sm text-muted">
                {data.shortDescription && <p>{data.shortDescription}</p>}
                {data.description && (
                  <div className="prose prose-sm max-w-none text-gray-700">
                    {data.description}
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={handleAddToCart}
                  className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                  Thêm vào giỏ
                </button>
                <button
                  onClick={() => openQuickOrder(data.name)}
                  className="rounded-full border border-primary px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
                >
                  Đặt nhanh
                </button>
              </div>

              {/* Thông số ẩn theo yêu cầu */}
            </div>
          </div>
        )}

        {/* Sản phẩm hot */}
        <div className="mt-12 border-t border-gray-100 pt-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Nổi bật</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-primary">Sản phẩm Hot</h2>
            </div>
            <Link
              to="/products"
              className="text-sm font-semibold text-accent transition hover:text-primary"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>

          {loadingHot && (
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {skeletons.slice(0, 4).map((_, idx) => (
                <div
                  key={`hot-skel-${idx}`}
                  className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft"
                >
                  <div className="aspect-[4/3] w-full animate-pulse bg-gray-100" />
                  <div className="space-y-2 px-4 pb-4 pt-3">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
                    <div className="h-3 w-2/4 animate-pulse rounded bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loadingHot && hotProducts.length > 0 && (
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {hotProducts.map((p) => (
                <button
                  key={p._id}
                  onClick={() => navigate(`/product/${p._id}`)}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lg text-left"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    {p.images && p.images.length > 0 ? (
                      <img
                        src={fixImage(p.images[0])}
                        alt={p.name}
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
                    <h3 className="font-display text-sm font-semibold text-primary line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-accent">
                      {formatPrice(p.price)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;


