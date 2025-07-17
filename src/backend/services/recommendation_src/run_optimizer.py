import os
import json
import argparse
import random
import numpy as np
import pandas as pd
import networkx as nx
from dotenv import load_dotenv
from supabase import create_client
import weight_optimizer

load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
supabase = create_client(url, key)

def fetch_all_edges():
    """
    Fetch all edges from the Follows table in Supabase.
    Returns a list of tuples (followerId, followingId).
    """
    response = supabase.table("Follows").select("followerId, followingId").execute()
    if not response.data:
        print("No edges found in Follows table.")
        return []
    return [(row["followerId"], row["followingId"]) for row in response.data]

def dump_csv(edges, path="follows.csv"):
    """
    Dump the edges to a CSV file.
    """
    df = pd.DataFrame(edges, columns=["followerId", "followingId"])
    df.to_csv(path, index=False)
    print(f"Dumped {len(edges)} edges to {path}")

def build_test_map(test_edges):
    """
    Build a map of users to their held-out edges for evaluation.
    """
    test_by_user = {}
    for u, v in test_edges:
        test_by_user.setdefault(u, set()).add(v)
    return test_by_user

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--test-ratio", type=float, default=0.2, help="Ratio of edges to hold out for testing")
    p.add_argument("--min-follows", type=int, default=3, help="Minimum number of follows to include a user in training")
    p.add_argument("--k", type=int, default=2, help="Number of recommendations to generate")
    p.add_argument("--step", type=float, default=0.1, help="Step size for optimization")
    args = p.parse_args()

    # 1.) Fetch and dump all edges
    edges = fetch_all_edges()
    dump_csv(edges)

    # 2.) Split edges into train and test sets
    train_edges, test_edges = weight_optimizer.train_test_split(
        edges,
        test_ratio=args.test_ratio,
        min_follows=args.min_follows,
    )
    G_train = weight_optimizer.build_graph(train_edges)
    test_by_user = build_test_map(test_edges)

    print(f"Train graph:{G_train.number_of_nodes()} users, {G_train.number_of_edges()} edges")
    print(f"Test set: {len(test_edges)} edges held out for {len(test_by_user)} users")

    all_loc, all_friend, all_pref = [], [], []
    for user, held_out in test_by_user.items():
        dist_map = nx.single_source_shortest_path_length(G_train, user, cutoff=4)
        direct = {n for n, d in dist_map.items() if d == 1}
        candidates = [n for n in G_train.nodes() if n != user and n not in direct]
        df = weight_optimizer.compute_features_for_user(user, candidates, dist_map)

        all_loc.extend(df['location_score'].tolist())
        all_friend.extend(df['friend_score'].tolist())
        all_pref.extend(df['preference_score'].tolist())

    print("Feature statistics:")
    print(f" location score:\n" , pd.Series(all_loc).describe())
    print(f" friend score:\n" , pd.Series(all_friend).describe())
    print(f" preference score:\n" , pd.Series(all_pref).describe())

    # 3.) Weight search
    best_weights, best_score = weight_optimizer.weight_search(
        G_train,
        test_by_user,
        k=args.k,
        step=args.step,
    )

    w_loc, w_friend, w_pref = best_weights
    print("/n Best weights found:")
    print(f"location_score: {w_loc:.2f}")
    print(f"friend_score: {w_friend:.2f}")
    print(f"preference_score: {w_pref:.2f}")
    print(f" recall@{args.k}: {best_score:.4f}")

    # write to JSON
    out = {
        "location_score": w_loc,
        "friend_score": w_friend,
        "preference_score": w_pref,
        "last_updated": pd.Timestamp.now().isoformat(),
    }
    with open("weights.json", "w") as f:
        json.dump(out, f, indent=2)
    print("Weights saved to weights.json")

if __name__ == "__main__":
    main()
else:
    print("This script is intended to be run as a standalone program.")


