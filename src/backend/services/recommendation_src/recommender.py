'''
Recommender module for generating user recommendations based on location, preferences, and friend networks.
This module uses a scoring system to rank users based on their features and returns the top K recommendations.
'''

from feature_extraction import compute_features_for_user

WEIGHTS = {
        "location_score": 0.5,
        "friend_score": 0.3,
        "preference_score": 0.2,
    }

def score_features(features):
    loc_score, pref_score, friend_score = features
    return (
        WEIGHTS["location_score"] * loc_score +
        WEIGHTS["preference_score"] * pref_score +
        WEIGHTS["friend_score"] * friend_score
    )

def get_top_k_recommendations_for_user(user_id, dist_map, candidates, weights, k):
    df = compute_features_for_user(user_id, candidates, dist_map)
    df['score'] = 0
    for feature, weight in weights.items():
        df['score'] += df[feature] * weight
    top = df['score'].nlargest(k)
    return [(uid, float(score)) for uid, score in top.items()]