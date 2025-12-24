import { useEffect } from 'react';
import { FiArrowLeft, FiCheck, FiGlobe, FiAward, FiUsers, FiTrendingUp, FiShield, FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ServiceAuction = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Đấu giá & Đối tác | Minh Yên Watch';
  }, []);

  const benefits = [
    'Kết nối trực tiếp với Antiquorum và các nhà đấu giá hàng đầu thế giới',
    'Hỗ trợ đấu giá cho các phiên bản hiếm, độc quyền, limited edition',
    'Tư vấn chuyên sâu về giá trị và xu hướng thị trường quốc tế',
    'Xử lý toàn bộ thủ tục và vận chuyển quốc tế',
    'Bảo đảm tính xác thực và nguồn gốc rõ ràng',
    'Hỗ trợ 24/7 trong suốt quá trình đấu giá'
  ];

  const steps = [
    {
      title: 'Đăng ký & Tư vấn',
      description: 'Đăng ký và cung cấp thông tin đồng hồ cần đấu giá. Chúng tôi tư vấn về tiềm năng và giá trị ước tính.',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80'
    },
    {
      title: 'Kiểm định & Đánh giá',
      description: 'Chuyên gia kiểm định và đánh giá giá trị chính xác. Xác minh tính xác thực và nguồn gốc.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
    },
    {
      title: 'Kết nối Đấu giá',
      description: 'Chúng tôi kết nối với các nhà đấu giá phù hợp nhất trên thế giới như Antiquorum, Christie\'s, Sotheby\'s.',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80'
    },
    {
      title: 'Hỗ trợ & Hoàn tất',
      description: 'Theo dõi và hỗ trợ trong suốt phiên đấu giá. Xử lý thủ tục và vận chuyển sau khi đấu giá thành công.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80'
    }
  ];

  const partners = [
    { name: 'Antiquorum', description: 'Nhà đấu giá đồng hồ hàng đầu thế giới' },
    { name: 'Christie\'s', description: 'Nhà đấu giá nghệ thuật và đồng hồ cao cấp' },
    { name: 'Sotheby\'s', description: 'Nhà đấu giá quốc tế danh tiếng' },
    { name: 'Phillips', description: 'Chuyên về đồng hồ hiếm và độc quyền' }
  ];

  const stats = [
    { number: '500+', label: 'Phiên đấu giá thành công' },
    { number: '15+', label: 'Năm kinh nghiệm' },
    { number: '50+', label: 'Đối tác quốc tế' },
    { number: '95%', label: 'Tỷ lệ thành công' }
  ];

  return (
    <section className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&q=80"
          alt="Đấu giá & Đối tác"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-6xl w-full px-4 pb-16 lg:px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/80">Dịch vụ</p>
            <h1 className="mt-2 font-display text-5xl font-semibold text-white">
              Đấu giá & Đối tác
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/90 leading-relaxed">
              Kết nối Antiquorum và các nhà đấu giá quốc tế cho các phiên bản hiếm. Chúng tôi
              mang đến cơ hội sở hữu những chiếc đồng hồ độc nhất vô nhị với giá trị đầu tư cao.
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
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
                alt="Đấu giá quốc tế"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <h2 className="font-display text-3xl font-semibold text-primary mb-4">
                Cửa ngõ vào thế giới đấu giá quốc tế
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Minh Yên Watch tự hào là đối tác tin cậy kết nối khách hàng Việt Nam với các nhà đấu giá
                hàng đầu thế giới như Antiquorum, Christie's, Sotheby's. Chúng tôi hiểu rõ giá trị của
                những chiếc đồng hồ hiếm và độc quyền.
              </p>
              <p className="text-muted leading-relaxed">
                Với mạng lưới đối tác rộng khắp, chúng tôi mang đến cơ hội sở hữu những phiên bản limited
                edition, vintage, và những chiếc đồng hồ có giá trị lịch sử đặc biệt. Đầu tư thông minh
                với tiềm năng tăng giá trị theo thời gian.
              </p>
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
            Lợi ích khi đấu giá qua Minh Yên
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

        {/* Process with Images */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-semibold text-primary mb-8 text-center">
            Quy trình đấu giá
          </h2>
          <div className="space-y-12">
            {steps.map((step, idx) => (
              <div key={idx} className={`grid gap-8 md:grid-cols-2 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={idx % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white">
                      {idx + 1}
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-primary">{step.title}</h3>
                  </div>
                  <p className="text-muted leading-relaxed">{step.description}</p>
                </div>
                <div className={idx % 2 === 1 ? 'md:order-1' : ''}>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-[300px] object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-semibold text-primary mb-8 text-center">
            Đối tác đấu giá quốc tế
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {partners.map((partner, idx) => (
              <div key={idx} className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-soft hover:shadow-lg transition">
                <FiAward className="h-10 w-10 text-accent mx-auto mb-4" />
                <h3 className="font-display text-lg font-semibold text-primary mb-2">{partner.name}</h3>
                <p className="text-xs text-muted">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-soft hover:shadow-lg transition">
            <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <FiGlobe className="h-10 w-10 text-accent" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary mb-3">Quốc tế</h3>
            <p className="text-sm text-muted leading-relaxed">
              Kết nối với các nhà đấu giá hàng đầu thế giới, mở rộng cơ hội sở hữu đồng hồ hiếm.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-soft hover:shadow-lg transition">
            <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <FiAward className="h-10 w-10 text-accent" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary mb-3">Độc quyền</h3>
            <p className="text-sm text-muted leading-relaxed">
              Tiếp cận các phiên bản hiếm, limited edition, và đồng hồ có giá trị lịch sử.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-soft hover:shadow-lg transition">
            <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <FiTrendingUp className="h-10 w-10 text-accent" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary mb-3">Giá trị</h3>
            <p className="text-sm text-muted leading-relaxed">
              Đầu tư thông minh với tiềm năng tăng giá trị theo thời gian, được công nhận quốc tế.
            </p>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-semibold text-primary mb-8 text-center">
            Những chiếc đồng hồ đã được đấu giá thành công
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
                alt="Đồng hồ đấu giá"
                className="w-full h-[250px] object-cover hover:scale-105 transition duration-300"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80"
                alt="Đồng hồ hiếm"
                className="w-full h-[250px] object-cover hover:scale-105 transition duration-300"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"
                alt="Đồng hồ cổ"
                className="w-full h-[250px] object-cover hover:scale-105 transition duration-300"
              />
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="font-display text-3xl font-semibold text-primary mb-4">
              Muốn tham gia đấu giá?
            </h3>
            <p className="text-muted max-w-2xl mx-auto">
              Liên hệ ngay với chúng tôi để được tư vấn về các phiên đấu giá sắp tới và cơ hội sở hữu những chiếc đồng hồ độc nhất.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-white/80">
              <FiUsers className="h-8 w-8 text-accent mx-auto mb-3" />
              <h4 className="font-semibold text-primary mb-2">Hotline miền Bắc</h4>
              <a href="tel:0852458888" className="text-xl font-bold text-primary hover:underline">
                0852458888
              </a>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/80">
              <FiUsers className="h-8 w-8 text-accent mx-auto mb-3" />
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

export default ServiceAuction;
