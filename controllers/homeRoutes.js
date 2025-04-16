// the home routes serve the webpages to the broswer

const router = require("express").Router();
const path = require('path');
const withAuth = require('../utils/auth');


// Home Page (dashboard)
// will look like http://localhost:3001/
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

// About Page
// will look like http://localhost:3001/about
router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/about.html'));
});

// // Amenities Page
// will look like http://localhost:3001/amenities
router.get('/amenities', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/amenities.html'));
});

// // Registration Page
// will look like http://localhost:3001/registration
router.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/registration.html'));
});

// // Login Page
// will look like http://localhost:3001/login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

// // Reservation Page
// will look like http://localhost:3001/reservation
router.get('/reservation', withAuth, (req, res) => {
     res.sendFile(path.join(__dirname, '../views/reservation.html'));
});

// // Reservation Lookup Page
// will look like http://localhost:3001/reservationlookup
router.get('/reservationlookup', withAuth,(req, res) => {
    res.sendFile(path.join(__dirname, '../views/reservationlookup2.html'));
});

// // Contact Page
// will look like http://localhost:3001/contact
// router.get('/contact', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views/contact.html'));
// });

// // Attractions Page
// will look like http://localhost:3001/attractions
// router.get('/attractions', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views/attractions.html'));
// });


module.exports = router;
