import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getAllPosts } from '@/lib/blog';
import PageHero from '@/components/layout/PageHero';
import SlideUp from '@/components/animations/SlideUp';
import { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const blogCategories = ['All', 'Tech News', 'IT Tips', 'DevOps'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const allPosts = useMemo(() => getAllPosts(), []);
  const posts = useMemo(() => {
    return allPosts.filter((p) => {
      const matchCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase()) || p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [allPosts, activeCategory, search]);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'James Cowx Blog',
    description: 'Tech articles, tutorials, and insights by James Cowx on web development, DevOps, and open source.',
    url: 'https://jamescowx.com/blog',
    author: { '@type': 'Person', name: 'James Cowx', url: 'https://jamescowx.com' },
    blogPost: posts.slice(0, 10).map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.excerpt,
      url: `https://jamescowx.com/blog/${p.slug}`,
      datePublished: p.date,
      author: { '@type': 'Person', name: p.author },
    })),
  };

  return (
    <>
      <Helmet>
        <title>Blog — James Cowx | Tech Insights & Web Development Tutorials</title>
        <meta name="description" content="Read tech articles, tutorials, and insights by James Cowx. Topics include web development, DevOps, IT tips, and open source software." />
        <link rel="canonical" href="https://jamescowx.com/blog" />
        <meta property="og:title" content="Blog — James Cowx | Tech Insights & Tutorials" />
        <meta property="og:description" content="Tech articles and tutorials by James Cowx on web development, DevOps, and open source." />
        <meta property="og:url" content="https://jamescowx.com/blog" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Helmet>
      <PageHero
        eyebrow="Blog"
        title={<>Blog & <span className="gradient-text-pink">Insights</span></>}
        subtitle="News, tech tips, and in-depth tutorials on modern software development and IT."
        watermark="BL"
        accent="pink"
      />

      <section className="py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <SlideUp delay={0.1}>
          <div className="relative mb-8">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[var(--color-bg-card)] border border-[var(--color-border-default)] rounded-xl pl-10 pr-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition-all duration-300 focus:border-[var(--color-accent-pink)] focus:ring-1 focus:ring-[var(--color-accent-pink)]/50"
            />
          </div>
        </SlideUp>

        <SlideUp delay={0.2}>
          <div className="flex flex-wrap gap-2 mb-10">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[var(--color-accent-pink)] text-white'
                    : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border-default)] hover:border-[var(--color-accent-pink)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </SlideUp>

        <SlideUp delay={0.25}>
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-[var(--color-text-muted)]">
              Showing <span className="text-[var(--color-accent-pink)] font-semibold">{posts.length}</span> of <span className="text-white font-semibold">{allPosts.length}</span> posts
            </span>
            {(activeCategory !== 'All' || search) && (
              <button onClick={() => { setActiveCategory('All'); setSearch(''); }}
                className="text-xs text-[var(--color-text-muted)] hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                Clear filters <span className="text-sm">✕</span>
              </button>
            )}
          </div>
        </SlideUp>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--color-text-muted)] text-lg">No posts found matching your criteria.</p>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link to={`/blog/${post.slug}`}>
                  <Card accent="pink" className="living-border">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="pink">{post.category}</Badge>
                      <span className="text-xs text-[var(--color-text-muted)]">{post.readTime} min read</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-3 leading-snug">{post.title}</h2>
                    <p className="text-sm text-[var(--color-text-muted)] line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="gray">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                      <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span className="text-[var(--color-accent-pink)] font-medium">Read article →</span>
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
      </section>
    </>
  );
}
