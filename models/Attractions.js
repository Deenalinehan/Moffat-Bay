// Group 1 Capstone Database
// Roald Medendorp
// Austen Erickson 
// Deena Linehan 
// Giabella Apo 
// Kristina Vasquez 
// Thunder Harding 
// Violet Gonzalez 

// attractionsRoutes.js
const { Attraction, Booking } = require('../models');
const { validationResult } = require('express-validator');

exports.getAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.findAll({
            attributes: ['id', 'name', 'description', 'price', 'duration', 'image']
        });
        res.json(attractions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attractions' });
    }
};

exports.createBooking = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const attraction = await Attraction.findByPk(req.body.activityId);
        if (!attraction) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        const booking = await Booking.create({
            userId: req.user.id,
            attractionId: req.body.activityId,
            date: new Date(req.body.date),
            participants: req.body.participants,
            totalPrice: attraction.price * req.body.participants
        });

        // Send confirmation email (pseudo-code)
        // await sendBookingConfirmation(req.user.email, booking);

        res.status(201).json({
            message: 'Booking created successfully',
            booking
        });

    } catch (error) {
        res.status(500).json({ message: 'Booking failed', error: error.message });
    }
};

exports.validateBooking = [
    check('activityId').isInt().withMessage('Invalid activity ID'),
    check('date').isDate().withMessage('Invalid date format'),
    check('participants').isInt({ min: 1, max: 6 })
];