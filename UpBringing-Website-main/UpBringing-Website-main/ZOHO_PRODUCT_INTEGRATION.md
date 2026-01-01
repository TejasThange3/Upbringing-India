# Zoho CRM Product Integration Guide

## Overview

The AI recommendation system now fetches product data directly from **Zoho CRM** instead of CSV files. Products are sourced from two modules:

1. **Products GI** (General Information)
2. **Products TI** (Technical Information)

These modules are joined on `Product_ID` to create a complete product dataset for recommendations.

## Architecture Flow

```
User Search
    ↓
React App (SearchSection)
    ↓
Express API (/api/recommendations)
    ↓
Zoho Product Service
    ↓
Zoho CRM API
    ├── Products_GI Module (General Info)
    └── Products_TI Module (Technical Info)
    ↓
Merge on Product_ID
    ↓
Python AI Script (via stdin)
    ↓
Recommendations
    ↓
Display in ProductCard
```

## Zoho CRM Module Structure

### Products GI (General Information)
Contains general product details:
- **Product_ID** - Unique identifier (used for joining)
- **Brand** - Manufacturer brand
- **Product** - Product model name
- **Type** - Product type category
- **Subtype** - Product subtype
- **Description** - Detailed product description
- **Applications** - Comma-separated application types

### Products TI (Technical Information)
Contains technical specifications:
- **Product_ID** - Unique identifier (used for joining)
- **m3/h** - Flow rate
- **Hz** - Frequency
- **Vacuum(mbar)** - Vacuum pressure
- **Pressure(mbar)** - Operating pressure
- **Motor Rating(kW)** - Motor power (used for power classification)
- **RPM** - Rotations per minute
- **Oil (ltr)** - Oil capacity

## Setup Instructions

### 1. Configure Zoho CRM Credentials

Update your `.env` file in the `server` directory:

```env
# Zoho OAuth Credentials
ZOHO_CLIENT_ID=your_client_id_here
ZOHO_CLIENT_SECRET=your_client_secret_here
ZOHO_REFRESH_TOKEN=your_refresh_token_here

# Zoho API Configuration
ZOHO_API_DOMAIN=www.zohoapis.com
ZOHO_ACCOUNTS_URL=https://accounts.zoho.com

# Server Configuration
PORT=3001
ALLOWED_ORIGINS=http://localhost:5173
```

### 2. Get Zoho OAuth Credentials

#### Step 2.1: Register Your Application

1. Go to [Zoho API Console](https://api-console.zoho.com/)
2. Click **Add Client**
3. Select **Server-based Applications**
4. Fill in:
   - **Client Name**: Product Recommendation System
   - **Homepage URL**: http://localhost:3001
   - **Authorized Redirect URI**: http://localhost:3001/callback
5. Click **Create**
6. Copy **Client ID** and **Client Secret**

#### Step 2.2: Generate Refresh Token

1. Build the authorization URL:
```
https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.modules.ALL&client_id=YOUR_CLIENT_ID&response_type=code&access_type=offline&redirect_uri=http://localhost:3001/callback
```

2. Open the URL in a browser
3. Grant permissions
4. Copy the **authorization code** from the redirect URL

5. Exchange code for refresh token:
```bash
curl -X POST "https://accounts.zoho.com/oauth/v2/token" \
  -d "grant_type=authorization_code" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "redirect_uri=http://localhost:3001/callback" \
  -d "code=YOUR_AUTHORIZATION_CODE"
```

6. Copy the **refresh_token** from the response

### 3. Verify Zoho Module Names

Make sure your Zoho CRM has these exact module API names:
- `Products_GI`
- `Products_TI`

To check module names:
1. Go to Zoho CRM → Settings → APIs → API Names
2. Look for your product modules
3. Use the **API Name** (not the display name)

If your modules have different names, update `zohoProductService.js`:

```javascript
// Line 67-68
const [productsGI, productsTI] = await Promise.all([
  fetchZohoModule('Your_Products_GI_Module_Name'),
  fetchZohoModule('Your_Products_TI_Module_Name'),
]);
```

### 4. Configure Field Mappings

If your Zoho fields have different names, update the mapping in `zohoProductService.js`:

```javascript
// Lines 81-97
return {
  // Map your Zoho field names here
  Product_ID: gi.Product_ID || gi.Product_Code,
  Brand: gi.Brand || gi.Manufacturer,
  Product: gi.Product || gi.Model_Name,
  // ... etc
};
```

### 5. Install Dependencies

```bash
cd server
npm install
```

### 6. Start the Server

```bash
cd server
npm start

# Or for development with auto-reload
npm run dev
```

## Testing the Integration

### 1. Test Health Check

```bash
curl http://localhost:3001/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "zoho": {
    "configured": true,
    "productsLoaded": 150
  }
}
```

### 2. Test Product Info

```bash
curl http://localhost:3001/api/products/info
```

Expected response:
```json
{
  "success": true,
  "count": 150,
  "sample": [
    {
      "Product_ID": "P001",
      "Brand": "GENERAL EUROPE VACUUM",
      "Product": "GP300E",
      "Type": "Vacuum Pump",
      // ... more fields
    }
  ],
  "fields": ["Product_ID", "Brand", "Product", ...]
}
```

### 3. Test Recommendations

```bash
curl -X POST http://localhost:3001/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "application": "packaging",
    "power": "high",
    "description": "quiet and efficient",
    "count": 5
  }'
```

Expected response:
```json
{
  "success": true,
  "data": [
    {
      "Product_Name": "GP300E",
      "Brand": "GENERAL EUROPE VACUUM",
      "Application": "Packaging",
      "PowerUsage": "High",
      "Similarity_Score": 85.5
    }
  ]
}
```

### 4. Refresh Products Cache

```bash
curl -X POST http://localhost:3001/api/products/refresh
```

Expected response:
```json
{
  "success": true,
  "message": "Products cache refreshed successfully",
  "count": 150
}
```

## How It Works

### 1. Product Fetching

When a recommendation request is made:

1. **Express endpoint** receives search request
2. **getCachedProducts()** checks if cache is valid (30-minute TTL)
3. If cache is expired or empty:
   - Fetches all records from `Products_GI` module
   - Fetches all records from `Products_TI` module
   - Merges them on `Product_ID`
   - Caches the result for 30 minutes

### 2. Data Merging

```javascript
// Create lookup map for TI data
const tiMap = new Map();
productsTI.forEach(ti => {
  tiMap.set(ti.Product_ID, ti);
});

// Merge GI with corresponding TI
const mergedProducts = productsGI.map(gi => {
  const ti = tiMap.get(gi.Product_ID) || {};
  return { ...gi, ...ti };
});
```

### 3. Python Processing

1. **Express** serializes merged products to JSON
2. Passes JSON to Python script via **stdin**
3. Python script:
   - Reads JSON from stdin
   - Converts to pandas DataFrame
   - Preprocesses data (cleanup, feature engineering)
   - Trains TF-IDF model
   - Calculates hybrid scores
   - Returns top N recommendations

### 4. Power Classification

Products are automatically classified by power usage based on Motor Rating:

```python
if motor_rating >= 5.5 kW:
    return 'high'
elif motor_rating >= 2.0 kW:
    return 'medium'
else:
    return 'low'
```

## Caching Strategy

### Why Caching?

- Reduces API calls to Zoho CRM
- Improves response time
- Stays within Zoho API rate limits

### Cache Configuration

```javascript
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes
```

### Manual Cache Refresh

Force a cache refresh:
```bash
curl -X POST http://localhost:3001/api/products/refresh
```

Or programmatically:
```javascript
const products = await getCachedProducts(true); // forceRefresh = true
```

## Field Mapping for ProductCard

The Python recommendations are mapped to ProductCard format in `App.tsx`:

```typescript
const mappedProducts = response.data.map((item) => ({
  brand: item.Brand,
  product: item.Product_Name,
  type: "Vacuum Pump",
  subtype: item.Product_Name,
  description: `Recommended for ${item.Application} applications`,
  specifications: {
    "Match Score": `${item.Similarity_Score}%`,
    "Application": item.Application,
    "Power Usage": item.PowerUsage,
  },
  applications: [item.Application],
  image: productImage,
}));
```

## API Endpoints Reference

### GET /api/health
Health check with Zoho status

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "zoho": {
    "configured": true,
    "productsLoaded": 150
  }
}
```

### GET /api/products/info
Get product count and sample data

**Response:**
```json
{
  "success": true,
  "count": 150,
  "sample": [...],
  "fields": [...]
}
```

### POST /api/products/refresh
Force refresh Zoho products cache

**Response:**
```json
{
  "success": true,
  "message": "Products cache refreshed successfully",
  "count": 150
}
```

### POST /api/recommendations
Get AI-powered product recommendations

**Request:**
```json
{
  "application": "string",
  "power": "high|medium|low",
  "description": "string",
  "count": 10
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "Product_Name": "GP300E",
      "Brand": "GENERAL EUROPE VACUUM",
      "Application": "Packaging",
      "PowerUsage": "High",
      "Similarity_Score": 85.5
    }
  ]
}
```

## Troubleshooting

### Issue: "No products available from Zoho CRM"

**Causes:**
1. Zoho credentials not configured
2. Invalid refresh token
3. Module names incorrect
4. No data in Zoho modules

**Solution:**
```bash
# Check health endpoint
curl http://localhost:3001/api/health

# Check product info
curl http://localhost:3001/api/products/info

# Check server logs for detailed error messages
```

### Issue: "Failed to fetch Products_GI"

**Cause:** Module name mismatch

**Solution:**
1. Check exact module API name in Zoho CRM
2. Update `zohoProductService.js` line 67-68
3. Restart server

### Issue: "Authorization failed"

**Cause:** Expired or invalid refresh token

**Solution:**
1. Generate new refresh token (see Step 2.2)
2. Update `.env` file
3. Restart server

### Issue: Products not merging correctly

**Cause:** Product_ID field name mismatch

**Solution:**
Check field names in both modules:
```bash
curl http://localhost:3001/api/products/info
```

Update mapping in `zohoProductService.js` if needed.

### Issue: Python script fails

**Cause:** Missing required fields

**Solution:**
Ensure Products GI has these fields:
- Product
- Brand
- Description (or Product_Details)
- Applications (or Application)

Ensure Products TI has:
- Motor Rating(kW) or Motor_Rating_kW

## Performance Optimization

### 1. Increase Cache TTL

For less frequent product updates:
```javascript
const CACHE_TTL = 60 * 60 * 1000; // 60 minutes
```

### 2. Limit Records Per Page

For faster initial load:
```javascript
async function fetchZohoModule(moduleName, page = 1, perPage = 100) {
  // Reduced from 200 to 100
}
```

### 3. Add Product Filtering

Filter products before sending to Python:
```javascript
const products = await getCachedProducts();
const filteredProducts = products.filter(p =>
  p.Type === 'Vacuum Pump' && p.Brand
);
```

## Security Best Practices

1. **Never commit `.env` file**
   - Add to `.gitignore`
   - Use `.env.example` for templates

2. **Use environment variables in production**
   - Set via hosting platform (Heroku, AWS, etc.)
   - Never hardcode credentials

3. **Limit API permissions**
   - Use Zoho OAuth scopes wisely
   - Request only `ZohoCRM.modules.Products_GI` and `Products_TI` if possible

4. **Implement rate limiting**
   - Prevent abuse of recommendation endpoint
   - Use Express rate-limiter middleware

## Production Deployment

### Environment Variables Checklist

- [ ] `ZOHO_CLIENT_ID`
- [ ] `ZOHO_CLIENT_SECRET`
- [ ] `ZOHO_REFRESH_TOKEN`
- [ ] `ZOHO_API_DOMAIN`
- [ ] `ZOHO_ACCOUNTS_URL`
- [ ] `PORT`
- [ ] `ALLOWED_ORIGINS`

### Pre-deployment Testing

```bash
# Test all endpoints
curl http://your-domain.com/api/health
curl http://your-domain.com/api/products/info
curl -X POST http://your-domain.com/api/recommendations -H "Content-Type: application/json" -d '{"application":"packaging","power":"high","description":"test"}'
```

### Monitoring

Set up monitoring for:
- Zoho API response times
- Cache hit/miss ratio
- Recommendation accuracy
- Error rates

## Next Steps

1. **Add Product Images**
   - Store image URLs in Zoho CRM
   - Map them in the response

2. **Enhance Matching**
   - Add more fields to matching algorithm
   - Implement fuzzy matching for applications

3. **Analytics**
   - Track popular searches
   - Monitor recommendation accuracy
   - A/B test different algorithms

4. **User Feedback**
   - Allow users to rate recommendations
   - Use feedback to improve algorithm

## Support

For issues or questions:
1. Check server logs for detailed error messages
2. Test each endpoint individually
3. Verify Zoho CRM data structure
4. Review field mappings in code
