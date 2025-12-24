import { motion } from 'framer-motion';

const FeaturedSlider = () => {
  const brands = [
    { title: 'Kudoke', href: '/dong-ho-kudoke-chinh-hang', src: 'https://bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_8.jpg?1708348422809' },
    { title: 'Andersen Geneve', href: '/dong-ho-nam/andersen-geneve', src: 'https://bizweb.dktcdn.net/100/175/988/files/andersen-logo.png?v=1669176280133' },
    { title: 'Laine', href: '/dong-ho-nam/laine', src: 'https://static.wixstatic.com/media/cadc3f_fa98efbb35e1474eb8360ddcd729d741~mv2.jpg/v1/crop/x_33,y_10,w_1017,h_303/fill/w_191,h_57,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/LAINE%20-%20Neuchatel%20-%20Switzerland.jpg' },
    { title: 'Tutima Glashütte', href: '/dong-ho-tutima-chinh-hang', src: 'https://bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_9.jpg?1738589945919' },
    { title: 'Vulcain', href: '/dong-ho-vulcain-chinh-hang', src: 'https://bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_11.jpg?1738589945919' },
    { title: 'Nivada', href: '/dong-ho-nivada-chinh-hang', src: 'https://bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_10.jpg?1738589945919' },
    { title: 'Schwarz Etienne', href: '/dong-ho-schwarz-etienne-chinh-hang', src: 'https://bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_13.jpg?1738589945919' },
    { title: 'Hermle', href: '/dong-ho-de-ban/hermle', src: 'https://bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_2.jpg?1738589945919' }
  ];

  return (
    <section id="brands" className="bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <motion.div
          className="mb-8 flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Thương hiệu</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-primary">
              Thương hiệu
            </h2>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand) => (
            <motion.a
              key={brand.title}
              href={brand.href}
              className="flex h-40 items-center justify-center rounded-2xl bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={brand.src}
                alt={brand.title}
                className="max-h-20 max-w-[75%] object-contain"
                loading="lazy"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSlider;

