from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from paynow import Paynow
import os
from dotenv import load_dotenv

load_dotenv()

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

class PaymentRequest(BaseModel):
    reference: str
    auth_email: str
    items: list[dict] # [{"name": "Item 1", "amount": 10.0}]
    phone: str = None
    method: str = "ecocash" # ecocash, onemoney

@app.get("/api/python")
def hello_world():
    return {"message": "Hello from Python on Vercel!"}

@app.post("/api/paynow/initiate")
def initiate_payment(req: PaymentRequest):
    if not PAYNOW_INTEGRATION_ID or not PAYNOW_INTEGRATION_KEY:
        raise HTTPException(status_code=500, detail="Paynow credentials not configured")

    payment = paynow.create_payment(req.reference, req.auth_email)
    
    for item in req.items:
        payment.add(item["name"], item["amount"])

    if req.phone:
        # Mobile express checkout
        response = paynow.send_mobile(payment, req.phone, req.method)
    else:
        # Web checkout
        response = paynow.send(payment)

    if response.success:
        return {
            "success": True,
            "redirect_url": response.redirect_url if not req.phone else None,
            "poll_url": response.poll_url,
            "instructions": getattr(response, "instructions", None)
        }
    else:
        return {"success": False, "error": "Failed to initiate payment"}

@app.get("/api/paynow/status")
def check_status(poll_url: str):
    status = paynow.check_transaction_status(poll_url)
    return {
        "status": status.status,
        "paid": status.paid,
        "reference": status.reference,
        "amount": status.amount
    }
