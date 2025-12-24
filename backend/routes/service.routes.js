const express = require('express');
const router = express.Router();

// Static service pages (can be moved to DB later)
const services = [
  {
    slug: 'thu-mua-dong-ho',
    title: 'Thu mua đồng hồ',
    description:
      'Thu mua đồng hồ chính hãng giá cạnh tranh, giải ngân nhanh, quy trình minh bạch tại boutique hoặc tại nhà.',
    url: 'https://giabaoluxury.com/thu-mua-dong-ho',
    benefits: [
      'Giá thu mua hấp dẫn, giải ngân nhanh',
      'Quy trình chuyên nghiệp, hợp đồng minh bạch',
      'Đội ngũ chuyên viên giàu kinh nghiệm',
      'Hỗ trợ tại 3 miền, đảm bảo chất lượng phục vụ'
    ],
    steps: ['Tiếp nhận', 'Thẩm định', 'Hợp đồng và giải ngân'],
    hotlineNorth: '0852458888',
    hotlineSouth: '0852458888'
  },
  {
    slug: 'ky-gui-dong-ho',
    title: 'Ký gửi đồng hồ',
    description:
      'Dịch vụ ký gửi đồng hồ chính hãng với mạng lưới khách hàng sưu tầm, hỗ trợ truyền thông và bán nhanh.',
    url: 'https://giabaoluxury.com/ky-gui-dong-ho',
    benefits: [
      'Định giá minh bạch, hợp đồng rõ ràng',
      'Hỗ trợ truyền thông, trưng bày tại boutique',
      'Phí ký gửi cạnh tranh, thời gian linh hoạt'
    ],
    steps: ['Tiếp nhận & định giá', 'Ký hợp đồng ký gửi', 'Bán và thanh toán'],
    hotlineNorth: '0852458888',
    hotlineSouth: '0852458888'
  },
  {
    slug: 'ky-gui-dong-ho-voi-nha-dau-gia',
    title: 'Ký gửi đồng hồ với nhà đấu giá',
    description:
      'Kết nối các nhà đấu giá quốc tế cho các phiên bản hiếm, tối ưu giá bán và tính thanh khoản.',
    url: 'https://giabaoluxury.com/ky-gui-dong-ho-voi-nha-dau-gia',
    benefits: [
      'Tiếp cận nhà đấu giá quốc tế',
      'Tư vấn chọn phiên đấu phù hợp',
      'Quy trình pháp lý, logistics trọn gói'
    ],
    steps: ['Tiếp nhận & chọn phiên đấu', 'Chuẩn bị hồ sơ/ảnh', 'Đấu giá & thanh toán'],
    hotlineNorth: '0852458888',
    hotlineSouth: '0852458888'
  },
  {
    slug: 'gia-bao-certificate-dam-bao-nguon-goc-dong-ho-chinh-hang',
    title: 'Minh Yên Preowned Certificate',
    description:
      'Chứng nhận nguồn gốc đồng hồ chính hãng, bảo vệ người mua bán trên thị trường thứ cấp.',
    url: 'https://giabaoluxury.com/gia-bao-certificate-dam-bao-nguon-goc-dong-ho-chinh-hang',
    benefits: [
      'Kiểm định nguồn gốc, tình trạng',
      'Chứng thư minh bạch, tăng giá trị bán lại',
      'Đội ngũ kỹ thuật chuyên nghiệp'
    ],
    steps: ['Tiếp nhận & kiểm định', 'Cấp chứng nhận', 'Bàn giao & tư vấn bảo dưỡng'],
    hotlineNorth: '0852458888',
    hotlineSouth: '0852458888'
  }
];

router.get('/', (req, res) => {
  res.json({ success: true, data: services.map(({ steps, benefits, ...rest }) => rest) });
});

router.get('/:slug', (req, res) => {
  const service = services.find((s) => s.slug === req.params.slug);
  if (!service) {
    return res.status(404).json({ success: false, message: 'Service not found' });
  }
  res.json({ success: true, data: service });
});

module.exports = router;

