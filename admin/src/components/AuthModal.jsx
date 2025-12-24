import { useEffect, useState } from 'react';
import { FiX, FiLogIn, FiUserPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import useAuthModalStore from '../store/authModalStore';
import { authAPI } from '../api/auth';

const inputClass =
  'w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/30 transition bg-white';

const AuthModal = ({ forceOpen = false }) => {
  const { login } = useAuthStore();
  const { isOpen, mode, closeAuthModal, openAuthModal } = useAuthModalStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const visible = forceOpen || isOpen;

  useEffect(() => {
    if (!visible) {
      setFormData({ name: '', email: '', password: '' });
      setLoading(false);
    }
  }, [visible]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        const response = await authAPI.login(formData.email, formData.password);
        if (response.success && response.user.role === 'admin') {
          login(response.user, response.token);
          toast.success('Đăng nhập thành công');
          closeAuthModal();
        } else {
          toast.error('Tài khoản cần quyền admin');
        }
      } else {
        const response = await authAPI.register(formData.name, formData.email, formData.password);
        if (response.success && response.user.role === 'admin') {
          login(response.user, response.token);
          toast.success('Tạo tài khoản & đăng nhập thành công');
          closeAuthModal();
        } else if (response.success) {
          toast.error('Đăng ký thành công nhưng tài khoản chưa có quyền admin');
        } else {
          toast.error(response.message || 'Đăng ký thất bại');
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Thao tác thất bại');
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-gray-100">
        <button
          onClick={closeAuthModal}
          className="absolute right-3 top-3 rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
          aria-label="Close modal"
        >
          <FiX size={18} />
        </button>

        <div className="mb-6 flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            {mode === 'login' ? <FiLogIn size={20} /> : <FiUserPlus size={20} />}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Minh Yên Watch</p>
            <h3 className="text-xl font-semibold text-primary">
              {mode === 'login' ? 'Đăng nhập admin' : 'Đăng ký tài khoản'}
            </h3>
            <p className="text-xs text-muted">Chỉ dành cho tài khoản có quyền admin</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Họ tên</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClass}
                placeholder="Nguyễn Văn A"
              />
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClass}
              placeholder="admin@minhyen.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={inputClass}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 shadow-md"
          >
            {loading ? 'Đang xử lý...' : mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-muted">
          {mode === 'login' ? (
            <button
              type="button"
              className="text-primary underline-offset-4 transition hover:underline"
              onClick={() => openAuthModal('register')}
            >
              Chưa có tài khoản? Đăng ký
            </button>
          ) : (
            <button
              type="button"
              className="text-primary underline-offset-4 transition hover:underline"
              onClick={() => openAuthModal('login')}
            >
              Đã có tài khoản? Đăng nhập
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

