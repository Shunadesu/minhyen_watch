import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';

const formatPrice = (price) => {
  if (price === null || price === undefined) return 'Liên hệ';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(price);
};

const CartPage = () => {
  const { items, increase, decrease, removeItem, clear, totalItems, totalPrice } = useCartStore(
    (s) => ({
      items: s.items,
      increase: s.increase,
      decrease: s.decrease,
      removeItem: s.removeItem,
      clear: s.clear,
      totalItems: s.totalItems,
      totalPrice: s.totalPrice
    })
  );

  return (
    <section className="min-h-screen bg-white pt-24">
      <div className="mx-auto max-w-6xl px-4 py-6 lg:px-6 lg:py-10">
        <nav className="flex items-center space-x-2 text-sm text-muted">
          <Link to="/" className="hover:text-primary">
            Trang chủ
          </Link>
          <span>/</span>
          <span className="text-primary">Giỏ hàng</span>
        </nav>

        <div className="mt-4 flex flex-col gap-6 lg:flex-row">
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Giỏ hàng</p>
                <h1 className="font-display text-3xl font-semibold text-primary">
                  {totalItems()} sản phẩm
                </h1>
              </div>
              <button
                onClick={clear}
                disabled={items.length === 0}
                className="rounded-full border border-gray-200 px-4 py-2 text-sm text-muted transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                Xóa giỏ
              </button>
            </div>

            {items.length === 0 && (
              <div className="rounded-2xl border border-gray-100 bg-white p-6 text-sm text-muted shadow-soft">
                Giỏ hàng trống. <Link to="/products" className="text-primary hover:underline">Tiếp tục mua sắm</Link>
              </div>
            )}

            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-soft md:flex-row md:items-center"
              >
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[11px] text-gray-500">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary line-clamp-1">{item.name}</h3>
                  <p className="text-sm text-accent font-semibold">{formatPrice(item.price)}</p>
                  <p className="text-xs text-muted">Số lượng: {item.qty}</p>
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <button
                      onClick={() => decrease(item.id)}
                      className="rounded-full border border-gray-200 px-3 py-1 text-muted transition hover:border-primary hover:text-primary"
                    >
                      -
                    </button>
                    <span className="min-w-[24px] text-center font-semibold text-primary">{item.qty}</span>
                    <button
                      onClick={() => increase(item.id)}
                      className="rounded-full border border-gray-200 px-3 py-1 text-muted transition hover:border-primary hover:text-primary"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-2 text-xs text-red-500 hover:underline"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-6 shadow-soft">
            <h3 className="font-display text-xl font-semibold text-primary">Tóm tắt</h3>
            <div className="mt-4 space-y-2 text-sm text-muted">
              <div className="flex items-center justify-between">
                <span>Số lượng</span>
                <span>{totalItems()} sản phẩm</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tạm tính</span>
                <span className="font-semibold text-primary">{formatPrice(totalPrice())}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-green-600">
                <span>Miễn phí vận chuyển toàn quốc</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Link
                to="/checkout"
                className="block w-full rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                Tiến hành đặt hàng
              </Link>
              <Link
                to="/products"
                className="block w-full rounded-full border border-primary px-4 py-3 text-center text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CartPage;


