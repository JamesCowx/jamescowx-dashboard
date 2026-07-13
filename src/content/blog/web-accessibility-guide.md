---
title: The Complete Guide to Web Accessibility (WCAG 2.1)
date: 2025-04-12
author: James Cowx
excerpt: Accessibility isn't optional. Learn how to make your web applications usable by everyone with practical WCAG 2.1 compliance techniques.
tags: Accessibility, WCAG, HTML, Frontend
category: IT Tips
---

## Why Accessibility Matters

15% of the world's population lives with some form of disability. Accessible websites aren't just ethical — they're legally required in many jurisdictions and improve SEO for everyone.

## The POUR Principles

WCAG is built on four principles:

| Principle | Meaning |
|-----------|---------|
| **Perceivable** | Users must be able to perceive the content |
| **Operable** | Users must be able to operate the interface |
| **Understandable** | Content and interface must be understandable |
| **Robust** | Content must work with assistive technologies |

## Semantic HTML (The Foundation)

```html
<!-- Bad: Div soup -->
<div class="header">
  <div class="nav">
    <div onclick="navigate()" class="nav-item">Home</div>
  </div>
</div>

<!-- Good: Semantic elements -->
<header>
  <nav aria-label="Main navigation">
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>
```

Semantic HTML gives you accessibility for free. Screen readers understand `<nav>`, `<main>`, `<article>`, `<button>` natively.

## Color and Contrast

```css
/* WCAG AA requires 4.5:1 contrast ratio for normal text */
.text-good {
  color: #333;           /* on white: 12.6:1 ✓ */
}

.text-bad {
  color: #999;           /* on white: 2.85:1 ✗ */
}

/* Don't rely on color alone */
.error-message {
  color: #e53e3e;
  font-weight: bold;
}

.error-message::before {
  content: "⚠ ";         /* adds visual indicator beyond color */
}
```

**Tools:** Use Chrome DevTools' Accessibility panel or the axe DevTools extension to check contrast ratios automatically.

## Keyboard Navigation

```css
/* Always provide visible focus indicators */
:focus-visible {
  outline: 3px solid #60a5fa;
  outline-offset: 2px;
}

/* Don't do this! */
*:focus {
  outline: none;  /* removes focus indicators for keyboard users */
}
```

### Focus Order

```html
<!-- Bad: tabindex > 0 creates confusing order -->
<div tabindex="1">First</div>
<div tabindex="3">Third</div>
<div tabindex="2">Second</div>

<!-- Good: Natural DOM order -->
<div>First</div>
<div>Second</div>
<div>Third</div>
```

## ARIA: Use Sparingly

```html
<!-- Bad: ARIA overuse -->
<div role="button" aria-label="Submit" onclick="submit()">Submit</div>

<!-- Good: Use a real button -->
<button type="submit">Submit</button>
```

**First rule of ARIA:** Don't use ARIA if you can use a native HTML element instead.

Essential ARIA patterns:

```html
<!-- Expandable sections -->
<button aria-expanded="false" aria-controls="faq-1">
  What is your return policy?
</button>
<div id="faq-1" hidden>We accept returns within 30 days.</div>

<!-- Live regions for dynamic content -->
<div aria-live="polite" aria-atomic="true">
  <!-- Screen reader announces changes here -->
</div>

<!-- Accessible tabs -->
<div role="tablist" aria-label="Product information">
  <button role="tab" aria-selected="true" aria-controls="panel-1">Description</button>
  <button role="tab" aria-selected="false" aria-controls="panel-2">Reviews</button>
</div>
```

## Forms

```html
<form>
  <div>
    <label for="email">Email address</label>
    <input
      id="email"
      type="email"
      required
      aria-describedby="email-hint email-error"
      autocomplete="email"
    />
    <span id="email-hint">We'll never share your email.</span>
    <span id="email-error" role="alert" hidden>Please enter a valid email.</span>
  </div>
</form>
```

## Images and Media

```html
<!-- Decorative images -->
<img src="decorative-line.png" alt="" />

<!-- Informative images -->
<img src="chart.png" alt="Revenue grew 25% from Q1 to Q3 2025" />

<!-- Complex images -->
<figure>
  <img src="architecture.png" alt="System architecture diagram" />
  <figcaption>
    Figure 1: The microservices architecture showing API Gateway,
    service mesh, and event bus connections.
  </figcaption>
</figure>

<!-- Video captions -->
<video controls>
  <source src="tutorial.mp4" type="video/mp4" />
  <track src="captions.vtt" kind="captions" srclang="en" label="English" default />
</video>
```

## Testing Your Site

1. **Keyboard test:** Tab through your entire site — can you reach and operate everything?
2. **Screen reader test:** Try VoiceOver (Mac) or NVDA (Windows) on your site
3. **Automated tools:** axe-core, Lighthouse Accessibility audit, pa11y
4. **Zoom test:** Zoom to 200% — does everything still work?

```bash
# Run accessibility audit with Lighthouse CLI
npx lighthouse https://yoursite.com --only-categories=accessibility --view
```

## Quick Checklist

- [ ] All images have appropriate alt text
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Site is fully keyboard-navigable
- [ ] Forms have associated labels and error messages
- [ ] Focus indicators are visible
- [ ] Page has a logical heading hierarchy (h1 → h2 → h3)
- [ ] ARIA is used only when necessary
- [ ] Dynamic content updates use aria-live regions
- [ ] Skip navigation link is provided
- [ ] Video content has captions

## Conclusion

Accessibility isn't a feature to bolt on — it's a fundamental aspect of quality software. Start with semantic HTML, test with real assistive technologies, and make accessibility part of your definition of done.
