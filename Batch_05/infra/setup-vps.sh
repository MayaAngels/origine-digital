#!/bin/bash
# ===================================================
# ORIGINE.DIGITAL ? VPS Bootstrap Script
# Run once on a fresh Ubuntu 22.04 VPS as root
# ===================================================

set -e
echo "?? ORIGINE.DIGITAL ? VPS Bootstrap"
echo "===================================="

# ---------- SYSTEM UPDATES ----------
echo "[1/7] Updating system..."
apt update && apt upgrade -y
apt install -y curl wget nginx certbot python3-certbot-nginx ufw fail2ban git

# ---------- FIREWALL ----------
echo "[2/7] Configuring firewall..."
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 3000/tcp
ufw --force enable
echo "? Firewall configured"

# ---------- NODE.JS 22.x ----------
echo "[3/7] Installing Node.js 22..."
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
npm install -g pm2
echo "? Node.js $(node -v) installed"

# ---------- REDIS (Self-Hosted) ----------
echo "[4/7] Installing Redis..."
apt install -y redis-server
sed -i 's/^bind .*/bind 127.0.0.1/' /etc/redis/redis.conf
sed -i 's/^appendonly no/appendonly yes/' /etc/redis/redis.conf
systemctl enable redis-server
systemctl restart redis-server
echo "? Redis installed (localhost only)"

# ---------- DOCKER (for Mailcow) ----------
echo "[5/7] Installing Docker..."
curl -fsSL https://get.docker.com | bash
systemctl enable docker
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
echo "? Docker installed"

# ---------- MAILCOW (Self-Hosted Email) ----------
echo "[6/7] Installing Mailcow email server..."
cd /opt
git clone https://github.com/mailcow/mailcow-dockerized.git 2>/dev/null || echo "Mailcow already cloned"
cd mailcow-dockerized
cat > mailcow.conf << 'EOFMAIL'
MAILCOW_HOSTNAME=mail.originedigital.ie
MAILCOW_TZ=Europe/Dublin
MAILCOW_BRANCH=master
SKIP_LETS_ENCRYPT=n
SKIP_CLAMD=y
SKIP_SOLR=y
SKIP_SOGO=n
HTTP_PORT=8080
HTTP_BIND=127.0.0.1
HTTPS_PORT=8443
HTTPS_BIND=127.0.0.1
EOFMAIL
docker-compose pull
docker-compose up -d
echo "? Mailcow installed"

# ---------- PROJECT DIRECTORY ----------
echo "[7/7] Creating project directory..."
mkdir -p /var/www/originedigital
cd /var/www/originedigital

echo ""
echo "??????????????????????????????????????????????????"
echo "   ? VPS Bootstrap Complete!"
echo "??????????????????????????????????????????????????"
echo ""
echo "   ?? Mailcow Admin: https://mail.originedigital.ie"
echo "      Default login: admin / moohoo"
echo "      ?? CHANGE THE PASSWORD IMMEDIATELY!"
echo ""
echo "   ???  Redis: localhost:6379 (internal only)"
echo "   ?? Firewall: UFW active"
echo ""
echo "   ?? Next: Run setup-nginx.sh"
echo ""
echo "   ??  After Mailcow is running, create mailboxes:"
echo "      docker-compose exec mailcow-mailcow-1 /bin/bash"
echo "      ./mailcow create maya@originedigital.ie"
echo "      ./mailcow create hello@originedigital.ie"
echo "      ./mailcow create support@originedigital.ie"
