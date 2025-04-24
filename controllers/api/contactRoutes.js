// Group 1 Capstone Database
// Roald Medendorp
// Austen Erickson 
// Deena Linehan 
// Giabella Apo 
// Kristina Vasquez 
// Thunder Harding 
// Violet Gonzalez 

// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const { 
    submitContactForm, 
    validateContactForm 
} = require('../controllers/contactRoutes');

router.post('/', validateContactForm, submitContactForm);

module.exports = router;
