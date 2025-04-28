// Group 1 Capstone Database
// Roald Medendorp
// Austen Erickson 
// Deena Linehan 
// Giabella Apo 
// Kristina Vasquez 
// Thunder Harding 
// Violet Gonzalez 

// routes/attractionsRoutes.js
const express = require('express');
const router = express.Router();
const { 
    getAttractions,
    createBooking,
    validateBooking 
} = require('../controllers/attractionsRoutes');
const authenticate = require('../middleware/auth');

router.get('/', getAttractions);
router.post('/bookings', authenticate, validateBooking, createBooking);

module.exports = router;