import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

const BlogPreview = ({ limit = 3, showViewAll = true }) => {
  const displayedPosts = typeof limit === 'number' ? blogPosts.slice(0, limit) : blogPosts;

  return (
    <section id="blog" className="bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <motion.div
          className="mb-8 flex items-center justify-between"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Blog & Tin tức</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-primary">
              Góc nhìn chuyên gia
            </h2>
          </div>
          {showViewAll && (
            <Link
              to="/blog"
              className="text-sm font-semibold text-accent transition hover:text-primary"
            >
              Xem tất cả →
            </Link>
          )}
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {displayedPosts.map((post) => (
            <motion.article
              key={post.slug}
              className="group overflow-hidden rounded-2xl bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center space-x-3 text-xs uppercase tracking-wide text-muted">
                  <span>{post.category}</span>
                  <span className="h-px w-6 bg-gray-300" />
                  <span>{post.date}</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-primary">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="mt-4 inline-flex text-sm font-semibold text-accent transition hover:text-primary"
                >
                  Xem chi tiết →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;

