require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const apiRoutes = require('./routes/api.route');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);
const pregnancyRoutes = require('./routes/pregnancy.route');
app.use('/api/pregnancies', pregnancyRoutes);


const PORT = process.env.PORT || 5000;

sequelize.sync()
    .then(() => {
        console.log('Database Connected');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error(err));
