import { useEffect } from 'react';
import { FiArrowLeft, FiCheck, FiDollarSign, FiShield, FiClock, FiLock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ServiceBuySell = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Thu mua & Ký gửi | Minh Yên Watch';
  }, []);

  const benefits = [
    'Định giá minh bạch, công khai theo thị trường',
    'Quy trình nhanh chóng, thanh toán ngay trong ngày',
    'Bảo mật thông tin khách hàng tuyệt đối',
    'Hỗ trợ vận chuyển toàn quốc miễn phí',
    'Tư vấn chuyên nghiệp, tận tâm',
    'Cam kết giá tốt nhất thị trường'
  ];

  const steps = [
    'Liên hệ hotline hoặc đến trực tiếp cửa hàng',
    'Nhân viên kiểm định và định giá đồng hồ',
    'Thống nhất giá cả và phương thức thanh toán',
    'Hoàn tất thủ tục và nhận tiền ngay',
    'Hỗ trợ vận chuyển nếu cần'
  ];

  return (
    <section className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80"
          alt="Thu mua & Ký gửi đồng hồ"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-6xl w-full px-4 pb-12 lg:px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/80">Dịch vụ</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-white">
              Thu mua & Ký gửi
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-white/90">
              Định giá minh bạch, quy trình nhanh, bảo mật thông tin khách hàng. Chúng tôi cam kết
              mang lại giá trị tốt nhất cho chiếc đồng hồ của bạn.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 lg:px-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center space-x-2 text-sm text-primary hover:text-primary/80"
        >
          <FiArrowLeft />
          <span>Quay lại</span>
        </button>

        {/* Benefits */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-semibold text-primary mb-6">Lợi ích</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 rounded-xl border border-gray-100 bg-white p-4 shadow-soft"
              >
                <FiCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                <p className="text-sm text-muted">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-semibold text-primary mb-6">Quy trình</h2>
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  {idx + 1}
                </div>
                <div className="flex-1 rounded-xl border border-gray-100 bg-white p-4 shadow-soft">
                  <p className="text-sm text-muted">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-soft">
            <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <FiDollarSign className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-display text-lg font-semibold text-primary">Giá tốt nhất</h3>
            <p className="mt-2 text-sm text-muted">
              Định giá theo thị trường, cam kết giá tốt nhất
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-soft">
            <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <FiClock className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-display text-lg font-semibold text-primary">Nhanh chóng</h3>
            <p className="mt-2 text-sm text-muted">Thanh toán ngay trong ngày, không chờ đợi</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-soft">
            <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <FiLock className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-display text-lg font-semibold text-primary">Bảo mật</h3>
            <p className="mt-2 text-muted">Thông tin khách hàng được bảo mật tuyệt đối</p>
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
          <h3 className="font-display text-xl font-semibold text-primary mb-4">Liên hệ ngay</h3>
          <div className="space-y-3 text-sm text-muted">
            <p>
              Hotline miền Bắc:{' '}
              <a href="tel:0852458888" className="font-semibold text-primary hover:underline">
                0852458888
              </a>
            </p>
            <p>
              Hotline miền Nam:{' '}
              <a href="tel:0852458888" className="font-semibold text-primary hover:underline">
                0852458888
              </a>
            </p>
            <p className="pt-2 text-xs">
              Thời gian làm việc: 9h - 18h (T2-T6) | 9h - 14h (T7) | 9h - 19h (CN - HCM)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceBuySell;

