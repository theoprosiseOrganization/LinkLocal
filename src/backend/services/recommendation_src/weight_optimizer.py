import argparse
import random
import numpy as np
import pandas as pd
import networkx as nx
from feature_extraction import compute_features_for_user

def load_edges(path):
    """
    Load edges from a CSV file into a directed graph.
    """
    df = pd.read_csv(path)
    edges = list(zip(df['followerId'], df['followingId']))
    return edges

def train_test_split(edges, test_ratio, min_follows, seed=20):
    random.seed(seed)

    # group by follower
    by_user = {}

    for u,v in edges:
        by_user.setdefault(u, []).append(v)
    train_edges = []
    test_edges = []
    for u, vs in by_user.items():
        if len(vs) >= min_follows:
            n_test = max(1, int(len(vs) * test_ratio))
            held = set(random.sample(vs, n_test))
            for v in vs:
                if v in held:
                    test_edges.append((u, v))
                else:
                    train_edges.append((u, v))
        else:
            # too few follows, keep all in train
            train_edges+= [(u, v) for v in vs]
    return train_edges, test_edges

def build_graph(edge_list):
    """
    Build a directed graph from edges.
    """
    G = nx.DiGraph()
    G.add_edges_from(edge_list)
    return G

def evaluate_weights(weights, G_train, test_by_user, k, max_distance=4):
    recalls = []
    for user, held_out in test_by_user.items():
        # skip if no held out or user not in training graph
        if not held_out or user not in G_train:
            continue
        
        # bfs distances from user
        dist_map = nx.single_source_shortest_path_length(G_train, user, cutoff=max_distance

        # direct friends
        direct = {n for n, d in dist_map.items() if d == 1}

        # candidates = everyone except user and direct friends
        candidates = [n for n in G_train.nodes() if n != user and n not in direct]

        # compute features dataframe
        df = compute_features_for_user(user, candidates, dist_map)

        # score features
        df['score'] = (
            df['location_score'] * weights[0] +
            df['friend_score'] * weights[1] +
            df['preference_score'] * weights[2]
        )

        top_k = set(df['score'].nlargest(k).index)
        recall = len(top_k & (held_out)) / len(held_out) if held_out else 0
        recalls.append(recall)
    
    return float(np.mean(recalls)) if recalls else 0.0