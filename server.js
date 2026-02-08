const path = require('path');
require('dotenv').config();
const express = require("express");
const session = require("express-session");
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');

const app = express();

const sess = {
    secret: process.env.SECRET,
    cookie: { maxAge: 900000 },
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({ db: sequelize })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found. Does your route require an api path variable?' });
});

// Only listen once, after Sequelize sync
const PORT = process.env.PORT || 3001;

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
