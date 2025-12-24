import { useEffect } from 'react';
import { FiArrowLeft, FiCheck, FiTool, FiShield, FiRefreshCw, FiDroplet, FiAward, FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ServiceWarranty = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Hậu mãi & Bảo hành | Minh Yên Watch';
  }, []);

  const benefits = [
    'Kiểm định chính hãng, đảm bảo tính xác thực 100%',
    'Bảo dưỡng định kỳ theo tiêu chuẩn nhà sản xuất',
    'Làm mới dây đeo, thay pin, bảo dưỡng máy chuyên nghiệp',
    'Chống nước chuyên nghiệp, đảm bảo độ bền lâu dài',
    'Bảo hành chuẩn hãng với giấy tờ đầy đủ',
    'Hỗ trợ bảo hành quốc tế cho các thương hiệu cao cấp'
  ];

  const services = [
    {
      title: 'Kiểm định & Xác thực',
      description: 'Kiểm tra tính xác thực, nguồn gốc và tình trạng đồng hồ. Cấp giấy chứng nhận chính thức.',
      icon: FiShield,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
    },
    {
      title: 'Bảo dưỡng Máy',
      description: 'Làm sạch, bôi trơn và điều chỉnh máy đồng hồ. Đảm bảo độ chính xác và tuổi thọ.',
      icon: FiTool,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
    },
    {
      title: 'Làm mới Dây đeo',
      description: 'Thay thế và làm mới dây đeo (da, kim loại, cao su). Phục hồi vẻ đẹp ban đầu.',
      icon: FiRefreshCw,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80'
    },
    {
      title: 'Chống nước',
      description: 'Kiểm tra và bảo dưỡng độ kín nước. Thay thế gioăng, đảm bảo an toàn khi sử dụng.',
      icon: FiDroplet,
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80'
    }
  ];

  const warrantyTypes = [
    {
      type: 'Bảo hành chính hãng',
      duration: '2-5 năm',
      coverage: 'Lỗi sản xuất, máy móc',
      icon: FiAward
    },
    {
      type: 'Bảo hành dịch vụ',
      duration: '1-2 năm',
      coverage: 'Sửa chữa, bảo dưỡng',
      icon: FiShield
    },
    {
      type: 'Bảo hành quốc tế',
      duration: 'Theo hãng',
      coverage: 'Toàn cầu, mạng lưới chính hãng',
      icon: FiTool
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Đồng hồ đã bảo dưỡng' },
    { number: '99%', label: 'Tỷ lệ hài lòng' },
    { number: '15+', label: 'Năm kinh nghiệm' },
    { number: '100%', label: 'Linh kiện chính hãng' }
  ];

  return (
    <section className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200&q=80"
          alt="Hậu mãi & Bảo hành"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-6xl w-full px-4 pb-16 lg:px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/80">Dịch vụ</p>
            <h1 className="mt-2 font-display text-5xl font-semibold text-white">
              Hậu mãi & Bảo hành
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/90 leading-relaxed">
              Kiểm định, bảo dưỡng, làm mới dây, chống nước và bảo hành chuẩn hãng. Chúng tôi chăm
              sóc chiếc đồng hồ của bạn như chính chúng tôi đã tạo ra nó.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-12 inline-flex items-center space-x-2 text-sm text-primary hover:text-primary/80"
        >
          <FiArrowLeft />
          <span>Quay lại</span>
        </button>

        {/* Intro Section */}
        <div className="mb-16">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold text-primary mb-4">
                Chăm sóc trọn vòng đời cho đồng hồ của bạn
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Một chiếc đồng hồ cao cấp cần được chăm sóc đúng cách để duy trì vẻ đẹp và độ chính xác
                theo thời gian. Minh Yên Watch cung cấp dịch vụ hậu mãi toàn diện với đội ngũ kỹ thuật
                viên được đào tạo chuyên sâu.
              </p>
              <p className="text-muted leading-relaxed">
                Chúng tôi sử dụng linh kiện chính hãng, tuân thủ nghiêm ngặt quy trình bảo dưỡng của
                từng thương hiệu. Từ kiểm định, bảo dưỡng định kỳ, đến sửa chữa phức tạp - chúng tôi
                đảm bảo chiếc đồng hồ của bạn luôn hoạt động hoàn hảo.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                alt="Bảo dưỡng đồng hồ"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-semibold text-primary mb-8 text-center">
            Lợi ích dịch vụ
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-4 rounded-xl border border-gray-100 bg-white p-6 shadow-soft hover:shadow-lg transition"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                    <FiCheck className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services with Images */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-semibold text-primary mb-8 text-center">
            Dịch vụ cung cấp
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service, idx) => (
              <div key={idx} className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-soft hover:shadow-xl transition">
                <div className="relative h-[200px] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm">
                      <service.icon className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-primary mb-3">{service.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warranty Types */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-semibold text-primary mb-8 text-center">
            Các loại bảo hành
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {warrantyTypes.map((warranty, idx) => (
              <div key={idx} className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-soft hover:shadow-lg transition">
                <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
                  <warranty.icon className="h-10 w-10 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary mb-2">{warranty.type}</h3>
                <p className="text-sm font-semibold text-accent mb-3">{warranty.duration}</p>
                <p className="text-xs text-muted">{warranty.coverage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-soft hover:shadow-lg transition">
            <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <FiTool className="h-10 w-10 text-accent" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary mb-3">Chuyên nghiệp</h3>
            <p className="text-sm text-muted leading-relaxed">
              Đội ngũ kỹ thuật viên được đào tạo chuyên sâu, có chứng chỉ quốc tế từ các hãng đồng hồ.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-soft hover:shadow-lg transition">
            <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <FiShield className="h-10 w-10 text-accent" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary mb-3">Bảo hành</h3>
            <p className="text-sm text-muted leading-relaxed">
              Bảo hành chuẩn hãng với giấy tờ đầy đủ. Hỗ trợ bảo hành quốc tế cho các thương hiệu cao cấp.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-soft hover:shadow-lg transition">
            <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <FiRefreshCw className="h-10 w-10 text-accent" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary mb-3">Định kỳ</h3>
            <p className="text-sm text-muted leading-relaxed">
              Bảo dưỡng định kỳ để đồng hồ luôn hoạt động tốt. Nhắc nhở và lịch hẹn tự động.
            </p>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-semibold text-primary mb-8 text-center">
            Xưởng bảo dưỡng chuyên nghiệp
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"
                alt="Xưởng bảo dưỡng"
                className="w-full h-[250px] object-cover hover:scale-105 transition duration-300"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
                alt="Kỹ thuật viên"
                className="w-full h-[250px] object-cover hover:scale-105 transition duration-300"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80"
                alt="Linh kiện"
                className="w-full h-[250px] object-cover hover:scale-105 transition duration-300"
              />
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="font-display text-3xl font-semibold text-primary mb-4">
              Cần bảo dưỡng đồng hồ?
            </h3>
            <p className="text-muted max-w-2xl mx-auto">
              Liên hệ ngay với chúng tôi để đặt lịch hẹn bảo dưỡng hoặc sửa chữa. Chúng tôi sẽ tư vấn và báo giá chi tiết.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-white/80">
              <FiClock className="h-8 w-8 text-accent mx-auto mb-3" />
              <h4 className="font-semibold text-primary mb-2">Hotline miền Bắc</h4>
              <a href="tel:0852458888" className="text-xl font-bold text-primary hover:underline">
                0852458888
              </a>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/80">
              <FiClock className="h-8 w-8 text-accent mx-auto mb-3" />
              <h4 className="font-semibold text-primary mb-2">Hotline miền Nam</h4>
              <a href="tel:0852458888" className="text-xl font-bold text-primary hover:underline">
                0852458888
              </a>
            </div>
          </div>
          <p className="text-center text-xs text-muted mt-6">
            Thời gian làm việc: 9h - 18h (T2-T6) | 9h - 14h (T7) | 9h - 19h (CN - HCM)
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceWarranty;
