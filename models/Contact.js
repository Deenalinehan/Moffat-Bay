// Group 1 Capstone Database
// Roald Medendorp
// Austen Erickson 
// Deena Linehan 
// Giabella Apo 
// Kristina Vasquez 
// Thunder Harding 
// Violet Gonzalez 

// contactController.js
const { Contact } = require('../models');
const { validationResult } = require('express-validator');

exports.submitContactForm = async (req, res) => {
    try {
        // Check honeypot
        if(req.body.honeypot && req.body.honeypot.length > 0) {
            return res.status(200).json({ message: 'Message received' });
        }

        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Save to database
        const contact = await Contact.create({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent']
        });

        // Send confirmation email (pseudo-code)
        // await sendConfirmationEmail(req.body.email);

        res.status(201).json({
            message: 'Contact form submitted successfully',
            data: contact
        });

    } catch (error) {
        res.status(500).json({ 
            message: 'Error submitting form',
            error: error.message 
        });
    }
};

// Validation middleware
exports.validateContactForm = [
    check('name').trim().notEmpty().withMessage('Name is required'),
    check('email').isEmail().normalizeEmail(),
    check('subject').trim().notEmpty(),
    check('message').trim().isLength({ min: 10 })
];
