from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from paynow import Paynow
import os
from datetime import datetime, timedelta
from typing import List, Optional
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import JWTError, jwt

from . import models, database

load_dotenv()

# Security Config
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-for-jwt")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/token")

app = FastAPI()

# Paynow Configuration
PAYNOW_INTEGRATION_ID = os.getenv("PAYNOW_INTEGRATION_ID")
PAYNOW_INTEGRATION_KEY = os.getenv("PAYNOW_INTEGRATION_KEY")
PAYNOW_RESULT_URL = os.getenv("PAYNOW_RESULT_URL")
PAYNOW_RETURN_URL = os.getenv("PAYNOW_RETURN_URL")

paynow = Paynow(
    PAYNOW_INTEGRATION_ID,
    PAYNOW_INTEGRATION_KEY,
    PAYNOW_RESULT_URL,
    PAYNOW_RETURN_URL
)

# Pydantic Schemas
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserResponse(BaseModel):
    username: str
    email: str
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class ProductCreate(BaseModel):
    title: str
    description: str
    price: float
    image_url: str
    category: str
    tag: Optional[str] = None

class ProductUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = None
    category: Optional[str] = None
    tag: Optional[str] = None
    is_active: Optional[bool] = None

class OrderItem(BaseModel):
    product_id: int
    quantity: int

class PaymentRequest(BaseModel):
    reference: str
    auth_email: str
    items: List[OrderItem]
    phone: Optional[str] = None
    method: str = "ecocash"

# Helpers
def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(models.User).filter(models.User.username == username).first()
    if user is None:
        raise credentials_exception
    return user

# Routes
@app.post("/api/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = get_password_hash(user.password)
    new_user = models.User(username=user.username, email=user.email, password_hash=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/api/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/products", response_model=List[ProductResponse])
def get_products(db: Session = Depends(database.get_db)):
    return db.query(models.Product).filter(models.Product.is_active == True).all()

@app.post("/api/products", response_model=ProductResponse)
def create_product(product: ProductCreate, db: Session = Depends(database.get_db)):
    new_product = models.Product(**product.dict())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@app.patch("/api/products/{product_id}", response_model=ProductResponse)
def update_product(product_id: int, product_update: ProductUpdate, db: Session = Depends(database.get_db)):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = product_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_product, key, value)
    
    db.commit()
    db.refresh(db_product)
    return db_product

@app.get("/api/me/orders")
def get_my_orders(current_user: models.User = Depends(get_current_user), db: Session = Depends(database.get_db)):
    return db.query(models.Order).filter(models.Order.username == current_user.username).all()

@app.post("/api/paynow/initiate")
def initiate_payment(req: PaymentRequest, db: Session = Depends(database.get_db), current_user: Optional[models.User] = Depends(get_current_user)):
    if not PAYNOW_INTEGRATION_ID or not PAYNOW_INTEGRATION_KEY:
        raise HTTPException(status_code=500, detail="Paynow credentials not configured")

    payment = paynow.create_payment(req.reference, req.auth_email)
    total_amount = 0
    
    for item in req.items:
        db_product = db.query(models.Product).filter(models.Product.id == item.product_id).first()
        if not db_product:
            raise HTTPException(status_code=404, detail=f"Product with ID {item.product_id} not found")
        
        item_total = db_product.price * item.quantity
        payment.add(f"{db_product.title} x{item.quantity}", item_total)
        total_amount += item_total

    if req.phone:
        response = paynow.send_mobile(payment, req.phone, req.method)
    else:
        response = paynow.send(payment)

    if response.success:
        # Save order to DB
        new_order = models.Order(
            username=current_user.username if current_user else None,
            customer_email=req.auth_email,
            total_amount=total_amount,
            paynow_reference=req.reference,
            paynow_poll_url=response.poll_url
        )
        db.add(new_order)
        db.commit()
        
        return {
            "success": True,
            "redirect_url": response.redirect_url if not req.phone else None,
            "poll_url": response.poll_url,
            "instructions": getattr(response, "instructions", None)
        }
    else:
        return {"success": False, "error": response.error if hasattr(response, 'error') else "Failed to initiate payment"}

@app.get("/api/paynow/status")
def check_status(poll_url: str, db: Session = Depends(database.get_db)):
    status = paynow.check_transaction_status(poll_url)
    if status.paid:
        order = db.query(models.Order).filter(models.Order.paynow_poll_url == poll_url).first()
        if order:
            order.status = "paid"
            db.commit()
    return {
        "status": status.status,
        "paid": status.paid,
        "reference": status.reference,
        "amount": status.amount
    }
