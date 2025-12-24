import { useEffect } from 'react';
import { FiCheck, FiMapPin, FiClock, FiDollarSign, FiUsers, FiAward, FiMail } from 'react-icons/fi';

const Recruitment = () => {
  useEffect(() => {
    document.title = 'Tuyển dụng | Minh Yên Watch';
  }, []);

  const benefits = [
    'Môi trường làm việc chuyên nghiệp, hiện đại',
    'Lương thưởng cạnh tranh, hấp dẫn',
    'Cơ hội phát triển nghề nghiệp rộng mở',
    'Được đào tạo chuyên sâu về đồng hồ cao cấp',
    'Bảo hiểm đầy đủ, chế độ phúc lợi tốt',
    'Làm việc với các thương hiệu đồng hồ hàng đầu thế giới'
  ];

  const positions = [
    {
      title: 'Nhân viên Bán hàng',
      location: 'Hà Nội, TP.HCM, Đà Nẵng',
      type: 'Full-time',
      experience: '1-3 năm',
      description: 'Tư vấn và bán hàng đồng hồ cao cấp. Yêu cầu có kinh nghiệm bán hàng, giao tiếp tốt.'
    },
    {
      title: 'Kỹ thuật viên Bảo dưỡng',
      location: 'Hà Nội, TP.HCM',
      type: 'Full-time',
      experience: '3-5 năm',
      description: 'Bảo dưỡng và sửa chữa đồng hồ cao cấp. Yêu cầu có chứng chỉ kỹ thuật, kinh nghiệm với các thương hiệu Rolex, Patek Philippe.'
    },
    {
      title: 'Chuyên viên Kiểm định',
      location: 'Hà Nội',
      type: 'Full-time',
      experience: '5+ năm',
      description: 'Kiểm định và đánh giá giá trị đồng hồ. Yêu cầu kiến thức sâu về đồng hồ, có chứng chỉ quốc tế.'
    },
    {
      title: 'Nhân viên Marketing',
      location: 'Hà Nội',
      type: 'Full-time',
      experience: '2-4 năm',
      description: 'Xây dựng chiến lược marketing, quản lý social media. Yêu cầu có kinh nghiệm digital marketing.'
    }
  ];

  const requirements = [
    'Đam mê với đồng hồ và thời trang cao cấp',
    'Tinh thần trách nhiệm cao, cẩn thận, tỉ mỉ',
    'Kỹ năng giao tiếp tốt, thân thiện',
    'Có khả năng làm việc nhóm và độc lập',
    'Sẵn sàng học hỏi và phát triển bản thân'
  ];

  return (
    <section className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80"
          alt="Tuyển dụng"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-6xl w-full px-4 pb-12 lg:px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/80">Tuyển dụng</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-white">
              Gia nhập đội ngũ Minh Yên Watch
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-white/90">
              Cơ hội phát triển nghề nghiệp trong môi trường chuyên nghiệp, làm việc với những thương hiệu
              đồng hồ hàng đầu thế giới.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
        {/* Intro */}
        <div className="mb-16 text-center">
          <h2 className="font-display text-3xl font-semibold text-primary mb-4">
            Tại sao chọn Minh Yên Watch?
          </h2>
          <p className="text-muted max-w-3xl mx-auto leading-relaxed">
            Minh Yên Watch là đối tác chính thức với các nhà đấu giá quốc tế, chuyên về đồng hồ cao cấp.
            Chúng tôi tìm kiếm những cá nhân đam mê, tài năng để cùng phát triển và mang đến trải nghiệm
            tốt nhất cho khách hàng.
          </p>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-semibold text-primary mb-8 text-center">
            Quyền lợi
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 rounded-xl border border-gray-100 bg-white p-6 shadow-soft"
              >
                <FiCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                <p className="text-sm text-muted leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-semibold text-primary mb-8 text-center">
            Vị trí đang tuyển
          </h2>
          <div className="space-y-6">
            {positions.map((position, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-soft hover:shadow-lg transition"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-primary mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted">
                      <div className="flex items-center space-x-1">
                        <FiMapPin className="h-4 w-4" />
                        <span>{position.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiClock className="h-4 w-4" />
                        <span>{position.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiUsers className="h-4 w-4" />
                        <span>Kinh nghiệm: {position.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted mb-4 leading-relaxed">{position.description}</p>
                <a
                  href="mailto:hr@minhyenluxury.com?subject=Ứng tuyển - Nhân viên Bán hàng"
                  className="inline-flex items-center space-x-2 text-sm font-semibold text-accent hover:text-primary transition"
                >
                  <FiMail className="h-4 w-4" />
                  <span>Ứng tuyển ngay</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-semibold text-primary mb-6 text-center">
            Yêu cầu chung
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="grid gap-4 md:grid-cols-2">
              {requirements.map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 rounded-xl border border-gray-100 bg-white p-4 shadow-soft"
                >
                  <FiCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                  <p className="text-sm text-muted">{req}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How to Apply */}
        <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="font-display text-3xl font-semibold text-primary mb-4">
              Cách thức ứng tuyển
            </h3>
            <p className="text-muted max-w-2xl mx-auto">
              Gửi CV và thư xin việc đến email của chúng tôi. Chúng tôi sẽ liên hệ lại trong vòng 7 ngày làm việc.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-white/80">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 mx-auto mb-4">
                <span className="text-xl font-bold text-accent">1</span>
              </div>
              <h4 className="font-semibold text-primary mb-2">Gửi CV</h4>
              <p className="text-xs text-muted">Gửi CV và thư xin việc qua email</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/80">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 mx-auto mb-4">
                <span className="text-xl font-bold text-accent">2</span>
              </div>
              <h4 className="font-semibold text-primary mb-2">Phỏng vấn</h4>
              <p className="text-xs text-muted">Chúng tôi sẽ liên hệ để phỏng vấn</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/80">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 mx-auto mb-4">
                <span className="text-xl font-bold text-accent">3</span>
              </div>
              <h4 className="font-semibold text-primary mb-2">Gia nhập</h4>
              <p className="text-xs text-muted">Chào mừng đến với đội ngũ Minh Yên</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <a
              href="mailto:hr@minhyenluxury.com?subject=Ứng tuyển - Minh Yên Watch"
              className="inline-flex items-center space-x-2 rounded-lg bg-primary px-6 py-3 text-white font-semibold hover:bg-primary/90 transition"
            >
              <FiMail className="h-5 w-5" />
              <span>Gửi CV ngay</span>
            </a>
            <p className="mt-4 text-sm text-muted">
              Email: <a href="mailto:hr@minhyenluxury.com" className="font-semibold text-primary hover:underline">hr@minhyenluxury.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recruitment;

