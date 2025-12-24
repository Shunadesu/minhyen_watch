import { useEffect } from 'react';
import { FiArrowLeft, FiCheck, FiSettings, FiTool, FiAward, FiClock, FiZap } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ServiceRepair = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Bảo dưỡng & Sửa chữa | Minh Yên Watch';
  }, []);

  const benefits = [
    'Sửa chữa chuyên sâu cho mọi loại đồng hồ từ cơ bản đến phức tạp',
    'Thay thế linh kiện chính hãng, đảm bảo chất lượng và độ bền',
    'Khôi phục đồng hồ cổ, hiếm về trạng thái ban đầu',
    'Bảo dưỡng máy cơ, thạch anh, tự động theo tiêu chuẩn hãng',
    'Sửa chữa mặt kính, vỏ, núm vặn với độ chính xác cao',
    'Cam kết thời gian hoàn thành nhanh chóng, không để khách chờ đợi'
  ];

  const services = [
    {
      title: 'Sửa chữa Máy',
      description: 'Sửa chữa máy đồng hồ (cơ, tự động, thạch anh). Thay thế linh kiện, điều chỉnh độ chính xác.',
      icon: FiSettings,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
    },
    {
      title: 'Thay Linh kiện',
      description: 'Thay thế linh kiện chính hãng. Đảm bảo chất lượng và tương thích hoàn hảo.',
      icon: FiTool,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
    },
    {
      title: 'Khôi phục Cổ',
      description: 'Khôi phục đồng hồ cổ, hiếm về trạng thái ban đầu. Phục hồi giá trị lịch sử.',
      icon: FiAward,
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80'
    },
    {
      title: 'Sửa Vỏ & Mặt',
      description: 'Sửa chữa mặt kính, vỏ, núm vặn. Đánh bóng và làm mới bề mặt.',
      icon: FiZap,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80'
    }
  ];

  const repairTypes = [
    {
      type: 'Sửa chữa cơ bản',
      time: '1-3 ngày',
      price: 'Từ 500,000đ',
      includes: 'Thay pin, điều chỉnh, làm sạch'
    },
    {
      type: 'Sửa chữa trung bình',
      time: '3-7 ngày',
      price: 'Từ 2,000,000đ',
      includes: 'Thay linh kiện, sửa máy, bảo dưỡng'
    },
    {
      type: 'Sửa chữa phức tạp',
      time: '7-14 ngày',
      price: 'Từ 5,000,000đ',
      includes: 'Khôi phục, thay máy, phục hồi toàn bộ'
    }
  ];

  const stats = [
    { number: '30,000+', label: 'Đồng hồ đã sửa chữa' },
    { number: '98%', label: 'Tỷ lệ thành công' },
    { number: '100%', label: 'Linh kiện chính hãng' },
    { number: '15+', label: 'Năm kinh nghiệm' }
  ];

  return (
    <section className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
          alt="Bảo dưỡng & Sửa chữa"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-6xl w-full px-4 pb-16 lg:px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/80">Dịch vụ</p>
            <h1 className="mt-2 font-display text-5xl font-semibold text-white">
              Bảo dưỡng & Sửa chữa
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/90 leading-relaxed">
              Sửa chữa chuyên sâu, thay thế linh kiện chính hãng, khôi phục đồng hồ cổ. Chúng tôi
              mang lại sự sống mới cho chiếc đồng hồ của bạn với đội ngũ kỹ thuật viên lành nghề.
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
                alt="Sửa chữa đồng hồ"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <h2 className="font-display text-3xl font-semibold text-primary mb-4">
                Xưởng sửa chữa chuyên nghiệp hàng đầu
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Với hơn 15 năm kinh nghiệm trong lĩnh vực sửa chữa đồng hồ cao cấp, Minh Yên Watch
                tự hào có đội ngũ kỹ thuật viên được đào tạo bài bản và có chứng chỉ quốc tế. Chúng tôi
                chuyên sửa chữa mọi loại đồng hồ từ Rolex, Patek Philippe đến các thương hiệu cổ điển.
              </p>
              <p className="text-muted leading-relaxed">
                Xưởng của chúng tôi được trang bị đầy đủ thiết bị hiện đại, linh kiện chính hãng từ
                các nhà sản xuất. Từ sửa chữa cơ bản đến khôi phục đồng hồ cổ - chúng tôi đảm bảo
                chất lượng và độ chính xác tuyệt đối.
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
            Tại sao chọn chúng tôi?
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
            Dịch vụ sửa chữa
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

        {/* Repair Types */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-semibold text-primary mb-8 text-center">
            Bảng giá sửa chữa
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {repairTypes.map((repair, idx) => (
              <div key={idx} className="rounded-2xl border border-gray-100 bg-white p-8 shadow-soft hover:shadow-lg transition">
                <h3 className="font-display text-xl font-semibold text-primary mb-4">{repair.type}</h3>
                <div className="mb-4">
                  <p className="text-sm text-muted mb-1">Thời gian:</p>
                  <p className="text-lg font-semibold text-accent">{repair.time}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-muted mb-1">Giá từ:</p>
                  <p className="text-lg font-semibold text-primary">{repair.price}</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Bao gồm:</p>
                  <p className="text-sm text-muted">{repair.includes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-soft hover:shadow-lg transition">
            <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <FiSettings className="h-10 w-10 text-accent" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary mb-3">Chuyên sâu</h3>
            <p className="text-sm text-muted leading-relaxed">
              Sửa chữa mọi loại đồng hồ từ cơ bản đến phức tạp. Kinh nghiệm với hàng nghìn chiếc đồng hồ.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-soft hover:shadow-lg transition">
            <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <FiTool className="h-10 w-10 text-accent" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary mb-3">Chính hãng</h3>
            <p className="text-sm text-muted leading-relaxed">
              Linh kiện thay thế chính hãng, đảm bảo chất lượng. Nhập khẩu trực tiếp từ nhà sản xuất.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-soft hover:shadow-lg transition">
            <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <FiAward className="h-10 w-10 text-accent" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary mb-3">Khôi phục</h3>
            <p className="text-sm text-muted leading-relaxed">
              Khôi phục đồng hồ cổ về trạng thái ban đầu. Phục hồi giá trị lịch sử và thẩm mỹ.
            </p>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-semibold text-primary mb-8 text-center">
            Quy trình sửa chữa chuyên nghiệp
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"
                alt="Kiểm tra"
                className="w-full h-[250px] object-cover hover:scale-105 transition duration-300"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
                alt="Sửa chữa"
                className="w-full h-[250px] object-cover hover:scale-105 transition duration-300"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80"
                alt="Hoàn thành"
                className="w-full h-[250px] object-cover hover:scale-105 transition duration-300"
              />
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="font-display text-3xl font-semibold text-primary mb-4">
              Cần sửa chữa đồng hồ?
            </h3>
            <p className="text-muted max-w-2xl mx-auto">
              Liên hệ ngay với chúng tôi để được tư vấn và báo giá chi tiết. Chúng tôi sẽ kiểm tra và đưa ra phương án sửa chữa phù hợp nhất.
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

export default ServiceRepair;
