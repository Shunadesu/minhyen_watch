import { useEffect } from 'react';
import useAuthStore from '../store/authStore';
import useAuthModalStore from '../store/authModalStore';
import AuthModal from './AuthModal';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const { openAuthModal } = useAuthModalStore();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      openAuthModal('login');
    }
  }, [isAuthenticated, user, openAuthModal]);

  if (!isAuthenticated) {
    return (
      <>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 px-4 text-center text-sm text-muted">
          Vui lòng đăng nhập để tiếp tục.
        </div>
        <AuthModal forceOpen />
      </>
    );
  }

  if (user?.role !== 'admin') {
    return (
      <>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 px-4 text-center text-sm text-muted">
          Bạn cần tài khoản admin để truy cập.
        </div>
        <AuthModal forceOpen />
      </>
    );
  }

  return children;
};

export default ProtectedRoute;

