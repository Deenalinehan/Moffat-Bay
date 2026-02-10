const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'railway-dev-secret',
  resave: false,
  saveUninitialized: false,
}));

// Example route
app.get('/', (req, res) => {
  res.send('Hello from Moffat Bay!');
});

// Port handling
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  if (process.env.PORT) {
    console.log(`✅ App running on Railway port ${PORT}`);
  } else {
    console.log(`✅ App running locally on port ${PORT}`);
  }
});
