import { useEffect } from 'react';
import { FiArrowLeft, FiCheck, FiDollarSign, FiShield, FiClock, FiLock, FiTruck, FiUser, FiFileText } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ServiceBuySell = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Thu mua & Ký gửi | Minh Yên Watch';
  }, []);

  const benefits = [
    'Định giá minh bạch, công khai theo thị trường quốc tế',
    'Quy trình nhanh chóng, thanh toán ngay trong ngày',
    'Bảo mật thông tin khách hàng tuyệt đối',
    'Hỗ trợ vận chuyển toàn quốc miễn phí',
    'Tư vấn chuyên nghiệp bởi đội ngũ chuyên gia',
    'Cam kết giá tốt nhất thị trường, không qua trung gian'
  ];

  const steps = [
    {
      title: 'Tiếp nhận',
      description: 'Liên hệ hotline hoặc đến trực tiếp cửa hàng. Chúng tôi tiếp nhận mọi loại đồng hồ từ cao cấp đến cổ điển.',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80'
    },
    {
      title: 'Thẩm định',
      description: 'Nhân viên chuyên nghiệp kiểm định và định giá đồng hồ dựa trên tình trạng, xuất xứ, và giá trị thị trường.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
    },
    {
      title: 'Thống nhất',
      description: 'Thống nhất giá cả và phương thức thanh toán. Chúng tôi đảm bảo minh bạch và công bằng cho cả hai bên.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80'
    },
    {
      title: 'Hoàn tất',
      description: 'Hoàn tất thủ tục và nhận tiền ngay. Hỗ trợ vận chuyển an toàn nếu khách hàng ở xa.',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Đồng hồ đã thu mua' },
    { number: '98%', label: 'Khách hàng hài lòng' },
    { number: '24h', label: 'Thời gian xử lý' },
    { number: '3', label: 'Chi nhánh trên toàn quốc' }
  ];

  const faqs = [
    {
      question: 'Minh Yên thu mua những loại đồng hồ nào?',
      answer: 'Chúng tôi thu mua tất cả các thương hiệu đồng hồ cao cấp như Rolex, Patek Philippe, Audemars Piguet, Omega, Cartier, và nhiều thương hiệu khác. Cả đồng hồ mới và đồng hồ đã qua sử dụng.'
    },
    {
      question: 'Quy trình định giá như thế nào?',
      answer: 'Chúng tôi kiểm tra tình trạng đồng hồ, xuất xứ, giấy tờ, và so sánh với giá thị trường quốc tế để đưa ra mức giá công bằng và minh bạch nhất.'
    },
    {
      question: 'Có thể thu mua tại nhà không?',
      answer: 'Có, chúng tôi hỗ trợ dịch vụ thu mua tại nhà cho khách hàng ở Hà Nội, TP.HCM và Đà Nẵng. Liên hệ hotline để đặt lịch hẹn.'
    },
    {
      question: 'Thanh toán bằng hình thức nào?',
      answer: 'Chúng tôi hỗ trợ thanh toán bằng tiền mặt, chuyển khoản ngân hàng, hoặc séc. Thanh toán ngay sau khi thống nhất giá.'
    }
  ];

  return (
    <section className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80"
          alt="Thu mua & Ký gửi đồng hồ"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-6xl w-full px-4 pb-16 lg:px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/80">Dịch vụ</p>
            <h1 className="mt-2 font-display text-5xl font-semibold text-white">
              Thu mua & Ký gửi
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/90 leading-relaxed">
              Định giá minh bạch, quy trình nhanh, bảo mật thông tin khách hàng. Chúng tôi cam kết
              mang lại giá trị tốt nhất cho chiếc đồng hồ của bạn với đội ngũ chuyên gia giàu kinh nghiệm.
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
                Dịch vụ thu mua đồng hồ chuyên nghiệp
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Với hơn 10 năm kinh nghiệm trong ngành đồng hồ cao cấp, Minh Yên Watch tự hào là đối tác
                tin cậy cho việc thu mua và ký gửi đồng hồ. Chúng tôi hiểu rõ giá trị của từng chiếc đồng hồ
                và cam kết mang lại mức giá tốt nhất trên thị trường.
              </p>
              <p className="text-muted leading-relaxed">
                Đội ngũ chuyên gia của chúng tôi được đào tạo bài bản, có kinh nghiệm sâu về các thương hiệu
                cao cấp và xu hướng thị trường. Chúng tôi không chỉ đơn thuần là người mua, mà còn là người
                tư vấn giúp bạn hiểu rõ giá trị thực sự của chiếc đồng hồ.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80"
                alt="Thu mua đồng hồ"
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
            Tại sao chọn Minh Yên?
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
            Quy trình thu mua
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

        {/* Features Grid */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-soft hover:shadow-lg transition">
            <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <FiDollarSign className="h-10 w-10 text-accent" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary mb-3">Giá tốt nhất</h3>
            <p className="text-sm text-muted leading-relaxed">
              Định giá theo thị trường quốc tế, cam kết giá tốt nhất. Không qua trung gian, giá trị thực tế.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-soft hover:shadow-lg transition">
            <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <FiClock className="h-10 w-10 text-accent" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary mb-3">Nhanh chóng</h3>
            <p className="text-sm text-muted leading-relaxed">
              Thanh toán ngay trong ngày, không chờ đợi. Quy trình đơn giản, thủ tục nhanh gọn.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-soft hover:shadow-lg transition">
            <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <FiLock className="h-10 w-10 text-accent" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary mb-3">Bảo mật</h3>
            <p className="text-sm text-muted leading-relaxed">
              Thông tin khách hàng được bảo mật tuyệt đối. Hợp đồng rõ ràng, minh bạch.
            </p>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-semibold text-primary mb-8 text-center">
            Không gian làm việc chuyên nghiệp
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
                alt="Showroom"
                className="w-full h-[250px] object-cover hover:scale-105 transition duration-300"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80"
                alt="Kiểm định"
                className="w-full h-[250px] object-cover hover:scale-105 transition duration-300"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80"
                alt="Đồng hồ"
                className="w-full h-[250px] object-cover hover:scale-105 transition duration-300"
              />
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-semibold text-primary mb-8 text-center">
            Câu hỏi thường gặp
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-gray-100 bg-white p-6 shadow-soft">
                <h3 className="font-display text-lg font-semibold text-primary mb-2">{faq.question}</h3>
                <p className="text-sm text-muted leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="font-display text-3xl font-semibold text-primary mb-4">
              Sẵn sàng bán đồng hồ của bạn?
            </h3>
            <p className="text-muted max-w-2xl mx-auto">
              Liên hệ ngay với chúng tôi để được tư vấn miễn phí và nhận báo giá tốt nhất cho chiếc đồng hồ của bạn.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-white/80">
              <FiUser className="h-8 w-8 text-accent mx-auto mb-3" />
              <h4 className="font-semibold text-primary mb-2">Hotline miền Bắc</h4>
              <a href="tel:0852458888" className="text-xl font-bold text-primary hover:underline">
                0852458888
              </a>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/80">
              <FiUser className="h-8 w-8 text-accent mx-auto mb-3" />
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

export default ServiceBuySell;
