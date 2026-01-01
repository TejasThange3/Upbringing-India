import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

// Zoho Configuration
const ZOHO_CONFIG = {
  clientId: process.env.ZOHO_CLIENT_ID,
  clientSecret: process.env.ZOHO_CLIENT_SECRET,
  refreshToken: process.env.ZOHO_REFRESH_TOKEN,
  apiDomain: process.env.ZOHO_API_DOMAIN || 'www.zohoapis.in',
  accountsUrl: process.env.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.in',
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
 * Fetch all records from a Zoho CRM module
 */
async function fetchZohoModule(moduleName, page = 1, perPage = 200, allRecords = []) {
  try {
    const accessToken = await getAccessToken();
    // Use v2 API - v8 only returns IDs for custom modules
    const url = `https://${ZOHO_CONFIG.apiDomain}/crm/v2/${moduleName}?page=${page}&per_page=${perPage}`;

    // Removed verbose logging for speed

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(`Zoho API Error Response:`, JSON.stringify(result, null, 2));
      throw new Error(`Failed to fetch ${moduleName}: ${response.status} ${response.statusText} - ${result.message || result.code || JSON.stringify(result)}`);
    }

    if (result.data && result.data.length > 0) {
      allRecords = allRecords.concat(result.data);
      // Removed verbose logging for speed

      // Check if there are more pages
      if (result.info && result.info.more_records) {
        return fetchZohoModule(moduleName, page + 1, perPage, allRecords);
      }
    }

    return allRecords;
  } catch (error) {
    console.error(`Error fetching ${moduleName}:`, error.message);
    throw error;
  }
}

/**
 * Fetch and merge Products GI and TI modules
 */
export async function fetchAndMergeProducts() {
  try {
    // Fetch both modules in parallel (removed verbose logging for speed)
    const [productsGI, productsTI] = await Promise.all([
      fetchZohoModule('Products_GI'),
      fetchZohoModule('Products_TI'),
    ]);

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
        // This is a Zoho file hash - use our proxy endpoint
        const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3001';
        return `${apiBaseUrl}/api/products/${recordId}/image`;
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

        // Use Python-compatible names directly (no duplicates!)
        Product_Details: gi.Description || '',
        Application: gi.Applications || '',
        Image_URL: imageUrl,  // Extracted product image download URL from Zoho

        // Technical Information (TI)
        'm3/h': ti.m3_h || ti['m3/h'] || '',
        Hz: ti.Hz || '',
        'Vacuum(mbar)': ti.Vacuum_mbar || ti['Vacuum(mbar)'] || '',
        'Pressure(mbar)': ti.Pressure_mbar || ti['Pressure(mbar)'] || '',
        'Motor Rating (kw)': ti.Motor_Rating_kW || ti['Motor Rating(kW)'] || ti.Motor_Rating || '',
        RPM: ti.RPM || '',
        'Oil_ltr': ti.Oil_ltr || ti['Oil (ltr)'] || '',
      };
    });

    // Successfully merged products (removed logging for speed)
    return mergedProducts;

  } catch (error) {
    console.error('Error fetching and merging products:', error);
    throw error;
  }
}

/**
 * Cache products in memory with TTL (Time To Live)
 */
let productsCache = null;
let cacheExpiryTime = null;
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

export async function getCachedProducts(forceRefresh = false) {
  // Check if cache is valid
  if (!forceRefresh && productsCache && cacheExpiryTime && Date.now() < cacheExpiryTime) {
    // Returning cached products (removed logging for speed)
    return productsCache;
  }

  // Fetch fresh data (removed logging for speed)
  productsCache = await fetchAndMergeProducts();
  cacheExpiryTime = Date.now() + CACHE_TTL;

  return productsCache;
}
