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