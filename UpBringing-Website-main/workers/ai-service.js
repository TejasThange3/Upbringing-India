/**
 * Minimal AI Recommendations Service
 *
 * This is a lightweight service ONLY for Python AI recommendations
 * Deploy this to Render FREE tier: https://render.com
 *
 * Everything else runs on Cloudflare Workers (free)
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { getCachedProducts } from '../server/zohoProductService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables (works both locally and on Render)
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 10000; // Render uses port 10000

app.use(cors());
app.use(express.json());

// Pre-load products into Python server on startup
let productsLoaded = false;
async function preloadProducts(retryCount = 0) {
  try {
    console.log('🔄 Pre-loading products from Zoho into Python server...');

    const pythonServerUrl = process.env.PYTHON_SERVER_URL || 'http://localhost:8000';

    // First, check if Python server is ready
    try {
      const healthCheck = await fetch(`${pythonServerUrl}/api/health`);
      if (!healthCheck.ok) {
        throw new Error('Python server not ready');
      }
    } catch (healthError) {
      if (retryCount < 5) {
        console.log(`⏳ Python server not ready, retrying in 2 seconds... (${retryCount + 1}/5)`);
        setTimeout(() => preloadProducts(retryCount + 1), 2000);
        return;
      } else {
        throw new Error('Python server failed to start after 5 retries');
      }
    }

    // Fetch products from Zoho
    const products = await getCachedProducts();

    // Load into Python server
    const response = await fetch(`${pythonServerUrl}/api/load-products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(products)
    });

    if (response.ok) {
      productsLoaded = true;
      console.log(`✅ Loaded ${products.length} products into Python server`);
    } else {
      const errorText = await response.text();
      console.error('❌ Failed to pre-load products:', errorText);
    }
  } catch (error) {
    console.error('❌ Error pre-loading products:', error.message);
  }
}

// Refresh products every 30 minutes in background
setInterval(async () => {
  console.log('🔄 Background refresh: Updating products...');
  await preloadProducts();
}, 30 * 60 * 1000); // 30 minutes

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ai-recommendations-only',
    timestamp: new Date().toISOString()
  });
});

/**
 * AI Recommendations - Calls Python FastAPI server (much faster!)
 */
app.post('/api/recommendations', async (req, res) => {
  try {
    const { application, power, description, count = 10 } = req.body;

    if (!application || !power || !description) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: application, power, description'
      });
    }

    // Check if products are loaded in Python server
    if (!productsLoaded) {
      return res.status(503).json({
        success: false,
        message: 'Products are still loading, please try again in a moment'
      });
    }

    // Call Python FastAPI server (running on port 8000)
    // NO need to send products - they're already cached!
    const pythonServerUrl = process.env.PYTHON_SERVER_URL || 'http://localhost:8000';

    const response = await fetch(`${pythonServerUrl}/api/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        application,
        power,
        description,
        count
        // Products NOT sent - already pre-loaded in Python server!
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Python server error: ${error}`);
    }

    const result = await response.json();
    res.json(result);

  } catch (error) {
    console.error('Error in recommendations endpoint:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`🤖 AI Recommendations Service running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💡 This service ONLY handles AI recommendations`);
  console.log(`💡 All other APIs run on Cloudflare Workers (free)`);

  // Pre-load products on startup (wait for Python server to be ready)
  // Uses retry logic to wait for Python server
  setTimeout(async () => {
    await preloadProducts();
  }, 2000); // Initial 2 second wait, then retries if needed
});
