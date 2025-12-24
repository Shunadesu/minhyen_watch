import { FiX, FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
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

const CartDrawer = () => {
  const {
    items,
    isOpen,
    close,
    removeItem,
    increase,
    decrease,
    clear,
    totalItems,
    totalPrice
  } = useCartStore((s) => ({
    items: s.items,
    isOpen: s.isOpen,
    close: s.close,
    removeItem: s.removeItem,
    increase: s.increase,
    decrease: s.decrease,
    clear: s.clear,
    totalItems: s.totalItems,
    totalPrice: s.totalPrice
  }));

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={close}
        />
      )}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-white shadow-2xl flex justify-between flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Giỏ hàng</p>
            <h3 className="font-display text-xl font-semibold text-primary">
              {totalItems()} sản phẩm
            </h3>
          </div>
          <button
            onClick={close}
            className="rounded-full p-2 text-muted transition hover:bg-gray-100 hover:text-primary"
            aria-label="Đóng giỏ hàng"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="h-[65vh] overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 && (
            <p className="text-sm text-muted">Giỏ hàng đang trống. Thêm sản phẩm để tiếp tục.</p>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-3 rounded-xl border border-gray-100 p-3"
            >
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[11px] text-gray-500">
                    No image
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-primary line-clamp-1">{item.name}</h4>
                    <p className="text-sm text-accent font-semibold">{formatPrice(item.price)}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted transition hover:text-red-500"
                    aria-label="Xóa sản phẩm"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
                <div className="mt-3 flex items-center space-x-2">
                  <button
                    onClick={() => decrease(item.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-muted transition hover:border-primary hover:text-primary"
                    aria-label="Giảm số lượng"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="min-w-[32px] text-center text-sm font-medium text-primary">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => increase(item.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-muted transition hover:border-primary hover:text-primary"
                    aria-label="Tăng số lượng"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t px-5 py-4 space-y-3">
          <div className="flex items-center justify-between text-sm text-muted">
            <span>Tổng cộng</span>
            <span className="font-semibold text-primary">{formatPrice(totalPrice())}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted">
            <span>Số lượng</span>
            <span>{totalItems()} sản phẩm</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => {
                clear();
                close();
              }}
              disabled={items.length === 0}
              className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm text-muted transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Xóa giỏ
            </button>
            <Link
              to="/cart"
              onClick={close}
              className="flex-1 rounded-full border border-primary px-4 py-2 text-center text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              Xem giỏ
            </Link>
            <Link
              to="/checkout"
              onClick={close}
              className="flex-1 rounded-full bg-primary px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Thanh toán
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default CartDrawer;


