import networkx as nx
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

class FollowGraph:
    """
    A directed graph representing user follows.
    This graph is used to compute distances and relationships between users.
    It is initialized with data from the Supabase database.
    """
    def __init__(self):
        self.graph = nx.DiGraph()
        self.load_all()

    def load_all(self):
        resp = supabase.table("Follows").select("followerId, followingId").execute()
        for {"follower_id": follower_id, "followed_id": followed_id} in resp.data:
            self.graph.add_edge(follower_id, followed_id)

    def add_edge(self, follower : str, following: str):
        self.graph.add_edge(follower, following)

    def bfs_distances(self, user_id: str, max_depth: int = 5):
        distances = nx.single_source_shortest_path_length(self.graph, user_id, cutoff=max_depth)
        return distances