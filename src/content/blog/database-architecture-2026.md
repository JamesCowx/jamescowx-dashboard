---
title: Database Architecture in 2026: SQL, NoSQL, NewSQL — What to Use and When
date: 2026-07-08
author: James Cowx
excerpt: The database landscape has fractured. Here's a practical guide to choosing between PostgreSQL, SQLite, CockroachDB, DynamoDB, and the new wave of purpose-built databases.
tags: Database, SQL, PostgreSQL, Architecture, Backend
category: IT Tips
---

## The Database Landscape in 2026

The golden age of "just use PostgreSQL for everything" is ending — not because PostgreSQL is bad, but because workloads have diversified. Serverless, edge computing, real-time AI, and global distribution demand specialized storage.

### The Shift

```
2015: MySQL or PostgreSQL
2020: PostgreSQL + Redis (for cache)
2024: PostgreSQL + Redis + MongoDB + Elasticsearch + ...
2026: Polyglot persistence — pick the right tool per use case
```

## The Database Spectrum

```
                OLTP                        OLAP
                │                           │
SQLite──────────┤                           │
PostgreSQL──────┤                           │
CockroachDB─────┤                           │
DynamoDB────────┤                           │
MongoDB─────────┤                           │
DuckDB──────────┴───────────────────────────┤
ClickHouse──────────────────────────────────┤
Snowflake───────────────────────────────────┤
```

## Database by Use Case

### 1. The General-Purpose Workhorse: PostgreSQL 18

PostgreSQL in 2026 is more capable than ever:

```sql
-- PostgreSQL 18 features
-- 1. Better JSON: JSON Schema validation
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data JSONB,
    CONSTRAINT valid_data CHECK (
        jsonb_matches_schema('{
            "type": "object",
            "properties": {
                "title": {"type": "string", "minLength": 1},
                "price": {"type": "number", "minimum": 0}
            },
            "required": ["title", "price"]
        }', data)
    )
);

-- 2. Native vector search (pgvector built-in)
CREATE TABLE embeddings (
    id BIGSERIAL PRIMARY KEY,
    content TEXT,
    embedding vector(1536)  -- OpenAI dimension
);

CREATE INDEX ON embeddings USING hnsw (embedding vector_cosine_ops);

-- Search by similarity
SELECT content, 1 - (embedding <=> $1) AS similarity
FROM embeddings
ORDER BY embedding <=> $1
LIMIT 10;

-- 3. Incremental materialized views (no more full refresh)
CREATE MATERIALIZED VIEW daily_stats
REFRESH INCREMENTALLY
AS SELECT
    date_trunc('day', created_at) AS day,
    COUNT(*) AS orders,
    SUM(amount) AS revenue
FROM orders
GROUP BY 1;
```

### When to Use PostgreSQL

| ✅ Use PostgreSQL | ❌ Avoid PostgreSQL |
|---|---|
| Complex queries with joins | Simple key-value lookups |
| ACID transactions | Global multi-region |
| Rich data types (JSON, arrays, ranges) | Extremely high write throughput |
| Your primary data store | Real-time analytics |
| Most web apps | Very large blobs |

### 2. The Edge Database: SQLite (via Turso/LibSQL)

SQLite in 2026 isn't just for mobile — it's the dominant edge database:

```typescript
import { createClient } from '@libsql/client';

// Embedded + synced — local reads, async writes to primary
const db = createClient({
  url: 'file:local.db',
  syncUrl: process.env.TURSO_DATABASE_URL,
});

// Read: instant, no network call
const user = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);

// Write: acknowledged locally, synced asynchronously
await db.execute('INSERT INTO events (type, data) VALUES (?, ?)', [
  'page_view',
  JSON.stringify({ page: '/home' }),
]);
```

### 3. The Global Database: CockroachDB 24

CockroachDB has matured into a reliable globally-distributed SQL database:

```sql
-- Create a table that spans the globe
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    region STRING AS (
        CASE
            WHEN crdb_internal.locality_value('region') = 'us-east'
            THEN 'us-east'
            WHEN crdb_internal.locality_value('region') = 'eu-west'
            THEN 'eu-west'
            ELSE 'default'
        END
    ) STORED
) LOCALITY REGIONAL BY TABLE IN PRIMARY REGION;

-- Pin user data to their home region
CREATE TABLE user_settings (
    user_id UUID PRIMARY KEY,
    preferences JSONB,
    crdb_region STRING NOT NULL DEFAULT 'us-east',
    FOREIGN KEY (crdb_region) REFERENCES regions (id)
) LOCALITY REGIONAL BY ROW;
```

### 4. Real-Time Analytics: ClickHouse

For analytical queries on large datasets, ClickHouse is the 2026 standard:

```sql
CREATE TABLE analytics.page_views
(
    timestamp DateTime64(3),
    user_id UUID,
    url String,
    browser String,
    country String,
    duration_ms UInt32,
    -- Materialized column
    session_date Date MATERIALIZED toDate(timestamp),
    -- Aggregate function
    INDEX idx_url url TYPE bloom_filter(0.01)
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (timestamp, country, url);

-- Query: 1.2 billion rows in 180ms
SELECT
    country,
    count() AS views,
    avg(duration_ms) AS avg_duration,
    quantile(0.95)(duration_ms) AS p95_duration
FROM analytics.page_views
WHERE session_date = today()
GROUP BY country
ORDER BY views DESC;
```

| Engine | 1B rows | 10B rows |
|--------|---------|----------|
| PostgreSQL | 12s | OOM |
| ClickHouse | 180ms | 1.2s |
| DuckDB | 220ms | 1.8s |

### 5. Key-Value at Scale: DynamoDB / FoundationDB

For ultra-high throughput key-value patterns:

```typescript
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

// Single-digit millisecond reads at any scale
async function getOrdersByUser(userId: string) {
  const result = await client.send(new QueryCommand({
    TableName: 'Orders',
    KeyConditionExpression: 'userId = :uid',
    ExpressionAttributeValues: {
      ':uid': userId,
    },
    Limit: 50,
  }));

  return result.Items;
}
```

### 6. Document Store: MongoDB 8

MongoDB remains strong for flexible document workloads:

```json
{
  "title": "Product Catalog Service",
  "useSchemaValidation": true,
  "validator": {
    "$jsonSchema": {
      "bsonType": "object",
      "required": ["sku", "name", "price"],
      "properties": {
        "sku": { "bsonType": "string", "pattern": "^[A-Z]{3}-\\d{4}$" },
        "name": { "bsonType": "string" },
        "price": { "bsonType": "number", "minimum": 0 },
        "variants": {
          "bsonType": "array",
          "items": {
            "bsonType": "object",
            "required": ["color", "size", "inventory"]
          }
        }
      }
    }
  }
}
```

## The Polyglot Persistence Stack

A typical 2026 production stack:

```
┌────────────────────────────────────────────────────┐
│                    Application                      │
├────────────────────────────────────────────────────┤
│  PostgreSQL 18      ← Primary data (users, orders) │
│  Redis 8            ← Cache, sessions, rate limits │
│  ClickHouse         ← Analytics, dashboards        │
│  Turso/SQLite       ← Edge data (user-local reads) │
│  S3/R2              ← Blob storage (images, files) │
│  Elasticsearch      ← Full-text search             │
│  Kafka              ← Event streaming              │
└────────────────────────────────────────────────────┘
```

## Database-as-Infrastructure: Serverless DB

In 2026, most developers don't manage database servers:

```yaml
# neon.yaml — serverless PostgreSQL
project:
  name: myapp
  databases:
    - name: main
      region: aws-us-east-1
      compute:
        min: 0        # Scale to zero
        max: 4 CU     # Burst to 4 compute units
      storage:
        min: 1 GB
        max: 50 GB
      branches:
        - name: preview
          parent: main
          compute:
            min: 0
            max: 0.25
```

```bash
# Branch database for every PR
neon branch create --parent main --name pr-142
# Deploys with its own isolated database, auto-deleted on merge
```

## Migration Guide: Start Simple, Evolve

1. **Start with PostgreSQL** — It handles 95% of use cases
2. **Add Redis** — When you need caching or rate limiting
3. **Add ClickHouse** — When analytical queries slow down Postgres
4. **Add SQLite at edge** — When global latency matters
5. **Add specialized stores** — Only when PostgreSQL genuinely can't handle it

## Summary Decision Matrix

| Requirement | Recommended Database |
|-------------|---------------------|
| General web app | PostgreSQL |
| Global, low-latency reads | CockroachDB + Turso |
| Real-time analytics | ClickHouse |
| High-throughput KV | DynamoDB |
| Flexible documents | MongoDB |
| Embedded / edge | SQLite (Turso) |
| Full-text search | Elasticsearch |
| Time series | TimescaleDB / InfluxDB |
| Graph relationships | Dgraph / Neo4j |
| Vector search | pgvector (PostgreSQL) |

## Conclusion

2026's database landscape is about choosing the right tool for each job, not finding a single universal database. PostgreSQL is still the best default — it's remarkably capable. But for global distribution, real-time analytics, edge workloads, and ultra-high throughput, specialized databases are worth the complexity. The key is to start simple, measure pain points, and add specialized stores only when PostgreSQL actually becomes the bottleneck.
