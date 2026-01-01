# 🚀 Google Cloud Run Deployment Guide

## Why Google Cloud Run is Better

| Feature | Google Cloud Run | Render Free |
|---------|-----------------|-------------|
| **Cold Start** | 1-5 seconds ⚡ | 20-30 seconds 🐌 |
| **Free Tier** | 2M requests/month | 750 hours/month |
| **Reliability** | Google infrastructure | Good |
| **Always Free** | Yes ✅ | May change ⚠️ |
| **Scaling** | Automatic | Manual |
| **Custom Domains** | Free SSL | Limited |

---

## Architecture

```
┌─────────────────────────────────────────┐
│   Cloudflare Pages (Frontend) - FREE    │
│   - React App                           │
│   - Global CDN                          │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│ Cloudflare Workers (Backend) - FREE     │
│ - Zoho APIs                             │
│ - Product data                          │
│ - 95% of backend                        │
└──────────────┬──────────────────────────┘
               │
               ▼ (AI requests only)
┌─────────────────────────────────────────┐
│ Google Cloud Run (AI) - FREE            │
│ - Python AI recommendations             │
│ - 2M requests/month                     │
│ - 1-5 second cold start                 │
└─────────────────────────────────────────┘
```

**Total Cost: $0/month** 🎉

---

## 📋 Prerequisites

1. **Google Cloud Account** (Free tier)
   - Sign up: https://cloud.google.com/free
   - $300 free credit for 90 days
   - Always-free tier after that

2. **gcloud CLI** (Command line tool)
   - Install: https://cloud.google.com/sdk/docs/install

3. **Docker** (Optional - for local testing)
   - Install: https://docs.docker.com/get-docker/

---

## 🚀 Step-by-Step Deployment

### Part 1: Set Up Google Cloud Project (5 minutes)

#### 1. Create Google Cloud Account
- Go to: https://console.cloud.google.com
- Sign in with Google account
- Accept free trial ($300 credit)

#### 2. Create New Project
```bash
# Via Console:
1. Go to: https://console.cloud.google.com
2. Click "Select a project" → "New Project"
3. Name: upbringing-ai
4. Click "Create"

# Or via gcloud:
gcloud projects create upbringing-ai --name="Upbringing AI Service"
```

#### 3. Set Current Project
```bash
gcloud config set project upbringing-ai
```

#### 4. Enable Required APIs
```bash
# Enable Cloud Run API
gcloud services enable run.googleapis.com

# Enable Container Registry
gcloud services enable containerregistry.googleapis.com

# Enable Cloud Build (optional - for CI/CD)
gcloud services enable cloudbuild.googleapis.com
```

#### 5. Set Default Region
```bash
# Choose closest region to your users
gcloud config set run/region us-central1

# Other options:
# - us-east1 (South Carolina)
# - europe-west1 (Belgium)
# - asia-southeast1 (Singapore)
```

---

### Part 2: Deploy AI Service to Cloud Run (10 minutes)

#### Method 1: Direct Deploy (Easiest) ⭐

**1. Login to gcloud:**
```bash
gcloud auth login
```

**2. Build and deploy in one command:**
```bash
# From your project root directory
gcloud run deploy upbringing-ai-service \
  --source . \
  --dockerfile Dockerfile.cloudrun \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10 \
  --timeout 300
```

**3. Set environment variables:**
```bash
# Set Zoho credentials
gcloud run services update upbringing-ai-service \
  --set-env-vars="NODE_ENV=production,ZOHO_CLIENT_ID=your_client_id,ZOHO_CLIENT_SECRET=your_secret,ZOHO_REFRESH_TOKEN=your_token,ZOHO_API_DOMAIN=www.zohoapis.in,ZOHO_ACCOUNTS_URL=https://accounts.zoho.in" \
  --region us-central1
```

**4. Get your service URL:**
```bash
gcloud run services describe upbringing-ai-service \
  --region us-central1 \
  --format='value(status.url)'
```

✅ **Your AI service is now live!**

Example URL: `https://upbringing-ai-service-xxxxx-uc.a.run.app`

---

#### Method 2: Docker Build + Deploy (More Control)

**1. Build Docker image locally:**
```bash
# Build the image
docker build -f Dockerfile.cloudrun -t gcr.io/upbringing-ai/ai-service .

# Test locally (optional)
docker run -p 8080:8080 \
  -e ZOHO_CLIENT_ID=your_id \
  -e ZOHO_CLIENT_SECRET=your_secret \
  -e ZOHO_REFRESH_TOKEN=your_token \
  gcr.io/upbringing-ai/ai-service

# Test: http://localhost:8080/api/health
```

**2. Push to Google Container Registry:**
```bash
# Configure Docker to use gcloud
gcloud auth configure-docker

# Push image
docker push gcr.io/upbringing-ai/ai-service
```

**3. Deploy to Cloud Run:**
```bash
gcloud run deploy upbringing-ai-service \
  --image gcr.io/upbringing-ai/ai-service \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10 \
  --set-env-vars="NODE_ENV=production,ZOHO_CLIENT_ID=your_id,ZOHO_CLIENT_SECRET=your_secret,ZOHO_REFRESH_TOKEN=your_token,ZOHO_API_DOMAIN=www.zohoapis.in,ZOHO_ACCOUNTS_URL=https://accounts.zoho.in"
```

---

#### Method 3: Using Console (GUI)

**1. Go to Cloud Run Console:**
- Visit: https://console.cloud.google.com/run

**2. Click "CREATE SERVICE"**

**3. Container image URL:**
- Select "Deploy one revision from an existing container image"
- Or click "Set up Continuous Deployment" for GitHub integration

**4. Service settings:**
```
Service name: upbringing-ai-service
Region: us-central1
CPU allocation: CPU is only allocated during request processing
Minimum instances: 0 (free tier)
Maximum instances: 10
Memory: 512 MiB
CPU: 1
Request timeout: 300 seconds
```

**5. Authentication:**
- Select: "Allow unauthenticated invocations"

**6. Add environment variables:**
```
NODE_ENV=production
ZOHO_CLIENT_ID=your_client_id
ZOHO_CLIENT_SECRET=your_secret
ZOHO_REFRESH_TOKEN=your_token
ZOHO_API_DOMAIN=www.zohoapis.in
ZOHO_ACCOUNTS_URL=https://accounts.zoho.in
```

**7. Click "CREATE"**

---

### Part 3: Deploy Cloudflare Workers (5 minutes)

```bash
# Install Wrangler (if not installed)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Add secrets
cd workers
wrangler secret put ZOHO_CLIENT_ID
wrangler secret put ZOHO_CLIENT_SECRET
wrangler secret put ZOHO_REFRESH_TOKEN

# Update wrangler.toml with Cloud Run URL
# Edit: workers/wrangler.toml
# Set: AI_SERVICE_URL = "https://upbringing-ai-service-xxxxx-uc.a.run.app"
```

Edit `workers/wrangler.toml`:
```toml
[vars]
ZOHO_API_DOMAIN = "www.zohoapis.in"
ZOHO_ACCOUNTS_URL = "https://accounts.zoho.in"
ZOHO_MODULE_NAME = "Website_Leads"
AI_SERVICE_URL = "https://your-cloud-run-url.run.app"
```

**Deploy Workers:**
```bash
wrangler deploy
```

✅ **Workers deployed!**

---

### Part 4: Deploy Frontend to Cloudflare Pages (5 minutes)

**Option A: GitHub Integration (Auto-deploy)**

1. Push code to GitHub
2. Go to: https://dash.cloudflare.com
3. **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
4. Select repository
5. Build settings:
   ```
   Framework: Vite
   Build command: npm run build
   Build output: build
   ```
6. Environment variables:
   ```
   VITE_API_ENDPOINT=https://your-worker.workers.dev/api/recommendations
   VITE_ZOHO_API_ENDPOINT=https://your-worker.workers.dev/api/zoho/leads
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

**Option B: Wrangler CLI**
```bash
npm run build
wrangler pages deploy build --project-name=upbringing-app
```

✅ **Frontend deployed!**

---

### Part 5: Prevent Cold Starts with UptimeRobot (2 minutes) ⭐

**Why:** Keeps Cloud Run warm, prevents cold starts

**1. Create UptimeRobot account:**
- Visit: https://uptimerobot.com
- Sign up (FREE)

**2. Add new monitor:**
```
Monitor Type: HTTP(s)
Friendly Name: Upbringing AI Service
URL: https://your-cloud-run-url.run.app/api/health
Monitoring Interval: 5 minutes
```

**3. Save**

✅ **No more cold starts!**

---

## 🎯 Environment Variables Summary

### Google Cloud Run (AI Service)
```bash
NODE_ENV=production
PORT=8080
ZOHO_CLIENT_ID=your_client_id
ZOHO_CLIENT_SECRET=your_secret
ZOHO_REFRESH_TOKEN=your_token
ZOHO_API_DOMAIN=www.zohoapis.in
ZOHO_ACCOUNTS_URL=https://accounts.zoho.in
```

### Cloudflare Workers
```bash
# Secrets (use wrangler secret put)
ZOHO_CLIENT_ID=...
ZOHO_CLIENT_SECRET=...
ZOHO_REFRESH_TOKEN=...

# Vars (in wrangler.toml)
ZOHO_API_DOMAIN=www.zohoapis.in
ZOHO_ACCOUNTS_URL=https://accounts.zoho.in
ZOHO_MODULE_NAME=Website_Leads
AI_SERVICE_URL=https://your-cloud-run-url.run.app
```

### Cloudflare Pages (Frontend)
```bash
VITE_API_ENDPOINT=https://your-worker.workers.dev/api/recommendations
VITE_ZOHO_API_ENDPOINT=https://your-worker.workers.dev/api/zoho/leads
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

---

## 💰 Free Tier Limits

### Google Cloud Run (Always Free)
- ✅ **2 million requests/month**
- ✅ **360,000 GB-seconds/month**
- ✅ **180,000 vCPU-seconds/month**
- ✅ **1 GB network egress/month**

**Your usage (estimated):**
- AI requests: ~10,000/month
- Well within free tier! ✅

### Cloudflare Workers (Always Free)
- ✅ **100,000 requests/day**
- ✅ **10ms CPU time per request**

### Cloudflare Pages (Always Free)
- ✅ **Unlimited bandwidth**
- ✅ **500 builds/month**

**Total Cost: $0/month** 🎉

---

## 📊 Performance Comparison

| Metric | Cloud Run | Render Free |
|--------|-----------|-------------|
| Cold Start | 1-5 seconds | 20-30 seconds |
| Warm Response | <100ms | <200ms |
| Uptime (with UptimeRobot) | 99.9% | 99% |
| Scaling | Auto (0-10 instances) | Manual |
| Free Requests | 2M/month | Unlimited (750h) |

---

## 🔧 Useful Commands

### View logs
```bash
gcloud run services logs read upbringing-ai-service \
  --region us-central1 \
  --limit 50
```

### Update service
```bash
gcloud run services update upbringing-ai-service \
  --set-env-vars="NEW_VAR=value" \
  --region us-central1
```

### View service details
```bash
gcloud run services describe upbringing-ai-service \
  --region us-central1
```

### Delete service
```bash
gcloud run services delete upbringing-ai-service \
  --region us-central1
```

### Redeploy
```bash
gcloud run deploy upbringing-ai-service \
  --source . \
  --dockerfile Dockerfile.cloudrun \
  --region us-central1
```

---

## 🐛 Troubleshooting

### Build fails
```bash
# Check Docker is running
docker --version

# Check Dockerfile syntax
docker build -f Dockerfile.cloudrun -t test .
```

### Service not starting
```bash
# Check logs
gcloud run services logs read upbringing-ai-service --region us-central1

# Common issues:
# - Missing environment variables
# - Python dependencies not installing
# - Port not set to 8080
```

### Cold starts still happening
```bash
# Verify UptimeRobot is pinging
# Check interval is 5 minutes
# Verify URL is correct
```

### CORS errors
```bash
# Update CORS in workers/index.js
# Add your Cloudflare Pages domain
```

---

## 🚀 Quick Commands Reference

```bash
# Deploy AI service
gcloud run deploy upbringing-ai-service --source . --dockerfile Dockerfile.cloudrun --region us-central1

# Deploy Workers
cd workers && wrangler deploy

# Deploy Pages
npm run build && wrangler pages deploy build

# View AI logs
gcloud run services logs read upbringing-ai-service --region us-central1 --limit 50

# Test AI service
curl https://your-cloud-run-url.run.app/api/health
```

---

## ✅ Deployment Checklist

- [ ] Google Cloud account created
- [ ] Project created and set
- [ ] APIs enabled
- [ ] gcloud CLI installed and configured
- [ ] AI service deployed to Cloud Run
- [ ] Environment variables set
- [ ] Cloud Run URL obtained
- [ ] Workers updated with Cloud Run URL
- [ ] Workers deployed
- [ ] Frontend deployed to Pages
- [ ] UptimeRobot configured (prevents cold starts)
- [ ] All services tested

---

## 🎉 You're Live!

Your app is now running on:
- **Frontend:** https://your-app.pages.dev
- **Workers:** https://your-worker.workers.dev
- **AI Service:** https://your-service.run.app

**All FREE!** Cost: $0/month 🎉

---

## 📚 Next Steps

1. ✅ Set up custom domain
2. ✅ Monitor usage in Cloud Console
3. ✅ Set up alerts for quota usage
4. ✅ Configure Cloud Build for CI/CD (optional)

---

Need help? Check:
- Cloud Run docs: https://cloud.google.com/run/docs
- Cloudflare docs: https://developers.cloudflare.com
- This project's other guides

Good luck! 🚀
