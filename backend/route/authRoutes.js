const express = require('express');
const router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const twilio = require('twilio');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';
const OTP_EXPIRY_MINUTES = parseInt(process.env.OTP_EXPIRY_MINUTES || '5', 10);
const RESET_TOKEN_EXPIRY_MINUTES = parseInt(process.env.RESET_TOKEN_EXPIRY_MINUTES || '10', 10);
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@gmail.com').toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@123';
const twilioClient =
  process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    : null;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
};

const sendOtpMessage = async (phone, otp) => {
  if (!twilioClient || !TWILIO_PHONE_NUMBER) {
    throw new Error('Twilio credentials are not configured');
  }

  return twilioClient.messages.create({
    body: `Your Yo Computer Hub verification code is ${otp}. It will expire in ${OTP_EXPIRY_MINUTES} minutes.`,
    from: TWILIO_PHONE_NUMBER,
    to: phone
  });
};

const normalizeEmail = (email) => (email || '').toLowerCase();
const isAdminEmail = (email) => normalizeEmail(email) === ADMIN_EMAIL;

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create new user
    const role = isAdminEmail(email) ? 'admin' : 'user';

    if (role === 'admin' && password !== ADMIN_PASSWORD) {
      return res.status(400).json({
        success: false,
        message: 'Admin account must use the configured admin password.'
      });
    }

    const newUser = new User({
      name,
      email,
      password,
      phone,
      role
    });

    await newUser.save();

    // Generate token
    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate token
    const incomingAdmin = isAdminEmail(email);
    if (incomingAdmin && password !== ADMIN_PASSWORD) {
      return res.status(403).json({ success: false, message: 'Invalid admin credentials' });
    }

    const desiredRole = incomingAdmin ? 'admin' : 'user';
    if (user.role !== desiredRole) {
      user.role = desiredRole;
      await user.save();
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get user profile
router.get('/profile/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update user profile
router.put('/profile/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    // Logout is primarily handled on frontend by removing token
    // Backend just confirms the logout action
    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Send OTP to phone number
router.post('/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Account not found for this phone number' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    user.resetOtp = hashedOtp;
    user.resetOtpExpires = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    try {
      await sendOtpMessage(phone, otp);
      console.log(`[OTP] Sent ${otp} to ${phone}`);
      res.json({ success: true, message: 'OTP sent successfully' });
    } catch (twilioError) {
      console.error('Twilio error:', twilioError.message);
      user.resetOtp = undefined;
      user.resetOtpExpires = undefined;
      await user.save();
      res.status(500).json({ success: false, message: 'Unable to send OTP. Please try again later.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Verify OTP and issue reset token
router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ success: false, message: 'Phone number and OTP are required' });
    }

    const user = await User.findOne({ phone });
    if (!user || !user.resetOtp || !user.resetOtpExpires) {
      return res.status(400).json({ success: false, message: 'Please request a new OTP' });
    }

    if (user.resetOtpExpires < Date.now()) {
      user.resetOtp = undefined;
      user.resetOtpExpires = undefined;
      await user.save();
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one.' });
    }

    const isMatch = await bcrypt.compare(otp, user.resetOtp);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid OTP. Please try again.' });
    }

    const resetToken = crypto.randomBytes(24).toString('hex');
    user.resetOtp = undefined;
    user.resetOtpExpires = undefined;
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + RESET_TOKEN_EXPIRY_MINUTES * 60 * 1000);
    await user.save();

    res.json({
      success: true,
      message: 'OTP verified successfully',
      resetToken
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Reset password using verified token
router.post('/reset-password', async (req, res) => {
  try {
    const { phone, password, token } = req.body;

    if (!phone || !password || !token) {
      return res.status(400).json({ success: false, message: 'Phone, token, and password are required' });
    }

    const user = await User.findOne({ phone, resetPasswordToken: token });
    if (!user || !user.resetPasswordExpires) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset link' });
    }

    if (user.resetPasswordExpires < Date.now()) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      return res.status(400).json({ success: false, message: 'Reset session expired. Please restart the process.' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ success: true, message: 'Password reset successfully. Please login with your new password.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
