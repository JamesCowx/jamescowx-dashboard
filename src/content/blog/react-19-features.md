---
title: React 19: The Features That Actually Matter
date: 2025-01-25
author: James Cowx
excerpt: React 19 is the biggest release in years. Actions, use(), Server Components, and more — here's what you actually need to know.
tags: React, JavaScript, Web Development
category: Tech News
---

## The Big Picture

React 19 isn't just a version bump — it fundamentally changes how we handle forms, async data, and server rendering.

## Actions and useActionState

Forms in React have always been awkward. React 19 introduces **Actions** — functions that work with both client and server:

```tsx
// Before React 19: manual loading, error, and form state
function OldForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await submitData(new FormData(e.target as HTMLFormElement));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
}

// React 19: Actions handle it all
function NewForm() {
  async function submitAction(formData: FormData) {
    'use server';
    const email = formData.get('email');
    await db.users.create({ email });
  }

  return (
    <form action={submitAction}>
      <input name="email" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## useFormStatus and useFormState

```tsx
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save'}
    </button>
  );
}
```

Form state is now managed by React, not by your useState boilerplate.

## The use() Hook

`use()` reads the value of a Promise or Context — and it works in conditionals and loops:

```tsx
async function UserProfile({ userId }: { userId: string }) {
  // use() unwraps the promise — no useEffect, no useState
  const user = use(fetchUser(userId));
  const posts = use(fetchPosts(userId));

  return (
    <div>
      <h1>{user.name}</h1>
      <PostList posts={posts} />
    </div>
  );
}
```

This is revolutionary: no more loading spinners managed manually, no more useEffect for data fetching, no more "loading/error/data" ternary chains.

## React Server Components (Stable)

```tsx
// ServerComponent.tsx — runs on server, zero JS sent to client
async function ProductList() {
  const products = await db.product.findMany({
    include: { reviews: true }
  });

  return (
    <div>
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
```

**Key rule:** Server Components can import Client Components, but not vice versa. The boundary is one-way:

```
ServerComponent (fetch data, DB access)
  └── ClientComponent (useState, onClick)
       └── ServerComponent ✗ — not allowed
  └── ClientComponent
       └── AnotherClientComponent ✓
```

## ref as a Prop

```tsx
// Before React 19: forwardRef boilerplate
const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <input ref={ref} {...props} />;
});

// React 19: ref is just a prop
function Input({ ref, ...props }: Props) {
  return <input ref={ref} {...props} />;
}
```

## Document Metadata

```tsx
function BlogPost({ post }: { post: Post }) {
  return (
    <article>
      <title>{post.title} - My Blog</title>
      <meta name="description" content={post.excerpt} />
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

Title and meta tags work anywhere in the tree. They're hoisted to `<head>` automatically.

## Asset Loading

```tsx
import { preload } from 'react-dom';

function ImageGallery() {
  // Preload images before they enter the viewport
  preload('/large-photo.jpg', { as: 'image' });
  preload('/font.woff2', { as: 'font' });

  return <img src="/large-photo.jpg" alt="" />;
}
```

## Migration Guide

```bash
# Upgrade
npm install react@latest react-dom@latest @types/react@latest

# Check for breaking changes
npx react-codemod update-react-imports
```

### What to Update First

1. **Forms**: Replace manual useState/useEffect form handling with Actions
2. **Data fetching**: Replace useEffect + useState with use() where possible
3. **Refs**: Remove forwardRef wrappers
4. **Metadata**: Remove react-helmet in favor of native metadata

### What Still Works

- All hooks (useState, useEffect, useContext, etc.)
- Class components (still supported)
- Context API
- Error boundaries
- Portals

## Performance Improvements

- **Automatic batching** is now the default (no opt-in needed)
- **selective hydration** for Server Components
- **Smaller bundle** — React core + DOM is now under 10KB gzipped
- **Transitions** are more powerful with async support

## Should You Upgrade?

**Yes.** The migration is straightforward. Start using Actions for forms immediately — your code will be cleaner and more reliable. The `use()` hook and Server Components are game-changers worth adopting incrementally.

## Conclusion

React 19 is the most important release since Hooks in 16.8. Actions and `use()` eliminate entire categories of boilerplate. Server Components change the architecture. And all of it is incrementally adoptable — you don't need to rewrite your app.
