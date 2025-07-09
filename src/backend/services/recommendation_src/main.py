'''
Main entry point for the recommendation service.
This script computes user features, generates recommendations, and updates the database with the results.
'''

from feature_extraction import compute_all_features
from recommender import get_top_k_recommendations
from db_update import post_recommendations

def main():
    # Compute all features for users
    features = compute_all_features()

    recommendations = {}
    for user_id in features:
        recommendations = get_top_k_recommendations(features, user_id, k=3)
        post_recommendations(user_id, recommendations)
    print("Recommendations updated successfully.")

if __name__ == "__main__":
    main()