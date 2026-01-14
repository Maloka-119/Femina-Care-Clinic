require('dotenv').config(); // To use .env file for database credentials
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const apiRoutes = require('./routes/api.route');

const app = express();

// Middleware
app.use(cors()); // Allow React to connect
app.use(express.json()); // Parse JSON bodies

// Use Routes
app.use('/api', apiRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ success: false, message: 'Something went wrong!' });
});

// Database Connection and Server Start
const PORT = process.env.PORT || 5000;

// sequelize.sync() will create tables if they don't exist
// Use { alter: true } to update tables if you changed the models
sequelize.sync({ alter: true })
    .then(() => {
        console.log(' PostgreSQL Database Connected & Synced');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error(' Unable to connect to the database:', err);
    });