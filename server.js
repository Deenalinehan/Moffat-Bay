const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const path = require('path');

const app = express();

// Middleware to parse JSON and URL-encoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup using SequelizeStore (production-safe)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'railway-dev-secret',
    store: new SequelizeStore({
      db: sequelize,           // store sessions in your database
      checkExpirationInterval: 15 * 60 * 1000, // optional: check expired sessions every 15 min
      expiration: 24 * 60 * 60 * 1000,        // optional: session expires after 1 day
    }),
    resave: false,
    saveUninitialized: false,
  })
);

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
