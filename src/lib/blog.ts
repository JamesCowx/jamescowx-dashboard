export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  category: string;
  readTime: number;
  content: string;
}

const blogModules = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true });

function parseFrontmatter(raw: string): { meta: Record<string, string>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const meta: Record<string, string> = {};
  const frontmatter = match[1];
  const content = match[2];

  frontmatter.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      meta[key] = value;
    }
  });

  return { meta, content };
}

export function getAllPosts(): BlogPostMeta[] {
  const posts: BlogPostMeta[] = [];

  for (const [path, raw] of Object.entries(blogModules)) {
    const slug = path.replace('../content/blog/', '').replace('.md', '');
    const { meta, content } = parseFrontmatter(raw as string);

    const wordCount = content.split(/\s+/).length;

    posts.push({
      slug,
      title: meta['title'] || slug,
      date: meta['date'] || '2025-01-01',
      author: meta['author'] || 'James Cowx',
      excerpt: meta['excerpt'] || content.substring(0, 150) + '...',
      tags: meta['tags'] ? meta['tags'].split(',').map((t: string) => t.trim()) : [],
      category: meta['category'] || 'General',
      readTime: Math.max(1, Math.ceil(wordCount / 200)),
      content,
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPostMeta | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
