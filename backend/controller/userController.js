const User = require('../model/User');
const Order = require('../model/Order');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        gender: user.gender,
        avatar: user.avatar,
        address: user.address,
        city: user.city,
        state: user.state,
        zipCode: user.zipCode
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, email, phone, dob, gender, avatar, address, city, state, zipCode } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        phone,
        dob,
        gender,
        avatar,
        address,
        city,
        state,
        zipCode,
        updatedAt: new Date()
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    if (!orders) {
      return res.json({
        success: true,
        data: []
      });
    }

    const formattedOrders = orders.map(order => ({
      _id: order._id.toString(), // Include original _id for API calls
      id: order._id.toString().toUpperCase().slice(0, 8),
      date: new Date(order.createdAt).toISOString().split('T')[0],
      status: order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1),
      orderStatus: order.orderStatus, // Include original orderStatus
      paymentStatus: order.paymentStatus, // Include paymentStatus
      totalAmount: order.totalAmount, // Include original totalAmount
      items: order.items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        name: item.productName,
        price: item.price,
        priceFormatted: `₹${item.price}`,
        image: item.image || 'https://via.placeholder.com/300x300?text=Product',
        quantity: item.quantity
      })),
      total: `₹${order.totalAmount}`,
      shippingAddress: order.shippingAddress
    }));

    res.json({
      success: true,
      data: formattedOrders
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get user addresses
exports.getUserAddresses = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      data: user.addresses || []
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add new address
exports.addAddress = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, address, phone } = req.body;

    if (!name || !address || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const newAddress = {
      name,
      address,
      phone,
      isDefault: user.addresses.length === 0
    };

    user.addresses.push(newAddress);
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Address added successfully',
      data: user.addresses
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update address
exports.updateAddress = async (req, res) => {
  try {
    const userId = req.params.userId;
    const addressId = req.params.addressId;
    const { name, address, phone } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);
    if (addressIndex === -1) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    user.addresses[addressIndex] = {
      ...user.addresses[addressIndex],
      name: name || user.addresses[addressIndex].name,
      address: address || user.addresses[addressIndex].address,
      phone: phone || user.addresses[addressIndex].phone
    };

    await user.save();

    res.json({
      success: true,
      message: 'Address updated successfully',
      data: user.addresses
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete address
exports.deleteAddress = async (req, res) => {
  try {
    const userId = req.params.userId;
    const addressId = req.params.addressId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId);
    await user.save();

    res.json({
      success: true,
      message: 'Address deleted successfully',
      data: user.addresses
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get complete account data (profile + orders + addresses)
exports.getCompleteAccountData = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    const formattedOrders = orders.map(order => ({
      _id: order._id.toString(), // Include original _id for API calls
      id: order._id.toString().toUpperCase(),
      date: new Date(order.createdAt).toISOString().split('T')[0],
      status: order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1),
      orderStatus: order.orderStatus, // Include original orderStatus for checks
      paymentStatus: order.paymentStatus, // Include paymentStatus
      totalAmount: order.totalAmount, // Include original totalAmount for payment
      items: order.items.map(item => ({
        productId: item.productId, // Include productId
        productName: item.productName, // Include original productName
        name: item.productName,
        price: item.price, // Include original price (number)
        priceFormatted: `₹${item.price}`, // Formatted price for display
        image: item.image || 'https://via.placeholder.com/300x300?text=Product',
        quantity: item.quantity // Include quantity
      })),
      total: `₹${order.totalAmount}`,
      shippingAddress: order.shippingAddress // Include shipping address
    }));

    res.json({
      success: true,
      data: {
        profile: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          dob: user.dob,
          gender: user.gender,
          avatar: user.avatar,
          address: user.address,
          city: user.city,
          state: user.state,
          zipCode: user.zipCode,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        },
        orders: formattedOrders,
        addresses: user.addresses || []
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
