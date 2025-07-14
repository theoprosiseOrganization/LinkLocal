'''
Recommender module for generating user recommendations based on location, preferences, and friend networks.
This module uses a scoring system to rank users based on their features and returns the top K recommendations.
'''

import heapq
from feature_extraction import compute_features_for_user

WEIGHTS = {
    "nearby": 0.5,
    "friend_network": 0.3,
    "preference": 0.2,
}

def score_features(features):
    loc_score, pref_score, friend_score = features
    return WEIGHTS["nearby"] * loc_score + WEIGHTS["friend_network"] * friend_score + WEIGHTS["preference"] * pref_score

def get_top_k_recommendations(features, user_id, k=3):
    heap = []
    for other_user_id, feature_scores in features[user_id].items():
        score = score_features(feature_scores)
        heapq.heappush(heap, (-score, other_user_id))
    top_k = [heapq.heappop(heap)[1] for _ in range(min(k, len(heap)))]
    return top_k

def get_top_k_recommendations_for_user(user_id, dist_map, candidates, weights, k):
    df = compute_features_for_user(user_id, candidates, dist_map)
    df['score'] = 0
    for feature, weight in weights.items():
        df['score'] += df[feature] * weight
    top = df['score'].nlargest(k)
    return [(uid, float(score)) for uid, score in top.items()]