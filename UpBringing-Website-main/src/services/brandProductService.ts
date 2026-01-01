/**
 * Brand Product Service
 * Fetches and organizes brand products from Zoho CRM
 */

export interface ZohoProduct {
  Product_ID?: string;
  id?: string; // Alternative ID field
  Id?: string; // Alternative ID field
  ID?: string; // Alternative ID field
  Brand: string;
  Product: string;
  Type: string;
  Subtype?: string;
  Series?: string;
  Product_Details?: string; // Backend field name
  Description?: string; // Fallback field name
  Application?: string; // Backend field name
  Applications?: string; // Fallback field name
  Image_URL?: string;
  // Technical specs (matching backend field names)
  'm3/h'?: string;
  Hz?: string;
  'Vacuum(mbar)'?: string;
  'Pressure(mbar)'?: string;
  'Motor Rating (kw)'?: string; // Note: lowercase 'kw' to match backend
  RPM?: string;
  'Oil_ltr'?: string;
  [key: string]: any;
}

export interface ProductSeries {
  name: string;
  image: string;
  description: string;
  productCount: number;
}

export interface ProductCategory {
  title: string;
  series: ProductSeries[];
}

export interface BrandProductData {
  id: number;
  name: string;
  logo: string;
  tagline: string;
  country: string;
  primaryColor: string;
  secondaryColor: string;
  bgColor: string;
  categories: ProductCategory[];
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Get product image URL through worker proxy
 * This is necessary because Zoho image URLs require authentication
 */
export const getProductImageUrl = (product: ZohoProduct): string => {
  // First, check if Image_URL field exists (from backend merge)
  if (product.Image_URL) {
    // If it's a relative path, prepend the API base URL
    if (product.Image_URL.startsWith('/')) {
      return `${API_BASE_URL}${product.Image_URL}`;
    }
    // If it's already a full URL, return as is
    return product.Image_URL;
  }

  // Fallback: Try multiple possible ID fields from Zoho
  const recordId = product.Product_ID || product.id || product.Id || product.ID;

  // If there's no record ID, return empty string
  if (!recordId) {
    console.warn('⚠️ No Image_URL or Product ID found for product:', product.Product);
    return '';
  }

  // Construct the URL from record ID
  return `${API_BASE_URL}/api/products/${recordId}/image`;
};

/**
 * Fetch all products from Zoho
 */
export const fetchZohoProducts = async (): Promise<ZohoProduct[]> => {
  try {
    console.log('🔄 Fetching products from:', `${API_BASE_URL}/api/products/all`);
    const response = await fetch(`${API_BASE_URL}/api/products/all`);

    if (!response.ok) {
      console.error('❌ Failed to fetch products from Zoho:', response.status, response.statusText);
      return [];
    }

    const result = await response.json();
    const products = result.data || [];

    console.log('✅ Fetched products from Zoho:', {
      count: products.length,
      sampleProduct: products[0],
      availableFields: products[0] ? Object.keys(products[0]) : []
    });

    return products;
  } catch (error) {
    console.error('❌ Error fetching Zoho products:', error);
    return [];
  }
};

/**
 * Get products for a specific brand
 */
export const getProductsByBrand = (
  products: ZohoProduct[],
  brandName: string
): ZohoProduct[] => {
  return products.filter(
    (product) => product.Brand?.toLowerCase() === brandName.toLowerCase()
  );
};

/**
 * Group products by Subtype and Series
 */
export const groupProductsBySubtypeAndSeries = (
  products: ZohoProduct[]
): ProductCategory[] => {
  // Group by Subtype first
  const subtypeMap = new Map<string, ZohoProduct[]>();

  products.forEach((product) => {
    const subtype = product.Subtype || product.Type || 'Other Products';

    if (!subtypeMap.has(subtype)) {
      subtypeMap.set(subtype, []);
    }
    subtypeMap.get(subtype)!.push(product);
  });

  // Now group each subtype by Series
  const categories: ProductCategory[] = [];

  subtypeMap.forEach((subtypeProducts, subtypeName) => {
    const seriesMap = new Map<string, ZohoProduct[]>();

    // Group products by their Series field
    subtypeProducts.forEach((product) => {
      // Use Series field if available, otherwise use a default
      const seriesName = product.Series?.trim() || 'Other';

      if (!seriesMap.has(seriesName)) {
        seriesMap.set(seriesName, []);
      }
      seriesMap.get(seriesName)!.push(product);
    });

    // Convert series map to array of ProductSeries
    // Each series will be ONE card, containing multiple products
    const seriesArray: ProductSeries[] = [];
    seriesMap.forEach((seriesProducts, seriesName) => {
      // Get first product's data
      const firstProduct = seriesProducts[0];
      const description =
        firstProduct.Product_Details ||
        firstProduct.Description ||
        `${seriesName} series with ${seriesProducts.length} product${seriesProducts.length > 1 ? 's' : ''}`;

      seriesArray.push({
        name: seriesName,
        image: getProductImageUrl(firstProduct), // Use proxied image URL
        description: description.substring(0, 200) + (description.length > 200 ? '...' : ''),
        productCount: seriesProducts.length,
      });
    });

    categories.push({
      title: subtypeName.toUpperCase(),
      series: seriesArray,
    });
  });

  return categories;
};

/**
 * Get brand colors based on brand name
 */
export const getBrandColors = (
  brandName: string
): { primaryColor: string; secondaryColor: string; bgColor: string } => {
  const brandLower = brandName.toLowerCase();

  if (brandLower.includes('atlas')) {
    return {
      primaryColor: '#DC2626',
      secondaryColor: '#991B1B',
      bgColor: '#FEE2E2',
    };
  } else if (brandLower.includes('fipa')) {
    return {
      primaryColor: '#0891B2',
      secondaryColor: '#0E7490',
      bgColor: '#CFFAFE',
    };
  } else if (brandLower.includes('brivtec')) {
    return {
      primaryColor: '#0369A1',
      secondaryColor: '#075985',
      bgColor: '#E0F2FE',
    };
  } else if (brandLower.includes('europe') || brandLower.includes('general')) {
    return {
      primaryColor: '#DC2626',
      secondaryColor: '#991B1B',
      bgColor: '#E0E7FF',
    };
  } else {
    // Default colors
    return {
      primaryColor: '#0891B2',
      secondaryColor: '#0E7490',
      bgColor: '#F1F5F9',
    };
  }
};

/**
 * Build complete brand data from Zoho products
 */
export const buildBrandDataFromZoho = (
  brandName: string,
  brandId: number,
  products: ZohoProduct[],
  brandLogo: string
): BrandProductData => {
  const brandProducts = getProductsByBrand(products, brandName);
  const categories = groupProductsBySubtypeAndSeries(brandProducts);
  const colors = getBrandColors(brandName);

  return {
    id: brandId,
    name: brandName,
    logo: brandLogo,
    tagline: 'Quality Vacuum Solutions',
    country: 'International',
    ...colors,
    categories,
  };
};
