# Latentia - Minimalist Desk Essentials

A premium e-commerce platform for curated workspace artifacts. Built with Next.js, Python, and Paynow.

## Features
- **Minimalist Design**: Inspired by editorial layouts and high-end industrial design.
- **Paynow Integration**: Secure payments via Paynow Zimbabwe (Ecocash, OneMoney, Visa/Mastercard).
- **Python Backend**: Micro-service for payment processing and heavy logic.
- **Vercel Blob Storage**: High-performance image hosting.
- **Dynamic Cart**: Seamless shopping experience.

## Tech Stack
- **Frontend**: Next.js (React)
- **Backend**: Python (FastAPI)
- **Database**: Vercel Postgres
- **Payments**: Paynow Python SDK
- **Storage**: Vercel Blob

---

## API & Payment Integration

The project uses a Python micro-server (`api/index.py`) to handle Paynow transactions securely.

### Prerequisites (Python SDK Setup)
To use the Paynow Python SDK, ensure you have the following installed:
```bash
pip install paynow
```

You must also have a **Paynow Integration ID** and **Integration Key** from the [Paynow Dashboard](https://www.paynow.co.zw).

### API Endpoints

#### 1. Initiate Payment
**Endpoint**: `POST /api/paynow/initiate`
**Description**: Creates a new payment request and returns either a redirect URL (for web) or instructions (for mobile).

**Payload**:
```json
{
  "reference": "Order-12345",
  "auth_email": "customer@example.com",
  "items": [
    {"name": "Mechanical Keyboard", "amount": 120.00}
  ],
  "phone": "0777123456", // Optional: for mobile express checkout
  "method": "ecocash" // ecocash or onemoney
}
```

#### 2. Check Transaction Status
**Endpoint**: `GET /api/paynow/status`
**Description**: Polls Paynow to check if a transaction has been paid.
**Query Params**: `poll_url` (received from the initiation response).

### Implementation Details
- The backend uses standard synchronous methods for Paynow calls, offloaded to thread pools by FastAPI to ensure high performance without blocking the event loop.
- All sensitive credentials are loaded via environment variables in the `.env` file.

---

## Getting Started

### Installation
1. Clone the repository.
2. Setup Frontend:
   ```bash
   cd frontend
   npm install
   ```
3. Setup Backend:
   ```bash
   pip install -r requirements.txt
   ```

### Running Locally
1. Start the Next.js dev server: `cd frontend && npm run dev`
2. Start the Python server: `uvicorn api.index:app --reload --port 8000`

## Deployment
This project is optimized for deployment on **Vercel**. 
- The `api/` directory contains Python Serverless Functions.
- The `frontend/` directory contains the Next.js application.
