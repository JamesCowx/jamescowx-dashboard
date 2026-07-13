---
title: Mastering React Server Components
date: 2025-10-22
author: James Cowx
excerpt: Understanding React Server Components and how they change the way we think about React application architecture.
tags: React, Next.js, Architecture
category: IT Tips
---

## The Paradigm Shift

React Server Components (RSC) represent a fundamental shift in how we build React applications. They blur the line between server and client, enabling new patterns that were previously impossible.

### What Are Server Components?

Server Components run exclusively on the server and are never sent to the client. They can directly access databases, file systems, and backend services without an API layer.

```typescript
// This component runs on the server only
async function UserProfile({ userId }: { userId: string }) {
  const user = await db.user.findUnique({ where: { id: userId } });
  const posts = await db.post.findMany({ where: { authorId: userId } });

  return (
    <div>
      <h1>{user.name}</h1>
      <PostList posts={posts} />
    </div>
  );
}
```

### Client Components

Components that need interactivity are marked with `'use client'`:

```typescript
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## The Composition Pattern

The key insight is that Server Components can render Client Components, but not vice versa. This creates a natural boundary:

```
Server Component
  └── Client Component (island of interactivity)
  └── Server Component
       └── Client Component
```

## Performance Benefits

- **Zero client-side JavaScript** for server-only components
- **Automatic code splitting** at component boundaries
- **Streaming** - HTML is sent progressively
- **Direct data access** eliminates API waterfalls

## When to Use Each

**Server Components** for:
- Data fetching
- Database queries
- Accessing backend resources
- Keeping large dependencies server-side

**Client Components** for:
- Event listeners (onClick, onChange)
- State and effects
- Browser-only APIs
- Custom hooks with state

## Conclusion

Server Components are not just a performance optimization — they're a new mental model for React. Embrace the server-client boundary and let the framework handle the rest.
