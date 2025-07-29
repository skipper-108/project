# 🧾 Inventory Management Tool

A full-stack, production-ready **Inventory Management System** built using Node.js, Express, PostgreSQL, Sequelize, and React — all containerized using Docker for seamless deployment and scalability.

---

## 🚀 Tech Stack

- **Backend**: Node.js, Express, Sequelize ORM, PostgreSQL
- **Frontend**: React.js, Tailwind CSS
- **Authentication**: JWT-based
- **API Docs**: Swagger (OpenAPI)
- **DevOps**: Docker & Docker Compose

---

## 🔧 Features

### ✅ Backend
- User **registration & login** with JWT Auth
- Full **CRUD operations** on products
- **Swagger-based API documentation**
- PostgreSQL + Sequelize ORM
- Security middleware: **Helmet**, **CORS**, **Rate Limiting**
- Dockerized Node.js backend

### 🎯 Frontend
- **Responsive** UI with Tailwind CSS
- **Login/Register** authentication pages
- **Product dashboard** with inventory operations
- **Axios** for API requests with JWT support
- User feedback via **toast notifications**

---

## 🖼️ Screenshots

| Login | Products | Add Product |
|-------|----------|-------------|
| ![Login](https://github.com/skipper-108/project/raw/main/assets/login.png) | ![Products](https://github.com/skipper-108/project/raw/main/assets/products.png) | ![New Product](https://github.com/skipper-108/project/raw/main/assets/newProduct.png) |

| Register | Dashboard |
|----------|-----------|
| ![New User](https://github.com/skipper-108/project/raw/main/assets/newUser.png) | ![Dashboard](https://github.com/skipper-108/project/raw/main/assets/dashBoard.png) |

---

## 🐳 Docker Setup

Make sure you have Docker & Docker Compose installed.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/skipper-108/project.git
cd project
DATABASE_URL=postgresql://postgres:yourpassword@db:5432/inventory_db
docker-compose up --build
