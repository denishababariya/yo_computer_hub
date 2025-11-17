# Backend Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Update `.env` file with your settings:
```
PORT=9000
MONGO_URL=mongodb://localhost:27017/yo_computer_hub
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### 3. Start the Server
```bash
npm start          # Production mode
npm run dev        # Development mode (requires nodemon)
```

Server will run on: `http://localhost:9000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile/:userId` - Get user profile
- `PUT /api/auth/profile/:userId` - Update user profile

### Products
- `GET /api/products` - Get all products (supports filtering, searching, sorting)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders/:orderId` - Get order by ID
- `PUT /api/orders/:orderId` - Update order status
- `DELETE /api/orders/:orderId` - Delete order

### Cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove` - Remove item from cart

## Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  createdAt: Date
}
```

### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  category: String,
  image: String,
  images: [String],
  stock: Number,
  rating: Number,
  reviews: [{user, rating, comment, date}],
  specifications: Object,
  createdAt: Date
}
```

### Order
```javascript
{
  userId: ObjectId,
  items: [{productId, productName, price, quantity, image}],
  totalAmount: Number,
  shippingAddress: {name, email, phone, address, city, state, zipCode},
  orderStatus: enum['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
  paymentStatus: enum['pending', 'completed', 'failed'],
  paymentMethod: enum['card', 'upi', 'wallet', 'cod'],
  createdAt: Date,
  updatedAt: Date
}
```

## Features
✅ JWT Authentication with bcrypt password hashing
✅ MongoDB Integration
✅ RESTful API
✅ CORS Enabled
✅ Error Handling Middleware
✅ Product filtering and search
✅ Order management
✅ User authentication

## CORS Configuration
Frontend URL: `http://localhost:3000`

## Testing with cURL
```bash
# Register
curl -X POST http://localhost:9000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:9000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get products
curl http://localhost:9000/api/products
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGO_URL in .env
- For MongoDB Atlas, add IP to whitelist

### Port Already in Use
```bash
# Change PORT in .env or kill process using port 9000
```

### CORS Error
- Ensure frontend URL is in CORS whitelist
- Check server.js CORS configuration

## Production Deployment
For production, update `.env`:
```
NODE_ENV=production
MONGO_URL=your_production_mongodb_url
JWT_SECRET=your_strong_secret_key
```
