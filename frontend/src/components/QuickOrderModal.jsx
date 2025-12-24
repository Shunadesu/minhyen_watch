import { useEffect, useState } from 'react';
import { FiX, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useQuickOrderStore from '../store/quickOrderStore';
import { ordersAPI } from '../api/orders';

const inputClass =
  'w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/30 transition';

const QuickOrderModal = () => {
  const { isOpen, productName, close } = useQuickOrderStore();
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    email: '',
    note: '',
    productName: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm((prev) => ({ ...prev, productName: productName || '' }));
    } else {
      setForm({ customerName: '', phone: '', email: '', note: '', productName: '' });
      setLoading(false);
    }
  }, [isOpen, productName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.customerName || !form.phone) {
      toast.error('Vui lòng nhập tên và số điện thoại');
      return;
    }
    setLoading(true);
    try {
      const res = await ordersAPI.create(form);
      if (res.success) {
        toast.success('Đã gửi yêu cầu mua hàng');
        close();
      } else {
        toast.error(res.message || 'Gửi yêu cầu thất bại');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gửi yêu cầu thất bại');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <button
          onClick={close}
          className="absolute right-3 top-3 rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
          aria-label="Close modal"
        >
          <FiX size={18} />
        </button>

        <div className="mb-5 flex items-center space-x-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiSend size={20} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Đặt mua nhanh</p>
          </div>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Họ tên *</label>
            <input
              type="text"
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              className={inputClass}
              required
              placeholder="Nguyễn Văn A"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Số điện thoại *</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
              required
              placeholder="0852458888"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email (tuỳ chọn)</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Sản phẩm quan tâm</label>
            <input
              type="text"
              value={form.productName}
              onChange={(e) => setForm({ ...form, productName: e.target.value })}
              className={inputClass}
              placeholder="Tên hoặc đường link sản phẩm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Ghi chú</label>
            <textarea
              rows={3}
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className={`${inputClass} resize-none`}
              placeholder="Thời gian liên hệ, yêu cầu thêm..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Đang gửi...' : 'Gửi yêu cầu'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuickOrderModal;

