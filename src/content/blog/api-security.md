---
title: API Security: 8 Practices Every Developer Must Follow
date: 2025-06-05
author: James Cowx
excerpt: Protect your APIs from common attacks. These 8 security practices should be non-negotiable in every backend you build.
tags: Security, API, Backend
category: IT Tips
---

## Security Is Not Optional

APIs are the most attacked surface of modern applications. Here's how to harden yours.

### 1. Rate Limiting

Prevent abuse and brute-force attacks:

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                    // limit each IP to 100 requests
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, try again later' },
});

// Apply to all routes
app.use('/api/', limiter);

// Stricter limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,  // only 5 login attempts
});
app.use('/api/auth/login', authLimiter);
```

### 2. Input Validation

Never trust client input. Validate everything:

```typescript
import { z } from 'zod';

const CreateUserSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(12).max(128),
  name: z.string().min(1).max(100).regex(/^[a-zA-Z\s'-]+$/),
  role: z.enum(['user', 'editor']).default('user'),
});

function createUser(req: Request, res: Response) {
  const result = CreateUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      details: result.error.flatten(),
    });
  }

  // result.data is now typed and safe
  const user = await db.users.create({ data: result.data });
}
```

### 3. Authentication & Authorization

```javascript
// Always verify tokens properly
import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],  // Specify allowed algorithms
      issuer: 'your-app',
      audience: 'your-app',
    });

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
```

### 4. SQL Injection Prevention

```javascript
// NEVER do this
const query = `SELECT * FROM users WHERE email = '${req.body.email}'`;

// ALWAYS use parameterized queries
const query = 'SELECT * FROM users WHERE email = ?';
const [user] = await db.execute(query, [req.body.email]);

// Or with an ORM
const user = await prisma.user.findUnique({
  where: { email: req.body.email },
});
```

### 5. CORS Configuration

```javascript
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(','),
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400,
}));
```

### 6. Security Headers

```javascript
import helmet from 'helmet';

app.use(helmet());

// Custom CSP
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https://trusted-cdn.com"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'", "https://api.yourapp.com"],
  },
}));
```

### 7. Avoid Exposing Sensitive Data

```javascript
// DON'T return the full user object
app.get('/api/users/:id', async (req, res) => {
  const user = await db.users.findById(req.params.id);
  res.json(user);  // leaks password hash, tokens, etc.
});

// DO use a DTO pattern
function toUserDTO(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    // password and tokens excluded
  };
}

app.get('/api/users/:id', async (req, res) => {
  const user = await db.users.findById(req.params.id);
  res.json(toUserDTO(user));
});
```

### 8. Logging & Monitoring

```javascript
// Log security events
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: ['req.headers.authorization', 'req.body.password'],
});

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    logger.info({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: Date.now() - start,
      ip: req.ip,
    });
  });
  next();
});
```

## Quick Security Checklist

- [ ] HTTPS enforced everywhere
- [ ] Rate limiting on all endpoints
- [ ] Input validation on every request
- [ ] Parameterized queries (no raw SQL)
- [ ] JWT tokens with proper expiry
- [ ] CORS limited to known origins
- [ ] Security headers via Helmet
- [ ] Passwords hashed with bcrypt/argon2
- [ ] Dependencies scanned weekly
- [ ] Error messages don't leak internals

## Conclusion

Implement these 8 practices before writing a single endpoint. Security retrofits are 10x harder than building securely from the start.
