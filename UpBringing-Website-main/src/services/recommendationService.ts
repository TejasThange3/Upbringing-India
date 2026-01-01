/**
 * Product Recommendation Service
 * Handles API integration with AI-powered product recommendation engine
 */

export interface RecommendationRequest {
  application: string;
  power: string;
  description: string;
  count?: number;
}

export interface RecommendedProduct {
  Product_Name: string;
  Brand: string;
  Application: string;
  PowerUsage: string;
  Similarity_Score: number;
  Image_URL?: string;
}

export interface RecommendationResponse {
  success: boolean;
  message?: string;
  data?: RecommendedProduct[];
}

/**
 * Get product recommendations from the AI engine
 */
export const getRecommendations = async (
  request: RecommendationRequest
): Promise<RecommendationResponse> => {
  try {
    // API endpoint - defaults to localhost:3001 for development
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3001/api/recommendations';

    const payload = {
      application: request.application,
      power: request.power,
      description: request.description,
      count: request.count || 10,
    };

    console.log('Requesting product recommendations:', payload);

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
      success: result.success || true,
      data: result.data || [],
    };
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to fetch recommendations',
      data: [],
    };
  }
};
