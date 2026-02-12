const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection');
const path = require('path');

const app = express();

// Middleware to parse JSON and URL-encoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'railway-dev-secret',
  resave: false,
  saveUninitialized: false,
}));

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public'))); // replace 'public' if your folder is named differently

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Moffat Bay API!' });
});

// Additional backend routes can go here
// Make sure all route parameters are valid!
// Example: /api/user/:id is valid, /api/user/: is INVALID

// SPA fallback route (must be last)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Connect to database first, then start server
sequelize.authenticate()
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
  .catch(err => {
    console.error('⚠️ Database connection failed:', err.message);
  });
