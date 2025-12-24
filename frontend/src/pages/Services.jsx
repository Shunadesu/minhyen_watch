import { useEffect } from 'react';
import Services from '../components/Services';

const ServicesPage = () => {
  useEffect(() => {
    document.title = 'Dịch vụ | Minh Yên Watch';
  }, []);

  return (
    <main className="pt-28 bg-white min-h-screen">
      <div className="mx-auto max-w-6xl px-4 pt-6 lg:px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Dịch vụ</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-primary">
          Dịch vụ chăm sóc đồng hồ cao cấp
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Thu mua, ký gửi, đấu giá và hậu mãi cho những chiếc đồng hồ giá trị – toàn bộ nằm trong
          một hệ sinh thái dịch vụ trọn vẹn.
        </p>
      </div>
      <Services />
    </main>
  );
};

export default ServicesPage;


