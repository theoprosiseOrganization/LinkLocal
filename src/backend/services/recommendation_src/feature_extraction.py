import os
from supabase import create_client, Client
from dotenv import load_dotenv
import pandas as pd
import numpy as np

load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def fetch_users():
    response = supabase.table("User").select("id, geoLocation, tags").execute()
    return response.data

def fetch_follows():
    response = supabase.table("Follows").select("*").execute()
    return response.data

def build_friend_network(users, follows):
    user_map = {user['id']: user for user in users}
    friend_network = {}

    for follow in follows:
        follower_id = follow['follower_id']
        followed_id = follow['followed_id']

        if follower_id not in friend_network:
            friend_network[follower_id] = []
        friend_network[follower_id].append(followed_id)

    return friend_network

def location_score(loc1, loc2):
    if loc1 is None or loc2 is None:
        return 0
    if loc1 == loc2:
        return 1
    lat1, lon1 = loc1
    lat2, lon2 = loc2
    distance = ((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2) ** 0.5
    return max(0, 1 - distance / 100)  # Normalize distance to a score between 0 and 1

def preference_score(tags1, tags2):
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
    ret = float(vec1.dot(vec2)) / (norm1 * norm2)
    return ret

