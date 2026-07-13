---
title: CSS Grid: The Complete Practical Guide
date: 2025-06-20
author: James Cowx
excerpt: Stop wrestling with CSS layouts. Master CSS Grid with real-world patterns you'll use every day — from dashboard layouts to magazine-style grids.
tags: CSS, Frontend, Web Development
category: IT Tips
---

## Why CSS Grid?

Flexbox is one-dimensional (row OR column). Grid is two-dimensional (row AND column). For page layouts, Grid is the right tool.

## Core Concepts

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 3 equal columns */
  grid-template-rows: auto;               /* height based on content */
  gap: 1rem;                              /* spacing between cells */
}
```

## Pattern 1: Dashboard Layout

```css
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  height: 100vh;
}

.sidebar { grid-area: sidebar; }
.header  { grid-area: header; }
.main    { grid-area: main; }
```

```html
<div class="dashboard">
  <aside class="sidebar">Navigation</aside>
  <header class="header">Top Bar</header>
  <main class="main">Content</main>
</div>
```

## Pattern 2: Responsive Card Grid (No Media Queries)

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

This creates as many 300px-minimum columns as fit, automatically wrapping. No `@media` queries needed.

## Pattern 3: Holy Grail Layout

```css
.holy-grail {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

header  { grid-column: 1 / -1; }
nav     { grid-column: 1 / 2; }
main    { grid-column: 2 / 3; }
aside   { grid-column: 3 / 4; }
footer  { grid-column: 1 / -1; }
```

## Pattern 4: Magazine / Masonry

```css
.masonry {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 10px;  /* row height unit */
  gap: 1rem;
}

.span-2 { grid-row: span 20; }  /* 200px tall */
.span-3 { grid-row: span 30; }  /* 300px tall */
.span-4 { grid-row: span 40; }  /* 400px tall */
```

## Pattern 5: Centering (The Easy Way)

```css
.center {
  display: grid;
  place-items: center;  /* centers both horizontally and vertically */
}
```

## Useful Grid Properties

```css
.grid {
  /* Implicit vs Explicit rows */
  grid-auto-rows: minmax(100px, auto);  /* minimum 100px, grow with content */

  /* Alignment */
  justify-items: center;   /* horizontal alignment of items */
  align-items: center;      /* vertical alignment of items */
  place-items: center;      /* shorthand for both */

  /* Content alignment (when grid is larger than items) */
  justify-content: center;
  align-content: center;

  /* Spanning cells */
  /* .item { grid-column: 1 / 3; } */     /* span columns 1-2 */
  /* .item { grid-column: span 2; } */     /* span 2 columns from current position */
}
```

## Grid vs Flexbox Decision Guide

| Scenario | Use |
|----------|-----|
| Page layout (header, sidebar, main, footer) | Grid |
| Card gallery with wrapping | Grid |
| Navigation bar | Flexbox |
| Centering a single element | Grid (place-items) |
| Form row with label + input | Flexbox or Grid |
| Complex overlapping layouts | Grid |
| Simple row of buttons | Flexbox |

## Practical Example: Project Cards

```css
.projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.project-card {
  display: grid;
  grid-template-rows: 200px auto auto 1fr auto;
}

.project-card img  { grid-row: 1; object-fit: cover; width: 100%; height: 100%; }
.project-card h3   { grid-row: 2; }
.project-card p    { grid-row: 3; }
.project-card .tags { grid-row: 4; }
.project-card .cta  { grid-row: 5; }
```

## Browser DevTools Tip

Firefox's Grid Inspector (Layout panel) is excellent for debugging. Chrome DevTools also has a grid overlay — click the `grid` badge next to a grid container in the Elements panel.

## Conclusion

CSS Grid eliminates the need for float-based layouts, nested flexbox hacks, and most media queries for layout. Invest a few hours learning it and you'll never go back.
