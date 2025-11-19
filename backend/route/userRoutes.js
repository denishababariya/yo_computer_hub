const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Get user profile
router.get('/profile/:userId', userController.getUserProfile);

// Update user profile
router.put('/profile/:userId', userController.updateUserProfile);

// Get user orders
router.get('/orders/:userId', userController.getUserOrders);

// Get user addresses
router.get('/addresses/:userId', userController.getUserAddresses);

// Add new address
router.post('/addresses/:userId', userController.addAddress);

// Update address
router.put('/addresses/:userId/:addressId', userController.updateAddress);

// Delete address
router.delete('/addresses/:userId/:addressId', userController.deleteAddress);

// Get complete account data
router.get('/account/:userId', userController.getCompleteAccountData);

module.exports = router;
