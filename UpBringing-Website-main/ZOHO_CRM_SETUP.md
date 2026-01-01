# Zoho CRM Integration Setup Guide

This guide will help you integrate your InquiryModal form with Zoho CRM's "Website Leads" module.

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Step 1: Register Zoho CRM Application](#step-1-register-zoho-crm-application)
- [Step 2: Generate Refresh Token](#step-2-generate-refresh-token)
- [Step 3: Configure Backend Server](#step-3-configure-backend-server)
- [Step 4: Configure Frontend](#step-4-configure-frontend)
- [Step 5: Run the Application](#step-5-run-the-application)
- [Field Mapping](#field-mapping)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Zoho CRM account with admin access
- Node.js v18 or higher installed
- Access to Zoho Developer Console

---

## Step 1: Register Zoho CRM Application

### 1.1 Access Developer Console
1. Go to [Zoho Developer Console](https://api-console.zoho.com/)
2. Click **"GET STARTED"** or **"Add Client"**

### 1.2 Choose Client Type
- Select **"Self Client"** (recommended for backend applications)
- Or select **"Server-based Applications"** if you need multi-user support

### 1.3 Fill in Details
- **Client Name**: `Website Leads Integration` (or your preferred name)
- **Homepage URL**: `http://localhost:3001` (for development)
- **Authorized Redirect URIs**: `http://localhost:3001/callback`

### 1.4 Get Credentials
1. After creation, go to the **"Client Secret"** tab
2. Copy your **Client ID** and **Client Secret**
3. Save these credentials securely

---

## Step 2: Generate Refresh Token

### 2.1 Generate Authorization Code

1. Create the authorization URL (replace `{CLIENT_ID}` with your actual Client ID):

```
https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL&client_id={CLIENT_ID}&response_type=code&access_type=offline&redirect_uri=http://localhost:3001/callback
```

2. Paste this URL in your browser
3. Grant permissions to your application
4. You'll be redirected to a URL like:
   ```
   http://localhost:3001/callback?code=1000.abc123xyz...&location=us&accounts-server=https://accounts.zoho.com
   ```
5. Copy the **code** parameter value

### 2.2 Exchange Code for Refresh Token

Run this command (replace placeholders):

```bash
curl -X POST https://accounts.zoho.com/oauth/v2/token \
  -d "code={AUTHORIZATION_CODE}" \
  -d "client_id={CLIENT_ID}" \
  -d "client_secret={CLIENT_SECRET}" \
  -d "redirect_uri=http://localhost:3001/callback" \
  -d "grant_type=authorization_code"
```

Response will include:
```json
{
  "access_token": "1000.xxx",
  "refresh_token": "1000.yyy",
  "expires_in": 3600
}
```

**Save the `refresh_token`** - you'll need this for the backend configuration.

---

## Step 3: Configure Backend Server

### 3.1 Navigate to Server Directory
```bash
cd server
```

### 3.2 Install Dependencies
```bash
npm install
```

### 3.3 Create Environment File
```bash
cp .env.example .env
```

### 3.4 Edit `.env` File
```env
PORT=3001

# Your credentials from Step 1 & 2
ZOHO_CLIENT_ID=your_client_id_here
ZOHO_CLIENT_SECRET=your_client_secret_here
ZOHO_REFRESH_TOKEN=your_refresh_token_here

# API Configuration (change if using EU/India/etc.)
ZOHO_API_DOMAIN=www.zohoapis.com
ZOHO_ACCOUNTS_URL=https://accounts.zoho.com

# Module name in Zoho CRM
ZOHO_MODULE_NAME=Website_Leads

# Allow frontend to connect
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

**Important Domain Settings:**
- US: `www.zohoapis.com` and `https://accounts.zoho.com`
- EU: `www.zohoapis.eu` and `https://accounts.zoho.eu`
- India: `www.zohoapis.in` and `https://accounts.zoho.in`
- Australia: `www.zohoapis.com.au` and `https://accounts.zoho.com.au`
- China: `www.zohoapis.com.cn` and `https://accounts.zoho.com.cn`

### 3.5 Verify Module Name in Zoho CRM
1. Go to Zoho CRM Settings
2. Navigate to **Modules and Fields**
3. Find your module (should be "Website_Leads" or similar)
4. Check the **API Name** column
5. Update `ZOHO_MODULE_NAME` in `.env` if different

---

## Step 4: Configure Frontend

### 4.1 Navigate to Project Root
```bash
cd ..
```

### 4.2 Create Environment File
```bash
cp .env.example .env
```

### 4.3 Edit `.env` File
```env
VITE_ZOHO_API_ENDPOINT=http://localhost:3001/api/zoho/leads
VITE_ZOHO_API_DOMAIN=www.zohoapis.com
```

---

## Step 5: Run the Application

### 5.1 Start Backend Server
```bash
cd server
npm start
```

You should see:
```
🚀 Zoho CRM Backend API running on port 3001
📊 Health check: http://localhost:3001/api/health
✅ Zoho CRM credentials configured
```

### 5.2 Test Backend Health
Open: http://localhost:3001/api/health

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-11-15T...",
  "zoho": {
    "configured": true
  }
}
```

### 5.3 Start Frontend (in a new terminal)
```bash
npm run dev
```

### 5.4 Test the Form
1. Open your app: http://localhost:5173
2. Open the InquiryModal form
3. Fill in all required fields
4. Submit the form
5. Check Zoho CRM to verify the lead was created

---

## Field Mapping

The form fields map to Zoho CRM fields as follows:

| Form Field      | Zoho CRM Field     | Type     | Required |
|----------------|-------------------|----------|----------|
| Full Name      | `Full_Name`       | Text     | Yes      |
| Company Name   | `Company`         | Text     | Yes      |
| Designation    | `Designation`     | Text     | Yes      |
| Email          | `Email`           | Email    | Yes      |
| Industry Name  | `Industry`        | Text     | Yes      |
| Location       | `Location`        | Text     | Yes      |
| Phone Number   | `Phone`           | Phone    | Optional |
| Product Name   | `Product_Interest`| Text     | Optional |
| -              | `Lead_Source`     | Text     | Auto (Website) |

**Note:** If your Zoho CRM module has different field names, update them in:
- `/server/index.js` (line ~95)
- `/src/services/zohoService.ts` (lines 34-45)

---

## Troubleshooting

### Problem: "Invalid OAuth token" Error

**Solution:**
1. Check if refresh token is still valid in Zoho
2. Regenerate refresh token (Step 2)
3. Update `.env` in server folder
4. Restart backend server

### Problem: "Module not found" Error

**Solution:**
1. Verify module API name in Zoho CRM Settings
2. Update `ZOHO_MODULE_NAME` in `server/.env`
3. Restart backend server

### Problem: "CORS Error" in Browser Console

**Solution:**
1. Ensure backend is running on port 3001
2. Check `ALLOWED_ORIGINS` in `server/.env`
3. Add your frontend URL to the allowed origins

### Problem: "Field does not exist" Error

**Solution:**
1. Go to Zoho CRM > Settings > Modules and Fields
2. Select "Website_Leads" module
3. Verify all field API names match the code
4. Update field names in:
   - `/server/index.js`
   - `/src/services/zohoService.ts`

### Problem: Backend Not Starting

**Solution:**
```bash
cd server
rm -rf node_modules package-lock.json
npm install
npm start
```

### Checking Logs

**Backend logs:**
Check terminal where backend is running

**Frontend logs:**
Open browser DevTools > Console

**Zoho API logs:**
- Go to Zoho Developer Console
- Click on your client
- Check "API Logs" tab

---

## Production Deployment

### Security Checklist
- [ ] Never expose `.env` files
- [ ] Use environment-specific credentials
- [ ] Enable HTTPS for production
- [ ] Implement rate limiting
- [ ] Add request validation
- [ ] Monitor API usage in Zoho Developer Console
- [ ] Set up error logging (e.g., Sentry)

### Environment Variables
Update production values:
- Backend: Use your hosting provider's environment variable system
- Frontend: Update Vite build with production API endpoint

### Hosting Recommendations
- **Backend**: Heroku, Railway, Render, AWS Lambda
- **Frontend**: Vercel, Netlify, Cloudflare Pages

---

## Additional Resources

- [Zoho CRM API Documentation](https://www.zoho.com/crm/developer/docs/api/v8/)
- [OAuth 2.0 Guide](https://www.zoho.com/crm/developer/docs/api/v8/oauth-overview.html)
- [Module API Reference](https://www.zoho.com/crm/developer/docs/api/v8/modules-api.html)
- [API Rate Limits](https://www.zoho.com/crm/developer/docs/api/v8/api-limits.html)

---

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Zoho CRM API logs
3. Check backend and frontend console logs
4. Verify all credentials and configurations

For Zoho-specific issues, contact [Zoho CRM Support](https://help.zoho.com/portal/en/community/zoho-crm)
