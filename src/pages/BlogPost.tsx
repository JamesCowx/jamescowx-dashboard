import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import FadeIn from '@/components/animations/FadeIn';
import SlideUp from '@/components/animations/SlideUp';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const allPosts = getAllPosts();
  const relatedPosts = post ? allPosts.filter((p) => p.slug !== post.slug).slice(0, 3) : [];

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-[var(--color-accent-pink)] hover:underline">Back to blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-pink)] transition-colors mb-8"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex items-center gap-3 mb-6">
            <Badge variant="pink">{post.category}</Badge>
            <span className="text-sm text-[var(--color-text-muted)]">{post.readTime} min read</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex items-center gap-4 mb-10 text-sm text-[var(--color-text-muted)]">
            <span>{post.author}</span>
            <span>·</span>
            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <div className="flex flex-wrap gap-1.5 ml-auto">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="gray">{tag}</Badge>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <article className="prose prose-invert prose-lg max-w-none
            prose-headings:text-[var(--color-text-primary)]
            prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-[var(--color-text-secondary)] prose-p:leading-relaxed
            prose-a:text-[var(--color-accent-blue)] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[var(--color-text-primary)]
            prose-code:text-[var(--color-accent-pink)]
            prose-pre:bg-[var(--color-bg-card)] prose-pre:border prose-pre:border-[var(--color-border-subtle)]
            prose-pre:rounded-xl prose-pre:overflow-x-auto
            prose-li:text-[var(--color-text-secondary)]
            prose-th:text-[var(--color-text-primary)] prose-th:font-semibold
            prose-td:text-[var(--color-text-secondary)]
            prose-table:border-[var(--color-border-subtle)]
            prose-blockquote:border-l-[var(--color-accent-blue)] prose-blockquote:bg-[var(--color-bg-card)] prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-xl
            prose-img:rounded-xl
            [&_pre]:!bg-[var(--color-bg-card)]
            [&_pre_code]:!bg-transparent
            [&_code]:text-sm
            [&_code]:before:content-none [&_code]:after:content-none"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </article>
        </FadeIn>

        {relatedPosts.length > 0 && (
          <SlideUp>
            <div className="mt-16 pt-10 border-t border-[var(--color-border-subtle)]">
              <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map((rp) => (
                  <Link key={rp.slug} to={`/blog/${rp.slug}`}>
                    <Card accent="pink" className="h-full">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-[var(--color-text-muted)]">{rp.readTime} min read</span>
                      </div>
                      <h3 className="font-semibold text-sm mb-1 line-clamp-2">{rp.title}</h3>
                      <p className="text-xs text-[var(--color-text-muted)] line-clamp-2">{rp.excerpt}</p>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </SlideUp>
        )}
      </div>
    </div>
  );
}
