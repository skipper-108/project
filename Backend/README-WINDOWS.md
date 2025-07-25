# 🪟 Windows Installation Guide

## 📋 **Prerequisites (Install First)**

### 1. **Node.js** (Required)
- Download from: https://nodejs.org/
- Choose "LTS" version (18.x or higher)
- Install with default settings
- Verify: Open Command Prompt and type `node --version`

### 2. **Docker Desktop** (Required)
- Download from: https://www.docker.com/products/docker-desktop
- Install Docker Desktop for Windows
- Restart computer when prompted
- Start Docker Desktop from Start Menu
- Verify: Open Command Prompt and type `docker --version`

### 3. **Git** (Optional but recommended)
- Download from: https://git-scm.com/
- Install with default settings

---

## 🚀 **Quick Setup (Easiest Method)**

### **Option 1: Automated Setup**
1. **Download the project files** to `C:\Projects\inventory-management\`
2. **Open PowerShell as Administrator**
3. **Navigate to project directory:**
   ```powershell
   cd C:\Projects\inventory-management
   ```
4. **Run the setup script:**
   ```powershell
   .\setup-windows.ps1
   ```
5. **Wait for completion** (5-10 minutes)
6. **Open browser** to http://localhost:5173

---

## 📁 **Manual Setup (Step by Step)**

### **Step 1: Create Project Directory**
```cmd
cd C:\
mkdir Projects
cd Projects
mkdir inventory-management
cd inventory-management
```

### **Step 2: Download Project Files**
- Copy all project files to `C:\Projects\inventory-management\`
- Ensure you have both `backend\` and `frontend\` folders

### **Step 3: Setup Backend**
```cmd
cd backend
npm install
copy .env.example .env
```

### **Step 4: Setup Frontend**
```cmd
cd ..\frontend
npm install
```

### **Step 5: Start with Docker**
```cmd
cd ..
docker-compose up --build
```

### **Step 6: Open Application**
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000
- **API Docs:** http://localhost:3000/docs

---

## 🌐 **Using the Application**

### **First Time Setup:**
1. **Go to:** http://localhost:5173
2. **Click "Sign up here"** to create account
3. **Fill registration form:**
   - Username: your choice
   - Password: minimum 6 characters
4. **Click "Create account"**
5. **You'll be automatically logged in**

### **Managing Inventory:**
1. **Dashboard:** View inventory statistics
2. **Products:** Add, edit, search products
3. **Add Product:** Click blue "Add Product" button
4. **Edit Quantity:** Click on quantity numbers to edit

---

## 🔧 **Windows Commands**

### **Starting the Application:**
```cmd
# Start everything
docker-compose up

# Start in background
docker-compose up -d

# Start with rebuild
docker-compose up --build
```

### **Stopping the Application:**
```cmd
# Stop containers
docker-compose down

# Stop and remove everything
docker-compose down -v
```

### **Viewing Logs:**
```cmd
# View all logs
docker-compose logs -f

# View specific service
docker-compose logs -f app
docker-compose logs -f db
```

### **Checking Status:**
```cmd
# Check running containers
docker-compose ps

# Check Docker status
docker ps
```

---

## 🐛 **Common Windows Issues**

### **Issue 1: "Docker is not running"**
**Solution:**
1. Open Docker Desktop from Start Menu
2. Wait for it to fully start (whale icon in system tray)
3. Try command again

### **Issue 2: "Port already in use"**
**Solution:**
```cmd
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace XXXX with PID)
taskkill /PID XXXX /F

# Or use different ports in docker-compose.yml
```

### **Issue 3: "npm install fails"**
**Solution:**
```cmd
# Clear npm cache
npm cache clean --force

# Delete and reinstall
rmdir /s node_modules
del package-lock.json
npm install
```

### **Issue 4: "Permission denied"**
**Solution:**
1. Run Command Prompt as Administrator
2. Or run PowerShell as Administrator

### **Issue 5: "Cannot connect to database"**
**Solution:**
1. Ensure Docker is running
2. Check containers: `docker-compose ps`
3. Restart: `docker-compose restart`

---

## 📁 **File Structure**
```
C:\Projects\inventory-management\
├── backend\                    # Node.js API
│   ├── src\                   # Source code
│   ├── package.json           # Dependencies
│   └── .env                   # Environment variables
├── frontend\                   # React UI
│   ├── src\                   # Source code
│   ├── package.json           # Dependencies
│   └── public\                # Static files
├── docker-compose.yml          # Docker configuration
├── setup-windows.bat          # Windows batch setup
├── setup-windows.ps1          # PowerShell setup
└── README-WINDOWS.md          # This file
```

---

## 🎯 **Development Workflow**

### **Making Changes:**
1. **Edit files** in `backend\src\` or `frontend\src\`
2. **Save changes** - auto-reload enabled
3. **View in browser** - changes appear automatically

### **Adding New Features:**
1. **Backend:** Add to `backend\src\`
2. **Frontend:** Add to `frontend\src\`
3. **Database:** Add migrations to `backend\src\infrastructure\database\migrations\`

### **Testing:**
```cmd
# Backend tests
cd backend
python tests\test_api.py

# Frontend development
cd frontend
npm run dev
```

---

## 📞 **Getting Help**

### **Check Logs:**
```cmd
# All logs
docker-compose logs -f

# Backend only
docker-compose logs -f app

# Database only
docker-compose logs -f db
```

### **Restart Everything:**
```cmd
docker-compose down
docker-compose up --build
```

### **Reset Database:**
```cmd
docker-compose down -v
docker-compose up --build
```

---

## ✅ **Success Checklist**

- [ ] Node.js installed (`node --version` works)
- [ ] Docker Desktop installed and running
- [ ] Project files downloaded to `C:\Projects\inventory-management\`
- [ ] `docker-compose up` runs without errors
- [ ] http://localhost:5173 shows login page
- [ ] http://localhost:3000/health returns `{"status":"OK"}`
- [ ] Can create account and login
- [ ] Can add and view products

**If all checkboxes are ✅, your setup is complete!** 🎉 