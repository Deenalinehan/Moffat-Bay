const path = require('path');
require('dotenv').config();
const express = require("express");
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const routes = require('./controllers'); // your routes

const app = express();

// Port handling
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup (production-safe)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'railway-dev-secret',
    store: new SequelizeStore({ db: sequelize }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 900000 }, // 15 minutes
  })
);

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use(routes);

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Moffat Bay API!' });
});

// SPA fallback route — must be last
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Connect to DB and start server
sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Database connected');
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('⚠️ Database connection failed:', err.message);
  });
