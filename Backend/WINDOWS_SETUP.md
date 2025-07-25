# 🪟 Windows Setup Guide - Inventory Management Tool

## 📁 Directory Structure
```
C:\Projects\inventory-management\
├── backend\                    # Node.js Backend
├── frontend\                   # React Frontend  
├── docker-compose.yml          # Docker configuration
└── README.md                   # This file
```

## 🚀 Quick Setup Commands

### 1. Create Project Structure
```cmd
cd C:\
mkdir Projects
cd Projects
mkdir inventory-management
cd inventory-management
```

### 2. Clone or Download Project Files
You can either:
- Clone from Git: `git clone <repository-url> .`
- Or manually create the files (provided below)

### 3. Setup Backend
```cmd
cd backend
npm install
copy .env.example .env
```

### 4. Setup Frontend  
```cmd
cd ..\frontend
npm install
```

### 5. Start with Docker (Recommended)
```cmd
cd ..
docker-compose up --build
```

### 6. Or Start Manually
```cmd
# Terminal 1 - Start Backend
cd backend
npm run dev

# Terminal 2 - Start Frontend  
cd frontend
npm run dev
```

## 🌐 Access URLs
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Docs**: http://localhost:3000/docs
- **Database**: localhost:5433 (PostgreSQL)

## 🔧 Windows-Specific Commands

### PowerShell Commands
```powershell
# Check installations
node --version
npm --version
docker --version
python --version

# Start services
docker-compose up -d
docker-compose ps
docker-compose logs -f

# Stop services
docker-compose down
```

### Command Prompt Commands
```cmd
# Same commands work in cmd
node --version
npm --version
docker --version
py --version

# Docker commands
docker compose up -d
docker compose ps
docker compose logs -f
docker compose down
```

## 🐛 Common Windows Issues & Solutions

### Issue 1: Docker Desktop not starting
**Solution:**
1. Enable WSL2: `wsl --install`
2. Enable Hyper-V in Windows Features
3. Restart computer
4. Start Docker Desktop as Administrator

### Issue 2: Port already in use
**Solution:**
```cmd
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace PID)
taskkill /PID <process_id> /F
```

### Issue 3: npm install fails
**Solution:**
```cmd
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rmdir /s node_modules
del package-lock.json
npm install
```

### Issue 4: Python not found
**Solution:**
1. Reinstall Python with "Add to PATH" checked
2. Or use: `py` instead of `python`
3. Add Python to PATH manually

### Issue 5: Permission errors
**Solution:**
- Run Command Prompt as Administrator
- Or use PowerShell as Administrator

## 📝 Environment Variables (.env)

Create `.env` file in backend directory:
```env
# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5433/inventory_db
DB_HOST=db
DB_PORT=5432
DB_NAME=inventory_db
DB_USER=postgres
DB_PASSWORD=password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=3000
NODE_ENV=development

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🔄 Development Workflow

### Starting Development
```cmd
# Start everything with Docker
docker-compose up

# Or start manually (2 terminals)
# Terminal 1:
cd backend && npm run dev

# Terminal 2: 
cd frontend && npm run dev
```

### Making Changes
1. Edit files in `backend\src\` or `frontend\src\`
2. Save files - auto-reload enabled
3. View changes in browser

### Testing API
```cmd
# Install dependencies
cd backend
pip install requests

# Run tests
python tests\test_api.py
```

### Building for Production
```cmd
# Build frontend
cd frontend
npm run build

# Build Docker images
cd ..
docker-compose -f docker-compose.prod.yml up --build
```

## 📊 Database Management

### Access PostgreSQL (when running in Docker)
```cmd
# Connect to database container
docker exec -it inventory-management-db-1 psql -U postgres -d inventory_db

# Or use external tool:
# Host: localhost
# Port: 5433
# Database: inventory_db
# Username: postgres
# Password: password
```

### Run Migrations
```cmd
cd backend
npm run migrate
```

## 🎯 Next Steps

1. **Access Frontend**: http://localhost:5173
2. **Create Account**: Register a new user
3. **Add Products**: Start managing inventory
4. **View API Docs**: http://localhost:3000/docs
5. **Test APIs**: Use Postman collection or Python tests

## 📞 Troubleshooting

If you encounter issues:
1. Check Docker Desktop is running
2. Verify all ports are available (3000, 5173, 5433)
3. Check Windows Firewall settings
4. Run commands as Administrator if needed
5. Check logs: `docker-compose logs -f` 