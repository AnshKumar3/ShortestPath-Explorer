# CI/CD Setup Guide

This document explains the CI/CD pipeline setup for the Pathfinding Visualizer project.

## Overview

The project uses GitHub Actions for continuous integration and deployment with the following workflows:

### 1. Main CI/CD Pipeline (`.github/workflows/ci-cd.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main`

**Jobs:**
- **Test**: Runs linting, type checking, and unit tests
- **Build**: Creates production build artifacts
- **Docker**: Builds and pushes Docker images to registries
- **Deploy Staging**: Deploys to staging environment (develop branch)
- **Deploy Production**: Deploys to production environment (main branch)
- **Lighthouse**: Performance and accessibility testing

### 2. Security & Dependencies (`.github/workflows/security.yml`)

**Triggers:**
- Weekly schedule (Mondays 9:00 AM UTC)
- Manual trigger
- Pull requests (dependency review only)

**Jobs:**
- **Security Audit**: npm audit + Snyk scanning
- **Dependency Review**: Reviews new dependencies in PRs
- **Update Dependencies**: Automated dependency updates with PR creation

### 3. Code Quality (`.github/workflows/quality.yml`)

**Triggers:**
- Push to `main` or `develop`
- Pull requests to `main`

**Jobs:**
- **Code Quality Analysis**: ESLint + SonarCloud
- **Performance Budget**: Bundle size analysis
- **Accessibility Testing**: Automated accessibility checks

## Required Secrets

Add these secrets to your GitHub repository settings:

### Docker Registry
- `DOCKER_USERNAME`: Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub password/token

### Deployment
- `STAGING_HOST`: Staging server IP/hostname
- `STAGING_USER`: SSH username for staging
- `STAGING_SSH_KEY`: Private SSH key for staging

- `PRODUCTION_HOST`: Production server IP/hostname
- `PRODUCTION_USER`: SSH username for production
- `PRODUCTION_SSH_KEY`: Private SSH key for production

### Code Quality & Security
- `SONAR_TOKEN`: SonarCloud token
- `SNYK_TOKEN`: Snyk authentication token
- `CODECOV_TOKEN`: Codecov token (optional)

### Lighthouse CI (optional)
- `LHCI_GITHUB_APP_TOKEN`: Lighthouse CI GitHub app token
- `LHCI_SERVER_BASE_URL`: LHCI server URL
- `LHCI_SERVER_TOKEN`: LHCI server token

## Setup Instructions

### 1. Repository Setup

1. Fork or clone this repository
2. Enable GitHub Actions in your repository settings
3. Add required secrets (see above)

### 2. Docker Registry Setup

**Docker Hub:**
1. Create account on Docker Hub
2. Generate access token
3. Add `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets

**GitHub Container Registry (GHCR):**
- Automatically configured using `GITHUB_TOKEN`

### 3. SonarCloud Setup

1. Sign up at [SonarCloud](https://sonarcloud.io)
2. Import your GitHub repository
3. Get your project key and token
4. Update `sonar-project.properties` with your project details
5. Add `SONAR_TOKEN` secret

### 4. Server Setup

For deployment, you need:

**Staging/Production Servers:**
- Ubuntu/Debian server with Docker installed
- SSH access configured
- Docker daemon running

**SSH Key Setup:**
```bash
# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -f ~/.ssh/deploy_key

# Add public key to server
ssh-copy-id -i ~/.ssh/deploy_key.pub user@server

# Add private key as GitHub secret
cat ~/.ssh/deploy_key | pbcopy
```

### 5. Environment Setup

**GitHub Environments:**
1. Go to repository Settings → Environments
2. Create `staging` and `production` environments
3. Add protection rules (require reviews for production)
4. Add environment-specific secrets

## Branch Strategy

- **`main`**: Production branch, triggers production deployment
- **`develop`**: Development branch, triggers staging deployment  
- **Feature branches**: Create PRs to `main` for code review

## Monitoring & Alerts

### Build Notifications
- GitHub notifications for failed builds
- Slack/Discord webhooks (configure in workflow files)

### Performance Monitoring
- Lighthouse CI reports
- Bundle size tracking
- SonarCloud quality gates

## Local Development with Docker

```bash
# Development with hot reload
docker-compose --profile dev up

# Production build
docker-compose up

# Build only
docker build -t pathfinding-visualizer .
docker run -p 3000:80 pathfinding-visualizer
```

## Troubleshooting

### Common Issues

1. **Docker build fails**
   - Check Dockerfile syntax
   - Ensure all dependencies in package.json
   - Verify build context includes necessary files

2. **Tests fail in CI**
   - Run tests locally first: `npm test`
   - Check for environment-specific issues
   - Review test output in Actions logs

3. **Deployment fails**
   - Verify SSH connection: `ssh user@server`
   - Check Docker daemon on server: `docker ps`
   - Review server logs: `docker logs container-name`

4. **SonarCloud analysis fails**
   - Verify token is valid
   - Check sonar-project.properties configuration
   - Ensure coverage reports are generated

### Getting Help

1. Check GitHub Actions logs for detailed error messages
2. Review this documentation
3. Check individual workflow files for specific configurations
4. Create an issue with logs and error details

## Performance Optimization

- **Caching**: GitHub Actions cache for node_modules and Docker layers
- **Parallel Jobs**: Tests and builds run in parallel when possible
- **Artifact Management**: Build artifacts retained for 7 days
- **Docker Multi-stage**: Optimized production images

## Security Best Practices

- **Secrets Management**: All sensitive data in GitHub secrets
- **Dependency Scanning**: Automated vulnerability checks
- **Access Control**: Environment protection rules
- **Image Scanning**: Docker images scanned for vulnerabilities
- **HTTPS Only**: All deployments use HTTPS
