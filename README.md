# Upbringing - Professional Card Generation Platform

A modern web application for creating professional cards with AI-powered product recommendations, integrated with Zoho CRM and Firebase authentication.

---

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start frontend dev server
npm run dev

# Start backend (in another terminal)
npm run start:backend:dev
```

Visit: http://localhost:3000

---

## 📦 Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Radix UI Components
- React Router
- Firebase Authentication

**Backend:**
- Node.js + Express
- Zoho CRM Integration
- Python AI Recommendations
- Cloudflare Workers (production)

**Deployment:**
- Cloudflare Pages (Frontend)
- Cloudflare Workers (Backend APIs)
- Google Cloud Run (AI Service)

---

## 🎯 Features

- ✅ Professional card generation
- ✅ AI-powered product recommendations
- ✅ Zoho CRM integration for lead management
- ✅ Firebase authentication
- ✅ Real-time product data from Zoho
- ✅ Responsive design
- ✅ Dark mode support

---

## 📚 Documentation

### **Deployment Guides**
1. **[DEPLOY_FREE.md](DEPLOY_FREE.md)** ⭐ **START HERE**
   - Deploy 100% FREE (Cloudflare + Google Cloud Run)
   - 25 minutes setup
   - $0/month cost

2. **[GOOGLE_CLOUD_RUN_GUIDE.md](GOOGLE_CLOUD_RUN_GUIDE.md)**
   - Detailed Cloud Run deployment
   - Advanced configuration
   - Troubleshooting

3. **[README_DEPLOYMENT.md](README_DEPLOYMENT.md)**
   - Overview of all deployment options
   - Comparison table
   - Quick reference

### **Setup Guides**
- **[FIREBASE_AUTH_SETUP.md](FIREBASE_AUTH_SETUP.md)** - Firebase authentication setup
- **[ZOHO_CRM_SETUP.md](ZOHO_CRM_SETUP.md)** - Zoho CRM configuration
- **[ZOHO_INTEGRATION_SUMMARY.md](ZOHO_INTEGRATION_SUMMARY.md)** - Zoho integration details
- **[ZOHO_PRODUCT_INTEGRATION.md](ZOHO_PRODUCT_INTEGRATION.md)** - Product data integration

---

## 🛠️ Project Structure

```
upbringing/
├── src/                    # React frontend source
│   ├── components/        # UI components
│   ├── pages/            # Page components
│   └── lib/              # Utilities
├── server/                # Express backend
│   ├── index.js          # Main server file
│   └── zohoProductService.js
├── workers/               # Cloudflare Workers
│   ├── index.js          # Workers API
│   └── ai-service.js     # AI service for Cloud Run
├── public/               # Static files
│   ├── _redirects       # SPA routing
│   └── _headers         # Security headers
├── build/               # Production build (generated)
└── package.json         # Dependencies
```

---

## 🔧 Environment Variables

### Frontend (.env)
```bash
VITE_API_ENDPOINT=http://localhost:3001/api/recommendations
VITE_ZOHO_API_ENDPOINT=http://localhost:3001/api/zoho/leads
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Backend (server/.env)
```bash
ZOHO_CLIENT_ID=your_client_id
ZOHO_CLIENT_SECRET=your_secret
ZOHO_REFRESH_TOKEN=your_token
ZOHO_API_DOMAIN=www.zohoapis.in
ZOHO_ACCOUNTS_URL=https://accounts.zoho.in
NODE_ENV=development
PORT=3001
```

---

## 📝 Available Scripts

### Development
```bash
npm run dev              # Start frontend dev server
npm run start:backend    # Start backend server
npm run start:ai-service # Start AI service only
```

### Build
```bash
npm run build           # Build frontend for production
```

### Deployment
```bash
npm run deploy:cloudrun  # Deploy AI to Google Cloud Run
npm run deploy:workers   # Deploy to Cloudflare Workers
npm run deploy:cloudflare # Deploy frontend to Pages
npm run gcloud:logs     # View Cloud Run logs
npm run gcloud:url      # Get Cloud Run URL
```

### Process Management (VPS)
```bash
npm run pm2:status      # Check PM2 status
npm run pm2:logs        # View PM2 logs
npm run pm2:restart     # Restart application
```

---

## 🚀 Deployment

### **Recommended: 100% FREE Stack**

Deploy using:
- **Cloudflare Pages** (Frontend) - FREE
- **Cloudflare Workers** (Backend APIs) - FREE
- **Google Cloud Run** (AI Service) - FREE

**Total Cost: $0/month**

**Quick Deploy:**
1. Read [DEPLOY_FREE.md](DEPLOY_FREE.md)
2. Follow 3 simple steps
3. Deploy in 25 minutes

---

## 🔒 Security

- ✅ HTTPS everywhere
- ✅ Environment variables for secrets
- ✅ CORS configured
- ✅ Firebase authentication
- ✅ Input validation
- ✅ Security headers

---

## 📊 Free Tier Limits

| Service | Free Tier |
|---------|-----------|
| Cloudflare Pages | Unlimited bandwidth |
| Cloudflare Workers | 100k requests/day |
| Google Cloud Run | 2M requests/month |
| Firebase Auth | 10k MAU |

**More than enough for most projects!**

---

## 🐛 Troubleshooting

### Build fails
```bash
# Check Node version
node --version  # Should be 18+

# Clean install
rm -rf node_modules build
npm install
npm run build
```

### Backend won't start
```bash
# Check environment variables
cat .env

# Check port availability
lsof -i :3001
```

### For more help, see:
- [DEPLOY_FREE.md](DEPLOY_FREE.md) - Deployment troubleshooting
- [GOOGLE_CLOUD_RUN_GUIDE.md](GOOGLE_CLOUD_RUN_GUIDE.md) - Cloud Run issues

---

## 📞 Support

- **Deployment Issues:** Check [DEPLOY_FREE.md](DEPLOY_FREE.md)
- **Zoho Issues:** Check [ZOHO_CRM_SETUP.md](ZOHO_CRM_SETUP.md)
- **Firebase Issues:** Check [FIREBASE_AUTH_SETUP.md](FIREBASE_AUTH_SETUP.md)

---

## 🎉 Ready to Deploy?

**Start here:** [DEPLOY_FREE.md](DEPLOY_FREE.md)

Deploy your app 100% FREE in 25 minutes! 🚀

---

## 📄 License

MIT License - See LICENSE file for details

---

**Built with ❤️ using React, Cloudflare, and Google Cloud**
