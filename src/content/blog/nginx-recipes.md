---
title: Nginx: The Swiss Army Knife Every Developer Should Know
date: 2025-05-08
author: James Cowx
excerpt: From reverse proxy to load balancer, static file server to SSL terminator — master Nginx with these practical recipes.
tags: Nginx, DevOps, Web Server
category: IT Tips
---

## Why Nginx?

Nginx powers 34% of all websites. It's fast, lightweight, and ridiculously versatile. Here's what every developer should know.

## Basic Configuration

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    root /var/www/html;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

## Recipe 1: Reverse Proxy to Node.js

```nginx
server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 120s;
    }
}
```

## Recipe 2: SSL/HTTPS with Certbot

```nginx
server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # Modern SSL config
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;

    # Security headers
    add_header Strict-Transport-Security "max-age=63072000" always;

    location / {
        proxy_pass http://localhost:3000;
    }
}

# HTTP → HTTPS redirect
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}
```

## Recipe 3: Static File Server with Caching

```nginx
server {
    listen 80;
    server_name static.example.com;

    root /var/www/static;

    # Cache static assets aggressively
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # HTML files — no cache
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, must-revalidate";
    }

    # Enable gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 256;
    gzip_comp_level 6;
}
```

## Recipe 4: Load Balancing

```nginx
upstream backend {
    least_conn;  # send to server with fewest connections
    server backend1.example.com:3000 weight=3;
    server backend2.example.com:3000 weight=1;
    server backend3.example.com:3000 backup;  # only if others fail
    keepalive 32;
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://backend;
        proxy_next_upstream error timeout http_500 http_502 http_503;
    }

    # Health check endpoint (Nginx Plus only)
    # For open-source, use /health endpoint in app
}
```

## Recipe 5: Rate Limiting

```nginx
http {
    # Define rate limit zone: 10 requests per second per IP
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login_limit:10m rate=5r/m;

    server {
        location /api/ {
            limit_req zone=api_limit burst=20 nodelay;
            limit_req_status 429;
            proxy_pass http://backend;
        }

        location /api/login {
            limit_req zone=login_limit burst=3 nodelay;
            proxy_pass http://backend;
        }
    }
}
```

## Recipe 6: WebSocket Proxy

```nginx
server {
    location /ws/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_read_timeout 86400s;  # 24h timeout for WebSockets
    }
}
```

## Recipe 7: SPA with Client-Side Routing

```nginx
server {
    listen 80;
    server_name app.example.com;

    root /var/www/spa;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;  # all routes → index.html
    }

    location /api/ {
        proxy_pass http://localhost:3000;  # API goes to backend
    }
}
```

## Useful Commands

```bash
# Test configuration
nginx -t

# Reload without downtime
nginx -s reload

# Show compiled module list
nginx -V

# Check which config file is being used
nginx -T 2>&1 | grep "configuration file"

# Follow logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## Common Gotchas

1. **Client max body size** — defaults to 1MB
   ```nginx
   client_max_body_size 100M;
   ```

2. **Timeout settings** — adjust for long-running requests
   ```nginx
   proxy_read_timeout 300s;
   proxy_connect_timeout 60s;
   ```

3. **Worker connections** — tune for your traffic
   ```nginx
   worker_connections 2048;
   ```

## Conclusion

Nginx is the unsung hero of web infrastructure. Master these recipes and you'll have a rock-solid foundation for any web application.
