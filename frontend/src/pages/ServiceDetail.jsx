import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { servicesAPI } from '../api/services';
import { FiArrowLeft } from 'react-icons/fi';

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Dịch vụ | Minh Yên Watch';
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await servicesAPI.getBySlug(slug);
        // Xử lý rate limit
        if (res.isRateLimit) {
          setError('Quá nhiều requests, vui lòng thử lại sau vài giây');
          return;
        }
        if (!res.success) throw new Error(res.message || 'Không thể tải dịch vụ');
        setData(res.data);
      } catch (err) {
        setError(err.message || 'Đã có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  return (
    <section className="min-h-screen bg-white pt-24">
      <div className="mx-auto max-w-5xl px-4 pb-12 lg:px-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center space-x-2 text-sm text-primary hover:text-primary/80"
        >
          <FiArrowLeft />
          <span>Quay lại</span>
        </button>

        {loading && <p className="text-sm text-muted">Đang tải dịch vụ...</p>}
        {error && !loading && <p className="text-sm text-red-500">{error}</p>}

        {data && !loading && !error && (
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Dịch vụ</p>
              <h1 className="mt-2 font-display text-3xl font-semibold text-primary">{data.title}</h1>
              <p className="mt-3 max-w-3xl text-sm text-muted">{data.description}</p>
            </div>

            {data.benefits && data.benefits.length > 0 && (
              <div>
                <h3 className="font-display text-xl font-semibold text-primary">Lợi ích</h3>
                <ul className="mt-3 grid gap-3 md:grid-cols-2">
                  {data.benefits.map((item) => (
                    <li
                      key={item}
                      className="rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm text-muted shadow-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data.steps && data.steps.length > 0 && (
              <div>
                <h3 className="font-display text-xl font-semibold text-primary">Quy trình</h3>
                <ol className="mt-3 space-y-2 text-sm text-muted">
                  {data.steps.map((step, idx) => (
                    <li key={step} className="flex items-start space-x-2">
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {(data.hotlineNorth || data.hotlineSouth) && (
              <div className="rounded-2xl border border-gray-100 bg-white p-4 text-sm text-muted">
                {data.hotlineNorth && (
                  <p>
                    Hotline miền Bắc:{' '}
                    <span className="font-semibold text-primary">
                      {data.hotlineNorth || '0852458888'}
                    </span>
                  </p>
                )}
                {data.hotlineSouth && (
                  <p>
                    Hotline miền Nam:{' '}
                    <span className="font-semibold text-primary">
                      {data.hotlineSouth || '0852458888'}
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceDetail;

