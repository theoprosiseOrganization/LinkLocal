import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def post_recommendations(user_id, recommendations):
    data = {
        "user_id": user_id,
        "recommendations": recommendations
    }
    
    supabase.table("Recommendations").upsert(data, on_conflict="user_id").execute()