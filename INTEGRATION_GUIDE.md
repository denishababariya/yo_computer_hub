# Frontend & Backend Integration Guide

## Overview
This document explains how the frontend and backend are integrated through API calls.

## Architecture

```
Frontend (React)                Backend (Node.js)
├── Services (api.js)    ←→    Express Server (Port 9000)
│   ├── productAPI       ←→    /api/products
│   ├── authAPI          ←→    /api/auth
│   ├── orderAPI         ←→    /api/orders
│   └── cartAPI          ←→    /api/cart
├── Pages
│   ├── Login            ←→    authAPI.login()
│   ├── Register         ←→    authAPI.register()
│   ├── Shop             ←→    productAPI.getAll()
│   ├── ProductDetails   ←→    productAPI.getById()
│   ├── Checkout         ←→    orderAPI.create()
│   └── Cart             ←→    Redux + localStorage
└── Utils
    └── auth.js          ←→    Token & User management
```

## Frontend Structure

### Services (`src/services/api.js`)
Centralized API client for all backend communication:

```javascript
// Product APIs
productAPI.getAll(params)       // Get all products
productAPI.getById(id)          // Get single product
productAPI.create(data)         // Create product (admin)
productAPI.update(id, data)     // Update product (admin)
productAPI.delete(id)           // Delete product (admin)

// Auth APIs
authAPI.register(data)          // Register user
authAPI.login(data)             // Login user
authAPI.getProfile(userId)      // Get user profile
authAPI.updateProfile(userId, data)  // Update profile

// Order APIs
orderAPI.create(data)           // Create order
orderAPI.getUserOrders(userId)  // Get user orders
orderAPI.getById(orderId)       // Get order details
orderAPI.update(orderId, data)  // Update order status
orderAPI.delete(orderId)        // Delete order

// Cart APIs
cartAPI.add(data)               // Add to cart
cartAPI.remove(data)            // Remove from cart
```

### Authentication Utilities (`src/utils/auth.js`)
Token and user data management:

```javascript
setToken(token)         // Store JWT token
getToken()             // Retrieve JWT token
removeToken()          // Remove JWT token

setUser(user)          // Store user data
getUser()              // Retrieve user data
removeUser()           // Remove user data

logout()               // Clear auth data
isAuthenticated()      // Check if user is logged in
```

## Data Flow Examples

### 1. User Registration
```
Frontend: Register Page
  ↓ handleSubmit()
  ↓ authAPI.register({name, email, phone, password})
  ↓ fetch('http://localhost:9000/api/auth/register')
Backend: POST /api/auth/register
  ↓ Create user (password hashed with bcrypt)
  ↓ Generate JWT token
  ↓ Return {success, token, user}
Frontend: 
  ↓ setToken(response.token)
  ↓ setUser(response.user)
  ↓ Navigate to home & reload
```

### 2. Product Listing
```
Frontend: Shop Page (useEffect)
  ↓ productAPI.getAll({category, search, sort})
  ↓ fetch('http://localhost:9000/api/products?...')
Backend: GET /api/products
  ↓ Query MongoDB
  ↓ Apply filters, search, sorting
  ↓ Return {success, data: products}
Frontend:
  ↓ setProducts(response.data)
  ↓ Render ProductCard components
```

### 3. Checkout & Order Creation
```
Frontend: Checkout Page
  ↓ handleSubmit()
  ↓ Collect shipping, cart items, payment method
  ↓ orderAPI.create({userId, items, totalAmount, shippingAddress, paymentMethod})
  ↓ fetch('http://localhost:9000/api/orders', {method: 'POST'})
Backend: POST /api/orders
  ↓ Validate order data
  ↓ Create order in MongoDB
  ↓ Return {success, data: order}
Frontend:
  ↓ Show success message
  ↓ Navigate to home
```

## Files Updated for Integration

### Frontend Pages
1. **Login.js** - Uses authAPI.login()
2. **Register.js** - Uses authAPI.register()
3. **Shop.js** - Uses productAPI.getAll()
4. **ProductDetails.js** - Uses productAPI.getById()
5. **Checkout.js** - Uses orderAPI.create()

### Frontend Components
1. **ProductCard.js** - Updated for MongoDB _id compatibility
2. **Navbar.js** - Uses auth utilities, shows user info

### Frontend Utils
1. **api.js** - API client with all endpoints
2. **auth.js** - Authentication utilities

## Running Both Servers

### Terminal 1: Backend
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:9000
```

### Terminal 2: Frontend
```bash
cd frontend
npm install
npm start
# App runs on http://localhost:3000
```

## API Request Headers
All requests automatically include:
```javascript
{
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {token}'  // If logged in
}
```

## Environment Variables

### Backend (.env)
```
PORT=9000
MONGO_URL=mongodb://localhost:27017/yo_computer_hub
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Frontend (src/services/api.js)
```javascript
const API_BASE_URL = 'http://localhost:9000/api';
```

## Error Handling
All API calls include try-catch blocks:
```javascript
try {
  const response = await authAPI.login(formData);
  if (response.success) {
    // Handle success
  } else {
    setError(response.message);
  }
} catch (err) {
  setError(err.message || 'Operation failed');
}
```

## Testing
1. Use Postman to test backend APIs
2. Check browser DevTools Network tab for requests
3. Check backend console for logs
4. Verify MongoDB documents with MongoDB Compass

## Common Issues & Solutions

### 1. CORS Error
**Error:** Access to XMLHttpRequest blocked by CORS
**Solution:** Ensure backend has CORS enabled for http://localhost:3000

### 2. Token Expired
**Error:** 401 Unauthorized
**Solution:** Clear localStorage and login again

### 3. Products Not Loading
**Error:** Empty array returned
**Solution:** Add sample products to MongoDB or use POST /api/products

### 4. Connection Refused
**Error:** Cannot connect to http://localhost:9000
**Solution:** Ensure backend server is running on port 9000

## Next Steps
1. Add sample data to MongoDB
2. Test all API endpoints with Postman
3. Run frontend and backend simultaneously
4. Test user registration and login
5. Create orders and verify database
6. Deploy to production server

## Support
For issues or questions, check:
- Backend logs in terminal
- Browser console (F12)
- Network tab in DevTools
- MongoDB connection status
