# Zoho CRM Backend API

Backend server for handling Zoho CRM integration securely.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env and add your Zoho credentials
   ```

3. **Start server:**
   ```bash
   npm start
   ```

4. **Verify it's working:**
   Open: http://localhost:3001/api/health

## Environment Variables

Required variables in `.env`:

- `ZOHO_CLIENT_ID` - From Zoho Developer Console
- `ZOHO_CLIENT_SECRET` - From Zoho Developer Console
- `ZOHO_REFRESH_TOKEN` - Generated via OAuth flow
- `ZOHO_API_DOMAIN` - Your Zoho API domain (e.g., www.zohoapis.com)
- `ZOHO_MODULE_NAME` - CRM module name (default: Website_Leads)

## API Endpoints

### POST /api/zoho/leads
Submit a new lead to Zoho CRM

**Request Body:**
```json
{
  "data": [{
    "Full_Name": "John Doe",
    "Company": "ABC Corp",
    "Designation": "Manager",
    "Email": "john@example.com",
    "Industry": "Technology",
    "Location": "New York",
    "Phone": "1234567890",
    "Product_Interest": "Product A",
    "Lead_Source": "Website"
  }]
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "id": "1234567890123456789"
  }
}
```

### GET /api/health
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-15T10:00:00.000Z",
  "zoho": {
    "configured": true
  }
}
```

## Development

Run with auto-reload:
```bash
npm run dev
```

## Security Notes

- Never commit `.env` file
- Keep refresh token secure
- Use HTTPS in production
- Implement rate limiting for production use

## Troubleshooting

See main [ZOHO_CRM_SETUP.md](../ZOHO_CRM_SETUP.md) for detailed troubleshooting guide.
