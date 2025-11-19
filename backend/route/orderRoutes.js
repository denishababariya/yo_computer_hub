const express = require('express');
const router = express.Router();
const Order = require('../model/Order');
const { verifyToken } = require('../middleware/auth');
const Razorpay = require('razorpay');
const crypto = require('crypto');

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

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod
    });

    const savedOrder = await newOrder.save();
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

    // Create Razorpay order (amount in paise)
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

    // Update order record
    const order = await Order.findByIdAndUpdate(orderId, {
      paymentStatus: 'completed',
      orderStatus: 'confirmed',
      updatedAt: Date.now()
    }, { new: true });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get user orders (Protected route - requires login)
router.get('/user/:userId', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get order by ID (Protected route - requires login)
router.get('/:orderId', verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
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
