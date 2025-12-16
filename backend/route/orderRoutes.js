const express = require('express');
const router = express.Router();
const Order = require('../model/Order');
const Product = require('../model/Product');
const { verifyToken } = require('../middleware/auth');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { log } = require('console');

// Setup Razorpay instance (use env vars or provided test keys)
const RZP_KEY_ID = process.env.RZP_KEY_ID || 'rzp_test_hN631gyZ1XbXvp';
const RZP_KEY_SECRET = process.env.RZP_KEY_SECRET || 'cyEtaHUAdDxizji35zP4u2VK';
const rzpInstance = new Razorpay({ key_id: RZP_KEY_ID, key_secret: RZP_KEY_SECRET });

// Create order (Protected route - requires login)
router.post('/', verifyToken, async (req, res) => {
  try {
    // Verify user is authenticated and userId matches token
    const userId = req.body.userId;
    if (req.user.id !== userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized: User ID mismatch' });
    }

    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0 || !totalAmount) {
      return res.status(400).json({ success: false, message: 'Invalid order data' });
    }

    // Check stock availability for all items before creating order
    for (const item of items) {
      try {
        const prod = await Product.findById(item.productId);
        if (prod && prod.stock < (item.quantity || 1)) {
          return res.status(400).json({ success: false, message: `Insufficient stock for product ${prod.name || item.productName || item.productId}` });
        }
      } catch (e) {
        // product may not exist - skip strict check
      }
    }

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod
    });

    const savedOrder = await newOrder.save();

    // Decrement stock for each item
    for (const item of items) {
      try {
        const decrementAmount = Math.max(1, item.quantity || 1);
        const result = await Product.findByIdAndUpdate(
          item.productId,
          { $inc: { stock: -decrementAmount } },
          { new: true }
        );
        console.log(`Stock decremented for product ${item.productId}: decreased by ${decrementAmount}`, result ? `new stock: ${result.stock}` : 'product not found');
      } catch (e) {
        console.error('Stock decrement failed for', item.productId, ':', e.message);
      }
    }

    res.status(201).json({ success: true, data: savedOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create Razorpay order and DB order (Protected)
router.post('/create_razorpay', verifyToken, async (req, res) => {
  try {
    const userId = req.body.userId;
    if (req.user.id !== userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized: User ID mismatch' });
    }

    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0 || !totalAmount) {
      return res.status(400).json({ success: false, message: 'Invalid order data' });
    }

    // Check stock availability for all items before creating order
    for (const item of items) {
      try {
        const prod = await Product.findById(item.productId);
        if (prod && prod.stock < (item.quantity || 1)) {
          return res.status(400).json({ success: false, message: `Insufficient stock for product ${prod.name || item.productName || item.productId}` });
        }
      } catch (e) {
        // product may not exist - skip strict check
      }
    }

    // Create DB order with pending payment status
    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: 'pending',
      orderStatus: 'pending'
    });
    const savedOrder = await newOrder.save();

    // For COD orders, decrement stock immediately
    if (paymentMethod === 'cod') {
      for (const item of items) {
        try {
          const decrementAmount = Math.max(1, item.quantity || 1);
          const result = await Product.findByIdAndUpdate(
            item.productId,
            { $inc: { stock: -decrementAmount } },
            { new: true }
          );
          console.log(`[COD] Stock decremented for product ${item.productId}: decreased by ${decrementAmount}`, result ? `new stock: ${result.stock}` : 'product not found');
        } catch (e) {
          console.error('[COD] Stock decrement failed for', item.productId, ':', e.message);
        }
      }
      // Mark COD order as confirmed since stock is reserved
      savedOrder.orderStatus = 'confirmed';
      await savedOrder.save();
    }

    // Create Razorpay order (amount in paise) - for online payments
    const options = {
      amount: Math.round(totalAmount * 100),
      currency: 'INR',
      receipt: savedOrder._id.toString(),
      payment_capture: 1
    };
    const razorpayOrder = await rzpInstance.orders.create(options);

    res.status(201).json({ success: true, data: { razorpayOrder, order: savedOrder, key: RZP_KEY_ID } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Verify payment signature and update order
router.post('/verify_payment', verifyToken, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      return res.status(400).json({ success: false, message: 'Missing payment verification data' });
    }

    const generated_signature = crypto.createHmac('sha256', RZP_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    // Find order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Check stock availability for all items before decrementing
    for (const item of order.items) {
      try {
        const prod = await Product.findById(item.productId);
        if (prod && prod.stock < (item.quantity || 1)) {
          return res.status(400).json({ success: false, message: `Insufficient stock for product ${prod.name || item.productName || item.productId}` });
        }
      } catch (e) {
        // product may not exist - skip strict check
      }
    }

    // Decrement stock for each item
    for (const item of order.items) {
      try {
        const decrementAmount = Math.max(1, item.quantity || 1);
        const result = await Product.findByIdAndUpdate(
          item.productId,
          { $inc: { stock: -decrementAmount } },
          { new: true }
        );
        console.log(`Stock decremented for product ${item.productId}: decreased by ${decrementAmount}`, result ? `new stock: ${result.stock}` : 'product not found');
      } catch (e) {
        console.error('Stock decrement failed for', item.productId, ':', e.message);
      }
    }

    // Update order record
    order.paymentStatus = 'completed';
    order.orderStatus = 'confirmed';
    order.updatedAt = Date.now();
    await order.save();

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get user orders (Protected route - requires login)
router.get('/user/:userId', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    console.log(orders,"ooo");
    
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get order by ID (Protected route - requires login) - MUST come before /:orderId/create_payment
router.get('/:orderId', verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    console.log(order,"order")
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Rate all products in an order (Protected route) - MUST come before /:orderId/create_payment
// POST /api/orders/:orderId/rate-item
router.post('/:orderId/rate-item', verifyToken, async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Invalid rating' });
    }

    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    if (order.orderStatus !== 'delivered') {
      return res.status(400).json({ success: false, message: 'Order not delivered' });
    }

    const item = order.items.find(i => i.productId === productId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Product not found in order' });
    }

    if (item.rating) {
      return res.status(400).json({ success: false, message: 'Already rated' });
    }

    // ✅ Save item rating
    item.rating = rating;
    item.review = comment || '';
    item.ratedAt = Date.now();

    // ✅ Update product rating
    const product = await Product.findById(productId);
    if (product) {
      product.reviews.push({
        user: req.user.id,
        rating,
        comment
      });

      const total = product.reviews.reduce((sum, r) => sum + r.rating, 0);
      product.rating = total / product.reviews.length;
      await product.save();
    }


    await order.save();

    res.json({ success: true, message: 'Product rated successfully', data: order });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


// Create Razorpay order for existing order (Protected) - MUST come after GET /:orderId
router.post('/:orderId/create_payment', verifyToken, async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.body.userId;

    if (req.user.id !== userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized: User ID mismatch' });
    }

    // Find existing order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Verify order belongs to user
    if (order.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized: Order does not belong to user' });
    }

    // Check if order is already paid
    if (order.paymentStatus === 'completed') {
      return res.status(400).json({ success: false, message: 'Order is already paid' });
    }

    // Create Razorpay order (amount in paise)
    const options = {
      amount: Math.round(order.totalAmount * 100),
      currency: 'INR',
      receipt: order._id.toString(),
      payment_capture: 1
    };
    const razorpayOrder = await rzpInstance.orders.create(options);

    res.json({ success: true, data: { razorpayOrder, order, key: RZP_KEY_ID } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update order status (Protected route - requires login)
router.put('/:orderId', verifyToken, async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { orderStatus, paymentStatus, updatedAt: Date.now() },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete order (Protected route - requires login)
router.delete('/:orderId', verifyToken, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
