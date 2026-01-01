"""
Fast AI Recommendations Server
Keeps TF-IDF vectors cached in memory for instant recommendations
"""
# Verify imports work
print("🔍 Importing FastAPI...", flush=True)
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
print("🔍 Importing Pydantic...", flush=True)
from pydantic import BaseModel
print("🔍 Importing Pandas...", flush=True)
import pandas as pd
print("🔍 Importing sklearn...", flush=True)
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
print("🔍 Importing uvicorn...", flush=True)
import uvicorn
import os
from typing import List, Dict, Any
print("✅ All imports successful!", flush=True)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global cache for products and TF-IDF vectors
products_df = None
tfidf_vectorizer = None
tfidf_matrix = None
last_updated = None

class RecommendationRequest(BaseModel):
    application: str
    power: str
    description: str
    count: int = 10
    products: List[Dict[str, Any]] = []

class Product(BaseModel):
    Product_Name: str
    Brand: str
    Application: str
    PowerUsage: str
    Similarity_Score: float
    Image_URL: str = ""

def determine_power_usage(motor_rating):
    """Classify power usage based on motor rating"""
    try:
        rating = float(str(motor_rating).split('/')[0].strip())
        if rating >= 5.5:
            return 'high'
        elif rating >= 2.0:
            return 'medium'
        else:
            return 'low'
    except:
        return 'medium'

def preprocess_products(products):
    """Preprocess products and cache TF-IDF vectors"""
    global products_df, tfidf_vectorizer, tfidf_matrix

    try:
        df = pd.DataFrame(products)
    except Exception as e:
        print(f"❌ Error creating DataFrame: {e}", flush=True)
        raise

    # Ensure required columns exist (data comes pre-formatted from Zoho)
    if 'Product_Details' not in df.columns:
        df['Product_Details'] = ''
    if 'Application' not in df.columns:
        df['Application'] = ''

    # Ensure other columns exist
    if 'Product' not in df.columns:
        df['Product'] = 'Unknown Product'
    if 'Brand' not in df.columns:
        df['Brand'] = 'Unknown'
    if 'Image_URL' not in df.columns:
        df['Image_URL'] = ''

    # Handle motor rating
    motor_col = None
    for col in ['Motor Rating (kw)', 'Motor_Rating_kW', 'Motor Rating(kW)']:
        if col in df.columns:
            motor_col = col
            break

    if motor_col:
        df['PowerUsage'] = df[motor_col].apply(determine_power_usage)
    else:
        df['PowerUsage'] = 'medium'

    # Clean and lowercase - use apply for robustness
    df['Application'] = df['Application'].apply(lambda x: str(x).lower() if pd.notna(x) else '')
    df['PowerUsage'] = df['PowerUsage'].apply(lambda x: str(x).lower() if pd.notna(x) else 'medium')
    df['Product_Details'] = df['Product_Details'].apply(lambda x: str(x).lower() if pd.notna(x) else '')
    df['Product'] = df['Product'].apply(lambda x: str(x) if pd.notna(x) else 'Unknown Product')
    df['Brand'] = df['Brand'].apply(lambda x: str(x) if pd.notna(x) else 'Unknown')
    df['Image_URL'] = df['Image_URL'].apply(lambda x: str(x) if pd.notna(x) else '')

    # Create combined text for TF-IDF
    df['combined_text'] = df.apply(
        lambda row: f"{row['Product_Details']} {row['Application']}",
        axis=1
    )

    products_df = df

    # Pre-compute TF-IDF vectors (THIS IS THE KEY OPTIMIZATION)
    # Only print on first load, not every time
    if tfidf_matrix is None:
        print(f"📊 Computing TF-IDF vectors for {len(df)} products...")
    tfidf_vectorizer = TfidfVectorizer(max_features=500, stop_words='english')
    tfidf_matrix = tfidf_vectorizer.fit_transform(df['combined_text'])
    if products_df is None:
        print(f"✅ TF-IDF vectors cached in memory!")

    return df

def get_recommendations(application, power, description, count=10):
    """Get recommendations using cached TF-IDF vectors"""
    global products_df, tfidf_vectorizer, tfidf_matrix

    if products_df is None or tfidf_matrix is None:
        raise ValueError("Products not loaded")

    # Normalize inputs
    application = str(application).lower()
    power = str(power).lower()
    description = str(description).lower()

    # Filter by application (exact match)
    app_matches = products_df[products_df['Application'].str.contains(application, na=False, case=False)]

    if len(app_matches) == 0:
        # No exact matches, return empty
        return []

    # Filter by power usage
    power_matches = app_matches[app_matches['PowerUsage'] == power]

    if len(power_matches) == 0:
        # No power matches, use all app matches
        filtered_df = app_matches
    else:
        filtered_df = power_matches

    if len(filtered_df) == 0:
        return []

    # Get indices of filtered products
    indices = filtered_df.index.tolist()

    # Create query vector using CACHED vectorizer
    query_text = f"{description} {application}"
    query_vector = tfidf_vectorizer.transform([query_text])

    # Calculate similarity ONLY for filtered products
    filtered_tfidf = tfidf_matrix[indices]
    similarities = cosine_similarity(query_vector, filtered_tfidf).flatten()

    # Get top recommendations
    top_indices_local = similarities.argsort()[::-1][:count]
    top_indices_global = [indices[i] for i in top_indices_local]

    results = []
    for idx in top_indices_global:
        row = products_df.iloc[idx]
        results.append({
            'Product_Name': row['Product'],
            'Brand': row['Brand'],
            'Application': row['Application'],
            'PowerUsage': row['PowerUsage'],
            'Similarity_Score': float(similarities[top_indices_local.tolist().index(indices.index(idx))]),
            'Image_URL': row['Image_URL']
        })

    return results

@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "products_loaded": products_df is not None,
        "product_count": len(products_df) if products_df is not None else 0,
        "tfidf_cached": tfidf_matrix is not None
    }

@app.post("/api/recommendations")
def recommend(request: RecommendationRequest):
    try:
        # Only update products if explicitly provided (for backward compatibility)
        # In production, products are pre-loaded via /api/load-products endpoint
        if request.products and len(request.products) > 0:
            should_update = products_df is None or len(products_df) != len(request.products)
            if should_update:
                print(f"🔄 Updating products cache with {len(request.products)} products")
            preprocess_products(request.products)

        # Check if products are loaded
        if products_df is None:
            raise HTTPException(
                status_code=503,
                detail="Products not loaded. Please wait for initial product loading to complete."
            )

        # Get recommendations using CACHED vectors (FAST!)
        results = get_recommendations(
            request.application,
            request.power,
            request.description,
            request.count
        )

        return {
            "success": True,
            "count": len(results),
            "data": results
        }

    except HTTPException:
        raise
    except Exception as e:
        # Only log actual errors
        print(f"❌ Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/load-products")
def load_products(products: List[Dict[str, Any]]):
    """Endpoint to pre-load and cache products"""
    try:
        preprocess_products(products)
        return {
            "success": True,
            "message": f"Loaded and cached {len(products)} products"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import sys
    print("=" * 60, flush=True)
    print("🚀 AI Recommendations Server - Starting...", flush=True)
    print(f"Python version: {sys.version}", flush=True)
    print("=" * 60, flush=True)

    # Always use port 8000 for Python server (internal)
    # Node.js will run on Render's PORT (10000) and proxy to this
    port = 8000
    print(f"📊 Port: {port}", flush=True)
    print(f"📊 Host: 0.0.0.0", flush=True)
    print(f"🔄 Starting Uvicorn...", flush=True)

    try:
        uvicorn.run(app, host="0.0.0.0", port=port, log_level="info")
    except Exception as e:
        print(f"❌ FATAL ERROR: {e}", flush=True)
        import traceback
        traceback.print_exc()
        sys.exit(1)
