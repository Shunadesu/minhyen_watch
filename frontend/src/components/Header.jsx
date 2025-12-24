import { useEffect, useRef, useState } from 'react';
import {
  FiMenu,
  FiX,
  FiPhoneCall,
  FiInstagram,
  FiFacebook,
  FiUser,
  FiChevronDown,
  FiShoppingBag
} from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import useUIStore from '../store/uiStore';
import useQuickOrderStore from '../store/quickOrderStore';
import useCartStore from '../store/cartStore';
import { servicesAPI } from '../api/services';

const navItems = [
  { label: 'Sản phẩm', to: '/products' },
  { label: 'Danh mục', to: '/categories' },
  { label: 'Thương hiệu', to: '/brands' },
  { label: 'Dịch vụ', to: '/services' },
  { label: 'Blog', to: '/blog' },
  { label: 'Về chúng tôi', to: '/about' }
];

const Header = () => {
  const { mobileMenuOpen, toggleMobileMenu, setMobileMenuOpen, isHeaderSolid, setHeaderSolid } =
    useUIStore();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [services, setServices] = useState([]);
  const [serviceError, setServiceError] = useState('');
  const [serviceOpen, setServiceOpen] = useState(false);
  const hoverTimeout = useRef(null);
  const { open: openQuickOrder } = useQuickOrderStore();
  const { open: openCart, totalItems } = useCartStore((s) => ({
    open: s.open,
    totalItems: s.totalItems
  }));

  useEffect(() => {
    if (!isHome) {
      // Các trang khác luôn dùng header trắng, không cần lắng nghe scroll
      setHeaderSolid(true);
      return;
    }

    const onScroll = () => {
      setHeaderSolid(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome, setHeaderSolid]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [mobileMenuOpen, setMobileMenuOpen]);

  const fallbackServices = [
    {
      slug: 'thu-mua-dong-ho',
      title: 'Thu mua đồng hồ'
    },
    {
      slug: 'ky-gui-dong-ho',
      title: 'Ký gửi đồng hồ'
    },
    {
      slug: 'ky-gui-dong-ho-voi-nha-dau-gia',
      title: 'Ký gửi đồng hồ với nhà đấu giá'
    },
    {
      slug: 'gia-bao-certificate-dam-bao-nguon-goc-dong-ho-chinh-hang',
      title: 'Minh Yên Preowned Certificate'
    }
  ];

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await servicesAPI.getAll();
        if (!res.success) throw new Error(res.message || 'Không thể tải dịch vụ');
        setServices(res.data || fallbackServices);
        setServiceError('');
      } catch (err) {
        // Dùng fallback tĩnh để không hiện lỗi 404 trong dropdown
        setServices(fallbackServices);
        setServiceError('');
      }
    };
    loadServices();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
        isHeaderSolid ? 'bg-white shadow-sm' : isHome ? 'bg-transparent' : 'bg-white'
      }`}
    >
      {/* Top bar – chỉ hiển thị ở trang Home và khi chưa scroll */}
      {isHome && !isHeaderSolid && (
        <div className="hidden text-white/90 lg:block">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-xs lg:px-6">
            <div className="flex items-center space-x-4">
              <div className="inline-flex items-center space-x-2">
                <FiPhoneCall size={14} />
                <span>Hotline: 0852458888</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="inline-flex items-center space-x-1 transition hover:text-accent">
                <FiInstagram size={14} />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/share/1Ejdxmccd3/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 transition hover:text-accent"
              >
                <FiFacebook size={14} />
                <span>Facebook</span>
              </a>
              <a href="#" className="transition hover:text-accent">
                Tuyển dụng
              </a>
              <a href="#" className="inline-flex items-center space-x-1 transition hover:text-accent">
                <FiUser size={14} />
                <span>Đăng nhập</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main nav – luôn chiếm top khi scroll */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex flex-col leading-tight">
              <span
                className={`font-display text-xl font-semibold ${
                  isHeaderSolid || !isHome ? 'text-primary' : 'text-white'
                }`}
              >
                Minh Yên Watch
              </span>
              <span
                className={`text-xs uppercase tracking-wide ${
                  isHeaderSolid || !isHome ? 'text-muted' : 'text-white/80'
                }`}
              >
                Luxury Timepieces & Services
              </span>
            </div>
          </Link>

          <nav
            className={`hidden items-center space-x-6 text-sm font-medium ${
              isHeaderSolid || !isHome ? 'text-primary' : 'text-white'
            } lg:flex`}
          >
            {navItems
              .filter((item) => item.label !== 'Dịch vụ')
              .map((item) => (
                <Link key={item.label} to={item.to} className="transition hover:text-accent">
                  {item.label}
                </Link>
              ))}
            <div
              className="relative"
              onMouseEnter={() => {
                if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                setServiceOpen(true);
              }}
              onMouseLeave={() => {
                hoverTimeout.current = setTimeout(() => setServiceOpen(false), 180);
              }}
            >
              <div className="inline-flex cursor-pointer items-center space-x-1 transition hover:text-accent">
                <span>Dịch vụ</span>
                <FiChevronDown size={14} />
              </div>
              <div
                className={`pointer-events-auto absolute left-0 top-full z-20 mt-1 w-64 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl transition ${
                  serviceOpen ? 'visible opacity-100' : 'invisible opacity-0'
                }`}
              >
                {serviceError && <p className="text-xs text-red-500">{serviceError}</p>}
                {!serviceError && services.length === 0 && (
                  <p className="text-xs text-gray-500">Đang tải dịch vụ...</p>
                )}
                <div className="space-y-2">
                  {services.slice(0, 4).map((svc) => (
                    <Link
                      key={svc.slug}
                      to={`/dichvu/${svc.slug}`}
                      className="block rounded-lg px-2 py-2 text-sm text-primary hover:bg-gray-50"
                    >
                      {svc.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <a
              href="tel:0852458888"
              className="rounded-full bg-primary px-4 py-2 text-white transition hover:bg-primary/90"
            >
              Hotline 0852458888
            </a>
            <button
              onClick={openCart}
              className="relative flex items-center justify-center rounded-full border border-primary px-3 py-2 text-primary transition hover:bg-primary hover:text-white"
              aria-label="Mở giỏ hàng"
            >
              <FiShoppingBag size={18} />
              {/* <span className="ml-2 text-sm">Giỏ hàng</span> */}
              {totalItems() > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-primary">
                  {totalItems()}
                </span>
              )}
            </button>
          </nav>

          <button
            className={`rounded-lg p-2 transition hover:bg-white/60 lg:hidden ${
              isHeaderSolid || !isHome ? 'text-primary' : 'text-white'
            }`}
            aria-label="Toggle menu"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="glass border-t border-white/40 px-4 py-3 shadow-sm backdrop-blur lg:hidden">
            <div className="flex flex-col space-y-3 text-sm font-medium text-primary">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="rounded-md px-2 py-2 transition hover:bg-white/70"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {services.map((svc) => (
                <Link
                  key={svc.slug}
                  to={`/dichvu/${svc.slug}`}
                  className="rounded-md px-2 py-2 transition hover:bg-white/70"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {svc.title}
                </Link>
              ))}
              <a
                href="tel:0852458888"
                className="rounded-md bg-primary px-3 py-2 text-center text-white transition hover:bg-primary/90"
              >
                Hotline 0852458888
              </a>
              <button
                onClick={() => {
                  openCart();
                  setMobileMenuOpen(false);
                }}
                className="w-full rounded-md border border-primary px-3 py-2 text-center text-primary transition hover:bg-primary hover:text-white"
              >
                Giỏ hàng
              </button>
            </div>
          </div>
        )}
    </header>
  );
};

export default Header;

