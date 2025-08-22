# 🛒 ShopEase — E-commerce Web Application

ShopEase is a modern full-stack e-commerce platform built with:
- 🔙 **Backend**: Node.js, Express.js, MongoDB
- 🔜 **Frontend**: React (Vite) or Vue.js (Vite)
- 🔐 Authentication, 🛍️ Product Management, 🧑‍💼 Roles (User/Merchant), 🗂️ Categories

---

## 📁 Project Structure

shopease/
│
├── frontend/ # Client app (React or Vue + Vite)
├── backend/ # Express + MongoDB REST API
└── README.md # Project documentation


---

## ⚙️ Features

### ✅ Frontend
- Built using **React** or **Vue** with **Vite**
- Login, Register, Profile Update
- Product listings with filters, sorting, pagination
- View product details
- Category browsing
- Merchant dashboard to manage products

### ✅ Backend
- REST API with **Express.js**
- **MongoDB** via **Mongoose**
- Role-based access (User / Merchant)
- Authentication using JWT
- File/image uploads
- Category + Subcategory system
- Full product CRUD for merchants
- API filtering, search, and pagination

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/shopease.git
cd shopease

🧱 Backend Setup (/backend)
📦 Install dependencies
cd backend
npm install

🔑 Create .env file
cp .env.example .env


Update .env with your MongoDB URI, JWT secret, etc.:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce-app
JWT_SECRET=your_secret_key

▶️ Start development server
npm run dev


The backend will run on: http://localhost:5000

🖥️ Frontend Setup (/frontend)
📦 Install dependencies
cd ../frontend
npm install

▶️ Start development server
npm run dev


The frontend will run on: http://localhost:5173

Make sure the frontend is sending requests to the correct backend URL (http://localhost:5000). If needed, update your frontend environment file:

VITE_API_URL=http://localhost:5000/api

🔒 CORS Note

Ensure your backend (/backend/server.js) includes proper CORS handling:

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

✅ API Endpoints (Examples)
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	User login
GET	/api/products	Get all products
POST	/api/products	Create product (merchant)
GET	/api/categories	List categories

🛠️ Tech Stack

Frontend: React or Vue, Vite, Axios

Backend: Node.js, Express.js, Mongoose, JWT

Database: MongoDB

Other: Multer (uploads), bcryptjs, cors

👨‍💻 Author

Made with ❤️ by Sanghamitra satpathy