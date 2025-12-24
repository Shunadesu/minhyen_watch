import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { productsAPI } from '../api/products';
import useCartStore from '../store/cartStore';
import toast from 'react-hot-toast';

const formatPrice = (price) => {
  if (price === null || price === undefined) return 'Liên hệ';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(price);
};

const ProductGrid = ({ title, items, loading }) => {
  const addToCart = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.open);
  const navigate = useNavigate();

  const handleAddToCart = (e, p) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: p._id,
      name: p.name,
      price: p.price,
      image: p.images?.[0]
    });
    toast.success('Đã thêm vào giỏ', { id: 'add-cart' });
    openCart();
  };

  const handleOrder = (e, p) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: p._id,
      name: p.name,
      price: p.price,
      image: p.images?.[0]
    });
    navigate('/checkout');
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6 lg:py-12">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">{title.label}</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-primary">{title.heading}</h2>
            <p className="mt-2 text-sm text-muted">{title.sub}</p>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-primary hover:text-accent transition"
          >
            Xem tất cả
          </Link>
        </div>

        {loading ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft">
                <div className="aspect-[4/3] w-full animate-pulse bg-gray-100" />
                <div className="space-y-2 px-4 pb-4 pt-3">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
                  <div className="h-3 w-2/4 animate-pulse rounded bg-gray-100" />
                  <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView={1.1}
              autoplay={{ delay: 4200 }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 }
              }}
            >
              {items.map((p) => (
                <SwiperSlide key={p._id}>
                  <Link
                    to={`/product/${p._id}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border transition"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      {p.images && p.images.length > 0 ? (
                        <img
                          src={p.images[0]}
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
                      <h3 className="font-display text-lg font-semibold text-primary line-clamp-1">
                        {p.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-accent">{formatPrice(p.price)}</p>
                      <p className="mt-1 text-xs text-muted line-clamp-1">
                        {p.brand?.name ? `${p.brand.name} • ` : ''}
                        {p.category?.name || 'Đang cập nhật'}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <button
                          type="button"
                          onClick={(e) => handleAddToCart(e, p)}
                          className="rounded-full border border-gray-200 px-3 py-1 text-muted transition hover:border-primary hover:text-primary"
                        >
                          Thêm vào giỏ
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleOrder(e, p)}
                          className="rounded-full bg-primary px-3 py-1 text-white transition hover:bg-primary/90"
                        >
                          Đặt hàng
                        </button>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            {items.length === 0 && (
              <p className="mt-4 text-sm text-muted">Chưa có sản phẩm trong mục này.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

const HighlightProducts = () => {
  const [hot, setHot] = useState([]);
  const [exclusive, setExclusive] = useState([]);
  const [loadingHot, setLoadingHot] = useState(true);
  const [loadingExclusive, setLoadingExclusive] = useState(true);

  useEffect(() => {
    const fetchHot = async () => {
      try {
        setLoadingHot(true);
        const res = await productsAPI.getHot(8);
        if (res.success) setHot(res.data || []);
      } finally {
        setLoadingHot(false);
      }
    };
    const fetchExclusive = async () => {
      try {
        setLoadingExclusive(true);
        const res = await productsAPI.getExclusive(8);
        if (res.success) setExclusive(res.data || []);
      } finally {
        setLoadingExclusive(false);
      }
    };
    fetchHot();
    fetchExclusive();
  }, []);

  return (
    <>
      <ProductGrid
        title={{
          label: 'Nổi bật',
          heading: 'Sản phẩm Hot',
          sub: 'Những mẫu được quan tâm nhiều nhất tại Minh Yên.'
        }}
        items={hot}
        loading={loadingHot}
      />
      <ProductGrid
        title={{
          label: 'Độc quyền',
          heading: 'Sản phẩm Độc quyền',
          sub: 'Phiên bản hiếm, tuyển chọn riêng cho khách hàng thân thiết.'
        }}
        items={exclusive}
        loading={loadingExclusive}
      />
    </>
  );
};

export default HighlightProducts;


