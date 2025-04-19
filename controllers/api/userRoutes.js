const router = require('express').Router();
const { User } = require('../../models');

//create user
// will look like will look like http://localhost:3001/api/users/createUser
router.post('/createUser', async (req, res) => {

  try {

    // this bit checks to make sure there is a request body, if not, it gets mad
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'request body is empty' });
    }

    // this bit checks to make sure the frontend has sent the data required to create a new user
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: 'missing required fields. To create a new user, a firstName, lastName, email, password, and phoneNumber are needed' });
    }

    // check if user exists
    const existing = await User.findOne({ where: { email: req.body.email } });
    if (existing) {
      return res.status(409).json({ message: 'email already exists' });
    }

    // create new user
    const newUser = await User.create(
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        phone_number: phoneNumber
      }
    );

    // send back okay message
    res.status(201).json({ message: 'user registered. You may now log in', user: { email: newUser.dataValues.email } });
  } catch (err) {
    console.log(err);
    // if the database interaction fails, send back an error
    res.status(500).json({ message: 'server error.' });
  }
});

//log in user
// will look like http://localhost:3001/api/users/loginUser
router.post('/loginUser', async (req, res) => {

  try {

    // this bit checks to make sure there is a request body, if not, it gets mad
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'request body is empty' });
    }

    // this bit checks to make sure the frontend has sent the data required to attempt a user login
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'missing required fields. To attempt to login a user, a email and password are needed' });
    }

    // look in the database for a user with the provided username/email
    const userData = await User.findOne({ where: { email: req.body.email } });

    // if the user record is not found, send back a "not found" message
    if (!userData) {
      res
        .status(400)
        .json({ message: 'incorrect email or password, please try again' });
      return;
    }

    // use the User model checkPassword method to compare the provided password from the login attempt with the un-hashed version of the password saved in the database for that user
    const passwordMatches = await userData.checkPassword(req.body.password);

    // if the user record is found but the provided password does not match the user record, send back a "not found" message
    if (!passwordMatches) {
      res
        .status(400)
        .json({ message: 'incorrect email or password, please try again' });
      return;
    }

    // when given email and password match a user record, add the user to the session and set the logged_in status to true
    req.session.save(() => {
      req.session.userId = userData.dataValues.id;
      req.session.email = userData.dataValues.email;
      req.session.firstName = userData.dataValues.first_name;
      req.session.logged_in = true;

      res.status(200).json({ user: userData, message: 'you are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'server error.' });
  }
});

// log out user
// will look like http://localhost:3001/api/users/logoutUser
// this route ends the session
router.post('/logoutUser', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed', error: err });
      }
      res.clearCookie('connect.sid'); // Important: clears session cookie from browser
      res.status(204).end(); // No content, logout successful
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;