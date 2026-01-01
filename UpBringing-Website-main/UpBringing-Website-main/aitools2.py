import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import sys
import json
import argparse

# Redirect print to stderr for debugging (so JSON output to stdout is clean)
def debug_print(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)

# --- 1. CONFIGURATION ---
import os
DATA_FILE = os.getenv('PRODUCTS_CSV_PATH', 'products.csv')
RECOMMENDATION_COUNT = 5
# Weights for the Hybrid Score (must sum to 1.0, or 100)
WEIGHT_APP = 0.40  # 40% for Application Match
WEIGHT_POWER = 0.40 # 40% for PowerUsage Match
WEIGHT_DESC = 0.20  # 20% for Description Similarity
# ---

# --- 2. CLASSIFICATION FUNCTION (UNCHANGED) ---

def determine_power_usage(row):
    """Classifies a product's power usage (High, Medium, Low) based on Motor Rating (kw)."""
    motor_rating_col = 'Motor Rating (kw)'
    try:
        motor_rating = str(row[motor_rating_col]).split('/')[0].strip()
        motor_rating = float(motor_rating)
    except Exception:
        return 'medium'
    
    if motor_rating >= 5.5:
        return 'high'
    elif motor_rating >= 2.0:
        return 'medium'
    else:
        return 'low'

# --- 3. DATA LOADING AND PREPROCESSING ---
def load_data_from_csv(file_path):
    """Load data from CSV file"""
    try:
        return pd.read_csv(file_path)
    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found. Please check the file path.")
        sys.exit(1)

def load_data_from_json(json_str):
    """Load data from JSON string"""
    try:
        data = json.loads(json_str)
        return pd.DataFrame(data)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON data: {e}")
        sys.exit(1)

# Initially set df to None, will be loaded based on input method
df = None

def preprocess_data(dataframe):
    """Preprocess and prepare data for recommendations"""
    # Create a copy to avoid modifying original
    df = dataframe.copy()

    debug_print(f"DEBUG: Input columns: {list(df.columns)}")
    debug_print(f"DEBUG: DataFrame shape: {df.shape}")

    # **STEP 3A: COLUMN CLEANUP & RENAME**
    df = df.rename(columns={
        'Applications': 'Application',
        'Description': 'Product_Details'
    }, errors='ignore')

    # Ensure required columns exist
    if 'Product_Details' not in df.columns:
        if 'Description' in df.columns:
            df['Product_Details'] = df['Description']
        else:
            df['Product_Details'] = ''

    if 'Application' not in df.columns:
        if 'Applications' in df.columns:
            df['Application'] = df['Applications']
        else:
            df['Application'] = ''

    # Handle Motor Rating column variations
    motor_col_variants = ['Motor Rating (kw)', 'Motor_Rating_kW', 'Motor Rating(kW)']
    motor_found = False
    for variant in motor_col_variants:
        if variant in df.columns:
            df['Motor Rating (kw)'] = df[variant]
            motor_found = True
            break

    if not motor_found:
        df['Motor Rating (kw)'] = 0

    # **STEP 3B: FEATURE ENGINEERING (CREATING PowerUsage)**
    df['PowerUsage'] = df.apply(determine_power_usage, axis=1)

    # **STEP 3C: DATA CLEANING & TOKENIZATION**
    # Convert all text to lowercase for exact matching - Process each column safely
    # Reset index to avoid positional indexing issues
    df = df.reset_index(drop=True)

    # Debug: Check for duplicate columns
    debug_print(f"DEBUG: Checking for duplicate columns...")
    debug_print(f"DEBUG: Column names BEFORE removing duplicates: {df.columns.tolist()}")

    # Remove duplicate columns (keep the first occurrence)
    df = df.loc[:, ~df.columns.duplicated(keep='first')]

    debug_print(f"DEBUG: Column names AFTER removing duplicates: {df.columns.tolist()}")

    # Application - using safer apply method
    if 'Application' in df.columns:
        df['Application'] = df['Application'].fillna('').apply(lambda x: str(x).lower())
    else:
        df['Application'] = ''

    # PowerUsage
    if 'PowerUsage' in df.columns:
        df['PowerUsage'] = df['PowerUsage'].fillna('').apply(lambda x: str(x).lower())
    else:
        df['PowerUsage'] = 'medium'

    # Product_Details
    if 'Product_Details' in df.columns:
        df['Product_Details'] = df['Product_Details'].fillna('').apply(lambda x: str(x).lower())
    else:
        df['Product_Details'] = ''

    # Product
    if 'Product' in df.columns:
        df['Product'] = df['Product'].fillna('Unknown Product').apply(str)
    else:
        df['Product'] = 'Unknown Product'

    # Brand
    if 'Brand' in df.columns:
        df['Brand'] = df['Brand'].fillna('Unknown Brand').apply(str)
    else:
        df['Brand'] = 'Unknown Brand'

    debug_print(f"DEBUG: After preprocessing columns: {list(df.columns)}")
    try:
        debug_print(f"DEBUG: Sample Application values: {df['Application'].head(3).values}")
    except Exception as e:
        debug_print(f"DEBUG: Could not print sample values: {e}")

    return df

def train_model(dataframe):
    """Train TF-IDF model on product data"""
    # Always combine fields to ensure we have rich content
    debug_print("DEBUG: Combining all fields for Product_Details")
    dataframe['Product_Details'] = (
        dataframe['Brand'].fillna('') + ' ' +
        dataframe['Product'].fillna('') + ' ' +
        dataframe['Application'].fillna('') + ' ' +
        dataframe['Type'].fillna('') + ' ' +
        dataframe['Subtype'].fillna('') + ' ' +
        dataframe['Product_Details'].fillna('') + ' ' +
        'power ' + dataframe['PowerUsage'].fillna('') + ' ' +
        'pump vacuum'  # Add common terms
    ).str.strip()

    # Print sample to verify
    debug_print(f"DEBUG: Sample Product_Details after combining:")
    for i in range(min(3, len(dataframe))):
        debug_print(f"  {i+1}. {dataframe['Product_Details'].iloc[i][:100]}...")

    # Check if we have any content at all
    total_chars = dataframe['Product_Details'].str.len().sum()
    debug_print(f"DEBUG: Total characters in Product_Details: {total_chars}")

    if total_chars < 100:
        debug_print("WARNING: Very little text content, using minimal TF-IDF")
        # Just use product names if nothing else
        dataframe['Product_Details'] = dataframe['Brand'] + ' ' + dataframe['Product'] + ' pump'

    # Train TF-IDF with VERY lenient parameters
    tfidf_desc = TfidfVectorizer(
        stop_words=None,  # Don't filter stop words
        ngram_range=(1, 1),  # Only single words
        max_features=1000,  # Fewer features
        min_df=1,  # Minimum documents = 1
        max_df=1.0,  # Maximum documents = 100%
        token_pattern=r'\b\w+\b'  # Any word
    )

    try:
        tfidf_matrix_desc = tfidf_desc.fit_transform(dataframe['Product_Details'])
        debug_print(f"DEBUG: TF-IDF vocabulary size: {len(tfidf_desc.vocabulary_)}")
        debug_print(f"DEBUG: TF-IDF matrix shape: {tfidf_matrix_desc.shape}")
    except ValueError as e:
        debug_print(f"ERROR: TF-IDF failed: {e}")
        debug_print("DEBUG: Falling back to dummy TF-IDF with product names only")
        # Last resort: just use brand + product
        dataframe['Product_Details'] = dataframe['Brand'] + ' ' + dataframe['Product']
        tfidf_matrix_desc = tfidf_desc.fit_transform(dataframe['Product_Details'])

    return tfidf_desc, tfidf_matrix_desc


# --- 5. RECOMMENDATION FUNCTION (HYBRID SCORING) ---
def get_recommendations(user_application, user_power_usage, user_description, dataframe, tfidf_vectorizer, tfidf_matrix, top_n=RECOMMENDATION_COUNT, output_json=False):
    """
    Generates product recommendations using a weighted Hybrid Scoring Model.
    """
    # 1. Prepare User Inputs (lowercase for comparison)
    user_app = user_application.lower()
    user_power = user_power_usage.lower()
    user_desc = user_description.lower()

    # 2. Calculate Description Similarity Score (20% Weight)
    # Transform user description using the trained descriptive vectorizer
    user_desc_vec = tfidf_vectorizer.transform([user_desc])
    desc_similarity = cosine_similarity(user_desc_vec, tfidf_matrix).flatten()

    # 3. Calculate Categorical Match Score (80% Weight)

    # Initialize a list to hold the final scores
    hybrid_scores = []

    for i in range(len(dataframe)):
        product = dataframe.iloc[i]

        # Part A: Application Match Score (40%)
        # Exact match (True=1, False=0)
        app_match = 1.0 if user_app in product['Application'] else 0.0
        app_score = app_match * WEIGHT_APP

        # Part B: Power Usage Match Score (40%)
        # Exact match (True=1, False=0)
        power_match = 1.0 if user_power == product['PowerUsage'] else 0.0
        power_score = power_match * WEIGHT_POWER

        # Part C: Descriptive Similarity Score (20%)
        desc_score = desc_similarity[i] * WEIGHT_DESC

        # Final Hybrid Score (guarantees a high score for perfect categorical matches)
        final_score = app_score + power_score + desc_score
        hybrid_scores.append(final_score)

    # 4. Rank Products
    hybrid_scores_array = pd.Series(hybrid_scores)
    top_indices = hybrid_scores_array.argsort()[::-1]

    # 5. Extract results, ensuring brand diversity
    recommended_products = []
    seen_brands = set()

    if not output_json:
        print("\n--- Recommendation Results (Hybrid Scoring) ---")

    for i in top_indices:
        product = dataframe.iloc[i]
        brand = product['Brand']

        if brand not in seen_brands or len(recommended_products) < top_n:
            recommended_products.append({
                'Product_Name': product['Product'],
                'Brand': brand,
                'Application': product['Application'].title(),
                'PowerUsage': product['PowerUsage'].title(),
                'Similarity_Score': round(hybrid_scores[i] * 100, 2),
                'Image_URL': product.get('Image_URL', '')
            })
            seen_brands.add(brand)

            if len(recommended_products) >= top_n and len(seen_brands) >= top_n:
                break

        if len(recommended_products) >= top_n * 2:
             break

    if output_json:
        return recommended_products
    else:
        for rank, rec in enumerate(recommended_products, 1):
            print(f"\nRANK {rank}: **{rec['Product_Name']}** (Brand: {rec['Brand']})")
            print(f"  > Match Score: {rec['Similarity_Score']}%")
            print(f"  > Product Features: Application={rec['Application']}, Power={rec['PowerUsage']}")

        print("-------------------------------------------\n")
        return recommended_products

# --- 6. CLI ARGUMENT PARSER ---
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Product Recommendation System')
    parser.add_argument('--application', type=str, help='Application type (e.g., Packaging, Woodworking)')
    parser.add_argument('--power', type=str, help='Power usage (High, Medium, or Low)')
    parser.add_argument('--description', type=str, help='Product description requirements')
    parser.add_argument('--json', action='store_true', help='Output results as JSON')
    parser.add_argument('--count', type=int, default=RECOMMENDATION_COUNT, help='Number of recommendations')
    parser.add_argument('--data-json', type=str, help='Product data as JSON string')
    parser.add_argument('--data-stdin', action='store_true', help='Read product data from stdin')
    parser.add_argument('--data-csv', type=str, help='Path to CSV file (default: use DATA_FILE constant)')

    args = parser.parse_args()

    # Load product data
    if args.data_stdin:
        # Read from stdin
        json_data = sys.stdin.read()
        df = load_data_from_json(json_data)
    elif args.data_json:
        # Load from JSON argument
        df = load_data_from_json(args.data_json)
    elif args.data_csv:
        # Load from specified CSV file
        df = load_data_from_csv(args.data_csv)
    else:
        # Load from default CSV file
        df = load_data_from_csv(DATA_FILE)

    # Preprocess data and train model
    df = preprocess_data(df)
    tfidf_desc, tfidf_matrix_desc = train_model(df)

    # If no search arguments provided, run interactive mode
    if not args.application or not args.power or not args.description:
        print("Welcome to the Product Recommendation Model Tester.")
        print("This model uses Hybrid Scoring to ensure high match rates.")

        app_input = input("1. Enter Application (e.g., Packaging, Woodworking): ")
        power_input = input("2. Enter Desired Power Usage (High, Medium, or Low): ")
        desc_input = input("3. Enter User Description (e.g., quiet, high flow): ")

        get_recommendations(
            app_input,
            power_input,
            desc_input,
            df,
            tfidf_desc,
            tfidf_matrix_desc,
            top_n=args.count,
            output_json=False
        )
    else:
        # CLI mode with arguments
        recommendations = get_recommendations(
            args.application,
            args.power,
            args.description,
            df,
            tfidf_desc,
            tfidf_matrix_desc,
            top_n=args.count,
            output_json=args.json
        )

        if args.json:
            print(json.dumps({
                'success': True,
                'data': recommendations
            }, indent=2))
        # else recommendations already printed by the function