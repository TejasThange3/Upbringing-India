# 🎉 Deploy 100% FREE - Quick Start Guide

## The Best Free Stack (No Credit Card Required!)

```
Frontend  → Cloudflare Pages     (FREE)
Backend   → Cloudflare Workers   (FREE)
AI        → Render Free Tier     (FREE)
Total     → $0/month              🎉
```

**Why Render?**
- ✅ No credit card required
- ✅ 750 hours/month FREE
- ✅ Easy deployment from GitHub
- ✅ Auto-deploy on git push
- ⚠️ Cold starts (~20-30s after 15min idle)

---

## 🚀 Deploy in 3 Steps (20 minutes)

### Step 1: Deploy AI Service to Render (10 min)

**1. Create Render account (FREE, no credit card):**
- Go to: https://render.com
- Sign up with GitHub (recommended)

**2. Create new Web Service:**
- Click **New** → **Web Service**
- Connect your GitHub repository
- Render will auto-detect it

**3. Configure the service:**
```
Name: upbringing-ai-service
Environment: Node
Root Directory: (leave empty)
Build Command: cd server && npm install && cd ../workers && npm install
Start Command: cd workers && node ai-service.js
```

**4. Select FREE tier:**
- Instance Type: **Free**
- Auto-Deploy: **Yes** (deploys on git push)

**5. Add environment variables:**
Click **Environment** → Add these:
```
NODE_ENV=production
PORT=10000

ZOHO_CLIENT_ID=your_client_id
ZOHO_CLIENT_SECRET=your_secret
ZOHO_REFRESH_TOKEN=your_token
ZOHO_API_DOMAIN=www.zohoapis.in
ZOHO_ACCOUNTS_URL=https://accounts.zoho.in
```

**6. Deploy!**
- Click **Create Web Service**
- Wait 5-10 minutes for first deployment

**7. Copy your Render URL:**
- Example: `https://upbringing-ai-service.onrender.com`
- You'll need this for Workers!

✅ **AI service deployed on Render!**

---

### Step 2: Deploy Workers to Cloudflare (5 min)

```bash
# 1. Install Wrangler
npm install -g wrangler

# 2. Login
wrangler login

# 3. Add secrets
cd workers
wrangler secret put ZOHO_CLIENT_ID
wrangler secret put ZOHO_CLIENT_SECRET
wrangler secret put ZOHO_REFRESH_TOKEN

# 4. Update wrangler.toml
# Edit: workers/wrangler.toml
# Add your Render URL:
# AI_SERVICE_URL = "https://your-render-app.onrender.com"

# 5. Deploy!
wrangler deploy
cd ..

# Copy your Workers URL (shown in output)
https://upbringing-backend.upbringing-backend.workers.dev
```

✅ **Workers deployed!**

---

### Step 3: Deploy Frontend to Cloudflare Pages (10 min)

**Option A: GitHub (Auto-deploy) - Recommended**

```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Go to Cloudflare Dashboard
# Visit: https://dash.cloudflare.com
# Workers & Pages → Create → Pages → Connect to Git

# 3. Configure:
Framework: Vite
Build command: npm run build
Build output: build

# 4. Add environment variables:
VITE_API_ENDPOINT=https://your-worker.workers.dev/api/recommendations
VITE_ZOHO_API_ENDPOINT=https://your-worker.workers.dev/api/zoho/leads
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# 5. Deploy!
```

**Option B: Wrangler CLI (Manual)**

```bash
npm run build
wrangler pages deploy build --project-name=upbringing-app
```

✅ **Frontend deployed!**

---

## 🔥 BONUS: Prevent Cold Starts (2 min)

**Set up UptimeRobot to keep Render warm:**

1. Go to: https://uptimerobot.com (FREE)
2. Create account
3. Add monitor:
   ```
   Monitor Type: HTTP(s)
   URL: https://your-render-app.onrender.com/api/health
   Interval: 5 minutes
   ```
4. Save

✅ **No more cold starts!**

**Note:** Render free tier spins down after 15 minutes of inactivity. UptimeRobot keeps it awake by pinging every 5 minutes.

---

## ✅ Deployment Checklist

### Before You Start
- [ ] Google Cloud account (free)
- [ ] Cloudflare account (free)
- [ ] GitHub account
- [ ] Zoho CRM credentials
- [ ] Firebase credentials

### Deployment Steps
- [ ] AI service deployed to Render
- [ ] Environment variables set on Render
- [ ] Render URL copied
- [ ] Workers deployed to Cloudflare
- [ ] Workers configured with Cloud Run URL
- [ ] Workers URL copied
- [ ] Frontend deployed to Cloudflare Pages
- [ ] Frontend environment variables set
- [ ] UptimeRobot configured (optional)

### Testing
- [ ] Health check works: `curl https://your-cloud-run-url.run.app/api/health`
- [ ] Workers health: `curl https://your-worker.workers.dev/api/health`
- [ ] Frontend loads: Visit your Pages URL
- [ ] Submit test lead
- [ ] Test AI recommendations

---

## 🎯 Environment Variables Quick Reference

### Render
```bash
NODE_ENV=production
PORT=10000
ZOHO_CLIENT_ID=your_client_id
ZOHO_CLIENT_SECRET=your_secret
ZOHO_REFRESH_TOKEN=your_token
ZOHO_API_DOMAIN=www.zohoapis.in
ZOHO_ACCOUNTS_URL=https://accounts.zoho.in
```

### Workers (wrangler.toml)
```toml
[vars]
ZOHO_API_DOMAIN = "www.zohoapis.in"
ZOHO_ACCOUNTS_URL = "https://accounts.zoho.in"
ZOHO_MODULE_NAME = "Website_Leads"
AI_SERVICE_URL = "https://your-render-app.onrender.com"
```

### Pages
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

## 📝 Quick Commands

```bash
# AI service
# Deploy via Render dashboard (auto-deploys on git push)

# View logs
# Check Render dashboard → Logs tab

# Deploy Workers
cd workers && wrangler deploy

# Deploy Pages
npm run build && wrangler pages deploy build

# View Workers logs
npm run cf:tail
```

---

## 🐛 Troubleshooting

### Render service not starting
```bash
# Check logs in Render dashboard
# Go to your service → Logs tab
# Common issues:
# - Missing environment variables
# - Build command incorrect
# - Port should be 10000
```

### Workers can't reach Render
```bash
# Verify AI_SERVICE_URL in workers/wrangler.toml
# Should be: https://your-app.onrender.com
# NO trailing slash!
```

### Frontend shows CORS errors
```bash
# Update CORS in workers/index.js
# Add your Cloudflare Pages domain
```

### Cold starts still happening
```bash
# Verify UptimeRobot is pinging every 5 minutes (or less)
# Check the URL is correct
# Test: curl https://your-render-app.onrender.com/api/health
# Note: First request after 15min idle will be slow (~30s)
```

---

## 💰 Cost Breakdown

| Service | What It Provides | Cost |
|---------|-----------------|------|
| **Cloudflare Pages** | Frontend hosting, CDN | FREE |
| **Cloudflare Workers** | Backend APIs (95%) | FREE |
| **Render** | AI recommendations | FREE |
| **UptimeRobot** | Keep-alive service | FREE |
| **TOTAL** | Full stack app | **$0/month** 🎉 |

**Free tier limits:**
- Pages: Unlimited bandwidth
- Workers: 100k requests/day
- Render: 750 hours/month (one service = always free)
- More than enough for most apps!

**No credit card required!** ✅

---

## 🎉 You're Live!

Your app is now running at:
- **Frontend:** https://your-app.pages.dev
- **Workers:** https://your-worker.workers.dev
- **AI Service:** https://your-app.onrender.com

**Total cost: $0/month** 🎉
**No credit card required!** ✅

---

## 📚 Detailed Guides

Need more details?
- **Cloud Run:** `GOOGLE_CLOUD_RUN_GUIDE.md`
- **Cloudflare:** `CLOUDFLARE_DEPLOYMENT.md`
- **All options:** `README_DEPLOYMENT.md`

---

## 🚀 Next Steps

1. ✅ Add custom domain (free)
2. ✅ Set up monitoring
3. ✅ Configure alerts
4. ✅ Share your app!

---

**Questions?** Check the detailed guides or Cloud Run docs.

**Good luck!** 🚀
