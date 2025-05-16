const express = require('express');
const authRoute = require('../route/authRoute');
const app = express();

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

// Routes
app.use('/api', authRoute);


module.exports = app;
