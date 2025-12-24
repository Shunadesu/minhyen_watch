import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import { ordersAPI } from '../api/orders';
import toast from 'react-hot-toast';

const formatPrice = (price) => {
  if (price === null || price === undefined) return 'Liên hệ';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(price);
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clear } = useCartStore((s) => ({
    items: s.items,
    totalPrice: s.totalPrice,
    clear: s.clear
  }));
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Thanh toán | Minh Yên Watch';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customer.name || !customer.phone) {
      toast.error('Vui lòng nhập họ tên và số điện thoại');
      return;
    }
    if (items.length === 0) {
      toast.error('Giỏ hàng trống');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        customerName: customer.name,
        customerPhone: customer.phone,
        customerEmail: customer.email,
        notes: customer.notes || `Đặt ${items.length} sản phẩm`,
        productName: items[0].name,
        productId: items[0].id
      };
      const res = await ordersAPI.create(payload);
      if (!res.success) throw new Error(res.message || 'Không thể tạo đơn');
      toast.success('Đặt hàng thành công!');
      clear();
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-white pt-24">
      <div className="mx-auto max-w-6xl px-4 py-6 lg:px-6 lg:py-10">
        <nav className="flex items-center space-x-2 text-sm text-muted">
          <Link to="/" className="hover:text-primary">
            Trang chủ
          </Link>
          <span>/</span>
          <Link to="/cart" className="hover:text-primary">
            Giỏ hàng
          </Link>
          <span>/</span>
          <span className="text-primary">Thanh toán</span>
        </nav>

        <div className="mt-4 grid gap-6 lg:grid-cols-3">
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-soft"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Thông tin</p>
              <h1 className="mt-2 font-display text-3xl font-semibold text-primary">Đặt hàng</h1>
              <p className="mt-2 text-sm text-muted">
                Nhập thông tin liên hệ, chúng tôi sẽ gọi xác nhận và hoàn tất đơn.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary">Họ tên *</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-primary"
                  value={customer.name}
                  onChange={(e) => setCustomer((s) => ({ ...s, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary">Số điện thoại *</label>
                <input
                  type="tel"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-primary"
                  value={customer.phone}
                  onChange={(e) => setCustomer((s) => ({ ...s, phone: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary">Email</label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-primary"
                  value={customer.email}
                  onChange={(e) => setCustomer((s) => ({ ...s, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-primary">Ghi chú</label>
                <textarea
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-primary"
                  value={customer.notes}
                  onChange={(e) => setCustomer((s) => ({ ...s, notes: e.target.value }))}
                  placeholder="Yêu cầu thêm về giao hàng, bảo hành..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Đang gửi...' : 'Xác nhận đặt hàng'}
            </button>
          </form>

          <aside className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-soft">
            <h3 className="font-display text-xl font-semibold text-primary">Tóm tắt đơn</h3>
            <div className="space-y-3 text-sm text-muted">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted">x{item.qty}</span>
                    <span className="line-clamp-1 text-primary">{item.name}</span>
                  </div>
                  <span className="font-semibold text-primary">{formatPrice(item.price)}</span>
                </div>
              ))}
              {items.length === 0 && <p>Chưa có sản phẩm nào.</p>}
            </div>
            <div className="flex items-center justify-between text-sm text-muted">
              <span>Tạm tính</span>
              <span className="font-semibold text-primary">{formatPrice(totalPrice())}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-green-600">
              <span>Miễn phí vận chuyển</span>
              <span>0đ</span>
            </div>
            <Link
              to="/cart"
              className="block w-full rounded-full border border-primary px-4 py-3 text-center text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              Quay lại giỏ hàng
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;


