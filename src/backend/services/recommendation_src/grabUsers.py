import os
from supabase import create_client, Client
from dotenv import load_dotenv
import pandas as pd

load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

response = supabase.table("User").select("*").execute()
users = response.data
print("Users fetched successfully:", users)

# Create user friends graph

# follows table is user id to user id

create a graph from users table
# where each user is a node and each follow is an edge
import networkx as nx   
G = nx.Graph()
