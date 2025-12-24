import { FiPlay, FiArrowDown } from 'react-icons/fi';
import useQuickOrderStore from '../store/quickOrderStore';
import { motion } from 'framer-motion';

const Hero = () => {
  const { open } = useQuickOrderStore();
  return (
    <section id="home" className="relative isolate h-screen w-full overflow-hidden">
      <video
        id="bgvid"
        className="absolute inset-0 h-full w-full object-cover"
        src="https://cdn.jsdelivr.net/gh/playmakerino/giabao/Kudoke%203.mp4"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="https://cdn.jsdelivr.net/gh/playmakerino/giabao/Kudoke%203.mp4" />
        <source src="https://file.hstatic.net/200000536921/file/tutima-manufakturfilm-video-new_813f8d0efb3648e482b54dc07980f9da.mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/65" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-4 text-white lg:px-6">
        <motion.p
          className="mb-3 text-sm uppercase tracking-[0.25em] text-white/80"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Minh Yên Watch
        </motion.p>

        <motion.h1
          className="max-w-3xl font-display text-4xl font-semibold leading-tight lg:text-5xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
        >
          Biểu tượng thời gian.
          <span className="text-accent"> Đỉnh cao thủ công.</span>
        </motion.h1>

        <motion.p
          className="mt-4 max-w-2xl text-base text-white/85 lg:text-lg"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12 }}
        >
          Bộ sưu tập đồng hồ độc lập, các phiên bản giới hạn và dịch vụ hậu mãi cao cấp được tuyển
          chọn dành riêng cho nhà sưu tầm.
        </motion.p>

        <motion.div
          className="mt-8 flex items-center space-x-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <a
            href="#collections"
            className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-accent/90"
          >
            Khám phá ngay
          </a>
          <button
            onClick={() => open()}
            className="flex items-center space-x-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
          >
            <FiPlay />
            <span>Đặt mua nhanh</span>
          </button>
        </motion.div>

        <motion.div
          className="mt-12 flex items-center space-x-4 text-xs uppercase tracking-widest text-white/80"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex items-center space-x-2">
            <span className="h-px w-8 bg-white/50" />
            <span>Minh Yên x Antiquorum</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-px w-8 bg-white/50" />
            <span>Hơn 10 năm uy tín</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-px w-8 bg-white/50" />
            <span>Hỗ trợ toàn quốc</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 transform"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.38 }}
        >
          <a
            href="#collections"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white hover:-translate-y-0.5"
            aria-label="Scroll down"
          >
            <FiArrowDown size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

