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

let cachedAccessToken = null;
let tokenExpiryTime = null;

async function getAccessToken() {
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

async function testDifferentApproaches() {
  const accessToken = await getAccessToken();
  const moduleName = 'Products_GI';

  console.log('\n=== TEST 1: Default (no fields parameter) ===');
  try {
    const url1 = `https://${ZOHO_CONFIG.apiDomain}/crm/v8/${moduleName}?per_page=1`;
    const res1 = await fetch(url1, {
      headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}` }
    });
    const data1 = await res1.json();
    console.log('Result:', JSON.stringify(data1, null, 2));
  } catch (e) {
    console.error('Error:', e.message);
  }

  console.log('\n=== TEST 2: With fields=all (lowercase) ===');
  try {
    const url2 = `https://${ZOHO_CONFIG.apiDomain}/crm/v8/${moduleName}?per_page=1&fields=all`;
    const res2 = await fetch(url2, {
      headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}` }
    });
    const data2 = await res2.json();
    console.log('Result:', JSON.stringify(data2, null, 2));
  } catch (e) {
    console.error('Error:', e.message);
  }

  console.log('\n=== TEST 3: Get module fields metadata ===');
  try {
    const url3 = `https://${ZOHO_CONFIG.apiDomain}/crm/v8/settings/fields?module=${moduleName}`;
    const res3 = await fetch(url3, {
      headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}` }
    });
    const data3 = await res3.json();
    console.log('Available fields:');
    if (data3.fields) {
      data3.fields.forEach(field => {
        console.log(`  - ${field.api_name} (${field.data_type}) - Display: ${field.field_label}`);
      });
    } else {
      console.log('Result:', JSON.stringify(data3, null, 2));
    }
  } catch (e) {
    console.error('Error:', e.message);
  }

  console.log('\n=== TEST 4: Try with v2 API ===');
  try {
    const url4 = `https://${ZOHO_CONFIG.apiDomain}/crm/v2/${moduleName}?per_page=1`;
    const res4 = await fetch(url4, {
      headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}` }
    });
    const data4 = await res4.json();
    console.log('Result:', JSON.stringify(data4, null, 2));
  } catch (e) {
    console.error('Error:', e.message);
  }

  console.log('\n=== TEST 5: Get specific record by ID ===');
  try {
    // First get a record ID
    const urlList = `https://${ZOHO_CONFIG.apiDomain}/crm/v8/${moduleName}?per_page=1`;
    const resList = await fetch(urlList, {
      headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}` }
    });
    const dataList = await resList.json();

    if (dataList.data && dataList.data[0] && dataList.data[0].id) {
      const recordId = dataList.data[0].id;
      console.log(`Fetching record ${recordId}...`);

      const url5 = `https://${ZOHO_CONFIG.apiDomain}/crm/v8/${moduleName}/${recordId}`;
      const res5 = await fetch(url5, {
        headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}` }
      });
      const data5 = await res5.json();
      console.log('Result:', JSON.stringify(data5, null, 2));
    } else {
      console.log('No records found to fetch');
    }
  } catch (e) {
    console.error('Error:', e.message);
  }
}

testDifferentApproaches().catch(console.error);
