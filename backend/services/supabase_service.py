import os
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables from project root .env
root_env = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(dotenv_path=root_env)

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL") or os.getenv("SUPABASE_URL") or ""
SUPABASE_KEY = (
    os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    or os.getenv("VITE_SUPABASE_ANON_KEY")
    or os.getenv("SUPABASE_ANON_KEY")
    or ""
)

_client: Client | None = None

def get_supabase() -> Client | None:
    global _client
    if _client is not None:
        return _client

    if not SUPABASE_URL or not SUPABASE_KEY or not SUPABASE_URL.startswith("https://"):
        return None

    try:
        _client = create_client(SUPABASE_URL, SUPABASE_KEY)
        return _client
    except Exception as e:
        print(f"[WARN] Failed to initialize Supabase client: {e}")
        return None


def is_configured() -> bool:
    return bool(SUPABASE_URL and SUPABASE_KEY and SUPABASE_URL.startswith("https://"))


def check_connection() -> dict:
    if not is_configured():
        return {
            "connected": False,
            "message": "Supabase credentials not configured in .env",
            "url": SUPABASE_URL
        }

    client = get_supabase()
    if not client:
        return {
            "connected": False,
            "message": "Could not initialize Supabase client",
            "url": SUPABASE_URL
        }

    try:
        res = client.table("saved_tank_mixes").select("id").limit(1).execute()
        return {
            "connected": True,
            "message": "Connected successfully to Supabase!",
            "url": SUPABASE_URL
        }
    except Exception as e:
        err_msg = str(e)
        if "does not exist" in err_msg or "PGRST205" in err_msg or "schema cache" in err_msg:
            return {
                "connected": True,
                "message": "Connected to Supabase project (tables not yet initialized, run supabase_schema.sql)",
                "url": SUPABASE_URL
            }
        return {
            "connected": False,
            "message": f"Connection error: {err_msg}",
            "url": SUPABASE_URL
        }
