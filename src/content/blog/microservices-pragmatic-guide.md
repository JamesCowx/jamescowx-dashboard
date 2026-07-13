---
title: The Pragmatic Guide to Microservices (That Won't Waste Your Time)
date: 2024-12-15
author: James Cowx
excerpt: Microservices aren't always the answer. Learn when to use them, when to avoid them, and how to do them right without the hype.
tags: Microservices, Architecture, Monolith
category: IT Tips
---

## Start With a Monolith

Every successful microservices architecture I've seen started as a monolith. Every failed one started as microservices.

```python
# Year 1: Perfectly fine monolith
/app
  /users
  /orders
  /products
  /payments
  /shipping
  /notifications

# Year 3: Well-understood boundaries emerge
# Split when you need to, not because a blog told you to
```

## When to Split (and When NOT To)

### Split when:

| Signal | Metric |
|--------|--------|
| Different scaling needs | One endpoint gets 100x more traffic |
| Different deployment cadences | Payment team deploys daily, shipping deploys weekly |
| Different tech requirements | ML service needs GPUs, web server doesn't |
| Team autonomy | 50+ developers, different teams own different features |
| Clear bounded contexts | You can draw clean lines between domains |

### Don't split when:

- You have fewer than 10 developers
- Your product isn't stable yet (boundaries will change)
- You don't have mature DevOps (orchestration, monitoring, CI/CD)
- You're splitting based on technical layers (controllers, services, repos) instead of business capabilities
- "Because Google/Netflix does it"

## How to Split: The Strangler Fig Pattern

```python
# Step 1: Identify the boundary
# Move /orders endpoints to a separate service

# Step 2: Route traffic gradually
# API Gateway config:
routes:
  /api/v1/orders/*:
    targets:
      - weight: 10  # New orders service
        destination: orders-service.internal:8080
      - weight: 90  # Old monolith
        destination: monolith.internal:8080

# Step 3: Increase weight over weeks
# 10% → 25% → 50% → 100%

# Step 4: Remove old code from monolith
```

## Service Communication

### Synchronous (REST/gRPC)

```python
# When you need an immediate response
# gRPC for internal service-to-service
service OrderService {
  rpc CreateOrder(CreateOrderRequest) returns (Order);
  rpc GetOrder(GetOrderRequest) returns (Order);
}

# Use when: request-response pattern, strong contracts
# Avoid when: long-running operations, high fan-out
```

### Asynchronous (Message Queue)

```python
# When you can process later
# Order created → emit event
def create_order(order_data):
    order = db.save(order_data)
    message_bus.publish("order.created", {
        "order_id": order.id,
        "user_id": order.user_id,
        "amount": order.total,
    })
    return order

# Other services subscribe
@subscribe("order.created")
def send_confirmation_email(event):
    user = user_service.get(event["user_id"])
    email_service.send(user.email, "Order Confirmed!")

@subscribe("order.created")
def update_inventory(event):
    inventory_service.reserve(event["order_id"])
```

## Essential Infrastructure

You don't need all of this on day one, but you'll need it soon:

```yaml
# The non-negotiable minimum for microservices:
1. Service Discovery: Consul, Eureka, or Kubernetes DNS
2. API Gateway: Kong, Envoy, or AWS API Gateway
3. Centralized Logging: ELK stack, Loki, or Datadog
4. Distributed Tracing: Jaeger, Zipkin, or OpenTelemetry
5. Circuit Breakers: Resilience4j, Hystrix, or Istio
6. Configuration Management: Consul, Vault, or Kubernetes ConfigMaps
```

### Circuit Breaker Pattern

```python
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=1, max=10)
)
def call_payment_service(order):
    try:
        return payment_client.charge(order)
    except PaymentServiceError:
        circuit_breaker.record_failure()
        raise CircuitBreakerOpen("Payment service unavailable")
```

## Database Per Service

```sql
-- Monolith: single database
-- Database: orders_db
-- Tables: orders, users, products, payments, shipping

-- Microservices: database per service
-- Database: order_service_db → only order-related tables
-- Database: user_service_db → only user-related tables
-- Database: product_service_db → only product-related tables
```

**The hard rule:** A service's database is private. Other services access data only through APIs.

This means:
- No cross-service joins
- No cross-service transactions
- Data consistency through eventual consistency patterns (Saga, Outbox)

### Saga Pattern for Distributed Transactions

```python
def create_order_saga(order):
    try:
        # Step 1: Reserve inventory
        inventory_service.reserve(order.items)
        saga_log.record("inventory_reserved", order.id)

        # Step 2: Charge payment
        payment = payment_service.charge(order.total)
        saga_log.record("payment_charged", order.id)

        # Step 3: Confirm order
        order_service.confirm(order.id)
        saga_log.record("order_confirmed", order.id)

    except Exception as e:
        # Compensating transactions (rollback)
        if saga_log.has("payment_charged"):
            payment_service.refund(payment.id)
        if saga_log.has("inventory_reserved"):
            inventory_service.release(order.items)
        order_service.mark_failed(order.id, str(e))
```

## Testing Microservices

```
Level 1: Unit tests (fast, isolated) — 70%
Level 2: Integration tests (service + real DB) — 20%
Level 3: Contract tests (API compatibility) — 5%
Level 4: End-to-end (critical paths only) — 5%
```

**Contract testing with Pact:**

```python
# Consumer defines expectations
pact.given("a user exists")
    .upon_receiving("a request for user 123")
    .with_request("GET", "/users/123")
    .will_respond_with(200, body={"id": 123, "name": "John"})

# Provider verifies
# Runs in CI — catches breaking changes before deployment
```

## Monitoring: The Four Golden Signals

```python
# For every service, track:
class ServiceMetrics:
    latency: Histogram      # p50, p95, p99 response time
    traffic: Counter        # requests per second
    errors: Counter         # error rate (5xx, timeouts)
    saturation: Gauge       # how "full" the service is (CPU, memory, queue depth)

# Alert on:
# - Error rate > 1%
# - p99 latency > 500ms
# - Saturation > 80%
```

## When NOT to Use Microservices

```
1. Early-stage startup (< 10 engineers)
   → Monolith + well-defined modules

2. Simple CRUD application
   → Monolith with good code organization

3. Tight data consistency requirements
   → Monolith with single database

4. Limited DevOps capacity
   → Monolith (you'll drown in operational complexity)

5. Unclear domain boundaries
   → Monolith until boundaries emerge naturally
```

## The Modular Monolith (Best of Both Worlds)

```python
# Keep deployment simple, enforce boundaries in code
/app
  /modules
    /users
      users_module.py
      __init__.py  # Only expose public API
    /orders
      orders_module.py
      __init__.py

# Rule: modules can only import from their own __init__.py
# This enforces the same boundaries as microservices
# without the operational overhead
```

## Conclusion

Microservices solve organizational scaling problems, not technical ones. If you have 5 developers, a monolith is the right architecture. If you have 50, split along team boundaries. Always start with a monolith and extract services only when the pain of keeping them together exceeds the pain of splitting them apart.
