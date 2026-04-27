from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import datetime

Base = declarative_base()

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    price = Column(Float)
    image_url = Column(String)
    category = Column(String)
    tag = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    customer_email = Column(String)
    total_amount = Column(Float)
    status = Column(String, default="pending") # pending, paid, failed
    paynow_reference = Column(String)
    paynow_poll_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
