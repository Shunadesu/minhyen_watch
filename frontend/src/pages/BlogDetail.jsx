import { useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { blogPosts } from '../data/blogPosts';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const post = useMemo(() => blogPosts.find((item) => item.slug === slug), [slug]);
  const relatedPosts = useMemo(
    () => blogPosts.filter((item) => item.slug !== slug).slice(0, 3),
    [slug]
  );

  useEffect(() => {
    document.title = post ? `${post.title} | Minh Yên Watch` : 'Bài viết | Minh Yên Watch';
  }, [post]);

  if (!post) {
    return (
      <section className="min-h-screen bg-white pt-24">
        <div className="mx-auto max-w-4xl px-4 pb-12 lg:px-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center space-x-2 text-sm text-primary hover:text-primary/80"
          >
            <FiArrowLeft />
            <span>Quay lại</span>
          </button>
          <h1 className="font-display text-2xl font-semibold text-primary">Bài viết không tồn tại</h1>
          <p className="mt-3 text-sm text-muted">
            Liên kết có thể đã thay đổi. Vui lòng quay lại trang Blog để xem các bài viết mới nhất.
          </p>
          <Link
            to="/blog"
            className="mt-4 inline-flex text-sm font-semibold text-accent transition hover:text-primary"
          >
            Về trang Blog →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white pt-24">
      <div className="mx-auto max-w-4xl px-4 pb-12 lg:px-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center space-x-2 text-sm text-primary hover:text-primary/80"
        >
          <FiArrowLeft />
          <span>Quay lại</span>
        </button>

        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">{post.category}</p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-primary">{post.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted">
              <span>{post.date}</span>
              <span className="h-px w-6 bg-gray-200" />
              <span>{post.readTime}</span>
              <span className="h-px w-6 bg-gray-200" />
              <span>Tác giả: {post.author}</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-soft">
            <img src={post.image} alt={post.title} className="h-[320px] w-full object-cover" />
          </div>

          <div className="prose prose-lg max-w-none text-muted prose-headings:text-primary prose-a:text-accent">
            {post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {post.gallery && post.gallery.length > 0 && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {post.gallery.map((img) => (
                <div key={img} className="overflow-hidden rounded-2xl shadow-soft">
                  <img
                    src={img}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-10 border-t border-gray-100 pt-8">
            <h3 className="font-display text-xl font-semibold text-primary">Bài viết khác</h3>
            <div className="mt-4 grid gap-5 md:grid-cols-3">
              {relatedPosts.map((item) => (
                <Link
                  to={`/blog/${item.slug}`}
                  key={item.slug}
                  className="group rounded-xl border border-gray-100 bg-white p-4 shadow-soft transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-3 text-xs uppercase tracking-wide text-muted">
                    <span>{item.category}</span> • <span>{item.date}</span>
                  </div>
                  <h4 className="mt-1 font-display text-lg font-semibold text-primary group-hover:text-accent">
                    {item.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogDetail;

