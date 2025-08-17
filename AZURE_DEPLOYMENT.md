# Azure Deployment Guide - Pathfinding Visualizer

## Prerequisites
- Azure for Students account (you have this ✅)
- Azure CLI installed locally
- Your GitHub repository (ShortestPath-Explorer)

## Option 1: Azure Static Web Apps (FREE - Recommended)

### Step 1: Create Azure Static Web App
1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource"
3. Search for "Static Web App"
4. Click "Create"

### Step 2: Configuration
- **Resource Group**: Create new "rg-pathfinding-visualizer"
- **Name**: pathfinding-visualizer-app
- **Plan type**: Free
- **Source**: GitHub
- **Organization**: AnshKumar3
- **Repository**: ShortestPath-Explorer
- **Branch**: main
- **Build preset**: Custom
- **App location**: `/` (root)
- **Output location**: `dist`

### Step 3: Build Configuration
Azure will create a GitHub Actions workflow automatically, but you can customize it:

```yaml
# .github/workflows/azure-static-web-apps.yml (auto-created)
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
      - name: Build And Deploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          output_location: "dist"
```

### Your app will be available at:
`https://pathfinding-visualizer-app.azurestaticapps.net`

---

## Option 2: Azure Container Instances (Using Docker)

### Step 1: Create Container Instance
```bash
# Login to Azure
az login

# Create resource group
az group create --name rg-pathfinding-visualizer --location eastus

# Create container instance
az container create \
  --resource-group rg-pathfinding-visualizer \
  --name pathfinding-visualizer \
  --image ghcr.io/anshkumar3/pathfinding-visualizer:latest \
  --dns-name-label pathfinding-viz-unique \
  --ports 80
```

### Your app will be available at:
`http://pathfinding-viz-unique.eastus.azurecontainer.io`

---

## Option 3: Azure App Service (Container)

### Step 1: Create App Service Plan
```bash
# Create App Service Plan (Free tier)
az appservice plan create \
  --name pathfinding-plan \
  --resource-group rg-pathfinding-visualizer \
  --sku F1 \
  --is-linux

# Create Web App
az webapp create \
  --resource-group rg-pathfinding-visualizer \
  --plan pathfinding-plan \
  --name pathfinding-visualizer-app \
  --deployment-container-image-name ghcr.io/anshkumar3/pathfinding-visualizer:latest
```

---

## Cost Estimate (with $100 student credit)

| Service | Monthly Cost | Student Credit Usage |
|---------|-------------|---------------------|
| Static Web Apps | FREE | $0 |
| Container Instances | ~$15 | 15% of credit |
| App Service (Free) | FREE | $0 |
| App Service (Basic) | ~$13 | 13% of credit |

## Recommendation: Start with Static Web Apps

It's **FREE** and perfect for your React application!
