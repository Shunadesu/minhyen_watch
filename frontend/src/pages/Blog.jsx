import { useEffect } from 'react';
import BlogPreview from '../components/BlogPreview';

const BlogPage = () => {
  useEffect(() => {
    document.title = 'Blog | Minh Yên Watch';
  }, []);

  return (
    <main className="pt-28 bg-white min-h-screen">
      <div className="mx-auto max-w-6xl px-4 pt-6 lg:px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Blog & Tin tức</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-primary">
          Góc nhìn từ Minh Yên Watch
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Các bài viết phân tích, review và tin tức mới nhất về đồng hồ độc lập, đấu giá và xu hướng
          sưu tầm.
        </p>
      </div>
      <BlogPreview limit={null} showViewAll={false} />
    </main>
  );
};

export default BlogPage;


