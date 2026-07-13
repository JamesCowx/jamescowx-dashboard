---
title: Kubernetes in Production: Lessons from Running 200+ Clusters
date: 2025-04-01
author: James Cowx
excerpt: Hard-won lessons from operating Kubernetes at scale. Resource management, autoscaling, monitoring, and the mistakes that cost us downtime.
tags: Kubernetes, DevOps, Production, Cloud
category: Tech News
---

## The Reality of Production Kubernetes

Kubernetes is powerful but unforgiving. Here's what I learned managing 200+ clusters across multiple clouds.

## Lesson 1: Resource Requests Are Not Optional

```yaml
# The bare minimum every pod needs
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
  - name: app
    image: myapp:latest
    resources:
      requests:
        memory: "128Mi"
        cpu: "100m"
      limits:
        memory: "256Mi"
        cpu: "500m"
```

**Without requests:** The scheduler doesn't know how much your app needs. Nodes get overcommitted, OOMKiller starts terminating pods randomly.

**Without limits:** A memory leak in one Pod can consume all resources on a node, taking down every other Pod on that node.

### Our Rules:
- Requests = 50-70% of limits
- Memory limits = 2x average observed usage
- CPU limits = at least 200m for web services
- Never run without both requests AND limits in production

## Lesson 2: The OOMKiller Is Your Last Line of Defense

```bash
# Check for OOM kills
kubectl get events --all-namespaces | grep OOMKilled

# Check node conditions
kubectl describe node <node-name> | grep -A5 Conditions
```

If you're seeing OOMKilled pods, you have a resource management problem, not a Kubernetes problem. Fix your limits, add monitoring, or scale horizontally.

## Lesson 3: Liveness vs Readiness Probes

```yaml
readinessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 10

livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 20
  failureThreshold: 3
```

**Readiness:** "Can this pod serve traffic?" — removes from service.

**Liveness:** "Is this pod dead?" — restarts the container.

**Critical mistake we made:** Setting liveness too aggressive. If your app takes 45 seconds to start and liveness fires at 30 seconds, you're in an infinite restart loop. Always give more buffer than you think you need.

## Lesson 4: Pod Disruption Budgets

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: myapp-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: myapp
```

Without PDBs, a cluster upgrade or node drain can take down all replicas simultaneously. A PDB tells Kubernetes: "Never go below X available pods."

## Lesson 5: Monitoring Is Not Optional

```yaml
# Essential metrics every team needs
# 1. Pod CPU/Memory usage over time
# 2. Node resource utilization
# 3. Pod restart counts
# 4. API server latency and error rate
# 5. etcd health and latency
```

Deploy this stack on day one:

```bash
# Prometheus stack via Helm
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install kube-prometheus prometheus-community/kube-prometheus-stack \
  --set grafana.enabled=true \
  --set alertmanager.enabled=true
```

## Lesson 6: Network Policies

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-api
spec:
  podSelector:
    matchLabels:
      app: api
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - port: 8080
```

Start with **deny-all** and explicitly allow only what's needed. It's tedious up front but prevents lateral movement if a container is compromised.

## Lesson 7: Cost Optimization

```bash
# Find pods without resource requests
kubectl get pods --all-namespaces -o json | \
  jq '.items[] | select(.spec.containers[]?.resources.requests == null) | .metadata.name'

# Right-size recommendations
kubectl top pods --all-namespaces
```

Tools like **Kubecost** or **Goldilocks** can analyze actual usage and suggest optimal requests/limits. Our teams reduced cloud costs by 35% just by right-sizing.

## Production Checklist

- [ ] All pods have resource requests AND limits
- [ ] Readiness probes on all services
- [ ] Liveness probes configured with generous timeouts
- [ ] Pod Disruption Budgets for critical services
- [ ] Prometheus + Grafana deployed and alerting
- [ ] Network policies restricting pod-to-pod traffic
- [ ] Cluster autoscaler configured with min/max nodes
- [ ] Pod Security Standards enforced (baseline at minimum)
- [ ] Regular etcd backups
- [ ] Node auto-repair enabled

## Conclusion

Kubernetes is a marathon, not a sprint. Start with strong resource management, layer on observability, and iterate on your security posture. The platform rewards discipline and punishes shortcuts.
