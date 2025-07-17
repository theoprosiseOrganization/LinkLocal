'''
Feature extraction module for user recommendation system.
This module fetches user data, computes features based on location, tags, and friend network,
and prepares the data for recommendation algorithms.
'''

import os
from supabase import create_client, Client
from dotenv import load_dotenv
import pandas as pd
import numpy as np
from collections import deque
import math

load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def fetch_user_locations():
    response = (
        supabase.table("user_locations")
        .select("userId, location")
        .execute()
    )
    if not response.data:
        print("No user locations found.")
        return {}
    location_map = {}
    for row in response.data:
        geo = row["location"]
        lon, lat = geo["coordinates"]
        location_map[row["userId"]] = (lat, lon)  # Store as (lat, lon)
    return location_map

def fetch_user_tags():
    response = (
        supabase.table("_UserTags")
        .select("A, B")
        .execute()
    )
    if not response.data:
        print("No user tags found.")
        return {}
    tag_map = {}
    for row in response.data:
        tag_map.setdefault(row["B"], []).append(row["A"])
    return tag_map

def fetch_follower_counts():
    resp = supabase.table("Follows").select("followingId").execute()
    if not resp.data:
        print("No follower data found.")
        return {}
    counts = {}
    for row in resp.data:
        uid = row["followingId"]
        counts[uid] = counts.get(uid, 0) + 1
    return counts

def fetch_event_counts():
    resp = supabase.table("Event").select("userId").execute()
    if not resp.data:
        print("No event data found.")
        return {}
    counts = {}
    for row in resp.data:
        uid = row["userId"]
        counts[uid] = counts.get(uid, 0) + 1
    return counts

def fetch_liked_events_tags():
    respEvents = supabase.table("_LikedEvents").select("B, A").execute()
    if not respEvents.data:
        print("No liked events data found.")
        return {}
    likes = {}
    for row in respEvents.data:
        likes.setdefault(row["B"], set()).add(row["A"])
    respLikes = supabase.table("_EventTags").select("A, B").in_("A", [e for s in likes.values() for e in s]).execute()
    liked_tags = {uid: set() for uid in likes}
    for row in respLikes.data:
        event_id = row["A"]
        tag_id = row["B"]
        for uid, events in likes.items():
            if event_id in events:
                liked_tags[uid].add(tag_id)
    return liked_tags

def ratio_score(a, b):
    """
    Calculate the ratio score between two values.
    :param a: First value.
    :param b: Second value.
    :return: Score between 0 and 1, where 1 means both values are equal,
             and 0 means one of the values is zero.
    """
    if a == 0 and b == 0:
        return 1.0
    return max(0.0, 1-abs(a-b) / max(a,b,1))

def haversine_distance(coord1, coord2):
    """
    Calculate the Haversine distance between two geographical coordinates.
    :param coord1: Tuple of (latitude, longitude) for the first coordinate.
    :param coord2: Tuple of (latitude, longitude) for the second coordinate.
    :return: Distance in kilometers.
    https://en.wikipedia.org/wiki/Haversine_formula
    1. Convert latitude and longitude from degrees to radians.
    2. Use the Haversine formula to calculate the distance.
    If either coordinate is None, return infinity to indicate no distance.
    """
    if coord1 is None or coord2 is None:
        return float('inf')
    lat1, lon1 = coord1
    lat2, lon2 = coord2
    R = 6371.0  # Radius of the Earth in kilometers
    latRad1 = math.radians(lat1)
    latRad2 = math.radians(lat2)
    deltaLat = math.radians(lat2 - lat1)
    lonRad1 = math.radians(lon1)
    lonRad2 = math.radians(lon2)
    deltaLon = math.radians(lon2 - lon1)
    a = (math.sin(deltaLat / 2) ** 2 +
         math.cos(latRad1) * math.cos(latRad2) *
         math.sin(deltaLon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c  # Distance in kilometers

def location_score(loc1, loc2, max_distance=100.0):
    dist_km = haversine_distance(loc1, loc2)
    if dist_km == float('inf'):
        return 0
    # If the distance is greater than max_distance, return 0
    return max(0.0, 1 - dist_km / max_distance)  # Normalize distance to a score between 0 and 1

def preference_score(tags1, tags2, liked_tags1, liked_tags2):
    """
    Calculate the preference score between two users based on their tags and liked events.
    :param tags1: List of tags for user 1.
    :param tags2: List of tags for user 2.
    :param liked_tags1: Set of liked tags for user 1.
    :param liked_tags2: Set of liked tags for user 2.
    :return: Preference score between 0 and 1.
    This function computes the cosine similarity of the tags and the Jaccard similarity of the liked tags.
    The final score is a weighted average of the two scores, ensuring it is between 0 and 1.
    1. Compute the union of tags between the two users.
    2. Create indicator vectors for each user based on the union of tags.
    3. Calculate the cosine similarity between the two vectors.
    4. If either vector is zero, return a score of 0.
    5. Compute the Jaccard similarity of the liked tags.
    6. Combine the two scores with equal weights.
    7. Ensure the final score is between 0 and 1.
    8. Return the final score.
    """
    # union of tags between two users
    all_tags = list(set(tags1) | set(tags2))
    # indicator vectors for each user
    vec1 = np.array([1 if tag in tags1 else 0 for tag in all_tags], dtype=float)
    vec2 = np.array([1 if tag in tags2 else 0 for tag in all_tags], dtype=float)
    # cosine similarity
    norm1 = np.linalg.norm(vec1)
    norm2 = np.linalg.norm(vec2)
    if norm1 == 0 or norm2 == 0:
        return 0
    preference_sim = float(vec1.dot(vec2)) / (norm1 * norm2)
    set1,set2 = liked_tags1, liked_tags2
    # jaccard similarity of liked tags
    if set1 and set2:
        liked_sim = len(set1 & set2) / len(set1 | set2)
    else:
        liked_sim = 0.0
    # combine the two scores
    ret = 0.5 * preference_sim + 0.5 * liked_sim
    # ensure the score is between 0 and 1
    ret = max(0.0, min(1.0, ret))
    return ret

def compute_features_for_user(user_id: str, candidates: list[str], dist_map: dict[str,int], max_distance: int = 4) -> pd.DataFrame:
    """
    Compute features for user recommendations based on location, tags, and friend network.
    :param user_id: The user ID for whom to compute features.
    :param candidates: List of candidate user IDs to compute features for.
    :param dist_map: Dictionary mapping user IDs to their distance from the user_id in the friend network.
    :param max_distance: Maximum distance to consider for friend network similarity.
    :return: DataFrame containing features for each candidate user.
    This function computes the following features for each candidate user:
    1. Friend score based on network similarity.
    2. Location score based on geographical distance.
    3. Preference score based on tags and liked events.
    The function fetches user locations, tags, follower counts, event counts, and liked events tags from the database.
    It then calculates the scores for each candidate user and returns a DataFrame with the computed features.
    """
    if user_id is None or not candidates:
        candidates = [user_id] + candidates
    
    location_map = fetch_user_locations()
    tag_map = fetch_user_tags()
    follower_counts = fetch_follower_counts()
    event_counts = fetch_event_counts()
    liked_tags = fetch_liked_events_tags()

    rows ={}

    for candidate in candidates:

        # get network similarity score
        d = dist_map.get(candidate, max_distance + 1)
        bfs = 0 if d < 2 or d > max_distance else 1 - (d / max_distance)
        follower_score = ratio_score(follower_counts.get(user_id, 0), follower_counts.get(candidate, 0))
        event_score = ratio_score(event_counts.get(user_id, 0), event_counts.get(candidate, 0))
        friend_score = 0.7 * bfs + 0.15 * follower_score + 0.15 * event_score

        # get location score
        loc1 = location_map.get(user_id)
        loc2 = location_map.get(candidate)
        loc_score = location_score(loc1, loc2) if loc1 and loc2 else 0

        # get preference score
        tags1 = tag_map.get(user_id, [])
        tags2 = tag_map.get(candidate, [])
        liked_tags1 = liked_tags.get(user_id, set())
        liked_tags2 = liked_tags.get(candidate, set())
        pref_score = preference_score(tags1, tags2, liked_tags1, liked_tags2)

        rows[candidate] = {
            "friend_score": friend_score,
            "location_score": loc_score,
            "preference_score": pref_score
        }
    df = pd.DataFrame.from_dict(rows, orient='index')
    for col in ["friend_score", "location_score", "preference_score"]:
        if col not in df.columns:
            df[col] = 0.0
    return df