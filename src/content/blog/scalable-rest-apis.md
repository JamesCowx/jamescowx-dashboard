---
title: Building Scalable REST APIs with Node.js
date: 2025-11-10
author: James Cowx
excerpt: Best practices for designing and implementing REST APIs that can handle millions of requests using Node.js and Express.
tags: Node.js, API, Backend, Architecture
category: IT Tips
---

## The Foundation of a Good API

A well-designed API is the backbone of any successful application. Here's how to build APIs that scale.

### Project Structure

```
src/
├── controllers/
├── services/
├── middleware/
├── models/
├── routes/
├── utils/
└── validators/
```

### Essential Middleware

```javascript
// Rate limiting
import rateLimit from 'express-rate-limit';
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// CORS
import cors from 'cors';
app.use(cors({ origin: process.env.ALLOWED_ORIGINS }));

// Request logging
import morgan from 'morgan';
app.use(morgan('combined'));
```

## API Design Principles

### 1. Use Proper HTTP Status Codes

| Status | Meaning |
|--------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

### 2. Consistent Error Responses

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": [
      { "field": "email", "issue": "must be a valid email" }
    ]
  }
}
```

### 3. Pagination for List Endpoints

```javascript
app.get('/api/users', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = Math.min(parseInt(req.query.limit) || 20, 100);
  const offset = (page - 1) * limit;

  const { rows, count } = await User.findAndCountAll({ limit, offset });

  res.json({
    data: rows,
    pagination: { page, limit, total: count, pages: Math.ceil(count / limit) }
  });
});
```

## Performance Tips

- **Connection pooling** for database connections
- **Redis caching** for frequently accessed data
- **Compression** with gzip middleware
- **Load balancing** with PM2 cluster mode
- **Database indexing** on frequently queried columns

## Conclusion

A scalable API isn't built by accident. It requires thoughtful design, proper tooling, and continuous monitoring. Start with these patterns and iterate as your traffic grows.
