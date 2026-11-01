# Simple Shop

A small e-commerce website made with React, Node.js and Express.

I kept the code simple and split the pages into separate components so it is easier to understand and edit.

## Features

- View products
- Search for products
- Filter products by category
- Open a product page
- Create an account and log in
- Add products to the cart
- Change item quantities
- Place an order
- View previous orders

## Technologies

- React
- React Router
- Node.js
- Express.js
- REST API
- JWT
- bcryptjs
- CSS

## Database

MongoDB is not connected because the task clarification says a database is optional.

The sample products are stored in `backend/data.js`. Users and orders are stored temporarily in backend memory. They will reset when the backend server restarts. The shopping cart is saved in browser local storage.

## How to run the project

You need Node.js and npm installed.

### 1. Start the backend

Open a terminal and run:

```bash
cd backend
npm install
```

Copy `.env.example` to a new file named `.env`. Add your own JWT secret in that file.

Then start the backend:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

### 2. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local link shown in the terminal. It is usually:

```text
http://localhost:5173
```

## Main API routes

| Method | Route | What it does |
|---|---|---|
| GET | `/api/products` | Shows all products |
| GET | `/api/products/:id` | Shows one product |
| POST | `/api/auth/register` | Creates an account |
| POST | `/api/auth/login` | Logs in |
| POST | `/api/orders` | Places an order |
| GET | `/api/orders/my-orders` | Shows the user's orders |

## Project folders

```text
simple-mern-shop/
  backend/
    middleware/
    routes/
    data.js
    server.js
  frontend/
    src/
      components/
      pages/
      App.jsx
      api.js
      main.jsx
      style.css
```

This is a learning project. It does not process real payments and does not use permanent database storage.
