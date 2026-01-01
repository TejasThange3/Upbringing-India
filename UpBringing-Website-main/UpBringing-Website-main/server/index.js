import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { getCachedProducts } from './zohoProductService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from parent directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Serve static files from frontend build in production
if (NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '..', 'build');
  app.use(express.static(buildPath));
}

// Zoho Configuration
const ZOHO_CONFIG = {
  clientId: process.env.ZOHO_CLIENT_ID,
  clientSecret: process.env.ZOHO_CLIENT_SECRET,
  refreshToken: process.env.ZOHO_REFRESH_TOKEN,
  apiDomain: process.env.ZOHO_API_DOMAIN || 'www.zohoapis.com',
  accountsUrl: process.env.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.com',
  moduleName: process.env.ZOHO_MODULE_NAME || 'Website_Leads',
};

// Store access token in memory (consider using Redis for production)
let cachedAccessToken = null;
let tokenExpiryTime = null;

/**
 * Get a valid access token (refresh if expired)
 */
async function getAccessToken() {
  // Check if cached token is still valid
  if (cachedAccessToken && tokenExpiryTime && Date.now() < tokenExpiryTime) {
    return cachedAccessToken;
  }

  try {
    const response = await fetch(
      `${ZOHO_CONFIG.accountsUrl}/oauth/v2/token?refresh_token=${ZOHO_CONFIG.refreshToken}&client_id=${ZOHO_CONFIG.clientId}&client_secret=${ZOHO_CONFIG.clientSecret}&grant_type=refresh_token`,
      { method: 'POST' }
    );

    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.access_token) {
      cachedAccessToken = data.access_token;
      // Token expires in 1 hour, cache for 55 minutes
      tokenExpiryTime = Date.now() + 55 * 60 * 1000;
      return cachedAccessToken;
    } else {
      throw new Error('No access token in response');
    }
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
}

/**
 * Submit lead to Zoho CRM
 */
app.post('/api/zoho/leads', async (req, res) => {
  try {
    const leadData = req.body.data?.[0];

    if (!leadData) {
      return res.status(400).json({
        success: false,
        message: 'Invalid lead data format'
      });
    }

    // Validate required fields
    const requiredFields = ['Full_Name', 'Email', 'Company_Name'];
    const missingFields = requiredFields.filter(field => !leadData[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Get access token
    const accessToken = await getAccessToken();

    // Submit to Zoho CRM
    const zohoResponse = await fetch(
      `https://${ZOHO_CONFIG.apiDomain}/crm/v8/${ZOHO_CONFIG.moduleName}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [leadData],
        }),
      }
    );

    const zohoData = await zohoResponse.json();

    if (!zohoResponse.ok) {
      throw new Error(zohoData.message || 'Failed to create lead in Zoho CRM');
    }

    // Check if lead was created successfully
    if (zohoData.data && zohoData.data[0]?.code === 'SUCCESS') {
      res.json({
        success: true,
        message: 'Lead created successfully',
        data: zohoData.data[0].details
      });
    } else {
      throw new Error(zohoData.data?.[0]?.message || 'Unknown error occurred');
    }

  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

/**
 * Get product recommendations using AI with Zoho CRM data
 */
app.post('/api/recommendations', async (req, res) => {
  try {
    const { application, power, description, count = 10 } = req.body;

    // Validate required fields
    if (!application || !power || !description) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: application, power, description'
      });
    }

    // Fetch products from Zoho CRM
    console.log('Fetching products from Zoho CRM...');
    const products = await getCachedProducts();

    if (!products || products.length === 0) {
      return res.status(500).json({
        success: false,
        message: 'No products available from Zoho CRM'
      });
    }

    console.log(`Loaded ${products.length} products from Zoho`);

    // Path to Python script
    const pythonScript = path.join(__dirname, '..', 'aitools2.py');

    // Determine Python command based on platform
    // Windows uses 'python', Linux/Mac use 'python3'
    const pythonCommand = process.platform === 'win32' ? 'python' : 'python3';

    console.log(`Using Python command: ${pythonCommand}`);

    // Spawn Python process with stdin data
    const pythonProcess = spawn(pythonCommand, [
      pythonScript,
      '--application', application,
      '--power', power,
      '--description', description,
      '--count', count.toString(),
      '--json',
      '--data-stdin'
    ]);

    let stdout = '';
    let stderr = '';

    // Send product data to Python via stdin
    pythonProcess.stdin.write(JSON.stringify(products));
    pythonProcess.stdin.end();

    // Collect stdout data
    pythonProcess.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    // Collect stderr data
    pythonProcess.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    // Handle process completion
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Python script error:', stderr);
        return res.status(500).json({
          success: false,
          message: 'Error running recommendation engine',
          error: stderr
        });
      }

      try {
        const result = JSON.parse(stdout);
        res.json(result);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Python output:', stdout);
        res.status(500).json({
          success: false,
          message: 'Error parsing recommendation results',
          error: parseError.message
        });
      }
    });

    // Handle process errors
    pythonProcess.on('error', (error) => {
      console.error('Failed to start Python process:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to start recommendation engine',
        error: error.message
      });
    });

  } catch (error) {
    console.error('Error in recommendations endpoint:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

/**
 * Manually refresh Zoho products cache
 */
app.post('/api/products/refresh', async (req, res) => {
  try {
    console.log('Manually refreshing Zoho products cache...');
    const products = await getCachedProducts(true); // Force refresh
    res.json({
      success: true,
      message: 'Products cache refreshed successfully',
      count: products.length
    });
  } catch (error) {
    console.error('Error refreshing products:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to refresh products'
    });
  }
});

/**
 * Get product count and sample
 */
app.get('/api/products/info', async (req, res) => {
  try {
    const products = await getCachedProducts();
    res.json({
      success: true,
      count: products.length,
      sample: products.slice(0, 3), // First 3 products
      fields: products.length > 0 ? Object.keys(products[0]) : []
    });
  } catch (error) {
    console.error('Error getting product info:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get product info'
    });
  }
});

/**
 * Get all products from Zoho CRM
 */
app.get('/api/products/all', async (req, res) => {
  try {
    const products = await getCachedProducts();
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error getting all products:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get all products',
      data: []
    });
  }
});

// Proxy endpoint for product images from Zoho
app.get('/api/products/:recordId/image', async (req, res) => {
  try {
    const { recordId } = req.params;
    const accessToken = await getAccessToken();

    // Fetch image from Zoho
    const imageUrl = `https://${ZOHO_CONFIG.apiDomain}/crm/v2/Products_GI/${recordId}/photo`;

    const response = await fetch(imageUrl, {
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    // Get the content type from Zoho response
    const contentType = response.headers.get('content-type');

    // Set appropriate headers
    res.setHeader('Content-Type', contentType || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours

    // Pipe the image data to the response
    response.body.pipe(res);
  } catch (error) {
    console.error('Error fetching product image:', error);
    res.status(404).json({
      success: false,
      message: error.message || 'Failed to fetch product image'
    });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const products = await getCachedProducts().catch(() => null);
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: NODE_ENV,
      zoho: {
        configured: !!(ZOHO_CONFIG.clientId && ZOHO_CONFIG.clientSecret && ZOHO_CONFIG.refreshToken),
        productsLoaded: products ? products.length : 0
      }
    });
  } catch (error) {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: NODE_ENV,
      zoho: {
        configured: !!(ZOHO_CONFIG.clientId && ZOHO_CONFIG.clientSecret && ZOHO_CONFIG.refreshToken),
        productsLoaded: 0,
        error: error.message
      }
    });
  }
});

// Serve frontend for all non-API routes in production
if (NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Zoho CRM Backend API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);

  // Verify Zoho configuration
  if (!ZOHO_CONFIG.clientId || !ZOHO_CONFIG.clientSecret || !ZOHO_CONFIG.refreshToken) {
    console.warn('⚠️  WARNING: Zoho credentials not configured. Please check your .env file');
  } else {
    console.log('✅ Zoho CRM credentials configured');
  }
});
