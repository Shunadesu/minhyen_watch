import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { FiFacebook, FiInstagram } from 'react-icons/fi';
import Header from './components/Header';
import QuickOrderModal from './components/QuickOrderModal';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import ProductsPage from './pages/Products';
import CategoriesPage from './pages/Categories';
import BrandsPage from './pages/Brands';
import ServicesPage from './pages/Services';
import BlogPage from './pages/Blog';
import AboutPage from './pages/About';
import ServiceDetail from './pages/ServiceDetail';
import ProductDetail from './pages/ProductDetail';
import BlogDetail from './pages/BlogDetail';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';

const Footer = () => (
  <footer className="bg-primary text-white">
    <div className="mx-auto max-w-6xl px-4 py-6 lg:px-6 lg:py-10">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <h4 className="font-display text-xl font-semibold">Minh Yên Watch</h4>
          <p className="mt-3 text-sm text-white/80">
            Đối tác chính thức với các nhà đấu giá quốc tế. Cam kết chính hãng và trải nghiệm dịch vụ
            cao cấp.
          </p>
        </div>
        <div>
          <h5 className="text-sm font-semibold uppercase tracking-wide text-white/80">Hotline</h5>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>Hotline: 0852458888</li>
            <li>Hỗ trợ: 0852458888</li>
          </ul>
        </div>
        <div>
          <h5 className="text-sm font-semibold uppercase tracking-wide text-white/80">Chi nhánh</h5>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>Hà Nội: 7 Nghi Tàm, Tây Hồ</li>
            <li>Đà Nẵng: 55 Đống Đa, Hải Châu</li>
            <li>TP.HCM: 164 Trần Hưng Đạo, Quận 1</li>
          </ul>
        </div>
        <div>
          <h5 className="text-sm font-semibold uppercase tracking-wide text-white/80">Kết nối</h5>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>Email: info@giabaoluxury.com</li>
            <li>Giờ mở cửa: 9h - 18h (T2 - T6)</li>
            <li>9h - 14h (T7) / 9h - 19h (CN HCM)</li>
          </ul>
          <div className="mt-4 flex items-center space-x-3 text-white/80">
            <a
              href="https://www.facebook.com/share/1Ejdxmccd3/?mibextid=wwXIfr"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <FiFacebook />
            </a>
            <a
              href="#"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <FiInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/60">
        © 2025 Minh Yên Watch. Tất cả quyền được bảo lưu.
      </div>
    </div>
  </footer>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative min-h-screen bg-white">
        <Header />
        <QuickOrderModal />
        <CartDrawer />
        <main className="pt-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/dichvu/:slug" element={<ServiceDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

