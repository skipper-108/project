# 🎨 Inventory Management Frontend

A modern, responsive React frontend for the Inventory Management Tool. Built with React 18, Vite, and Tailwind CSS for a fast, beautiful, and user-friendly experience.

## ✨ Features

### 🔐 **Authentication**
- **User Registration** - Create new accounts with validation
- **User Login** - Secure authentication with JWT tokens
- **Protected Routes** - Automatic redirect for unauthorized access
- **Session Management** - Persistent login state

### 📊 **Dashboard**
- **Inventory Overview** - Real-time stats and metrics
- **Quick Stats Cards** - Total products, inventory value, stock alerts
- **Recent Products** - Latest inventory items
- **Quick Actions** - Fast navigation to common tasks

### 📦 **Product Management**
- **Product List** - Paginated view of all inventory items
- **Add Products** - Create new inventory items with validation
- **Edit Products** - Update product quantities (inline editing)
- **Search & Filter** - Find products by name, SKU, type, or stock level
- **Stock Status** - Visual indicators for in-stock, low-stock, and out-of-stock

### 🎨 **Modern UI/UX**
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark/Light Theme** - Professional color scheme
- **Interactive Components** - Smooth animations and transitions
- **Toast Notifications** - Real-time feedback for actions
- **Loading States** - Skeleton screens and spinners

## 🛠️ **Tech Stack**

### **Core Framework**
- **React 18** - Latest React with hooks and concurrent features
- **Vite** - Fast build tool and development server
- **React Router 6** - Modern routing with nested routes

### **Styling & UI**
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Inter Font** - Modern, professional typography

### **State Management**
- **React Context** - Global authentication state
- **React Hook Form** - Form handling with validation
- **Local State** - Component-level state management

### **API Integration**
- **Axios** - HTTP client with interceptors
- **Error Handling** - Comprehensive error management
- **Token Management** - Automatic JWT token handling

### **Development Tools**
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **TypeScript Support** - Type checking capabilities

## 📁 **Project Structure**

```
frontend/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Layout.jsx       # Main app layout with navigation
│   │   └── LoadingSpinner.jsx # Loading indicator component
│   ├── contexts/            # React Context providers
│   │   └── AuthContext.jsx  # Authentication state management
│   ├── pages/              # Page components
│   │   ├── Login.jsx       # Login page
│   │   ├── Register.jsx    # Registration page
│   │   ├── Dashboard.jsx   # Main dashboard
│   │   ├── Products.jsx    # Product management
│   │   └── NotFound.jsx    # 404 error page
│   ├── services/           # API and external services
│   │   └── api.js         # Axios configuration and API calls
│   ├── App.jsx            # Main app component with routing
│   ├── main.jsx           # React app entry point
│   └── index.css          # Global styles and Tailwind imports
├── public/                # Static assets
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── README.md             # This file
```

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 16+ installed
- Backend API running on `http://localhost:3000`

### **Installation & Setup**

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Configuration**
   ```bash
   # Create environment file (optional)
   echo "VITE_API_URL=http://localhost:3000" > .env.local
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access Application**
   ```
   http://localhost:5173
   ```

## 🔧 **Available Scripts**

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## 🎯 **Key Features in Detail**

### **Authentication Flow**
```javascript
// Automatic token management
const { user, login, logout, isAuthenticated } = useAuth();

// Protected route example
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

### **API Integration**
```javascript
// Centralized API service
import { productsAPI, authAPI } from './services/api';

// Auto-retry and error handling
const products = await productsAPI.getAll();
```

### **Form Handling**
```javascript
// React Hook Form integration
const { register, handleSubmit, formState: { errors } } = useForm();

// Validation and submission
<input {...register('name', { required: 'Name is required' })} />
```

### **Responsive Design**
```css
/* Mobile-first approach */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <!-- Responsive grid -->
</div>
```

## 🔗 **API Endpoints Used**

### **Authentication**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### **Products**
- `GET /products` - Fetch products with pagination
- `POST /products` - Create new product
- `PUT /products/:id/quantity` - Update product quantity

### **Health**
- `GET /health` - API health check

## 🎨 **Design System**

### **Colors**
- **Primary**: Blue (`#3b82f6`) - Main brand color
- **Success**: Green (`#10b981`) - Success states
- **Warning**: Yellow (`#f59e0b`) - Warning states
- **Error**: Red (`#ef4444`) - Error states
- **Gray Scale**: Modern gray palette for text and backgrounds

### **Typography**
- **Font Family**: Inter (system fallback)
- **Sizes**: Responsive scale from 12px to 48px
- **Weights**: 300, 400, 500, 600, 700

### **Spacing**
- **Consistent Scale**: 4px base unit (0.25rem)
- **Component Padding**: 16px, 24px for cards and forms
- **Page Margins**: 24px responsive margins

## 📱 **Responsive Design**

### **Breakpoints**
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### **Navigation**
- **Mobile**: Collapsible hamburger menu
- **Desktop**: Fixed sidebar navigation
- **Tablet**: Adaptive layout

## 🔒 **Security Features**

### **Authentication**
- JWT token storage in localStorage
- Automatic token refresh handling
- Protected route redirects
- Session timeout management

### **Data Validation**
- Client-side form validation
- Input sanitization
- Error boundary implementation
- XSS prevention

## 🚀 **Performance Optimizations**

### **Code Splitting**
- Route-based code splitting
- Lazy loading for large components
- Tree shaking for smaller bundles

### **Caching**
- API response caching
- Image optimization
- Static asset caching

### **Bundle Optimization**
- Vite for fast builds
- ES modules for better tree shaking
- CSS purging with Tailwind

## 🔄 **State Management**

### **Global State (Context API)**
- Authentication state
- User information
- Loading states

### **Local State (useState)**
- Form data
- UI state (modals, filters)
- Component-specific data

### **Server State**
- API data caching
- Optimistic updates
- Error state management

## 🧪 **Testing Strategy**

### **Unit Tests**
- Component testing with React Testing Library
- Utility function tests
- Custom hook testing

### **Integration Tests**
- API integration tests
- Authentication flow tests
- User journey tests

## 🚢 **Deployment**

### **Production Build**
```bash
npm run build
```

### **Environment Variables**
```bash
VITE_API_URL=https://your-api-domain.com
VITE_APP_NAME=Inventory Management Tool
```

### **Static Hosting**
- Vercel, Netlify, or any static host
- Docker containerization ready
- CDN-friendly build output

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 **License**

MIT License - see LICENSE file for details

---

## 🎉 **Get Started**

Ready to manage your inventory with style? 

1. **Start the backend** (see backend README)
2. **Install frontend dependencies**: `npm install`
3. **Start development**: `npm run dev`
4. **Open your browser**: `http://localhost:5173`
5. **Create an account** and start managing your inventory! 🚀

---

**Built with ❤️ using React, Vite, and Tailwind CSS** 