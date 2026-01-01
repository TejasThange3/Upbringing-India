/**
 * Cloudflare Workers - Free Backend API
 *
 * This handles most of your backend for FREE on Cloudflare Workers:
 * - Zoho CRM lead submission
 * - Product data fetching
 * - Health checks
 * - Product image proxy
 *
 * Note: AI recommendations still need external service (Render free tier or Railway)
 */

/**
 * CORS headers for all responses
 * In production, you can restrict Access-Control-Allow-Origin to your specific domain
 * For now, we allow all origins for flexibility during deployment
 */
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Allows all origins - change to your domain for production
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400', // Cache preflight requests for 24 hours
};

// Access token cache (Workers KV or in-memory)
let cachedAccessToken = null;
let tokenExpiryTime = null;

/**
 * Main request handler
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Route requests
    try {
      // Health check
      if (url.pathname === '/api/health') {
        return handleHealth(env);
      }

      // Zoho lead submission
      if (url.pathname === '/api/zoho/leads' && request.method === 'POST') {
        return handleZohoLead(request, env);
      }

      // Get all products
      if (url.pathname === '/api/products/all') {
        return handleGetProducts(env);
      }

      // Get product info
      if (url.pathname === '/api/products/info') {
        return handleProductInfo(env);
      }

      // Refresh products cache
      if (url.pathname === '/api/products/refresh' && request.method === 'POST') {
        return handleRefreshProducts(env);
      }

      // Product image proxy
      const imageMatch = url.pathname.match(/^\/api\/products\/([^/]+)\/image$/);
      if (imageMatch) {
        return handleProductImage(imageMatch[1], env);
      }

      // AI Recommendations - Redirect to external service
      if (url.pathname === '/api/recommendations') {
        return handleRecommendations(request, env);
      }

      // 404 for unknown routes
      return jsonResponse({ error: 'Not found' }, 404);

    } catch (error) {
      console.error('Error:', error);
      return jsonResponse({
        error: 'Internal server error',
        message: error.message
      }, 500);
    }
  }
};

/**
 * Health check endpoint
 */
async function handleHealth(env) {
  const configured = !!(env.ZOHO_CLIENT_ID && env.ZOHO_CLIENT_SECRET && env.ZOHO_REFRESH_TOKEN);

  return jsonResponse({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: 'cloudflare-workers',
    zoho: {
      configured: configured
    }
  });
}

/**
 * Get Zoho access token (with caching)
 */
async function getAccessToken(env) {
  // Check cache
  if (cachedAccessToken && tokenExpiryTime && Date.now() < tokenExpiryTime) {
    return cachedAccessToken;
  }

  // Refresh token
  const response = await fetch(
    `${env.ZOHO_ACCOUNTS_URL}/oauth/v2/token?refresh_token=${env.ZOHO_REFRESH_TOKEN}&client_id=${env.ZOHO_CLIENT_ID}&client_secret=${env.ZOHO_CLIENT_SECRET}&grant_type=refresh_token`,
    { method: 'POST' }
  );

  if (!response.ok) {
    throw new Error(`Failed to refresh token: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.access_token) {
    cachedAccessToken = data.access_token;
    // Cache for 55 minutes (token expires in 60)
    tokenExpiryTime = Date.now() + 55 * 60 * 1000;
    return cachedAccessToken;
  }

  throw new Error('No access token in response');
}

/**
 * Fetch all records from a Zoho CRM module with pagination
 */
async function fetchZohoModule(moduleName, env, page = 1, perPage = 200, allRecords = []) {
  const accessToken = await getAccessToken(env);
  const url = `https://${env.ZOHO_API_DOMAIN}/crm/v2/${moduleName}?page=${page}&per_page=${perPage}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    console.error(`Zoho API Error for ${moduleName}:`, JSON.stringify(result, null, 2));
    throw new Error(`Failed to fetch ${moduleName}: ${response.status} ${response.statusText}`);
  }

  if (result.data && result.data.length > 0) {
    allRecords = allRecords.concat(result.data);

    // Check if there are more pages
    if (result.info && result.info.more_records) {
      return fetchZohoModule(moduleName, env, page + 1, perPage, allRecords);
    }
  }

  return allRecords;
}

/**
 * Fetch and merge Products GI and TI modules
 */
async function fetchAndMergeProducts(env) {
  try {
    // Fetch both modules in parallel
    const [productsGI, productsTI] = await Promise.all([
      fetchZohoModule('Products_GI', env),
      fetchZohoModule('Products_TI', env),
    ]);

    console.log(`Fetched ${productsGI.length} products from Products_GI`);
    console.log(`Fetched ${productsTI.length} products from Products_TI`);

    // Create a map of Product TI for efficient lookup
    // The Product ID is in the "Name" field in Zoho
    const tiMap = new Map();
    productsTI.forEach(ti => {
      const key = ti.Name || ti.id;  // Name is the Product ID
      if (key) {
        tiMap.set(key, ti);
      }
    });

    // Helper function to extract image URL from Zoho image field
    const getImageUrl = (imageField, recordId) => {
      if (!imageField) return '';

      // If it's a Zoho Record_Image hash (encrypted string), build the proxy URL
      if (typeof imageField === 'string' && imageField.length > 50) {
        // Use relative path - worker will handle it
        return `/api/products/${recordId}/image`;
      }

      // If it's already a direct URL string
      if (typeof imageField === 'string' && (imageField.startsWith('http://') || imageField.startsWith('https://'))) {
        return imageField;
      }

      // If it's an array (Zoho image upload field format)
      if (Array.isArray(imageField) && imageField.length > 0) {
        return imageField[0].download_url || imageField[0].url || '';
      }

      // If it's an object
      if (typeof imageField === 'object' && imageField.download_url) {
        return imageField.download_url || imageField.url || '';
      }

      return '';
    };

    // Merge GI and TI data
    const mergedProducts = productsGI.map(gi => {
      // Use Name field as the Product ID for matching
      const lookupKey = gi.Name || gi.id;
      const ti = tiMap.get(lookupKey) || {};

      // Extract image URL from various possible field formats
      const recordId = gi.id;
      const imageUrl = getImageUrl(gi.Image, recordId) ||
                      getImageUrl(gi.Record_Image, recordId) ||
                      getImageUrl(gi.Image_URL, recordId) ||
                      getImageUrl(gi.Product_Image, recordId) ||
                      getImageUrl(gi.Photo_URL, recordId) ||
                      '';

      return {
        // General Information (GI)
        Product_ID: gi.Name || gi.id,  // Name is the Product ID (e.g., "PD041")
        Brand: gi.Brand || 'Unknown Brand',
        Product: gi.Product || 'Unknown Product',  // Product name (e.g., "GS 40")
        Type: gi.Type || '',
        Subtype: gi.Subtype || '',
        Series: gi.Series || '',  // Product Series (e.g., "GP/GPM SERIES")

        // Use Python-compatible names directly
        Product_Details: gi.Description || '',
        Application: gi.Applications || '',
        Image_URL: imageUrl,  // Extracted product image URL

        // Technical Information (TI) - merged from Products_TI
        'm3/h': ti.m3_h || ti['m3/h'] || '',
        Hz: ti.Hz || '',
        'Vacuum(mbar)': ti.Vacuum_mbar || ti['Vacuum(mbar)'] || '',
        'Pressure(mbar)': ti.Pressure_mbar || ti['Pressure(mbar)'] || '',
        'Motor Rating (kw)': ti.Motor_Rating_kW || ti['Motor Rating(kW)'] || ti.Motor_Rating || '',
        RPM: ti.RPM || '',
        'Oil_ltr': ti.Oil_ltr || ti['Oil (ltr)'] || '',
      };
    });

    console.log(`Merged ${mergedProducts.length} products (GI + TI)`);
    return mergedProducts;

  } catch (error) {
    console.error('Error fetching and merging products:', error);
    throw error;
  }
}

/**
 * Handle Zoho lead submission
 */
async function handleZohoLead(request, env) {
  const body = await request.json();
  const leadData = body.data?.[0];

  if (!leadData) {
    return jsonResponse({
      success: false,
      message: 'Invalid lead data format'
    }, 400);
  }

  // Validate required fields
  const requiredFields = ['Full_Name', 'Email', 'Company_Name'];
  const missingFields = requiredFields.filter(field => !leadData[field]);

  if (missingFields.length > 0) {
    return jsonResponse({
      success: false,
      message: `Missing required fields: ${missingFields.join(', ')}`
    }, 400);
  }

  // Get access token
  const accessToken = await getAccessToken(env);

  // Submit to Zoho CRM
  const zohoResponse = await fetch(
    `https://${env.ZOHO_API_DOMAIN}/crm/v8/${env.ZOHO_MODULE_NAME}`,
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
    return jsonResponse({
      success: true,
      message: 'Lead created successfully',
      data: zohoData.data[0].details
    });
  }

  throw new Error(zohoData.data?.[0]?.message || 'Unknown error occurred');
}

/**
 * Get all products from Zoho CRM (merged GI + TI)
 */
async function handleGetProducts(env) {
  try {
    // Fetch and merge Products_GI and Products_TI
    const products = await fetchAndMergeProducts(env);

    return jsonResponse({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error getting all products:', error);
    return jsonResponse({
      success: false,
      message: error.message || 'Failed to get all products',
      data: []
    }, 500);
  }
}

/**
 * Get product info (count and sample) - merged GI + TI
 */
async function handleProductInfo(env) {
  try {
    // Fetch and merge Products_GI and Products_TI
    const products = await fetchAndMergeProducts(env);

    return jsonResponse({
      success: true,
      count: products.length,
      sample: products.slice(0, 3),
      fields: products.length > 0 ? Object.keys(products[0]) : []
    });
  } catch (error) {
    console.error('Error getting product info:', error);
    return jsonResponse({
      success: false,
      message: error.message || 'Failed to get product info'
    }, 500);
  }
}

/**
 * Refresh products cache
 */
async function handleRefreshProducts(env) {
  // For Workers, we don't maintain a long-term cache
  // Just fetch fresh data
  return handleGetProducts(env);
}

/**
 * Product image proxy
 * This endpoint is CRITICAL for image loading in production
 * It proxies product images from Zoho CRM with proper authentication
 */
async function handleProductImage(recordId, env) {
  try {
    const accessToken = await getAccessToken(env);

    const response = await fetch(
      `https://${env.ZOHO_API_DOMAIN}/crm/v2/Products_GI/${recordId}/photo`,
      {
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
        }
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch image for product ${recordId}: ${response.status}`);
      return jsonResponse({
        success: false,
        message: 'Failed to fetch product image'
      }, 404);
    }

    // Return the image with appropriate headers
    return new Response(response.body, {
      headers: {
        'Content-Type': response.headers.get('content-type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
        ...corsHeaders
      }
    });
  } catch (error) {
    console.error(`Error fetching image for product ${recordId}:`, error);
    return jsonResponse({
      success: false,
      message: 'Error fetching product image',
      error: error.message
    }, 500);
  }
}

/**
 * AI Recommendations - Proxy to external service
 *
 * This proxies to your free Render/Railway service that handles Python
 */
async function handleRecommendations(request, env) {
  // Check if external AI service is configured
  if (!env.AI_SERVICE_URL) {
    return jsonResponse({
      success: false,
      message: 'AI service not configured. Please set AI_SERVICE_URL environment variable.'
    }, 503);
  }

  // Proxy the request to external AI service
  const body = await request.json();

  const response = await fetch(`${env.AI_SERVICE_URL}/api/recommendations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  return jsonResponse(data, response.status);
}

/**
 * Helper function to create JSON responses
 */
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}
