import { useEffect } from 'react';

const AboutPage = () => {
  useEffect(() => {
    document.title = 'Về chúng tôi | Minh Yên Watch';
  }, []);

  const highlights = [
    {
      title: 'Boutique & phòng thử nghiệm',
      desc: 'Không gian boutique chuẩn Thụy Sĩ với khu vực thử dây, đo cổ tay, điều chỉnh dây chuyên dụng.',
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80'
    },
    {
      title: 'Dịch vụ hậu mãi',
      desc: 'Đối tác với các kỹ thuật viên đạt chứng nhận để bảo dưỡng, đánh bóng và kiểm tra áp suất nước.',
      image:
        'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1600&q=80'
    },
    {
      title: 'Nguồn hàng minh bạch',
      desc: 'Sản phẩm được kiểm định, lưu trữ hồ sơ provenance và hình ảnh soi kính lúp trước khi bàn giao.',
      image:
        'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80'
    }
  ];

  const milestones = [
    { year: '2018', text: 'Khởi đầu với dịch vụ tìm nguồn độc lập cho nhà sưu tầm tại Việt Nam.' },
    { year: '2021', text: 'Mở boutique đầu tiên tại Hà Nội với khu trải nghiệm vật liệu và dây da.' },
    { year: '2023', text: 'Trở thành đối tác chính thức của các phiên đấu giá quốc tế chọn lọc.' },
    { year: '2025', text: 'Ra mắt nền tảng online minh bạch hóa provenance và bảo hành điện tử.' }
  ];

  const team = [
    {
      name: 'Phòng sản phẩm',
      role: 'Tuyển chọn & kiểm định',
      desc: 'Đánh giá tình trạng, đối chiếu serial, đo sai số và lưu hình ảnh trước khi niêm yết.'
    },
    {
      name: 'Phòng khách hàng',
      role: 'Concierge & hậu mãi',
      desc: 'Tư vấn dây, fit cổ tay, nhắc lịch bảo dưỡng định kỳ, hỗ trợ giao nhận bảo hiểm.'
    },
    {
      name: 'Đối tác kỹ thuật',
      role: 'Service & polishing',
      desc: 'Xử lý đánh bóng hạn chế, thay ron, test áp suất nước và căn chỉnh độ chính xác.'
    }
  ];

  return (
    <section className="min-h-screen bg-white pt-28">
      <div className="mx-auto max-w-6xl px-4 pb-12 lg:px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Về chúng tôi</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-primary">Minh Yên Watch</h1>
        <p className="mt-3 max-w-3xl text-sm text-muted">
          Minh Yên Watch mang trải nghiệm boutique đồng hồ độc lập đến Việt Nam: lựa chọn sản phẩm
          chuẩn provenance, dịch vụ hậu mãi minh bạch và đội ngũ concierge đồng hành cùng nhà sưu
          tầm từ lần mua đầu tiên đến bảo dưỡng định kỳ.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-xl font-semibold text-primary">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-soft">
            <h3 className="font-display text-xl font-semibold text-primary">Hành trình</h3>
            <div className="mt-5 space-y-6">
              {milestones.map((m, idx) => (
                <div key={m.year} className="relative pl-14">
                  {/* timeline line */}
                  {idx !== milestones.length - 1 && (
                    <span className="absolute left-5 top-8 h-full w-px bg-gray-200" aria-hidden />
                  )}
                  <div className="absolute left-2 top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary bg-white text-sm font-semibold text-primary shadow-sm">
                    {m.year}
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-primary/5 p-4 shadow-soft">
                    <p className="text-sm text-muted">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-soft">
            <h3 className="font-display text-xl font-semibold text-primary">Đội ngũ & quy trình</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {team.map((member) => (
                <div key={member.name} className="rounded-xl border border-gray-100 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">{member.role}</p>
                  <h4 className="mt-1 font-semibold text-primary">{member.name}</h4>
                  <p className="mt-2 text-sm text-muted">{member.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-primary/5 p-4 text-sm text-muted">
              <p>
                Quy trình tiếp nhận: kiểm tra ngoại quan, soi kính lúp, chụp ảnh 6 mặt, đo sai số,
                test áp suất nước, lưu hồ sơ provenance và cấp biên nhận điện tử.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;


