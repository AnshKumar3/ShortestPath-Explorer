# Production Server Setup Guide

## Prerequisites
- Ubuntu 20.04+ server (DigitalOcean, AWS EC2, etc.)
- Domain name pointed to your server IP
- SSH access to the server

## 1. Initial Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Nginx
sudo apt install nginx -y

# Install certbot for SSL
sudo apt install certbot python3-certbot-nginx -y
```

## 2. GitHub Secrets Needed
Add these secrets to your GitHub repository:

- `PRODUCTION_HOST`: Your server IP address
- `PRODUCTION_USER`: SSH username (usually 'ubuntu' or 'root')  
- `PRODUCTION_SSH_KEY`: Private SSH key content

## 3. Nginx Configuration
```nginx
# /etc/nginx/sites-available/pathfinding-visualizer
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 4. SSL Certificate
```bash
sudo certbot --nginx -d your-domain.com
```

## 5. Enable Auto-deployment
Update your GitHub Actions workflow by changing:
```yaml
if: false  # Disabled until production server is configured
```
back to:
```yaml
if: github.ref == 'refs/heads/main'
```

## 6. Deploy
Your GitHub Actions will automatically:
1. Build and push Docker image
2. SSH to your server
3. Pull latest image
4. Restart the container
```
