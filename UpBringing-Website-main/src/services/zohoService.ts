/**
 * Zoho CRM Service
 * Handles API integration with Zoho CRM Website Leads module
 */

export interface WebsiteLeadData {
  fullName: string;
  companyName: string;
  designation: string;
  email: string;
  industryName: string;
  location: string;
  phoneNumber?: string;
  productName?: string;
  brandName?: string;
  message?: string;
}

export interface ZohoResponse {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Submit lead data to Zoho CRM
 * This is a placeholder - actual implementation should use a backend API
 * to keep credentials secure
 */
export const submitToZohoCRM = async (
  leadData: WebsiteLeadData
): Promise<ZohoResponse> => {
  try {
    // IMPORTANT: Replace this URL with your actual backend API endpoint
    const API_ENDPOINT = (typeof process !== 'undefined' && process.env.VITE_ZOHO_API_ENDPOINT) || (typeof (import.meta as any).env !== 'undefined' && (import.meta as any).env.VITE_ZOHO_API_ENDPOINT) || 'http://localhost:3001/api/zoho/leads';

    const payload = {
      data: [
        {
          Full_Name: leadData.fullName,
          Company_Name: leadData.companyName,
          Designation: leadData.designation,
          Email: leadData.email,
          Industry: leadData.industryName,
          Location: leadData.location,
          Contact_Number: leadData.phoneNumber,
          Product: leadData.productName || '',
          Brand: leadData.brandName || '',
          Message: leadData.message || '',
        },
      ],
    };

    console.log('Sending to Zoho CRM:', payload);

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Backend error response:', errorData);
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return {
      success: true,
      message: 'Lead submitted successfully',
      data: result,
    };
  } catch (error) {
    console.error('Error submitting to Zoho CRM:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit lead',
    };
  }
};

/**
 * Direct Zoho CRM API call (USE ONLY FOR TESTING - NOT RECOMMENDED FOR PRODUCTION)
 * This exposes your access token in the frontend
 */
export const submitDirectToZoho = async (
  leadData: WebsiteLeadData,
  accessToken: string
): Promise<ZohoResponse> => {
  try {
    // Get your API domain from Zoho settings (e.g., zohoapis.com, zohoapis.eu, etc.)
    const API_DOMAIN = (typeof process !== 'undefined' && process.env.VITE_ZOHO_API_DOMAIN) || (typeof (import.meta as any).env !== 'undefined' && (import.meta as any).env.VITE_ZOHO_API_DOMAIN) || 'www.zohoapis.com';
    const MODULE_API_NAME = 'Website_Leads'; // Update if your module name is different

    const response = await fetch(
      `https://${API_DOMAIN}/crm/v8/${MODULE_API_NAME}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [
            {
              Full_Name: leadData.fullName,
              Company_Name: leadData.companyName,
              Designation: leadData.designation,
              Email: leadData.email,
              Industry: leadData.industryName,
              Location: leadData.location,
              Contact_Number: leadData.phoneNumber,
              Product: leadData.productName || '',
              Brand: leadData.brandName || '',
              Message: leadData.message || '',
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.data && result.data[0]?.code === 'SUCCESS') {
      return {
        success: true,
        message: 'Lead created successfully in Zoho CRM',
        data: result.data[0].details,
      };
    } else {
      throw new Error(result.data?.[0]?.message || 'Failed to create lead');
    }
  } catch (error) {
    console.error('Error in direct Zoho CRM call:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit lead',
    };
  }
};
