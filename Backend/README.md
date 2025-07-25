# Inventory Management Tool

A complete, production-ready inventory management backend API built with Node.js, Express, PostgreSQL, and JWT authentication. This project follows Clean Architecture principles for maintainability, testability, and scalability.

## 🚀 Features

- **Authentication System**: JWT-based user registration and login
- **Product Management**: Create, read, update product inventory
- **Database Migrations**: Sequelize migrations for database schema management
- **API Documentation**: Complete Swagger/OpenAPI documentation
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Security**: Rate limiting, CORS, Helmet security headers
- **Containerization**: Docker and Docker Compose setup
- **Testing**: Python test script for API endpoint validation

## 🏗️ Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

```
src/
├── domain/           # Business entities and repository interfaces
├── application/      # Use cases and business logic
├── infrastructure/   # Database models and repository implementations
└── interface/        # Controllers, routes, and middleware
```

### Layer Dependencies
- **Domain**: No dependencies (pure business logic)
- **Application**: Depends only on Domain
- **Infrastructure**: Depends on Domain and Application
- **Interface**: Depends on Application and Infrastructure

## 🛠️ Tech Stack

- **Runtime**: Node.js 16+
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Documentation**: Swagger/OpenAPI
- **Containerization**: Docker & Docker Compose
- **Code Quality**: ESLint, Prettier

## 📋 Prerequisites

- Node.js 16 or higher
- Docker and Docker Compose
- Python 3.7+ (for testing)

## 🚀 Quick Start

### Option 1: Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd inventory-management-tool
   ```

2. **Start the application**
   ```bash
   docker-compose up --build
   ```

3. **Access the API**
   - API Base URL: `http://localhost:3000`
   - Swagger Documentation: `http://localhost:3000/docs`
   - Health Check: `http://localhost:3000/health`

### Option 2: Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd inventory-management-tool
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your database credentials
   ```

4. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb inventory_db
   ```

5. **Run database migrations**
   ```bash
   npm run migrate
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

## 📚 API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user and get JWT token

### Products (Protected by JWT)
- `POST /products` - Create a new product
- `GET /products` - Get all products with pagination
- `PUT /products/:id/quantity` - Update product quantity

### Health Check
- `GET /health` - API health status

## 🔐 Authentication

All product endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Getting a Token

1. Register a user:
   ```bash
   curl -X POST http://localhost:3000/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "password": "password123"}'
   ```

2. Login to get a token:
   ```bash
   curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "password": "password123"}'
   ```

## 🧪 Testing

### Run API Tests
```bash
# Install Python dependencies
pip install requests

# Run tests
python tests/test_api.py

# Or with custom base URL
python tests/test_api.py http://localhost:3000
```

### Test Coverage
The test script covers:
- ✅ Health check endpoint
- ✅ User registration and login
- ✅ Product creation and management
- ✅ Authentication and authorization
- ✅ Input validation
- ✅ Error handling

## 📖 API Documentation

Access the interactive Swagger documentation at:
```
http://localhost:3000/docs
```

The documentation includes:
- Complete endpoint specifications
- Request/response schemas
- Authentication requirements
- Example requests and responses

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  sku VARCHAR(50) UNIQUE NOT NULL,
  image_url TEXT,
  description TEXT,
  quantity INTEGER NOT NULL DEFAULT 0,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Development

### Available Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run migrate    # Run database migrations
npm run migrate:undo # Undo last migration
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
npm run format     # Format code with Prettier
npm test           # Run API tests
```

### Code Quality
- **ESLint**: Code linting and style enforcement
- **Prettier**: Code formatting
- **ES Modules**: Modern JavaScript module system

### Environment Variables
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/inventory_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=inventory_db
DB_USER=postgres
DB_PASSWORD=password

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h

# Server
PORT=3000
NODE_ENV=development

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🐳 Docker

### Build and Run
```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Services
- **App**: Node.js application (port 3000)
- **Database**: PostgreSQL (port 5432)

## 📦 Postman Collection

Import the provided `postman_collection.json` into Postman for:
- Pre-configured API requests
- Environment variables
- Test scripts
- Example request bodies

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Rate Limiting**: Protection against brute force attacks
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers
- **Input Validation**: Comprehensive request validation
- **SQL Injection Protection**: Sequelize ORM with parameterized queries

## 🚀 Deployment

### Production Considerations
1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Configure production database
4. Set up SSL/TLS
5. Configure proper CORS origins
6. Set up monitoring and logging

### Environment Variables for Production
```bash
NODE_ENV=production
DATABASE_URL=your-production-database-url
JWT_SECRET=your-very-secure-jwt-secret
PORT=3000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting and formatting
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the API documentation at `/docs`
- Review the test examples in `tests/test_api.py`
- Import the Postman collection for examples

## 🎯 Project Structure

```
inventory-management-tool/
├── src/
│   ├── domain/                    # Business entities and interfaces
│   │   ├── entities/
│   │   │   ├── User.js
│   │   │   └── Product.js
│   │   └── repositories/
│   │       ├── UserRepository.js
│   │       └── ProductRepository.js
│   ├── application/               # Use cases
│   │   └── usecases/
│   │       ├── auth/
│   │       │   ├── RegisterUserUseCase.js
│   │       │   └── LoginUserUseCase.js
│   │       └── products/
│   │           ├── CreateProductUseCase.js
│   │           ├── UpdateProductQuantityUseCase.js
│   │           └── GetProductsUseCase.js
│   ├── infrastructure/            # External concerns
│   │   ├── database/
│   │   │   ├── connection.js
│   │   │   ├── config.js
│   │   │   ├── models/
│   │   │   │   ├── User.js
│   │   │   │   └── Product.js
│   │   │   └── migrations/
│   │   │       ├── 20250724-create-users.js
│   │   │       └── 20250724-create-products.js
│   │   └── repositories/
│   │       ├── SequelizeUserRepository.js
│   │       └── SequelizeProductRepository.js
│   ├── interface/                 # Controllers and routes
│   │   ├── controllers/
│   │   │   ├── AuthController.js
│   │   │   └── ProductController.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── products.js
│   │   └── middleware/
│   │       ├── authMiddleware.js
│   │       └── errorHandler.js
│   ├── docs/
│   │   └── swagger.js
│   └── app.js                     # Application entry point
├── tests/
│   └── test_api.py               # API test script
├── .env.example                  # Environment variables template
├── .eslintrc.js                  # ESLint configuration
├── .prettierrc                   # Prettier configuration
├── .sequelizerc                  # Sequelize CLI configuration
├── Dockerfile                    # Docker configuration
├── docker-compose.yml            # Docker Compose configuration
├── package.json                  # Node.js dependencies
├── postman_collection.json       # Postman collection
└── README.md                     # Project documentation
```

This structure ensures:
- **Separation of Concerns**: Each layer has a specific responsibility
- **Dependency Inversion**: High-level modules don't depend on low-level modules
- **Testability**: Business logic can be tested independently
- **Maintainability**: Clear boundaries between different parts of the application 