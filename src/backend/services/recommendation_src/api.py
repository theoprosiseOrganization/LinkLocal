import os
from fastapi import FastAPI
from pydantic import BaseModel
import networkx as nx
from supabase import create_client, Client
from dotenv import load_dotenv
from recommender import get_top_k_recommendations_for_user

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

app = FastAPI()
friends_graph = nx.DiGraph()
resp = supabase.table("Follows").select("followerId, followingId").execute()
for row in resp.data:
    friends_graph.add_edge(row["followerId"], row["followingId"])

def bfs_distances(user_id: str, max_depth: int = 5):
    distances = nx.single_source_shortest_path_length(friends_graph, user_id, cutoff=max_depth)
    return distances

class FollowIn(BaseModel):
    followerId: str
    followingId: str

@app.post("/add_follow")
def add_follow(payload: FollowIn):
    friends_graph.add_edge(payload.followerId, payload.followingId)
    return {"message": "Follow added successfully"}

@app.get("/recommendation/{user_id}")
def get_recommendations(user_id: str, k: int = 3):
    dist_map = bfs_distances(user_id)

    direct = {n for n,d in dist_map.items() if d == 1}
    candidates = set(friends_graph.nodes) - {user_id} - direct

    WEIGHTS = {
        "location_score": 0.5,
        "bfs_score": 0.3,
        "preference_score": 0.2,
    }
    recommendations = get_top_k_recommendations_for_user(user_id, dist_map, list(candidates), WEIGHTS, k)
    return [{"userId": uid, "score": score} for uid, score in recommendations]