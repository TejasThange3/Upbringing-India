import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchZohoProducts, type ZohoProduct } from '../services/brandProductService';

interface ProductsContextType {
  products: ZohoProduct[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const CACHE_KEY = 'zoho_products_cache_v2'; // v2: Now includes Products_TI (Technical Information)
const CACHE_EXPIRY_KEY = 'zoho_products_cache_expiry_v2';
const CACHE_TTL = 2 * 60 * 60 * 1000; // 2 hours (matching backend)

interface CachedData {
  products: ZohoProduct[];
  timestamp: number;
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<ZohoProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if cache is valid
  const isCacheValid = (): boolean => {
    try {
      const expiryTime = localStorage.getItem(CACHE_EXPIRY_KEY);
      if (!expiryTime) return false;

      return Date.now() < parseInt(expiryTime);
    } catch {
      return false;
    }
  };

  // Load products from localStorage cache
  const loadFromCache = (): ZohoProduct[] | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const data: CachedData = JSON.parse(cached);
      return data.products;
    } catch (error) {
      console.error('Error loading products from cache:', error);
      return null;
    }
  };

  // Save products to localStorage cache
  const saveToCache = (products: ZohoProduct[]): void => {
    try {
      const data: CachedData = {
        products,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(CACHE_EXPIRY_KEY, (Date.now() + CACHE_TTL).toString());
    } catch (error) {
      console.error('Error saving products to cache:', error);
    }
  };

  // Fetch products from API
  const fetchProducts = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchZohoProducts();

      if (data && data.length > 0) {
        setProducts(data);
        saveToCache(data);
      } else {
        setError('No products found');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  // Refetch products (force refresh)
  const refetch = async (): Promise<void> => {
    await fetchProducts();
  };

  // Initialize products on mount
  useEffect(() => {
    const initProducts = async () => {
      // Check if we have valid cached data
      if (isCacheValid()) {
        const cachedProducts = loadFromCache();
        if (cachedProducts && cachedProducts.length > 0) {
          console.log(`Loaded ${cachedProducts.length} products from cache`);
          setProducts(cachedProducts);
          setIsLoading(false);
          return;
        }
      }

      // No valid cache, fetch from API
      console.log('Cache expired or empty, fetching from API...');
      await fetchProducts();
    };

    initProducts();
  }, []);

  const value: ProductsContextType = {
    products,
    isLoading,
    error,
    refetch
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

// Custom hook to use products context
export function useProducts(): ProductsContextType {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
