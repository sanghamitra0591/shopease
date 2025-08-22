# 🛍️ Shopease – MERN Stack

A full-stack e-commerce platform built with **Node.js, Express, MongoDB, React, Redux Toolkit, and Material UI**.  
It supports both **Users** and **Merchants** with authentication, product management, and filtering capabilities.

---

## 🌐 Deployed URLs

- 🔗 **Frontend**: [https://shopease-sooty.vercel.app](https://shopease-sooty.vercel.app)
- 🔗 **Backend API**: [https://shopease-ppme.onrender.com](https://shopease-ppme.onrender.com)

---

## ⚙️ Tech Stack

**Frontend:**
- React + Vite
- Redux Toolkit
- Material UI + React Icons
- Vanilla CSS (atomic structure)

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt (password hashing)
- dotenv (env variables)

---

## 👥 Roles & Functionality

### 🔐 Authentication
- JWT-based Login & Registration
- Role-based access (User / Merchant)
- Secure password storage using `bcrypt`
- Protected routes for merchant-only actions
- Logout functionality

---

## 🧑‍💼 Merchant Features

| Feature               | Description                                    |
|------------------------|------------------------------------------------|
| Add Product           | Name, Category, Subcategory, Price, Location   |
| Edit Product          | Only own products                              |
| Delete Product        | With confirmation                              |
| View Own Products     | Paginated & manageable                         |
| Dashboard UI          | Responsive, clean layout with edit/delete      |

---

## 🙋‍♂️ User Features

| Feature                 | Description                                |
|--------------------------|--------------------------------------------|
| Browse Products         | All listed products                        |
| Filter Products         | By Category, Subcategory, Location, Price  |
| Search Bar              | Search by product name or description      |
| Pagination              | Navigate through products                  |
| Responsive UI           | Clean and mobile-friendly                  |

---

## 📦 API Endpoints

### 🔐 Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### 🛍️ Products
- `GET /api/products` – All products with filters + pagination
- `POST /api/products` – (Merchant only) Create
- `PUT /api/products/:productId` – (Merchant only) Update
- `DELETE /api/products/:productId` – (Merchant only) Delete
- `GET /api/products/merchant` – Products by current merchant

> ✅ All routes are secured using JWT Auth Middleware and Role Middleware.

---

## 📁 Folder Structure Highlights

### Backend (Express - MVC)
backend/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── .env

shell
Copy code

### Frontend (React + Atomic + Redux)
client/
├── src/
│ ├── components/ (atoms, molecules, organisms)
│ ├── redux/
│ │ ├── slices/
│ │ ├── store.js
│ ├── pages/
│ ├── App.jsx

yaml
Copy code

---

## 🛠️ Setup (Optional – if not using deployed version)

### Backend
```bash
cd backend
npm install
npm run dev
Create .env file:

env
Copy code
PORT=3000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
Frontend
bash
Copy code
cd client
npm install
npm run dev
Create .env file:

env
Copy code
VITE_API_URL=http://localhost:3000/api