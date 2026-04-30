import os
from sqlalchemy import create_engine, text

url = "postgresql://neondb_owner:npg_e7QHhwiZRmB4@ep-nameless-surf-amawvjng-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require"
engine = create_engine(url)

try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        print(f"Connection successful: {result.fetchone()}")
except Exception as e:
    print(f"Connection failed: {e}")
