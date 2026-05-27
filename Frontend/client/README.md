# Food Delivery Platform (Swiggy Clone)

A full-stack food delivery web application inspired by Swiggy/Zomato.  
Built using React, Redux Toolkit, Node.js, Express, PostgreSQL, and Sequelize.

It supports users, restaurants, and admin with full ordering, management, and analytics system.

# Project Features

## User Side

- Browse restaurants
- View food items
- Add to cart
- Place orders
- Track order status

## Restaurant Side

- Add / edit / delete food items
- Manage categories
- View orders
- Update order status

## Admin Side

- Manage users and restaurants
- Block / unblock accounts
- View all orders
- Revenue analytics
- Dashboard charts

---

# Tech Stack

## Frontend

- React (Vite)
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Axios
- Leaflet / Google Maps
- Recharts

## Backend

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM

## Authentication

- JWT Authentication
- bcrypt password hashing
- Role-Based Access Control (RBAC)

---

# Folder Structure

## Frontend

```
src/
├── components/
├── pages/
├── services/
├── routes/
├── redux/
├── hooks/
├── utils/
└── App.jsx
```

## Backend

```
server/
├── controllers/
├── routes/
├── models/
├── middleware/
├── config/
├── utils/
└── server.js
```

---

# Installation

## Frontend

```bash
cd client
npm install
npm run dev
```

## Backend

```bash
cd server
npm install
npm run dev
```

---

# Environment Variables

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=user_auth
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173
```

---

# Authentication

- User Signup / Login
- JWT Token based authentication
- Password hashing using bcrypt
- Role-based access (user, restaurant, admin)

### Flow

Login → JWT Token → Middleware Verify → Role Check → Access Routes

---

# API Modules

## Auth

```
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/profile
```

## Restaurants

```
GET    /api/restaurants
POST   /api/restaurants
PUT    /api/restaurants/:id
DELETE /api/restaurants/:id
```

## Foods

```
GET    /api/foods
POST   /api/foods
PUT    /api/foods/:id
DELETE /api/foods/:id
```

## Cart

```
GET    /api/cart
POST   /api/cart
DELETE /api/cart/:id
```

## Orders

```
POST /api/orders
GET  /api/orders
PUT  /api/orders/:id/status
```

---

# Database Schema

## Users

id, name, email, password, role

## Restaurants

id, name, address, latitude, longitude, is_active

## Foods

id, restaurant_id, name, price, category, image

## Orders

id, user_id, restaurant_id, total_price, status

## Order Items

id, order_id, food_id, quantity, price

---

# Order Flow

Order Placed → Preparing Food → Out for Delivery → Delivered

---

# Admin Dashboard

- Total Users
- Total Restaurants
- Total Orders
- Total Revenue
- Pending / Delivered Orders
- Daily & Monthly Reports
- Charts (Revenue, Users, Orders)

---

# Key Features

- Role-based access control
- Secure authentication system
- Full order lifecycle management
- Restaurant management system
- Admin analytics dashboard
- Scalable backend architecture

---

# Future Improvements

- Redis caching (for performance optimization)
- Socket.io real-time updates (live order tracking)
- Payment gateway integration (Razorpay / Stripe)
- Pagination for large data lists

---

# Summary

This project is a production-style full-stack food delivery system inspired by Swiggy/Zomato with complete authentication, ordering system, admin dashboard, and scalable backend design.
