---
title: System Design Interview: The Framework That Gets You Hired
date: 2025-01-10
author: James Cowx
excerpt: Master the system design interview with a repeatable framework. From requirements gathering to deep dives, this guide covers it all.
tags: System Design, Interview, Architecture, Career
category: IT Tips
---

## Why System Design Interviews Exist

Companies aren't testing if you memorized architecture diagrams. They're testing:
- Can you handle ambiguity?
- Do you understand tradeoffs?
- Can you communicate technical decisions?
- Do you think about scale, reliability, and cost?

## The 45-Minute Framework

```
0-5 min:   Requirements & scope
5-10 min:  Back-of-envelope calculations
10-15 min: High-level design
15-35 min: Deep dive into 2-3 components
35-40 min: Bottlenecks & scaling
40-45 min: Wrap-up & summary
```

### Phase 1: Requirements (5 min)

**Functional requirements — what does the system DO?**

For "Design Twitter":
- Users can post tweets (280 chars)
- Users can follow other users
- Users see a timeline of tweets from followed users
- Users can like and retweet

**Non-functional requirements — how well does it do it?**
- 200M daily active users
- Timeline load < 200ms
- Highly available (99.9%+)
- Eventually consistent is acceptable for timelines

**Ask clarifying questions:**
- Do we need search? Trending topics? DMs?
- What's the read-to-write ratio? (Twitter is ~100:1 reads)
- Are we optimizing for consistency or availability?

### Phase 2: Back-of-Envelope (5 min)

```
200M DAU
Average 5 tweet views per session = 1B timeline reads/day
1B reads / 86,400 seconds = ~11,500 reads/second
Average 1 tweet per user per day = 200M writes/day
200M writes / 86,400 seconds = ~2,300 writes/second
Average tweet size: 280 chars = ~280 bytes
Storage per day: 200M × 280 bytes = 56 GB/day
Storage per year: ~20 TB (tweet text only)
```

### Phase 3: High-Level Design (5 min)

```
[Users] → [Load Balancer] → [API Servers] → [Services]
                                                    ↓
                                    ┌───────────────┴───────────────┐
                                    ↓                               ↓
                              [Tweet Service]                [Timeline Service]
                                    ↓                               ↓
                              [Tweet DB]                     [Timeline Cache]
                                                                    ↓
                                                              [Graph DB]
                                                          (follow relationships)
```

### Phase 4: Deep Dive (20 min)

**Database choice:**

```sql
-- Tweet storage: Relational is fine
CREATE TABLE tweets (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  content VARCHAR(280),
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_user_created (user_id, created_at DESC)
);

-- Or use wide-column store for scale
-- Cassandra: partition by user_id, cluster by created_at DESC
```

**Timeline generation — the key design decision:**

Option A: **Fan-out on write**
```
User posts tweet → write to cache of all followers' timelines
Read: O(1) — just fetch from cache
Write: O(n) — push to n followers

Best for: High read volume, moderate followers (Twitter uses this)
```

Option B: **Fan-out on read**
```
User requests timeline → query all followed users' recent tweets → merge
Read: O(n) — query n followed users
Write: O(1) — just store the tweet

Best for: Users following thousands of accounts (celebrity edge case)
```

**Hybrid approach (what Twitter actually does):**
- Fan-out on write for users with < 10K followers
- Fan-out on read for celebrity tweets (pull at read time)
- Timeline cache: Redis sorted set, key = user_id, members = tweet_ids

**Caching layer:**

```python
# Timeline cache structure
# user:{user_id}:timeline → Sorted Set (score = timestamp, member = tweet_id)
# user:{user_id}:tweets → List of recent tweets

def post_tweet(user_id, tweet):
    tweet_id = db.insert(tweet)
    cache.add(f"user:{user_id}:tweets", tweet_id)

    followers = graph_db.get_followers(user_id)
    if len(followers) < 10000:
        for follower_id in followers:
            cache.zadd(f"user:{follower_id}:timeline", {tweet_id: time.now()})
            cache.zremrangebyrank(f"user:{follower_id}:timeline", 0, -801)  # keep last 800
    # else: celebrity — pull at read time

def get_timeline(user_id):
    if cache.exists(f"user:{user_id}:timeline"):
        return cache.zrevrange(f"user:{user_id}:timeline", 0, 50)

    # Fallback: fan-out on read
    followed = graph_db.get_followed(user_id)
    tweets = []
    for uid in followed:
        tweets.extend(cache.lrange(f"user:{uid}:tweets", 0, 50))
    return sorted(tweets, key=lambda t: t.time, reverse=True)[:50]
```

### Phase 5: Bottlenecks (5 min)

- **Hot users:** Celebrity tweets cause write amplification. Solved by hybrid fan-out.
- **Hot partitions:** Some user IDs get disproportionate traffic. Solved by sharding.
- **Cache stampede:** Timeline cache miss causes DB overload. Solved by request coalescing.
- **Bandwidth:** Media uploads. Solved by CDN + async processing.

### Phase 6: Wrap-Up (5 min)

Summarize:
1. High-level architecture you chose
2. Key tradeoff decisions (fan-out strategy)
3. How you'd handle scale 10x from here
4. What you'd monitor in production

## Common System Design Questions

| Question | Key Concept |
|----------|-------------|
| Design URL shortener | Hash functions, Base62 encoding |
| Design chat system | WebSockets, message queues, pub/sub |
| Design rate limiter | Token bucket, sliding window, Redis |
| Design notification system | Message queues, fan-out, delivery guarantees |
| Design file storage | Chunking, deduplication, CDN |
| Design search autocomplete | Trie, prefix caching, frequency weighting |

## What Interviewers Look For

**Strong signals:**
- You ask clarifying questions before designing
- You estimate scale quantitatively (not just "it needs to be fast")
- You discuss tradeoffs, not just solutions
- You identify single points of failure
- You know when to use what (SQL vs NoSQL, cache vs queue)

**Red flags:**
- Jumping straight to microservices for 100 users
- Not considering failure modes
- Focusing on implementation details over architecture
- Ignoring non-functional requirements

## Resources for Practice

```markdown
1. "Designing Data-Intensive Applications" — Kleppmann (book)
2. System Design Interview — Alex Xu (book)
3. ByteByteGo (newsletter + YouTube)
4. Grokking the System Design Interview (course)
5. Practice on: Pramp, interviewing.io, or with friends
```

## Conclusion

System design isn't about memorizing solutions — it's about structured thinking. Follow the framework, quantify everything, discuss tradeoffs, and communicate clearly. Practice 15-20 common questions and you'll be ready for any system design interview.
