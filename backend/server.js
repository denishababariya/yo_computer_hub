const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/yo_computer_hub';

if (!mongoUrl) {
  console.error('Missing MongoDB connection string. Set MONGO_URL in your .env file.');
  process.exit(1);
}

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000
})
.then(() => {
  console.log('MongoDB connected successfully');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});

// Routes
const productRoutes = require('./route/productRoutes');
const authRoutes = require('./route/authRoutes');
const orderRoutes = require('./route/orderRoutes');
const cartRoutes = require('./route/cartRoutes');
const userRoutes = require('./route/userRoutes');
const contactRoutes = require('./route/contactRoutes');
const adminRoutes = require('./route/adminRoutes');
const { verifyToken, requireAdmin } = require('./middleware/auth');

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/admin', verifyToken, requireAdmin, adminRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', port: PORT });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});
