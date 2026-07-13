---
title: Optimizing React Performance: A Practical Guide
date: 2025-08-12
author: James Cowx
excerpt: Practical techniques to identify and fix React performance bottlenecks. From memo to virtualization, learn what actually works.
tags: React, Performance, Optimization
category: IT Tips
---

## Why Performance Matters

A 100ms delay in response time can reduce conversion rates by 7%. React gives us powerful tools to optimize — when used correctly.

### Measure Before Optimizing

```typescript
// Use React DevTools Profiler
// Wrap components you want to profile
import { Profiler } from 'react';

function onRender(id: string, phase: string, actualDuration: number) {
  console.log(`${id} ${phase}: ${actualDuration}ms`);
}

<Profiler id="ProductList" onRender={onRender}>
  <ProductList />
</Profiler>
```

## Key Optimization Techniques

### 1. React.memo

```typescript
const ExpensiveList = React.memo(function ExpensiveList({ items }: Props) {
  return items.map(item => <ExpensiveItem key={item.id} item={item} />);
});
```

### 2. useMemo and useCallback

```typescript
function Dashboard({ data }: Props) {
  const processed = useMemo(() => {
    return data.map(heavyTransformation);
  }, [data]);

  const handleClick = useCallback((id: string) => {
    analytics.track('click', { id });
  }, []);

  return <Chart data={processed} onClick={handleClick} />;
}
```

### 3. Code Splitting

```typescript
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyChart />
    </Suspense>
  );
}
```

### 4. Virtualization for Long Lists

```typescript
import { FixedSizeList } from 'react-window';

function VirtualList({ items }: { items: Item[] }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>{items[index].name}</div>
      )}
    </FixedSizeList>
  );
}
```

## Common Anti-Patterns

| Anti-Pattern | Fix |
|-------------|-----|
| Creating objects in render | Move outside or use useMemo |
| Anonymous functions as props | Use useCallback |
| Deep prop comparison | Use memo with custom comparator |
| Context for frequent updates | Split contexts or use state management |
| Missing keys in lists | Always provide stable unique keys |

## Conclusion

Start with measuring, optimize the slowest parts, and always verify improvements. Premature optimization is the root of all evil — but informed optimization is the path to great user experiences.
