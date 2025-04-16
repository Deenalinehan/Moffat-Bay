// the home routes serve the webpages to the broswer

const router = require("express").Router();
const path = require('path');

// Home Page (dashboard)
// will look like http://localhost:3001/
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

// About Page
// will look like http://localhost:3001/about
router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/About.html'));
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

// // Registration Page
// will look like http://localhost:3001/registration
router.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/registration.html'));
});

// Things to Do Page
router.get('/todo', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/todo.html'));
  });
  
  // Amenities Page
  router.get('/amenities', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/Amenities.html'));
  });
  
// // Login Page
// will look like http://localhost:3001/login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

// // Reservation Page
// will look like http://localhost:3001/reservation
// router.get('/reservation', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views/reservation.html'));
// });

// // Reservation Lookup Page
// will look like http://localhost:3001/reservationlookup
// router.get('/reservationlookup', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views/reservationlookup.html'));
// });

module.exports = router;
