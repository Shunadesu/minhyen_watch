import { useEffect } from 'react';
import { FiArrowLeft, FiCheck, FiGlobe, FiAward, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ServiceAuction = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Đấu giá & Đối tác | Minh Yên Watch';
  }, []);

  const benefits = [
    'Kết nối với Antiquorum và các nhà đấu giá quốc tế',
    'Hỗ trợ đấu giá cho các phiên bản hiếm, độc quyền',
    'Tư vấn chuyên sâu về giá trị và xu hướng thị trường',
    'Xử lý thủ tục và vận chuyển quốc tế',
    'Bảo đảm tính xác thực và nguồn gốc',
    'Hỗ trợ 24/7 trong suốt quá trình đấu giá'
  ];

  const steps = [
    'Đăng ký và cung cấp thông tin đồng hồ cần đấu giá',
    'Chuyên gia kiểm định và đánh giá giá trị',
    'Chúng tôi kết nối với các nhà đấu giá phù hợp',
    'Theo dõi và hỗ trợ trong suốt phiên đấu giá',
    'Xử lý thủ tục và vận chuyển sau khi đấu giá thành công'
  ];

  return (
    <section className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&q=80"
          alt="Đấu giá & Đối tác"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-6xl w-full px-4 pb-12 lg:px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/80">Dịch vụ</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-white">
              Đấu giá & Đối tác
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-white/90">
              Kết nối Antiquorum và các nhà đấu giá quốc tế cho các phiên bản hiếm. Chúng tôi
              mang đến cơ hội sở hữu những chiếc đồng hồ độc nhất vô nhị.
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
              <FiGlobe className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-display text-lg font-semibold text-primary">Quốc tế</h3>
            <p className="mt-2 text-sm text-muted">
              Kết nối với các nhà đấu giá hàng đầu thế giới
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-soft">
            <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <FiAward className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-display text-lg font-semibold text-primary">Độc quyền</h3>
            <p className="mt-2 text-sm text-muted">Tiếp cận các phiên bản hiếm, độc nhất</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-soft">
            <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <FiTrendingUp className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-display text-lg font-semibold text-primary">Giá trị</h3>
            <p className="mt-2 text-sm text-muted">Đầu tư thông minh với tiềm năng tăng giá</p>
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

export default ServiceAuction;

