---
title: Platform Engineering: Building Internal Developer Platforms in 2026
date: 2026-07-05
author: James Cowx
excerpt: Platform engineering has replaced DevOps as the gold standard for developer experience. Here's how to build an IDP that your team will actually use.
tags: DevOps, Platform Engineering, Kubernetes, Developer Experience
category: DevOps
---

## The Rise of Platform Engineering

By 2026, the "you build it, you run it" mantra has evolved. Developers want to own their code in production, but they don't want to become Kubernetes experts. That's where **Internal Developer Platforms (IDPs)** come in.

### Platform Engineering vs DevOps

| | Traditional DevOps | Platform Engineering |
|---|---|---|
| Goal | Enable teams to manage infra | Abstract infra away from teams |
| User | Ops engineers | Application developers |
| Interface | YAML, CLI, scripts | GUI, APIs, self-service portals |
| Golden path | Implicit | Explicit and enforced |

## Core Architecture

A modern IDP has four layers:

```
┌─────────────────────────────────────┐
│        Developer Portal (Backstage) │  ← Self-service UI
├─────────────────────────────────────┤
│            Orchestrator (Temporal)  │  ← Workflow engine
├─────────────────────────────────────┤
│         Provisioner (Crossplane)    │  ← Infrastructure as data
├─────────────────────────────────────┤
│     Runtime (Kubernetes + Nomad)    │  ← Compute
└─────────────────────────────────────┘
```

### Step 1: Scaffold with Backstage

Backstage (from Spotify) is the de facto standard in 2026:

```yaml
# app-config.yaml
app:
  title: Acme Developer Portal

integrations:
  github:
    - host: github.com
      token: ${GITHUB_TOKEN}

techdocs:
  builder: local

catalog:
  rules:
    - allow: [Component, API, Resource, System]

backend:
  database:
    client: pg
    connection:
      host: ${POSTGRES_HOST}
      port: 5432
```

Create a software template for new services:

```yaml
# templates/node-service.yaml
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: node-service
  title: Node.js Microservice
spec:
  owner: platform-team
  type: service

  parameters:
    - title: Service Details
      properties:
        name:
          title: Service Name
          type: string
        owner:
          title: Team
          type: string
          enum:
            - payments
            - analytics
            - identity

  steps:
    - id: fetch-template
      name: Fetch Template
      action: fetch:template
      input:
        url: ./skeletons/node-service
        values:
          name: ${{ parameters.name }}

    - id: create-repo
      name: Create Repository
      action: publish:github
      input:
        repoUrl: github.com?repo=${{ parameters.name }}
        defaultBranch: main

    - id: register
      name: Register in Catalog
      action: catalog:register
      input:
        repoContentsUrl: ${{ steps['create-repo'].output.repoContentsUrl }}
```

### Step 2: Define Golden Paths with Crossplane

Crossplane lets you define infrastructure as Kubernetes resources:

```yaml
# Definition: What a "PostgreSQL database" means
apiVersion: apiextensions.crossplane.io/v1
kind: CompositeResourceDefinition
metadata:
  name: xpostgresqlinstances.platform.acme.com
spec:
  claimNames:
    kind: PostgreSQLInstance
    plural: postgresqlinstances
  versions:
    - name: v1
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                size:
                  type: string
                  enum: [small, medium, large]
                version:
                  type: string
                  default: "16"
```

```yaml
# Claim: Developer requests a database
apiVersion: platform.acme.com/v1
kind: PostgreSQLInstance
metadata:
  name: user-service-db
  namespace: payments
spec:
  size: medium
  version: "16"
  compositionRef:
    name: postgres-aws-rds
```

### Step 3: Automate with Temporal

Temporal handles long-running infrastructure workflows:

```typescript
import { proxyActivities, workflow } from '@temporalio/workflow';

const { provisionDatabase, updateDNS, deployService, runSmokeTests } =
  proxyActivities<typeof activities>({
    startToCloseTimeout: '5 minutes',
    retry: { maximumAttempts: 3 },
  });

export async function onboardService(name: string, team: string) {
  // 1. Provision infrastructure
  const dbEndpoint = await provisionDatabase(name);
  const cacheEndpoint = await provisionRedis(name);

  // 2. Configure networking
  await updateDNS(`${name}.internal`, dbEndpoint);
  await configureServiceMesh(name);

  // 3. Deploy initial version
  const deployResult = await deployService(name, {
    replicas: 2,
    env: {
      DATABASE_URL: dbEndpoint,
      REDIS_URL: cacheEndpoint,
    },
  });

  // 4. Validate
  const smokeTestResult = await runSmokeTests(deployResult.url);

  return {
    status: 'ready',
    url: deployResult.url,
    dashboard: `https://dash.internal/${name}`,
    docs: `https://docs.internal/${name}`,
  };
}
```

## Developer Portal UX

The portal should provide:

1. **One-click environments** — Preview environments per PR
2. **Resource dashboards** — CPU, memory, cost per service
3. **Deployment history** — With rollback to any version
4. **Documentation** — TechDocs integrated into Backstage
5. **Service catalog** — All services with ownership, dependencies, APIs

### Preview Environments

```yaml
# .platform/preview.yaml
apiVersion: platform.acme.com/v1
kind: PreviewEnvironment
spec:
  branch: feat/new-checkout
  services:
    - checkout-api
    - checkout-ui
  dependencies:
    - payments-api  # shared staging
  ttl: 4h  # auto-destroy after 4 hours
```

## Measuring Success

Track these metrics to prove your IDP's value:

| Metric | Good | Great | Elite |
|--------|------|-------|-------|
| Time to ship | <1 day | <2 hours | <30 min |
| Deployment frequency | 1/week | 3/day | 10+/day |
| Change failure rate | <15% | <10% | <5% |
| Developer satisfaction | 6/10 | 8/10 | 9+/10 |
| Infrastructure requests via portal | <50% | >75% | >95% |

## Common Pitfalls

1. **Over-abstracting** — Don't hide everything. Developers still need access to logs, metrics, and raw Kubernetes when debugging.
2. **Mandating instead of enabling** — Golden paths should be the easiest option, not the only option.
3. **Skipping documentation** — Every template and workflow needs clear docs. Use Backstage TechDocs.
4. **Ignoring cost** — Show developers the cost of their resources. It drives better behavior.

## Conclusion

Platform engineering in 2026 is about removing friction without removing agency. Backstage + Crossplane + Temporal gives you the three pillars: a developer portal, infrastructure as data, and workflow orchestration. Start with one golden path, measure everything, and iterate based on developer feedback.
