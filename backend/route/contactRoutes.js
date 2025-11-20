const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');

// Create a new contact message
router.post('/', contactController.createContact);

// Get all contact messages
router.get('/', contactController.getAllContacts);

// Get contacts by status
router.get('/status/:status', contactController.getContactsByStatus);

// Get a single contact message by ID
router.get('/:id', contactController.getContactById);

// Update contact message
router.put('/:id', contactController.updateContact);

// Delete contact message
router.delete('/:id', contactController.deleteContact);

module.exports = router;
