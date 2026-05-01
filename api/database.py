from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

SQLALCHEMY_DATABASE_URL = (
    os.getenv("POSTGRES_URL")
    or os.getenv("DATABASE_URL")
    or os.getenv("POSTGRES_URL_NON_POOLING")
)

if SQLALCHEMY_DATABASE_URL and SQLALCHEMY_DATABASE_URL.startswith(
    "postgres://"
):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace(
        "postgres://", "postgresql://", 1
    )

engine = create_engine(SQLALCHEMY_DATABASE_URL) if SQLALCHEMY_DATABASE_URL else None
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) if engine else None

def get_db():
    if not SessionLocal:
        raise Exception(
            "Database not configured. Set POSTGRES_URL, DATABASE_URL, or "
            "POSTGRES_URL_NON_POOLING."
        )
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
