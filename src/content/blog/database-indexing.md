---
title: Database Indexing: Make Your Queries 100x Faster
date: 2025-07-02
author: James Cowx
excerpt: Understanding database indexes is the difference between a 10ms query and a 10-second one. Learn when and how to index effectively.
tags: Database, PostgreSQL, Performance
category: IT Tips
---

## Why Indexes Matter

Without an index, PostgreSQL performs a sequential scan — reading every row. With the right index, it performs an index scan — finding data in milliseconds.

```
Sequential scan:  ████████████████████████ 10s (1M rows)
Index scan:       █ 10ms (logarithmic)
```

## Types of Indexes

### B-Tree (Default)

Best for equality and range queries. Covers 90% of use cases.

```sql
-- create index
CREATE INDEX idx_users_email ON users(email);

-- this query now uses the index
SELECT * FROM users WHERE email = 'john@example.com';

-- range queries benefit too
SELECT * FROM orders WHERE created_at > '2025-01-01';
```

### Composite Indexes

When filtering on multiple columns, use a composite index:

```sql
-- Bad: two separate indexes
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

-- Good: composite index (column order matters!)
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- This query uses the full index
SELECT * FROM orders WHERE user_id = 123 AND status = 'pending';

-- This also works (uses first column)
SELECT * FROM orders WHERE user_id = 123;
```

**Rule of thumb:** Put the most selective column first, then equality filters, then range filters.

### Partial Indexes

Index only a subset of rows — smaller, faster, less storage.

```sql
-- Only index active users (5% of total)
CREATE INDEX idx_active_users ON users(email)
  WHERE status = 'active';

-- Only index unread notifications
CREATE INDEX idx_unread_notifs ON notifications(user_id)
  WHERE read_at IS NULL;
```

### Covering Indexes

Include extra columns to avoid table lookups entirely:

```sql
-- Without covering index: index scan + table lookup
CREATE INDEX idx_orders_user ON orders(user_id);
SELECT user_id, total, status FROM orders WHERE user_id = 123;
-- Reads index, then reads table for 'total' and 'status'

-- With covering index: index-only scan
CREATE INDEX idx_orders_user_cover ON orders(user_id)
  INCLUDE (total, status);
-- Everything comes from the index!
```

## Checking Index Usage

```sql
-- See which indexes are being used
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan AS times_used,
  idx_tup_read AS rows_returned,
  idx_tup_fetch AS rows_fetched
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- Find unused indexes (candidates for removal)
SELECT
  indexname,
  idx_scan,
  index_size
FROM pg_stat_user_indexes
WHERE idx_scan = 0
  AND indexrelid NOT IN (
    SELECT conindid FROM pg_constraint
  );
```

## Common Pitfalls

### 1. Indexing every column
More indexes = slower writes. Every INSERT/UPDATE/DELETE must update all indexes.

### 2. Functions in WHERE clause
```sql
-- Cannot use index on created_at
SELECT * FROM orders WHERE DATE(created_at) = '2025-01-01';

-- Use this instead
SELECT * FROM orders
WHERE created_at >= '2025-01-01'
  AND created_at < '2025-01-02';
```

### 3. Leading wildcard in LIKE
```sql
-- Cannot use index
SELECT * FROM users WHERE email LIKE '%@gmail.com';

-- Can use index
SELECT * FROM users WHERE email LIKE 'john%';

-- Use full-text search for the first case
CREATE INDEX idx_fts ON users USING gin(to_tsvector('english', email));
```

## EXPLAIN ANALYZE

Always verify your indexes actually work:

```sql
EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 123 AND status = 'pending';

-- Look for:
-- "Index Scan" or "Index Only Scan" = Good
-- "Seq Scan" = Missing index (or small table where it doesn't matter)
-- "Bitmap Index Scan" = Acceptable for medium selectivity
```

## Conclusion

Indexing is one of the highest-leverage skills in backend development. A single well-placed index can improve query performance by 10-1000x. Run EXPLAIN ANALYZE, check pg_stat_user_indexes regularly, and don't be afraid to drop indexes that aren't being used.
