const Contact = require('../model/Contact');

// Create a new contact message
exports.createContact = async (req, res) => {
    try {
        const { name, company, email, phone, message } = req.body;
        console.log("req body", req.body);


        // Validation
        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: name, email, phone, message'
            });
        }

        const contact = new Contact({
            name,
            company,
            email,
            phone,
            message,
            status: 'new'
        });

        await contact.save();

        res.status(201).json({
            success: true,
            message: 'Contact message sent successfully',
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get all contact messages
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get a single contact message by ID
exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact message not found'
            });
        }

        res.json({
            success: true,
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Update contact message status
exports.updateContact = async (req, res) => {
    try {
        const { status } = req.body;

        if (status && !['new', 'read', 'replied'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be one of: new, read, replied'
            });
        }

        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact message not found'
            });
        }

        res.json({
            success: true,
            message: 'Contact message updated successfully',
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Delete contact message
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact message not found'
            });
        }

        res.json({
            success: true,
            message: 'Contact message deleted successfully',
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get contacts by status
exports.getContactsByStatus = async (req, res) => {
    try {
        const { status } = req.params;

        if (!['new', 'read', 'replied'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be one of: new, read, replied'
            });
        }

        const contacts = await Contact.find({ status }).sort({ createdAt: -1 });

        res.json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
