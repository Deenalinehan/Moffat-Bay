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

// Serve all static files from your frontend folder
// Replace 'public' with the folder where your HTML/CSS/JS live
app.use(express.static(path.join(__dirname, 'public')));

// Example API routes
// Keep your backend logic separate here
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Moffat Bay API!' });
});

// Optional: If you use template engine (EJS/Pug/Handlebars)
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// Fallback route: serve index.html for SPA routing (if using a frontend framework)
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
