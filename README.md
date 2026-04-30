# Latentia | Minimalist E-Commerce Platform

**Latentia** is a premium, high-performance e-commerce platform designed for curated workspace artifacts. It combines a state-of-the-art React frontend with a robust Python backend to provide a seamless shopping experience integrated with local payment gateways.

---

## 🏗️ Architecture Overview

The project is built as a **Monorepo** optimized for **Vercel** deployment:
- **Frontend**: [Next.js 16](https://nextjs.org/) (React)
- **Backend API**: [Python FastAPI](https://fastapi.tiangolo.com/)
- **Database**: [Neon Serverless Postgres](https://neon.tech/)
- **Media Storage**: [Vercel Blob](https://vercel.com/storage/blob)
- **Payments**: [Paynow Zimbabwe](https://www.paynow.co.zw/)

---

## 📂 Repository Structure

```text
├── api/                # Python Backend (FastAPI)
│   ├── database.py     # SQLAlchemy connection & session management
│   ├── index.py        # Main API entry point (Routes, Auth, Paynow logic)
│   ├── models.py       # SQL Database schemas (User, Product, Order)
│   └── seed.py         # Database initialization & catalog population
├── src/                # Frontend Source (Next.js/React)
│   ├── app/            # App Router (Pages: /, /shop, /login, /checkout)
│   ├── components/     # UI Components (Navbar, Footer, ProductCards)
│   ├── context/        # State Management (AuthContext, CartContext)
│   └── lib/            # Shared utilities (Blob storage helpers)
├── public/             # Static assets (Images, Icons)
├── requirements.txt    # Python package dependencies
├── package.json        # Node.js dependencies & scripts
└── vercel.json         # Vercel deployment & routing configuration
```

---

## 🧩 Module Breakdown

### 🛠️ Backend Modules (`/api`)
*   **`index.py` (Core Logic)**:
    *   Implements **FastAPI** routes for authentication, product retrieval, and payment processing.
    *   Contains the **OAuth2 & JWT** logic to secure endpoints.
    *   Integrates the **Paynow SDK** to initiate and verify transactions.
*   **`models.py` (Data Layer)**:
    *   Defines the `User` (primary key: `username`), `Product`, and `Order` relational models.
    *   Establishes relationships between users and their purchase history.
*   **`database.py`**:
    *   Handles the connection to **Neon Postgres** via SQLAlchemy.
    *   Includes a dependency generator (`get_db`) for safe database session handling.

### 💻 Frontend Modules (`/src`)
*   **`context/` (State & Security)**:
    *   `AuthContext.tsx`: Manages the JWT token, login/logout states, and persistent user sessions.
    *   `CartContext.tsx`: Handles the shopping cart state, persistence across pages, and total calculations.
*   **`app/` (Navigation & Pages)**:
    *   `/shop`: Fetches products from the Python API and displays them in a premium grid.
    *   `/checkout`: Handles the payment initiation, passing the JWT token to link orders to users.
    *   `/login`: A clean, minimalist interface for user authentication.
*   **`components/` (Reusable UI)**:
    *   `Navbar.tsx`: Features dynamic links that change based on whether a user is logged in.
    *   `ProductCard.tsx`: Implements the editorial design aesthetic for individual shop items.

---

## 💎 Key Features for Presentation

### 1. Minimalist Design Philosophy
- **Aesthetics**: Inspired by editorial layouts, utilizing a curated color palette (Neutral/Off-white) and premium typography (**Noto Serif** & **Manrope**).
- **Responsive Gallery**: A dynamic product shop built with CSS Grid and modern hover interactions.

### 2. Advanced Authentication System
- **JWT-Powered**: Secure user sessions using JSON Web Tokens.
- **User Profiles**: Persistent user accounts linked to purchase histories and order tracking.
- **Backend Security**: Password hashing using `bcrypt` and structured authorization flows.

### 3. Integrated Payment Flow (Paynow)
- **Multi-Method**: Supports **EcoCash**, **OneMoney**, and **Visa/Mastercard**.
- **Real-Time Polling**: A dedicated Python service tracks payment status from Paynow and updates the database automatically.

### 4. Optimized Developer Experience
- **Vercel Integration**: One-click deployment with automatic environment variable mapping for Postgres and Blob.
- **FastAPI Documentation**: Interactive Swagger API docs automatically generated at `/api/docs`.

---

## 🛠️ API Documentation

The Python backend (`/api`) handles all business logic and external integrations.

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/register` | `POST` | Create a new user account |
| `/api/token` | `POST` | Authenticate user and receive JWT |
| `/api/products` | `GET` | Fetch the full product catalog |
| `/api/me/orders` | `GET` | Retrieve purchase history for the current user |
| `/api/paynow/initiate` | `POST` | Start a new payment transaction |
| `/api/paynow/status` | `GET` | Poll for payment confirmation |

---

## 🚀 Setup & Execution

### Prerequisites
- Node.js 18+ & Python 3.12+
- Vercel Postgres & Blob instances

### 1. Installation
```bash
# Install Node dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt
```

### 2. Database Seeding
To populate the shop with initial items:
```bash
python api/seed.py
```

### 3. Running Locally
```bash
# Frontend
npm run dev

# Backend
uvicorn api.index:app --reload --port 8000
```

---

## 📄 Team Credits
Developed as a proof-of-concept for a premium, local-integrated e-commerce solution in Zimbabwe.
