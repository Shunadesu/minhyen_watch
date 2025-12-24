import { useEffect } from 'react';
import { FiArrowLeft, FiCheck, FiTool, FiShield, FiRefreshCw, FiDroplet } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ServiceWarranty = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Hậu mãi & Bảo hành | Minh Yên Watch';
  }, []);

  const benefits = [
    'Kiểm định chính hãng, đảm bảo tính xác thực',
    'Bảo dưỡng định kỳ theo tiêu chuẩn nhà sản xuất',
    'Làm mới dây đeo, thay pin, bảo dưỡng máy',
    'Chống nước chuyên nghiệp, đảm bảo độ bền',
    'Bảo hành chuẩn hãng với giấy tờ đầy đủ',
    'Hỗ trợ bảo hành quốc tế cho các thương hiệu cao cấp'
  ];

  const services = [
    'Kiểm định và xác thực đồng hồ',
    'Bảo dưỡng máy và làm sạch',
    'Thay pin và kiểm tra độ chính xác',
    'Làm mới dây đeo (da, kim loại, cao su)',
    'Chống nước và kiểm tra độ kín',
    'Sửa chữa các lỗi cơ bản',
    'Bảo hành và bảo trì định kỳ'
  ];

  return (
    <section className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200&q=80"
          alt="Hậu mãi & Bảo hành"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-6xl w-full px-4 pb-12 lg:px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/80">Dịch vụ</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-white">
              Hậu mãi & Bảo hành
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-white/90">
              Kiểm định, bảo dưỡng, làm mới dây, chống nước và bảo hành chuẩn hãng. Chúng tôi chăm
              sóc chiếc đồng hồ của bạn như chính chúng tôi đã tạo ra nó.
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

        {/* Services */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-semibold text-primary mb-6">Dịch vụ cung cấp</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-3 rounded-xl border border-gray-100 bg-white p-4 shadow-soft"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <FiCheck className="h-4 w-4 text-accent" />
                </div>
                <p className="text-sm text-muted">{service}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-soft">
            <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <FiTool className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-display text-lg font-semibold text-primary">Chuyên nghiệp</h3>
            <p className="mt-2 text-sm text-muted">
              Đội ngũ kỹ thuật viên được đào tạo chuyên sâu
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-soft">
            <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <FiShield className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-display text-lg font-semibold text-primary">Bảo hành</h3>
            <p className="mt-2 text-sm text-muted">Bảo hành chuẩn hãng với giấy tờ đầy đủ</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-soft">
            <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <FiRefreshCw className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-display text-lg font-semibold text-primary">Định kỳ</h3>
            <p className="mt-2 text-sm text-muted">Bảo dưỡng định kỳ để đồng hồ luôn hoạt động tốt</p>
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

export default ServiceWarranty;

