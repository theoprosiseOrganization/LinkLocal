import os
from supabase import create_client, Client
from dotenv import load_dotenv
import pandas as pd

load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# determine closeness based on distance score - bfs to all users and then assign closeness based on distance

response = supabase.table("Follows").select("*").execute()
users = response.data
print("Users fetched successfully:", users)