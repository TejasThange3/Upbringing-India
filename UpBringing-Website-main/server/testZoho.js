import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const ZOHO_CONFIG = {
  clientId: process.env.ZOHO_CLIENT_ID,
  clientSecret: process.env.ZOHO_CLIENT_SECRET,
  refreshToken: process.env.ZOHO_REFRESH_TOKEN,
  apiDomain: process.env.ZOHO_API_DOMAIN || 'www.zohoapis.in',
  accountsUrl: process.env.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.in',
};

async function getAccessToken() {
  try {
    const response = await fetch(
      `${ZOHO_CONFIG.accountsUrl}/oauth/v2/token?refresh_token=${ZOHO_CONFIG.refreshToken}&client_id=${ZOHO_CONFIG.clientId}&client_secret=${ZOHO_CONFIG.clientSecret}&grant_type=refresh_token`,
      { method: 'POST' }
    );

    const data = await response.json();

    if (data.access_token) {
      return data.access_token;
    } else {
      throw new Error('No access token in response: ' + JSON.stringify(data));
    }
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

async function listModules() {
  try {
    console.log('🔍 Getting access token...');
    const accessToken = await getAccessToken();
    console.log('✅ Access token obtained\n');

    console.log('📋 Fetching all modules from Zoho CRM...');
    const response = await fetch(
      `https://${ZOHO_CONFIG.apiDomain}/crm/v8/settings/modules`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ Error fetching modules:', JSON.stringify(result, null, 2));
      return;
    }

    console.log(`\n📦 Found ${result.modules.length} modules:\n`);

    // Filter for product-related modules
    const productModules = result.modules.filter(m =>
      m.api_name.toLowerCase().includes('product') ||
      m.module_name.toLowerCase().includes('product')
    );

    if (productModules.length > 0) {
      console.log('🎯 Product-related modules:');
      productModules.forEach(module => {
        console.log(`  - API Name: ${module.api_name}`);
        console.log(`    Display Name: ${module.module_name}`);
        console.log(`    Plural Label: ${module.plural_label}`);
        console.log('');
      });
    } else {
      console.log('⚠️  No product-related modules found.');
      console.log('\nAll available modules:');
      result.modules.forEach(module => {
        console.log(`  - ${module.api_name} (${module.module_name})`);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function getModuleFields(moduleName) {
  try {
    console.log(`\n📊 Getting fields for module: ${moduleName}`);
    const accessToken = await getAccessToken();

    const response = await fetch(
      `https://${ZOHO_CONFIG.apiDomain}/crm/v8/settings/fields?module=${moduleName}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error(`❌ Error: ${response.status}`);
      console.error('Response:', JSON.stringify(result, null, 2));
      return null;
    }

    if (result.fields && result.fields.length > 0) {
      console.log(`✅ Found ${result.fields.length} fields:`);
      const apiNames = result.fields.map(f => f.api_name);
      console.log(apiNames.join(', '));
      return apiNames;
    }

    return null;
  } catch (error) {
    console.error('❌ Error:', error.message);
    return null;
  }
}

async function testModuleFetch(moduleName) {
  try {
    console.log(`\n🧪 Testing fetch for module: ${moduleName}`);
    const accessToken = await getAccessToken();

    // Try with fields=All first
    let response = await fetch(
      `https://${ZOHO_CONFIG.apiDomain}/crm/v8/${moduleName}?per_page=1&fields=All`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
        },
      }
    );

    let result = await response.json();

    if (!response.ok) {
      console.error(`❌ Error: ${response.status} ${response.statusText}`);
      console.error('Response:', JSON.stringify(result, null, 2));
      return;
    }

    if (result.data && result.data.length > 0) {
      console.log(`✅ Module exists! Found ${result.info.count || result.data.length} records`);
      console.log('\nSample record fields:');
      console.log(Object.keys(result.data[0]).join(', '));
      console.log('\nSample record:');
      console.log(JSON.stringify(result.data[0], null, 2));
    } else {
      console.log('⚠️  Module exists but has no records');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Main execution
console.log('🚀 Zoho CRM Module Tester\n');
console.log('Configuration:');
console.log(`  API Domain: ${ZOHO_CONFIG.apiDomain}`);
console.log(`  Accounts URL: ${ZOHO_CONFIG.accountsUrl}`);
console.log(`  Client ID: ${ZOHO_CONFIG.clientId.substring(0, 20)}...`);
console.log('');

// List all modules
await listModules();

// Get fields for product modules
console.log('\n' + '='.repeat(60));
console.log('Getting field names for product modules:');
console.log('='.repeat(60));

await getModuleFields('Products_GI');
await getModuleFields('Products_TI');

// Test specific modules
console.log('\n' + '='.repeat(60));
console.log('Testing data fetch with fields=All:');
console.log('='.repeat(60));

await testModuleFetch('Products_GI');
await testModuleFetch('Products_TI');
