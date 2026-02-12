const path = require('path');

// pull in environment variables
require('dotenv').config();

// pull in the express server framework
const express = require("express");

// pull in session management
const session = require("express-session");

// retrieve database connection
const sequelize = require('./config/connection');

// create ability to store sessions in the database
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// enable session support in app
const sess = {
    // sign the session id cookie
    secret: process.env.SECRET,
    cookie: {
        // 900000 milliseconds is 15 minutes
        maxAge: 900000,
    },
    // prevent session from being saved again to the session store if nothing has changed
    resave: false,
    // only save sessions when something has been added to it
    saveUninitialized: false,
    // instead of keeping session data in memory (which resets when the server restarts), store them persistently in the database
    store: new SequelizeStore({
        db: sequelize
    })
};


// pulls in all routes created in the conrollers folder
// (it looks at the index.js file in the controllers folder)
const routes = require('./controllers');

// create an express serer
const app = express();

// use port 3001 if environment variables are not found
const PORT = process.env.PORT || 3001;

// mount session handling middleware to the app
app.use(session(sess));

// format calls and responses to and from server in json form
app.use(express.json());

// server should use the routes we've pulled in
app.use(routes);

// this line adds middleware to your Express app that parses incoming URL-encoded data — the kind you usually get from HTML form submissions.
app.use(express.urlencoded({ extended: true }));

// this line enables express to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// if the user tries to hit an endpoint that doesn't exist, send back this error
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found. Does your route require an api path variable?' });
});

// start the server
app.listen(PORT, () => {

});

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public'))); // replace 'public' if your folder is different

// Example API route (ensure all route parameters are valid!)
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Moffat Bay API!' });
});

// Example route with parameter
// app.get('/api/user/:id', (req, res) => {
//   res.json({ userId: req.params.id });
// });

// SPA fallback route (must be last)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Connect to database first, then start server
sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Database connected');

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      if (process.env.PORT) {
        console.log(`✅ App running on Railway port ${PORT}`);
      } else {
        console.log(`✅ App running locally on port ${PORT}`);
      }
    });
  })
  .catch((err) => {
    console.error('⚠️ Database connection failed:', err.message);
  });
