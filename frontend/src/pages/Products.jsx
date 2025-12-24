import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import useQuickOrderStore from '../store/quickOrderStore';
import useCartStore from '../store/cartStore';

const formatPrice = (price) => {
  if (price === null || price === undefined) return 'Liên hệ';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(price);
};

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(9);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [brandInfo, setBrandInfo] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const skeletons = useMemo(() => Array.from({ length: 9 }), []);
  const openQuickOrder = useQuickOrderStore((s) => s.open);
  const addToCart = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.open);

  const category = searchParams.get('category') || '';
  const brand = searchParams.get('brand') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  const priceRanges = [
    { label: 'Dưới 50 triệu', min: '', max: '50000000' },
    { label: '50 - 100 triệu', min: '50000000', max: '100000000' },
    { label: '100 - 200 triệu', min: '100000000', max: '200000000' },
    { label: 'Trên 200 triệu', min: '200000000', max: '' }
  ];

  useEffect(() => {
    document.title = 'Sản phẩm | Minh Yên Watch';
  }, []);

  // fetch list categories/brands for filters
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:1011';
    const load = async () => {
      try {
        const [catsRes, brandsRes] = await Promise.all([
          fetch(`${baseUrl}/api/categories?limit=200`),
          fetch(`${baseUrl}/api/brands?limit=200`)
        ]);
        const catsJson = await catsRes.json();
        const brandsJson = await brandsRes.json();
        if (catsJson.success) setAllCategories(catsJson.data || []);
        if (brandsJson.success) setAllBrands(brandsJson.data || []);
      } catch (e) {
        // silent
      }
    };
    load();
  }, []);

  useEffect(() => {
    const fetchMeta = async () => {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      if (category) {
        try {
          const res = await fetch(`${baseUrl}/api/categories?page=1&limit=200`);
          const json = await res.json();
          const found = json.data?.find((c) => c._id === category);
          setCategoryInfo(found || null);
        } catch {
          setCategoryInfo(null);
        }
      } else {
        setCategoryInfo(null);
      }
      if (brand) {
        try {
          const res = await fetch(`${baseUrl}/api/brands?page=1&limit=200`);
          const json = await res.json();
          const found = json.data?.find((b) => b._id === brand);
          setBrandInfo(found || null);
        } catch {
          setBrandInfo(null);
        }
      } else {
        setBrandInfo(null);
      }
    };
    fetchMeta();
  }, [category, brand]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const baseUrl = import.meta.env.VITE_API_URL || '';
        const qs = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          ...(category ? { category } : {}),
          ...(brand ? { brand } : {}),
          ...(minPrice ? { minPrice } : {}),
          ...(maxPrice ? { maxPrice } : {})
        }).toString();
        const res = await fetch(`${baseUrl}/api/products?${qs}`);
        const json = await res.json();
        if (!json.success) throw new Error(json.message || 'Không thể lấy sản phẩm');
        setProducts(json.data || []);
        setPages(json.pagination?.pages || 1);
        setTotal(json.pagination?.total || 0);
      } catch (err) {
        setError(err.message || 'Đã có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit, category, brand, minPrice, maxPrice]);

  const handleChangePage = (nextPage) => {
    if (nextPage < 1 || nextPage > pages) return;
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchParams({});
    setPage(1);
  };

  const applyPriceRange = (range) => {
    const params = {};
    if (category) params.category = category;
    if (brand) params.brand = brand;
    if (range.min) params.minPrice = range.min;
    if (range.max) params.maxPrice = range.max;
    setSearchParams(params);
    setPage(1);
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]
    });
    toast.success('Đã thêm vào giỏ', { id: 'add-cart' });
    openCart();
  };

  const handleOrder = (product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]
    });
    navigate('/checkout');
  };

  return (
    <section className="min-h-screen bg-white pt-24">
      <div className="mx-auto max-w-6xl px-4 py-6 lg:px-6 lg:py-10">
        <nav className="flex items-center space-x-2 text-sm text-muted">
          <Link to="/" className="hover:text-primary">Trang chủ</Link>
          <span>/</span>
          <span className="text-primary">Sản phẩm</span>
          {categoryInfo && (
            <>
              <span>/</span>
              <span className="text-primary">{categoryInfo.name}</span>
            </>
          )}
          {brandInfo && (
            <>
              <span>/</span>
              <span className="text-primary">{brandInfo.name}</span>
            </>
          )}
        </nav>

        
        <h1 className="mt-2 font-display text-3xl font-semibold text-primary">
          {categoryInfo?.name || brandInfo?.name || 'Tất cả sản phẩm'}
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          {categoryInfo?.description ||
            brandInfo?.description ||
            'Lọc theo danh mục, thương hiệu hoặc tầm giá để xem danh sách đồng hồ phù hợp.'}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          {categoryInfo && (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
              Danh mục: {categoryInfo.name}
            </span>
          )}
          {brandInfo && (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
              Thương hiệu: {brandInfo.name}
            </span>
          )}
          {(minPrice || maxPrice) && (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
              Giá: {minPrice ? `${formatPrice(Number(minPrice))}` : '0'} -{' '}
              {maxPrice ? `${formatPrice(Number(maxPrice))}` : '∞'}
            </span>
          )}
          {(category || brand) && (
            <button onClick={clearFilters} className="rounded-full border border-gray-200 px-3 py-1 text-muted hover:text-primary">
              Xóa lọc
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wide text-muted">Danh mục</span>
            <select
              className="rounded-full border border-gray-200 px-3 py-1 text-sm text-primary/80 focus:border-primary focus:outline-none"
              value={category}
              onChange={(e) => {
                const val = e.target.value;
                const params = {};
                if (val) params.category = val;
                if (brand) params.brand = brand;
                if (minPrice) params.minPrice = minPrice;
                if (maxPrice) params.maxPrice = maxPrice;
                setSearchParams(params);
                setPage(1);
              }}
            >
              <option value="">Tất cả</option>
              {allCategories.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wide text-muted">Thương hiệu</span>
            <select
              className="rounded-full border border-gray-200 px-3 py-1 text-sm text-primary/80 focus:border-primary focus:outline-none"
              value={brand}
              onChange={(e) => {
                const val = e.target.value;
                const params = {};
                if (category) params.category = category;
                if (val) params.brand = val;
                if (minPrice) params.minPrice = minPrice;
                if (maxPrice) params.maxPrice = maxPrice;
                setSearchParams(params);
                setPage(1);
              }}
            >
              <option value="">Tất cả</option>
              {allBrands.map((b) => (
                <option key={b._id} value={b._id}>{b.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => applyPriceRange(range)}
              className={`rounded-full border px-3 py-1 transition ${
                minPrice === range.min && maxPrice === range.max
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-200 text-muted hover:text-primary'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skeletons.map((_, idx) => (
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
        )}

        {error && !loading && <p className="mt-8 text-sm text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <button
                  key={p._id}
                  onClick={() => navigate(`/product/${p._id}`)}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lg text-left"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
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
                    <h2 className="font-display text-lg font-semibold text-primary line-clamp-1">{p.name}</h2>
                    <p className="mt-1 text-sm text-accent font-semibold">{formatPrice(p.price)}</p>
                    <p className="mt-1 text-xs text-muted line-clamp-2">
                      {p.brand?.name ? `${p.brand.name} • ` : ''}
                      {p.category?.name || 'Đang cập nhật'}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(p);
                        }}
                        className="rounded-full border border-gray-200 px-3 py-1 text-muted transition hover:border-primary hover:text-primary"
                      >
                        Thêm vào giỏ
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOrder(p);
                        }}
                        className="rounded-full bg-primary px-3 py-1 text-white transition hover:bg-primary/90"
                      >
                        Đặt hàng
                      </button>
                    </div>
                  </div>
                </button>
              ))}
              {products.length === 0 && (
                <p className="mt-4 text-sm text-muted">Chưa có sản phẩm nào cho bộ lọc này.</p>
              )}
            </div>

            {pages > 1 && (
              <div className="mt-8 flex flex-col items-center space-y-3 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleChangePage(page - 1)}
                    disabled={page === 1}
                    className="h-9 rounded-full border border-gray-200 px-4 text-muted transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Trước
                  </button>
                  <div className="flex items-center gap-1">
                    {(() => {
                      const items = [];
                      const addPage = (pNum) =>
                        items.push(
                          <button
                            key={`p-${pNum}`}
                            onClick={() => handleChangePage(pNum)}
                            className={`h-9 min-w-[36px] rounded-full px-3 text-sm transition ${
                              pNum === page
                                ? 'bg-primary text-white shadow-sm'
                                : 'border border-gray-200 text-muted hover:text-primary'
                            }`}
                          >
                            {pNum}
                          </button>
                        );
                      const addEllipsis = (key) =>
                        items.push(
                          <span key={key} className="px-2 text-muted">
                            ...
                          </span>
                        );

                      const showPages = [];
                      showPages.push(1);
                      if (page > 3) showPages.push('start-ellipsis');
                      if (page - 1 > 1 && page - 1 < pages) showPages.push(page - 1);
                      if (page !== 1 && page !== pages) showPages.push(page);
                      if (page + 1 < pages) showPages.push(page + 1);
                      if (page < pages - 2) showPages.push('end-ellipsis');
                      if (pages !== 1) showPages.push(pages);

                      showPages.forEach((p, idx) => {
                        if (p === 'start-ellipsis' || p === 'end-ellipsis') {
                          addEllipsis(`${p}-${idx}`);
                        } else {
                          addPage(p);
                        }
                      });

                      return items;
                    })()}
                  </div>
                  <button
                    onClick={() => handleChangePage(page + 1)}
                    disabled={page === pages}
                    className="h-9 rounded-full border border-gray-200 px-4 text-muted transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Sau
                  </button>
                </div>
                <p className="text-xs text-muted">
                  Trang {page}/{pages} • {total} sản phẩm
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProductsPage;


