#!/bin/bash
# ===================================================
# ORIGINE.DIGITAL ? Nginx Reverse Proxy + SSL
# ===================================================

set -e
echo "?? ORIGINE.DIGITAL ? Nginx + SSL Setup"

DOMAIN="originedigital.ie"

# ---------- NEXT.JS REVERSE PROXY ----------
echo "[1/3] Creating Nginx config..."
cat > /etc/nginx/sites-available/originedigital << 'EOFNGINX'
server {
    listen 80;
    server_name originedigital.ie www.originedigital.ie;

    # Next.js application
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # WebSocket support
    location /_next/webpack-hmr {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # SSE support (real-time feed)
    location /api/feed/live {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Connection '';
        proxy_buffering off;
        proxy_cache off;
        chunked_transfer_encoding off;
    }

    # Admin dashboard
    location /admin {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Mailcow webmail
server {
    listen 80;
    server_name mail.originedigital.ie;

    location / {
        proxy_pass https://127.0.0.1:8443;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOFNGINX

ln -sf /etc/nginx/sites-available/originedigital /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
echo "? Nginx configured"

# ---------- SSL VIA CERTBOT ----------
echo "[2/3] Obtaining SSL certificates..."
certbot --nginx \
    -d originedigital.ie \
    -d www.originedigital.ie \
    -d mail.originedigital.ie \
    --non-interactive \
    --agree-tos \
    --email maya@originedigital.ie \
    --redirect
echo "? SSL certificates installed"

# ---------- VERIFY ----------
echo "[3/3] Verifying..."
nginx -t && systemctl restart nginx
echo "? Nginx running with SSL"

echo ""
echo "??????????????????????????????????????????????????"
echo "   ? Nginx + SSL Setup Complete!"
echo "??????????????????????????????????????????????????"
echo ""
echo "   ?? https://originedigital.ie"
echo "   ?? https://mail.originedigital.ie"
echo ""
echo "   ?? Next: Deploy Next.js app"
