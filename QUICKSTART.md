# ⚡ Quick Start Guide - 5 Minutes Setup

## Prerequisites
- Node.js installed
- MongoDB running locally OR MongoDB Atlas account
- Two terminal windows open

---

## Step 1: Backend Setup (2 minutes)

```bash
# Terminal 1
cd backend

# Install dependencies
npm install

# Verify .env file has:
# PORT=9000
# MONGO_URL=mongodb://localhost:27017/yo_computer_hub
# JWT_SECRET=your_secret_key

# Start backend server
npm start

# ✓ You should see:
# "Server running on port 9000"
# "MongoDB connected successfully"
```

---

## Step 2: Frontend Setup (2 minutes)

```bash
# Terminal 2
cd frontend

# Install dependencies
npm install

# Start frontend (auto-opens browser)
npm start

# ✓ App opens at http://localhost:3000
```

---

## Step 3: Test Integration (1 minute)

### Register a New User
1. Click **Sign Up** button
2. Fill in: Name, Email, Phone, Password
3. Click **Sign Up**
4. ✓ Should redirect to home with user info in navbar

### Browse Products
1. Go to **Shop** page
2. ✓ Products load from backend
3. Try filtering by category
4. Try searching

### Add to Cart & Checkout
1. Click any product
2. Click **Add to Cart**
3. Go to **Cart**
4. Click **Checkout**
5. Fill shipping details
6. Click **Place Order**
7. ✓ Order created in database

---

## Troubleshooting

### Port 9000 Already in Use
```bash
# Windows
netstat -ano | findstr :9000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :9000
kill -9 <PID>
```

### MongoDB Connection Failed
```bash
# Ensure MongoDB is running
mongod

# Or use MongoDB Atlas
# Update MONGO_URL in .env with Atlas connection string
```

### CORS Error in Browser
- Restart backend: `npm start`
- Clear browser cache
- Check localhost:3000 in server.js CORS config

### Products Not Loading
- Ensure backend is running
- Check MongoDB connection
- Add sample data (see SAMPLE_DATA.js)

---

## File Locations

| What | Where | Run |
|------|-------|-----|
| Backend Server | `backend/server.js` | `npm start` |
| Frontend App | `frontend/src/App.js` | `npm start` |
| API Client | `frontend/src/services/api.js` | Auto-imported |
| Auth Utils | `frontend/src/utils/auth.js` | Auto-imported |

---

## API Endpoints (Quick Reference)

```
POST   /api/auth/register       - Register user
POST   /api/auth/login          - Login user
GET    /api/products            - Get all products
GET    /api/products/:id        - Get product details
POST   /api/orders              - Create order
GET    /api/orders/user/:id     - Get user orders
```

---

## Database Info

**Database Name:** `yo_computer_hub`

**Collections:**
- `users` - User accounts
- `products` - Product catalog
- `orders` - Orders placed

**Connection String:**
```
mongodb://localhost:27017/yo_computer_hub
```

---

## Common URLs

| Service | URL | Port |
|---------|-----|------|
| Frontend App | http://localhost:3000 | 3000 |
| Backend API | http://localhost:9000 | 9000 |
| MongoDB | localhost:27017 | 27017 |

---

## Environment Variables

**Backend (.env)**
```
PORT=9000
MONGO_URL=mongodb://localhost:27017/yo_computer_hub
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

**Frontend** - Uses `http://localhost:9000/api` by default

---

## Key Features

✅ User Registration & Login
✅ Product Browsing & Filtering
✅ Shopping Cart
✅ Order Checkout
✅ Responsive Design
✅ JWT Authentication
✅ MongoDB Database

---

## Next Steps

After quick start works:

1. **Read Full Docs**
   - INTEGRATION_GUIDE.md - Detailed integration info
   - COMPLETION_SUMMARY.md - Full feature list
   - TESTING_CHECKLIST.md - Comprehensive testing

2. **Add Test Data**
   - Check SAMPLE_DATA.js for sample products
   - Add products via API or MongoDB Compass

3. **Run Tests**
   - Test all features listed in TESTING_CHECKLIST.md
   - Use Postman to test APIs

4. **Customize**
   - Update colors/branding
   - Add more products
   - Implement additional features

---

## Getting Help

**Backend Issues:**
- Check terminal output for errors
- Verify MongoDB is running
- Check .env file configuration

**Frontend Issues:**
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab for API calls

**Database Issues:**
- Use MongoDB Compass to visualize data
- Verify connection string in .env
- Check if MongoDB service is running

---

## Success Indicators

✓ Backend console shows "Server running on port 9000"
✓ Frontend opens at http://localhost:3000
✓ Can register and login successfully
✓ Products display in Shop page
✓ Can add items to cart
✓ Can place orders
✓ Data appears in MongoDB

---

**You're all set! Start with Step 1 and you'll have a working e-commerce app in 5 minutes! 🚀**
