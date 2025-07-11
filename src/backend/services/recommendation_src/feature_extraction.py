'''
Feature extraction module for user recommendation system.
This module fetches user data, computes features based on location, tags, and friend network,
and prepares the data for recommendation algorithms.
The features include:
1. Friend network score based on BFS distance in the follow graph.
2. Location score based on geographical proximity.
3. Preference score based on shared tags using cosine similarity.
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
    tag_map = {}
    for row in response.data:
        tag_map.setdefault(row["B"], []).append(row["A"])
    return tag_map

def fetch_users():
    response = supabase.table("User").select("id").execute()
    base = [{"id": row["id"]} for row in response.data]

    location_map = fetch_user_locations()
    tag_map = fetch_user_tags()

    for user in base:
        uid = user["id"]
        user["geoLocation"] = location_map.get(uid)
        user["tags"] = tag_map.get(uid, [])
    return base

def fetch_follows():
    response = supabase.table("Follows").select("*").execute()
    return response.data

def build_follow_adjacency(follows):
    adj = {}
    for follow in follows:
        adj.setdefault(follow["followerId"], []).append(follow["followingId"])
    return adj

def bfs_distance(start_user, adj):
    dist = {start_user: 0}
    queue = deque([start_user])

    while queue:
        current = queue.popleft()
        for neighbor in adj.get(current, []):
            if neighbor not in dist:
                dist[neighbor] = dist[current] + 1
                queue.append(neighbor)
    return dist

def friend_network_score(dist_map, target_user, max_distance=4):
    if target_user not in dist_map:
        return 0
    distance = dist_map[target_user]
    if distance > max_distance:
        return 0
    return 1 - (distance / max_distance)  # Normalize to a score between 0 and 1

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


def compute_all_features():
    users = fetch_users()
    follows = fetch_follows()
    # Build adjacency list for follow relationships
    adj = build_follow_adjacency(follows)

    bfs_maps = {}
    for user in users:
        bfs_maps[user['id']] = bfs_distance(user['id'], adj)

    features = {user['id']: {} for user in users}
    
    for idx, user1 in enumerate(users):
        for user2 in users[idx + 1:]:
            uid1, uid2 = user1['id'], user2['id']

            # Friend network score
            dist_map1 = bfs_maps[uid1]
            dist_map2 = bfs_maps[uid2]
            score1 = friend_network_score(dist_map1, uid2)
            score2 = friend_network_score(dist_map2, uid1)
            friend_score = (score1 + score2) / 2
            
            # location score
            loc_score = location_score(user1['geoLocation'], user2['geoLocation'])
            # Preference score
            pref_score = preference_score(user1['tags'], user2['tags'])

            features[uid1][uid2] = (loc_score, pref_score, friend_score)
            features[uid2][uid1] = (loc_score, pref_score, friend_score)
    
    return features