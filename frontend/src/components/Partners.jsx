import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Link } from 'react-router-dom';

const partners = [
  { href: 'https://giabaoluxury.com/antiquorum', src: '//bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_1.jpg?1765974370381' },
  { href: 'https://giabaoluxury.com/dong-ho-de-ban/hermle?sortby=published-desc', src: '//bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_2.jpg?1765974370381' },
  { href: 'https://giabaoluxury.com/day-deo-dong-ho?sortby=published-desc', src: '//bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_3.jpg?1765974370381' },
  { href: 'https://giabaoluxury.com/dong-ho-nam/andersen-geneve?sortby=published-desc', src: '//bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_5.jpg?1765974370381' },
  { href: 'https://giabaoluxury.com/hop-dung-hop-quay-dong-ho/bosphorus-leather?sortby=published-desc', src: '//bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_6.jpg?1765974370381' },
  { href: 'https://giabaoluxury.com/phillips', src: '//bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_7.jpg?1765974370381' },
  { href: 'https://giabaoluxury.com/mot-ngay-thuc-tap-tai-atelier-cung-thuong-hieu-kudoke', src: '//bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_8.jpg?1765974370381' },
  { href: 'https://giabaoluxury.com/dong-ho-nam/tutima-glashutte', src: '//bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_9.jpg?1765974370381' },
  { href: 'https://giabaoluxury.com/dong-ho-nam/nivada', src: '//bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_10.jpg?1765974370381' },
  { href: 'https://giabaoluxury.com/dong-ho-nam/vulcain', src: '//bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_11.jpg?1765974370381' },
  { href: 'https://giabaoluxury.com/dong-ho-nam/laine', src: '//bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_12.jpg?1765974370381' },
  { href: 'https://giabaoluxury.com/dong-ho-nam/schwarz-etienne', src: '//bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_13.jpg?1765974370381' }
];

const Partners = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6 lg:py-12">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-primary">Đối tác</h2>
        </div>
        <div className="mt-6">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={2.2}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 }
            }}
          >
            {partners.map((item) => (
              <SwiperSlide key={item.src}>
                <Link
                  to="/"
                  className="block overflow-hidden rounded-2xl bg-white transition"
                >
                  <img
                    src={item.src}
                    alt="Đối tác"
                    className="h-28 w-full object-contain"
                    loading="lazy"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Partners;


