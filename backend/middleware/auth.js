const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided. Please login to continue.' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Normalize token payload to provide `req.user.id` for route checks
      // Some tokens are signed with { userId }, ensure `id` is available
    req.user = {
      id: decoded.userId || decoded.user_id || decoded.id,
      role: decoded.role || 'user',
      ...decoded
    };
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token. Please login again.' 
    });
  }
};

const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin privileges required.'
    });
  }
  next();
};

module.exports = { verifyToken, requireAdmin };
