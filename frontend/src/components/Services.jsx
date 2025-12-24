import { FiShoppingBag, FiSend, FiShield, FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const services = [
  {
    icon: FiShoppingBag,
    title: 'Thu mua & ký gửi',
    description: 'Định giá minh bạch, quy trình nhanh, bảo mật thông tin khách hàng.',
    link: '/dichvu/thu-mua-ky-gui'
  },
  {
    icon: FiSend,
    title: 'Đấu giá & đối tác',
    description: 'Kết nối Antiquorum và các nhà đấu giá quốc tế cho các phiên bản hiếm.',
    link: '/dichvu/dau-gia-doi-tac'
  },
  {
    icon: FiShield,
    title: 'Hậu mãi & bảo hành',
    description: 'Kiểm định, bảo dưỡng, làm mới dây, chống nước và bảo hành chuẩn hãng.',
    link: '/dichvu/hau-mai-bao-hanh'
  },
  {
    icon: FiSettings,
    title: 'Bảo dưỡng & sửa chữa',
    description: 'Sửa chữa chuyên sâu, thay thế linh kiện chính hãng, khôi phục đồng hồ cổ.',
    link: '/dichvu/bao-duong-sua-chua'
  }
];

const Services = () => {
  return (
    <section id="services" className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Dịch vụ</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-primary">
            Chăm sóc trọn vòng đời
          </h2>
          <p className="mt-3 text-sm text-muted">
            Đáp ứng cả nhu cầu sưu tầm, trao đổi và hậu mãi cho đồng hồ cao cấp.
          </p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <motion.div
              key={service.title}
              className="group rounded-2xl border border-gray-100 bg-white p-6 transition hover:-translate-y-1"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                <service.icon size={22} />
              </div>
              <h3 className="font-display text-xl font-semibold text-primary">{service.title}</h3>
              <p className="mt-3 text-sm text-muted">{service.description}</p>
              <Link
                to={service.link}
                className="mt-4 inline-block text-sm font-semibold text-accent transition hover:text-primary"
              >
                Tìm hiểu thêm →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

